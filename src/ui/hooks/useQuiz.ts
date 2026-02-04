/**
 * useQuiz Hook - Connects quiz engine with React state and storage
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { QuizState, AnswerFeedback, QuizResults, ViewState } from '../../domain/types';
import * as engine from '../../domain/quizEngine';
import * as storage from '../../storage/progressStorage';
import { shuffleQuestions, shuffleOptions } from '../../domain/shuffle';
import { getGrade } from '../../domain/scoring';
import { getAllQuestions } from '../../data/quizData';

interface UseQuizReturn {
  // View state
  view: ViewState['view'];
  setView: (view: ViewState['view']) => void;

  // Quiz state
  quizState: QuizState | null;
  currentQuestion: ReturnType<typeof engine.getCurrentQuestion>;
  currentBlock: ReturnType<typeof engine.getCurrentBlockInfo>;
  progress: number;
  isAnswered: boolean;
  feedback: AnswerFeedback | null;

  // Results
  results: QuizResults | null;
  grade: ReturnType<typeof getGrade> | null;

  // Actions
  startBlock: (blockId: string) => void;
  startAll: () => void;
  startReviewWrong: () => void;
  answerOption: (index: number) => void;
  next: () => void;
  shuffle: () => void;
  restart: () => void;
  goToBlockSelection: () => void;
  goToHero: () => void;

  // Data
  blocks: ReturnType<typeof engine.getBlocks>;
  bestScores: Record<string, number>;
  canReviewWrong: boolean;
}

export function useQuiz(): UseQuizReturn {
  const [view, setView] = useState<ViewState['view']>('hero');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [bestScores, setBestScores] = useState<Record<string, number>>(
    storage.getAllBestScores()
  );

  // Derived state
  const currentQuestion = useMemo(
    () => (quizState ? engine.getCurrentQuestion(quizState) : null),
    [quizState]
  );

  const currentBlock = useMemo(
    () => (quizState ? engine.getCurrentBlockInfo(quizState) : null),
    [quizState]
  );

  const progress = useMemo(
    () => (quizState ? engine.getProgress(quizState) : 0),
    [quizState]
  );

  const isAnswered = useMemo(
    () => (quizState ? engine.isCurrentAnswered(quizState) : false),
    [quizState]
  );

  const grade = useMemo(
    () => (results ? getGrade(results.percentage) : null),
    [results]
  );

  const canReviewWrong = useMemo(() => {
    const weakIds = storage.getWeakQuestionIds();
    return weakIds.length > 0;
  }, [bestScores]); // Re-check when scores change

  // Actions
  const startBlock = useCallback((blockId: string) => {
    const state = engine.startBlockSession(blockId);
    setQuizState(state);
    setFeedback(null);
    setResults(null);
    setView('quiz');
  }, []);

  const startAll = useCallback(() => {
    const state = engine.startAllBlocksSession();
    setQuizState(state);
    setFeedback(null);
    setResults(null);
    setView('quiz');
  }, []);

  const startReviewWrong = useCallback(() => {
    const weakIds = storage.getWeakQuestionIds();
    if (weakIds.length === 0) return;

    const state = engine.startReviewSession(weakIds);
    setQuizState(state);
    setFeedback(null);
    setResults(null);
    setView('quiz');
  }, []);

  const answerOption = useCallback((index: number) => {
    if (!quizState || isAnswered) return;

    const { state: newState, feedback: newFeedback } = engine.answerQuestion(
      quizState,
      index
    );

    setQuizState(newState);
    setFeedback(newFeedback);

    // Update question history
    const currentQ = engine.getCurrentQuestion(quizState);
    if (currentQ) {
      storage.updateQuestionHistory(currentQ.id, newFeedback.isCorrect);
    }
  }, [quizState, isAnswered]);

  const next = useCallback(() => {
    if (!quizState) return;

    const newState = engine.nextQuestion(quizState);
    setQuizState(newState);
    setFeedback(null);

    if (newState.isFinished) {
      const quizResults = engine.getResults(newState);
      setResults(quizResults);
      setView('results');

      // Update best score
      if (newState.mode.type === 'single-block') {
        storage.updateBestScore(newState.mode.blockId, quizResults.percentage);
        setBestScores(storage.getAllBestScores());
      }

      // Update question history for all answers
      storage.updateMultipleQuestionHistory(newState.answers);
    }
  }, [quizState]);

  const shuffle = useCallback(() => {
    if (!quizState || quizState.answers.length > 0) return;

    // Shuffle both questions and their options
    const shuffledState = shuffleQuestions(quizState);
    const questionsWithShuffledOptions = shuffleOptions(shuffledState.questions);

    setQuizState({
      ...shuffledState,
      questions: questionsWithShuffledOptions
    });
  }, [quizState]);

  const restart = useCallback(() => {
    if (!quizState) return;

    // Recreate session with same mode
    const newState = engine.createSession(quizState.mode);
    setQuizState(newState);
    setFeedback(null);
    setResults(null);
    setView('quiz');
  }, [quizState]);

  const goToBlockSelection = useCallback(() => {
    setView('block-selection');
    setQuizState(null);
    setFeedback(null);
    setResults(null);
    setBestScores(storage.getAllBestScores());
  }, []);

  const goToHero = useCallback(() => {
    setView('hero');
    setQuizState(null);
    setFeedback(null);
    setResults(null);
  }, []);

  // DEBUG: Show results with mock data for different score ranges
  const showDebugResultsWithScore = useCallback((percentage: number, label: string) => {
    const allQuestions = getAllQuestions();
    const totalQuestions = 20;
    const correctCount = Math.round((percentage / 100) * totalQuestions);
    const wrongCount = totalQuestions - correctCount;

    const mockWrongQuestions = allQuestions.slice(0, wrongCount);
    const mockAnswers = allQuestions.slice(0, totalQuestions).map((q, i) => ({
      questionId: q.id,
      selectedIndex: i < wrongCount ? (q.correctIndex === 0 ? 1 : 0) : q.correctIndex,
      isCorrect: i >= wrongCount,
      timestamp: Date.now()
    }));

    const mockResults: QuizResults = {
      totalQuestions,
      correctCount,
      wrongCount,
      percentage,
      wrongQuestions: mockWrongQuestions,
      answers: mockAnswers,
      duration: 5 * 60 * 1000
    };

    setResults(mockResults);
    setView('results');
    console.log(`🔧 DEBUG: ${label} (${percentage}%)`);
  }, []);

  // Keyboard shortcuts for debug mode (only in development)
  // Ctrl+Shift+1: Gold (95%)
  // Ctrl+Shift+2: Silver (75%)
  // Ctrl+Shift+3: Bronze (60%)
  // Ctrl+Shift+4: Fail (40%)
  useEffect(() => {
    if (import.meta.env.PROD) return; // Disable in production

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.shiftKey) return;

      switch (e.key) {
        case '1':
          e.preventDefault();
          showDebugResultsWithScore(95, '🥇 Gold Medal');
          break;
        case '2':
          e.preventDefault();
          showDebugResultsWithScore(75, '🥈 Silver Medal');
          break;
        case '3':
          e.preventDefault();
          showDebugResultsWithScore(60, '🥉 Bronze Medal');
          break;
        case '4':
          e.preventDefault();
          showDebugResultsWithScore(40, '📚 Need to Study');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDebugResultsWithScore]);

  return {
    // View
    view,
    setView,

    // Quiz state
    quizState,
    currentQuestion,
    currentBlock,
    progress,
    isAnswered,
    feedback,

    // Results
    results,
    grade,

    // Actions
    startBlock,
    startAll,
    startReviewWrong,
    answerOption,
    next,
    shuffle,
    restart,
    goToBlockSelection,
    goToHero,

    // Data
    blocks: engine.getBlocks(),
    bestScores,
    canReviewWrong
  };
}
