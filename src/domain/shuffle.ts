/**
 * Shuffle utilities - Pure functions for randomization
 */

import type { Question, QuizState } from './types';

/**
 * Fisher-Yates shuffle algorithm
 * Pure function - returns a new array
 */
export function shuffleArray<T>(array: T[], seed?: number): T[] {
  const result = [...array];
  const random = seed !== undefined ? seededRandom(seed) : Math.random;

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Creates a seeded random number generator
 * Useful for reproducible shuffles
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/**
 * Shuffles questions in a quiz state
 * Returns a new state with shuffled questions
 */
export function shuffleQuestions(state: QuizState, seed?: number): QuizState {
  // Only shuffle if we haven't answered any questions yet
  if (state.answers.length > 0) {
    console.warn('Cannot shuffle after answering questions');
    return state;
  }

  return {
    ...state,
    questions: shuffleArray(state.questions, seed),
    currentIndex: 0
  };
}

/**
 * Shuffles options within each question
 * Updates correctIndex accordingly
 */
export function shuffleOptions(questions: Question[], seed?: number): Question[] {
  const random = seed !== undefined ? seededRandom(seed) : Math.random;

  return questions.map(q => {
    // Create array of [option, originalIndex] pairs
    const optionsWithIndices = q.options.map((opt, idx) => ({ opt, idx }));

    // Shuffle
    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
    }

    // Find new correct index
    const newCorrectIndex = optionsWithIndices.findIndex(
      item => item.idx === q.correctIndex
    );

    return {
      ...q,
      options: optionsWithIndices.map(item => item.opt),
      correctIndex: newCorrectIndex
    };
  });
}

/**
 * Generates a random seed based on current time
 */
export function generateSeed(): number {
  return Date.now() % 1000000;
}
