import { useQuiz } from './ui/hooks/useQuiz';
import {
  Navbar,
  HeroSection,
  CardCarousel,
  QuizCard,
  ProgressBar,
  ResultsView,
  ControlsBar
} from './ui/components';
import { getAllQuestions } from './data/quizData';

function App() {
  const {
    view,
    quizState,
    currentQuestion,
    currentBlock,
    progress,
    feedback,
    results,
    grade,
    startBlock,
    startAll,
    startReviewWrong,
    answerOption,
    next,
    shuffle,
    restart,
    goToBlockSelection,
    blocks,
    bestScores,
    canReviewWrong
  } = useQuiz();

  const totalQuestions = getAllQuestions().length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Home View: Clean composition with unified gradient */}
      {view === 'hero' && (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          {/* Navbar */}
          <Navbar />

          {/* Hero Intro - Subtitle + Marquees */}
          <HeroSection />

          {/* Carousel Section */}
          <section id="block-carousel" className="scroll-mt-4 px-6">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-white">
                Selecciona un tema para el desafío
              </h2>

              {/* Carousel */}
              <CardCarousel
                blocks={blocks}
                bestScores={bestScores}
                onSelectBlock={startBlock}
                onSelectAll={startAll}
                onReviewWrong={startReviewWrong}
                canReviewWrong={canReviewWrong}
              />

              {/* Global Stats - below carousel */}
              <div className="flex flex-wrap justify-center gap-3 mt-12 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-white">{totalQuestions}</div>
                  <div className="text-xs text-white/70">Preguntas</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-white">{blocks.length}</div>
                  <div className="text-xs text-white/70">Bloques</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-white">∞</div>
                  <div className="text-xs text-white/70">Intentos</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-transparent py-4 px-6 text-center text-white/40 text-xs">
            <p>Desarrollado por alumnos del IES Carlos III con el tiempo libre que nos deja Rubén</p>
          </footer>
        </div>
      )}

      {/* Block Selection View - REMOVED, now part of hero */}

      {/* Quiz View */}
      {view === 'quiz' && quizState && currentQuestion && (
        <section className="min-h-screen py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <ControlsBar
              onShuffle={shuffle}
              onBack={goToBlockSelection}
              onRestart={restart}
              canShuffle={quizState.answers.length === 0}
            />

            <ProgressBar
              progress={progress}
              blockTitle={currentBlock?.title}
              currentIndex={quizState.currentIndex}
              total={quizState.questions.length}
            />

            <QuizCard
              question={currentQuestion}
              questionNumber={quizState.currentIndex + 1}
              feedback={feedback}
              onAnswer={answerOption}
              onNext={next}
              isLast={quizState.currentIndex === quizState.questions.length - 1}
            />
          </div>
        </section>
      )}

      {/* Results View */}
      {view === 'results' && results && grade && (
        <ResultsView
          results={results}
          grade={grade}
          onRetry={restart}
          onSelectBlock={goToBlockSelection}
        />
      )}
    </div>
  );
}

export default App;
