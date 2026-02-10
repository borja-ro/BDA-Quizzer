/**
 * Quiz Engine - Pure functions for quiz logic
 * No React, no DOM, no side effects
 */

import type {
  Question,
  QuizMode,
  QuizState,
  Answer,
  AnswerFeedback,
  QuizResults
} from './types';
import { quizBlocks, getBlockById, getAllQuestions } from '../data/quizData';

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Creates a new quiz session based on the mode
 */
export function createSession(mode: QuizMode): QuizState {
  let questions: Question[];

  switch (mode.type) {
    case 'single-block': {
      const block = getBlockById(mode.blockId);
      if (!block) {
        throw new Error(`Block not found: ${mode.blockId}`);
      }
      questions = [...block.questions];
      break;
    }
    case 'all-blocks': {
      questions = getAllQuestions();
      break;
    }
    case 'review-wrong': {
      const allQuestions = getAllQuestions();
      questions = mode.questionIds
        .map(id => allQuestions.find(q => q.id === id))
        .filter((q): q is Question => q !== undefined);
      break;
    }
  }

  return {
    mode,
    questions,
    currentIndex: 0,
    answers: [],
    isFinished: false,
    startedAt: Date.now()
  };
}

/**
 * Creates a session for a single block
 */
export function startBlockSession(blockId: string): QuizState {
  return createSession({ type: 'single-block', blockId });
}

/**
 * Creates a session with all blocks
 */
export function startAllBlocksSession(): QuizState {
  return createSession({ type: 'all-blocks' });
}

/**
 * Creates a session to review wrong answers
 */
export function startReviewSession(questionIds: string[]): QuizState {
  return createSession({ type: 'review-wrong', questionIds });
}

// ============================================
// QUESTION NAVIGATION
// ============================================

/**
 * Gets the current question
 */
export function getCurrentQuestion(state: QuizState): Question | null {
  if (state.isFinished || state.currentIndex >= state.questions.length) {
    return null;
  }
  return state.questions[state.currentIndex];
}

/**
 * Checks if the current question has been answered
 */
export function isCurrentAnswered(state: QuizState): boolean {
  const currentQuestion = getCurrentQuestion(state);
  if (!currentQuestion) return false;
  return state.answers.some(a => a.questionId === currentQuestion.id);
}

/**
 * Gets the answer for the current question if it exists
 */
export function getCurrentAnswer(state: QuizState): Answer | null {
  const currentQuestion = getCurrentQuestion(state);
  if (!currentQuestion) return null;
  return state.answers.find(a => a.questionId === currentQuestion.id) ?? null;
}

// ============================================
// ANSWERING
// ============================================

/**
 * Records an answer and returns the new state + feedback
 */
export function answerQuestion(
  state: QuizState,
  selectedIndex: number
): { state: QuizState; feedback: AnswerFeedback } {
  const currentQuestion = getCurrentQuestion(state);

  if (!currentQuestion) {
    throw new Error('No current question to answer');
  }

  if (isCurrentAnswered(state)) {
    throw new Error('Question already answered');
  }

  const isCorrect = selectedIndex === currentQuestion.correctIndex;

  const answer: Answer = {
    questionId: currentQuestion.id,
    selectedIndex,
    isCorrect,
    timestamp: Date.now()
  };

  const feedback: AnswerFeedback = {
    isCorrect,
    correctIndex: currentQuestion.correctIndex,
    selectedIndex,
    correctText: currentQuestion.options[currentQuestion.correctIndex],
    selectedText: currentQuestion.options[selectedIndex],
    correctExplanation: currentQuestion.explanation,
    selectedWrongExplanation: currentQuestion.wrongExplanations?.[selectedIndex]
  };

  const newState: QuizState = {
    ...state,
    answers: [...state.answers, answer]
  };

  return { state: newState, feedback };
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Moves to the next question or finishes the quiz
 */
export function nextQuestion(state: QuizState): QuizState {
  if (state.currentIndex >= state.questions.length - 1) {
    return {
      ...state,
      isFinished: true
    };
  }

  return {
    ...state,
    currentIndex: state.currentIndex + 1
  };
}

/**
 * Checks if there are more questions
 */
export function hasNextQuestion(state: QuizState): boolean {
  return state.currentIndex < state.questions.length - 1;
}

// ============================================
// RESULTS
// ============================================

/**
 * Calculates final results from the quiz state
 */
export function getResults(state: QuizState): QuizResults {
  const correctCount = state.answers.filter(a => a.isCorrect).length;
  const totalQuestions = state.questions.length;
  const wrongCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const wrongQuestionIds = state.answers
    .filter(a => !a.isCorrect)
    .map(a => a.questionId);

  const wrongQuestions = state.questions.filter(q =>
    wrongQuestionIds.includes(q.id)
  );

  return {
    totalQuestions,
    correctCount,
    wrongCount,
    percentage,
    answers: state.answers,
    wrongQuestions,
    duration: Date.now() - state.startedAt
  };
}

/**
 * Gets IDs of incorrectly answered questions
 */
export function getWrongQuestionIds(state: QuizState): string[] {
  return state.answers
    .filter(a => !a.isCorrect)
    .map(a => a.questionId);
}

// ============================================
// UTILITIES
// ============================================

/**
 * Gets the current block info if in single-block mode
 */
export function getCurrentBlockInfo(state: QuizState) {
  if (state.mode.type === 'single-block') {
    return getBlockById(state.mode.blockId);
  }
  // For all-blocks mode, determine block from current question
  const currentQuestion = getCurrentQuestion(state);
  if (!currentQuestion) return null;

  return quizBlocks.find(block =>
    block.questions.some(q => q.id === currentQuestion.id)
  );
}

/**
 * Gets all available blocks
 */
export function getBlocks() {
  return quizBlocks;
}

/**
 * Calculates progress percentage
 */
export function getProgress(state: QuizState): number {
  if (state.questions.length === 0) return 0;
  return ((state.currentIndex + 1) / state.questions.length) * 100;
}
