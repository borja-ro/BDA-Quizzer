interface ProgressBarProps {
  progress: number;
  blockTitle?: string;
  currentIndex: number;
  total: number;
}

export function ProgressBar({ progress, blockTitle, currentIndex, total }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span className="font-medium text-gray-700">{blockTitle}</span>
        <span>Pregunta {currentIndex + 1} de {total}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
