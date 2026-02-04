interface OptionButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  correctIndex: number;
  onClick: () => void;
}

export function OptionButton({
  index,
  text,
  isSelected,
  isCorrect,
  isAnswered,
  correctIndex,
  onClick
}: OptionButtonProps) {
  const letter = String.fromCharCode(65 + index);

  let stateClasses = 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50';

  if (isAnswered) {
    if (index === correctIndex) {
      stateClasses = 'border-green-500 bg-green-50';
    } else if (isSelected && !isCorrect) {
      stateClasses = 'border-red-500 bg-red-50';
    } else {
      stateClasses = 'border-gray-200 opacity-60';
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={`
        w-full text-left p-4 border-2 rounded-xl text-gray-700
        transition-all duration-300 flex items-start gap-3
        ${stateClasses}
        ${!isAnswered ? 'hover:translate-x-2 cursor-pointer' : 'cursor-default'}
      `}
    >
      <span
        className={`
          flex-shrink-0 inline-flex items-center justify-center w-8 h-8
          rounded-lg font-medium
          ${isAnswered && index === correctIndex
            ? 'bg-green-200 text-green-800'
            : isAnswered && isSelected && !isCorrect
              ? 'bg-red-200 text-red-800'
              : 'bg-gray-100 text-gray-600'
          }
        `}
      >
        {letter}
      </span>
      <span className="flex-1 pt-1">{text}</span>
    </button>
  );
}
