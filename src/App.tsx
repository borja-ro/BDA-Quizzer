import { useQuiz } from './ui/hooks/useQuiz';
import {
  HeroSection,
  BlockSelector,
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
      {/* Hero View */}
      {view === 'hero' && (
        <HeroSection
          onStart={goToBlockSelection}
          totalQuestions={totalQuestions}
          totalBlocks={blocks.length}
        />
      )}

      {/* Block Selection View */}
      {view === 'block-selection' && (
        <BlockSelector
          blocks={blocks}
          bestScores={bestScores}
          onSelectBlock={startBlock}
          onSelectAll={startAll}
          onReviewWrong={startReviewWrong}
          canReviewWrong={canReviewWrong}
        />
      )}

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
