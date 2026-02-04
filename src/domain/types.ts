// ============================================
// DOMAIN TYPES - Quiz Application
// ============================================

/** A single question in the quiz */
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanations?: string[]; // Future: explanation for each wrong option
}

/** A block/section of questions */
export interface Block {
  id: string;
  title: string;
  color: BlockColor;
  questions: Question[];
}

/** Available block colors for UI theming */
export type BlockColor = 'indigo' | 'purple' | 'pink' | 'emerald';

/** Quiz mode types */
export type QuizMode =
  | { type: 'single-block'; blockId: string }
  | { type: 'all-blocks' }
  | { type: 'review-wrong'; questionIds: string[] };

/** User's answer to a question */
export interface Answer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timestamp: number;
}

/** Feedback after answering a question */
export interface AnswerFeedback {
  isCorrect: boolean;
  correctIndex: number;
  selectedIndex: number;
  correctText: string;
  selectedText: string;
  correctExplanation: string;
  selectedWrongExplanation?: string;
}

/** Current state of the quiz session */
export interface QuizState {
  mode: QuizMode;
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  isFinished: boolean;
  startedAt: number;
}

/** Results after completing the quiz */
export interface QuizResults {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  percentage: number;
  answers: Answer[];
  wrongQuestions: Question[];
  duration: number; // in milliseconds
}

/** Persisted progress data */
export interface StoredProgress {
  version: number;
  bestScores: Record<string, number>; // blockId -> percentage
  questionHistory: Record<string, QuestionHistory>; // questionId -> history
  lastSession?: {
    mode: QuizMode;
    currentIndex: number;
    answers: Answer[];
    savedAt: number;
  };
}

/** History for a single question */
export interface QuestionHistory {
  timesAnswered: number;
  timesCorrect: number;
  lastAnswered: number;
}

/** View/screen states for UI */
export type ViewState =
  | { view: 'hero' }
  | { view: 'block-selection' }
  | { view: 'quiz' }
  | { view: 'results' };
