import { useEffect, useRef } from 'react';
import { triggerCorrectAnswerConfetti } from '../utils/confettiEffects';
import type { Question, AnswerFeedback } from '../../domain/types';
import { OptionButton } from './OptionButton';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  feedback: AnswerFeedback | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuizCard({
  question,
  questionNumber,
  feedback,
  onAnswer,
  onNext,
  isLast
}: QuizCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevQuestionRef = useRef(question.id);

  // Trigger animation when question changes
  useEffect(() => {
    if (prevQuestionRef.current !== question.id) {
      prevQuestionRef.current = question.id;
      cardRef.current?.classList.remove('animate-slide-in-right');
      void cardRef.current?.offsetWidth; // Trigger reflow
      cardRef.current?.classList.add('animate-slide-in-right');
    }
  }, [question.id]);

  // Confetti on correct answer (random effect each time)
  useEffect(() => {
    if (feedback?.isCorrect) {
      triggerCorrectAnswerConfetti();
    }
  }, [feedback?.isCorrect]);

  const isAnswered = feedback !== null;
  const selectedIndex = feedback?.selectedIndex ?? -1;

  return (
    <div ref={cardRef} className="bg-white rounded-2xl shadow-xl p-8 animate-slide-in-right">
      {/* Question number */}
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold text-lg">
          {questionNumber}
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Question text */}
      <h3 className="text-xl font-medium text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            index={index}
            text={option}
            isSelected={selectedIndex === index}
            isCorrect={feedback?.isCorrect ?? false}
            isAnswered={isAnswered}
            correctIndex={question.correctIndex}
            onClick={() => onAnswer(index)}
          />
        ))}
      </div>

      {/* Feedback boxes */}
      {feedback?.isCorrect && (
        <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl animate-slide-up">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-semibold text-emerald-800 mb-1">¡Correcto!</div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                {feedback.correctExplanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {feedback && !feedback.isCorrect && (
        <div className="mt-6 p-5 bg-red-50 border border-red-200 rounded-xl animate-slide-up">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-semibold text-red-800 mb-1">Incorrecto</div>
              <p className="text-red-700 text-sm leading-relaxed">
                La respuesta correcta era: "{feedback.correctText}". {feedback.correctExplanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <button
          onClick={onNext}
          className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all"
        >
          {isLast ? 'Ver resultados' : 'Siguiente pregunta →'}
        </button>
      )}
    </div>
  );
}
