interface ControlsBarProps {
  onShuffle: () => void;
  onBack: () => void;
  onRestart: () => void;
  canShuffle: boolean;
}

export function ControlsBar({ onShuffle, onBack, onRestart, canShuffle }: ControlsBarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onBack}
        className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </button>

      <div className="flex items-center gap-4">
        {canShuffle && (
          <button
            onClick={onShuffle}
            className="bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Barajar preguntas
          </button>
        )}

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reiniciar test
        </button>
      </div>
    </div>
  );
}
