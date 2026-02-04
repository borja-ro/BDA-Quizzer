import { useEffect } from 'react';
import { triggerCelebrationConfetti, triggerGoldMedalRain } from '../utils/confettiEffects';
import type { QuizResults } from '../../domain/types';
import type { Grade } from '../../domain/scoring';

interface ResultsViewProps {
  results: QuizResults;
  grade: Grade;
  onRetry: () => void;
  onSelectBlock: () => void;
}

// Medal configuration based on percentage ranges
type MedalType = 'gold' | 'silver' | 'bronze' | 'fail';

interface MedalConfig {
  emoji: string;
  bgClass: string;
  animate: boolean;
}

const medalConfig: Record<MedalType, MedalConfig> = {
  gold: {
    emoji: '🥇',
    bgClass: 'bg-yellow-100',
    animate: true
  },
  silver: {
    emoji: '🥈',
    bgClass: 'bg-gray-100',
    animate: false
  },
  bronze: {
    emoji: '🥉',
    bgClass: 'bg-orange-100',
    animate: false
  },
  fail: {
    emoji: '📚',
    bgClass: 'bg-red-100',
    animate: false
  }
};

function getMedalType(percentage: number): MedalType {
  if (percentage >= 90) return 'gold';
  if (percentage >= 70) return 'silver';
  if (percentage >= 50) return 'bronze';
  return 'fail';
}

export function ResultsView({ results, grade, onRetry, onSelectBlock }: ResultsViewProps) {
  const medalType = getMedalType(results.percentage);
  const medal = medalConfig[medalType];
  const isGold = medalType === 'gold';
  const isFail = medalType === 'fail';

  // Effects based on score
  useEffect(() => {
    if (isGold) {
      // Gold medal rain + celebration
      triggerCelebrationConfetti();
      triggerGoldMedalRain();
    }
  }, [isGold]);

  return (
    <section className={`min-h-screen py-20 px-6 ${isFail ? 'animate-fail-pulse bg-red-50' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        {/* Medal icon */}
        <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${medal.bgClass} ${isGold ? 'animate-medal-pulse' : ''}`}>
          <span className="text-6xl">{medal.emoji}</span>
        </div>

        {/* Title and subtitle */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{grade.label}</h2>
        <p className="text-xl text-gray-500 mb-8">{grade.message}</p>

        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
            {results.percentage}%
          </div>
          <div className="text-2xl font-semibold text-gray-700 mb-2">
            {((results.correctCount / results.totalQuestions) * 10).toFixed(2)} / 10.00
          </div>
          <div className="text-gray-500">Puntuación</div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-emerald-600">{results.correctCount}</div>
              <div className="text-emerald-700 text-sm">Correctas</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-red-600">{results.wrongCount}</div>
              <div className="text-red-700 text-sm">Incorrectas</div>
            </div>
          </div>
        </div>

        {/* Failed questions */}
        {results.wrongQuestions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Preguntas falladas:
            </h3>
            <div className="space-y-4">
              {results.wrongQuestions.map((q, idx) => {
                const answer = results.answers.find(a => a.questionId === q.id);
                return (
                  <div key={q.id} className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="font-medium text-gray-800 mb-2">
                      <span className="text-red-600">{idx + 1}.</span> {q.question}
                    </div>
                    {answer && (
                      <div className="text-sm text-gray-500 mb-1">
                        Tu respuesta: {q.options[answer.selectedIndex]}
                      </div>
                    )}
                    <div className="text-sm text-emerald-700">
                      <strong>Respuesta correcta:</strong> {q.options[q.correctIndex]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Repetir bloque
          </button>
          <button
            onClick={onSelectBlock}
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Elegir otro bloque
          </button>
        </div>
      </div>
    </section>
  );
}
