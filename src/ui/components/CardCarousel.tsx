import React, { useState, type ReactNode } from 'react';
import type { Block, BlockColor } from '../../domain/types';

interface CardCarouselProps {
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
    ),
    'placeholder': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    )
};

export function CardCarousel({
    blocks,
    bestScores,
    onSelectBlock,
    onSelectAll,
    onReviewWrong,
    canReviewWrong
}: CardCarouselProps) {
    // Create 3 placeholder cards for "Próximamente"
    const placeholderCards = Array(3).fill(null).map((_, i) => ({
        id: `placeholder-${i}`,
        title: 'Próximamente',
        color: 'indigo' as BlockColor,
        questions: [],
        isPlaceholder: true
    }));

    // Combine real blocks with placeholders
    const allCards = [...blocks, ...placeholderCards];

    const [activeIndex, setActiveIndex] = useState(1);

    const handleNext = () => {
        setActiveIndex(prev => (prev + 1 < allCards.length ? prev + 1 : prev));
    };

    const handlePrev = () => {
        setActiveIndex(prev => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    const getCardStyle = (index: number): React.CSSProperties => {
        const diff = index - activeIndex;
        const absDiff = Math.abs(diff);

        if (diff === 0) {
            // Active card - highest z-index
            return {
                transform: 'none',
                zIndex: 20,
                filter: 'none',
                opacity: 1,
            };
        } else if (diff > 0) {
            // Cards to the right - visible with halo effect
            return {
                transform: `translateX(${120 * diff}px) scale(${1 - 0.15 * absDiff}) perspective(16px) rotateY(-1deg)`,
                zIndex: 20 - absDiff,
                filter: `blur(${2 * absDiff}px)`,
                opacity: absDiff > 2 ? 0 : 0.6,
            };
        } else {
            // Cards to the left - visible with halo effect
            return {
                transform: `translateX(${-120 * absDiff}px) scale(${1 - 0.15 * absDiff}) perspective(16px) rotateY(1deg)`,
                zIndex: 20 - absDiff,
                filter: `blur(${2 * absDiff}px)`,
                opacity: absDiff > 2 ? 0 : 0.6,
            };
        }
    };

    return (
        <>
            <div className="relative h-[450px] overflow-visible mb-8">
                {allCards.map((card, index) => {
                    const isPlaceholder = Boolean('isPlaceholder' in card && card.isPlaceholder);
                    const block = card as Block;
                    const colors = colorConfig[block.color];
                    const bestScore = !isPlaceholder ? bestScores[block.id] : undefined;
                    const isActive = index === activeIndex;

                    return (
                        <div
                            key={card.id}
                            className="absolute left-1/2 -translate-x-1/2 top-0 transition-all duration-500 ease-out"
                            style={getCardStyle(index)}
                        >
                            <button
                                onClick={() => isActive && !isPlaceholder && onSelectBlock(block.id)}
                                disabled={!isActive || (isPlaceholder as boolean)}
                                className={`
                                bg-white rounded-2xl p-8 shadow-2xl
                                w-[320px] h-[380px]
                                border-2 ${isPlaceholder ? 'border-dashed border-gray-300' : 'border-transparent'}
                                ${isActive && !isPlaceholder ? `${colors.hover} cursor-pointer hover:-translate-y-2 hover:shadow-3xl` : 'cursor-default'}
                                ${isPlaceholder ? 'opacity-50' : ''}
                                transition-all duration-300
                                text-left
                                flex flex-col
                            `}
                            >
                                <div className={`w-16 h-16 ${isPlaceholder ? 'bg-gray-100' : colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                                    <svg className={`w-8 h-8 ${isPlaceholder ? 'text-gray-400' : colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {(isPlaceholder ? blockIcons['placeholder'] : blockIcons[block.id]) as ReactNode}
                                    </svg>
                                </div>

                                <h3 className={`text-2xl font-bold mb-3 ${isPlaceholder ? 'text-gray-400' : 'text-gray-800'}`}>
                                    {block.title}
                                </h3>

                                {!isPlaceholder && (
                                    <React.Fragment>
                                        <p className="text-gray-500 text-sm mb-4">{block.questions.length} preguntas</p>

                                        {bestScore !== undefined && (
                                            <div className="mb-4">
                                                <span className="text-gray-400 text-sm">Mejor puntuación: </span>
                                                <span className={`font-semibold text-lg ${bestScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                                                    {bestScore}%
                                                </span>
                                            </div>
                                        )}

                                        <div className="mt-auto">
                                            <div className={`${colors.text} font-semibold text-lg flex items-center gap-2`}>
                                                {isActive ? 'Click para comenzar' : `${block.questions.length} preguntas`}
                                                {isActive && <span>→</span>}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                {isPlaceholder && (
                                    <p className="text-gray-400 text-sm mt-auto">
                                        Nuevos bloques disponibles pronto
                                    </p>
                                )}
                            </button>
                        </div>
                    );
                })}

                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 text-white text-5xl font-bold opacity-50 hover:opacity-100 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                    aria-label="Anterior"
                >
                    ‹
                </button>

                <button
                    onClick={handleNext}
                    disabled={activeIndex === allCards.length - 1}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 text-white text-5xl font-bold opacity-50 hover:opacity-100 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                    aria-label="Siguiente"
                >
                    ›
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <button
                    onClick={onSelectAll}
                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
                >
                    Hacer todos los bloques ({blocks.reduce((sum, b) => sum + b.questions.length, 0)} preguntas)
                </button>

                {canReviewWrong && (
                    <button
                        onClick={onReviewWrong}
                        className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Repasar falladas
                    </button>
                )}
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {allCards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                            ? 'w-8 bg-white'
                            : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Ir a tarjeta ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
}

