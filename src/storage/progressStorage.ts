/**
 * Progress Storage - LocalStorage persistence with versioning
 */

import type { StoredProgress, QuizMode, Answer, QuestionHistory } from '../domain/types';

const STORAGE_KEY = 'quiz-ra2-bda-progress';
const CURRENT_VERSION = 1;

/**
 * Default empty progress state
 */
const DEFAULT_PROGRESS: StoredProgress = {
  version: CURRENT_VERSION,
  bestScores: {},
  questionHistory: {}
};

/**
 * Loads progress from localStorage
 */
export function loadProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;

    const parsed = JSON.parse(raw) as StoredProgress;

    // Handle version migrations
    if (parsed.version !== CURRENT_VERSION) {
      return migrateProgress(parsed);
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return DEFAULT_PROGRESS;
  }
}

/**
 * Saves progress to localStorage
 */
export function saveProgress(progress: StoredProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

/**
 * Migrates progress from older versions
 */
function migrateProgress(oldProgress: StoredProgress): StoredProgress {
  // For now, just update version and keep data
  // Add specific migrations as needed
  return {
    ...DEFAULT_PROGRESS,
    ...oldProgress,
    version: CURRENT_VERSION
  };
}

/**
 * Updates best score for a block if new score is higher
 */
export function updateBestScore(blockId: string, percentage: number): void {
  const progress = loadProgress();
  const currentBest = progress.bestScores[blockId] ?? 0;

  if (percentage > currentBest) {
    progress.bestScores[blockId] = percentage;
    saveProgress(progress);
  }
}

/**
 * Gets best score for a block
 */
export function getBestScore(blockId: string): number | undefined {
  const progress = loadProgress();
  return progress.bestScores[blockId];
}

/**
 * Gets all best scores
 */
export function getAllBestScores(): Record<string, number> {
  const progress = loadProgress();
  return progress.bestScores;
}

/**
 * Updates question history after answering
 */
export function updateQuestionHistory(questionId: string, isCorrect: boolean): void {
  const progress = loadProgress();
  const existing = progress.questionHistory[questionId];

  progress.questionHistory[questionId] = {
    timesAnswered: (existing?.timesAnswered ?? 0) + 1,
    timesCorrect: (existing?.timesCorrect ?? 0) + (isCorrect ? 1 : 0),
    lastAnswered: Date.now()
  };

  saveProgress(progress);
}

/**
 * Updates history for multiple questions at once
 */
export function updateMultipleQuestionHistory(answers: Answer[]): void {
  const progress = loadProgress();

  for (const answer of answers) {
    const existing = progress.questionHistory[answer.questionId];
    progress.questionHistory[answer.questionId] = {
      timesAnswered: (existing?.timesAnswered ?? 0) + 1,
      timesCorrect: (existing?.timesCorrect ?? 0) + (answer.isCorrect ? 1 : 0),
      lastAnswered: answer.timestamp
    };
  }

  saveProgress(progress);
}

/**
 * Gets history for a specific question
 */
export function getQuestionHistory(questionId: string): QuestionHistory | undefined {
  const progress = loadProgress();
  return progress.questionHistory[questionId];
}

/**
 * Gets IDs of questions that have been answered incorrectly
 */
export function getWeakQuestionIds(): string[] {
  const progress = loadProgress();
  return Object.entries(progress.questionHistory)
    .filter(([, history]) => history.timesCorrect < history.timesAnswered)
    .map(([id]) => id);
}

/**
 * Gets IDs of questions that have never been answered correctly
 */
export function getNeverCorrectQuestionIds(): string[] {
  const progress = loadProgress();
  return Object.entries(progress.questionHistory)
    .filter(([, history]) => history.timesCorrect === 0)
    .map(([id]) => id);
}

/**
 * Saves current session for resuming later
 */
export function saveSession(
  mode: QuizMode,
  currentIndex: number,
  answers: Answer[]
): void {
  const progress = loadProgress();
  progress.lastSession = {
    mode,
    currentIndex,
    answers,
    savedAt: Date.now()
  };
  saveProgress(progress);
}

/**
 * Gets the last saved session
 */
export function getLastSession() {
  const progress = loadProgress();
  return progress.lastSession;
}

/**
 * Clears the saved session
 */
export function clearSession(): void {
  const progress = loadProgress();
  delete progress.lastSession;
  saveProgress(progress);
}

/**
 * Resets all progress
 */
export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Checks if there's any saved progress
 */
export function hasProgress(): boolean {
  const progress = loadProgress();
  return (
    Object.keys(progress.bestScores).length > 0 ||
    Object.keys(progress.questionHistory).length > 0
  );
}
