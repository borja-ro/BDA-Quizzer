import type { ReactNode } from 'react';
import type { Block, BlockColor } from '../../domain/types';

interface BlockSelectorProps {
  blocks: Block[];
  bestScores: Record<string, number>;
  onSelectBlock: (blockId: string) => void;
  onSelectAll: () => void;
  onReviewWrong: () => void;
  canReviewWrong: boolean;
}

const colorConfig: Record<BlockColor, {
  bg: string;
  text: string;
  hover: string;
  icon: string;
}> = {
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-600',
    hover: 'hover:border-indigo-500',
    icon: 'text-indigo-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    hover: 'hover:border-purple-500',
    icon: 'text-purple-600'
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
    hover: 'hover:border-pink-500',
    icon: 'text-pink-600'
  },
  emerald: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
    hover: 'hover:border-emerald-500',
    icon: 'text-emerald-600'
  }
};

const blockIcons: Record<string, ReactNode> = {
  'casos-uso': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  ),
  'computacion-distribuida': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  ),
  'escalabilidad': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  ),
  'sistemas-distribuidos': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  )
};

export function BlockSelector({
  blocks,
  bestScores,
  onSelectBlock,
  onSelectAll,
  onReviewWrong,
  canReviewWrong
}: BlockSelectorProps) {
  return (
    <section className="min-h-screen py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center animate-fade-in">
          Selecciona un bloque
        </h2>
        <p className="text-gray-500 text-center mb-12 animate-fade-in">
          Elige el tema que quieres practicar
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map(block => {
            const colors = colorConfig[block.color];
            const bestScore = bestScores[block.id];

            return (
              <button
                key={block.id}
                onClick={() => onSelectBlock(block.id)}
                className={`
                  bg-white rounded-2xl p-8 shadow-lg cursor-pointer
                  border-2 border-transparent ${colors.hover}
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                  text-left
                `}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <svg className={`w-7 h-7 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {blockIcons[block.id]}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{block.title}</h3>
                <p className="text-gray-500 text-sm">{block.questions.length} preguntas</p>

                {bestScore !== undefined && (
                  <div className="mt-3 text-sm">
                    <span className="text-gray-400">Mejor puntuación: </span>
                    <span className={`font-semibold ${bestScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {bestScore}%
                    </span>
                  </div>
                )}

                <div className={`mt-4 ${colors.text} font-medium`}>
                  {block.questions.length} preguntas →
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={onSelectAll}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Hacer todos los bloques (40 preguntas)
          </button>

          {canReviewWrong && (
            <button
              onClick={onReviewWrong}
              className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all"
            >
              Repasar falladas
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
