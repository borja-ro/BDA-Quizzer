/**
 * Scoring utilities - Pure functions for calculating scores and grades
 */

import type { QuizResults } from './types';

/** Grade thresholds and labels */
export interface Grade {
  label: string;
  emoji: string;
  message: string;
  colorClass: string;
  minPercentage: number;
}

const GRADES: Grade[] = [
  {
    label: 'Excelente',
    emoji: '🏆',
    message: 'Dominas muy bien este tema.',
    colorClass: 'emerald',
    minPercentage: 90
  },
  {
    label: 'Muy bien',
    emoji: '😊',
    message: 'Buen conocimiento, pero puedes mejorar.',
    colorClass: 'blue',
    minPercentage: 70
  },
  {
    label: 'Aprobado',
    emoji: '📚',
    message: 'Necesitas repasar algunos conceptos.',
    colorClass: 'yellow',
    minPercentage: 50
  },
  {
    label: 'Sigue practicando',
    emoji: '💪',
    message: 'Revisa el material y vuelve a intentarlo.',
    colorClass: 'red',
    minPercentage: 0
  }
];

/**
 * Gets the grade based on percentage score
 */
export function getGrade(percentage: number): Grade {
  for (const grade of GRADES) {
    if (percentage >= grade.minPercentage) {
      return grade;
    }
  }
  return GRADES[GRADES.length - 1];
}

/**
 * Formats duration in a human-readable format
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Calculates average time per question
 */
export function getAverageTimePerQuestion(results: QuizResults): number {
  if (results.totalQuestions === 0) return 0;
  return results.duration / results.totalQuestions;
}

/**
 * Gets performance summary text
 */
export function getPerformanceSummary(results: QuizResults): string {
  const grade = getGrade(results.percentage);
  const avgTime = getAverageTimePerQuestion(results);
  const avgTimeFormatted = formatDuration(avgTime);

  return `${grade.label} - ${results.correctCount}/${results.totalQuestions} correctas (${results.percentage}%). Tiempo medio: ${avgTimeFormatted}/pregunta.`;
}

/**
 * Determines if the score is a personal best for a block
 */
export function isPersonalBest(
  newPercentage: number,
  previousBest: number | undefined
): boolean {
  if (previousBest === undefined) return true;
  return newPercentage > previousBest;
}

/**
 * Calculates improvement from previous attempt
 */
export function calculateImprovement(
  newPercentage: number,
  previousPercentage: number
): number {
  return newPercentage - previousPercentage;
}
