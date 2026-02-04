interface HeroSectionProps {
  onStart: () => void;
  totalQuestions: number;
  totalBlocks: number;
}

// Terms for marquee - split into two lines
const termsLine1 = [
  'Sistemas distribuidos',
  'Computación distribuida',
  'Escalabilidad horizontal',
  'Escalabilidad vertical',
  'Elasticidad',
  'Resiliencia',
  'Tolerancia a fallos',
  'Idempotencia',
  'Consistencia eventual',
  'Teorema CAP',
  'Replicación de datos',
  'Particionado de datos',
  'Balanceo de carga',
  'Concurrencia',
  'Sincronización'
];

const termsLine2 = [
  'Throughput',
  'Latencia',
  'Skew de datos',
  'Hotspots',
  'Backpressure',
  'Checkpointing',
  'Procesamiento batch',
  'Procesamiento streaming',
  'At-least-once',
  'Exactly-once',
  'Logs centralizados',
  'Clickstream',
  'IoT',
  'Kafka',
  'Colas de mensajes'
];

function MarqueePill({ text }: { text: string }) {
  return (
    <span className="inline-block px-3 py-1 mx-2 bg-white/10 border border-white/20 rounded-full text-xs text-white/80 whitespace-nowrap">
      {text}
    </span>
  );
}

export function HeroSection({ onStart, totalQuestions, totalBlocks }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21V7"/>
              <path d="m16 12 2 2 4-4"/>
              <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/>
            </svg>
            <div>
              <span className="text-lg font-bold block leading-tight">BDA-Quizzer</span>
              <span className="text-[10px] text-white/60">Big Data Analytics</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
        <div className="w-full animate-fade-in">
          {/* Hero Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Big Data Quizzer<sup className="text-sm align-super">™</sup>
            </h1>
            <p className="text-sm md:text-base text-white/80">
              Practica Big Data al máximo nivel · Fallos y aciertos explicados
            </p>
          </div>

          {/* Marquees */}
          <div className="mb-8 space-y-3">
            {/* Marquee Line 1 - Left to Right */}
            <div className="relative overflow-hidden py-1">
              <div className="animate-marquee-left flex">
                {/* Duplicate content for seamless loop */}
                {[...termsLine1, ...termsLine1].map((term, i) => (
                  <MarqueePill key={`l1-${i}`} text={term} />
                ))}
              </div>
            </div>

            {/* Marquee Line 2 - Right to Left */}
            <div className="relative overflow-hidden py-1">
              <div className="animate-marquee-right flex">
                {/* Duplicate content for seamless loop */}
                {[...termsLine2, ...termsLine2].map((term, i) => (
                  <MarqueePill key={`l2-${i}`} text={term} />
                ))}
              </div>
            </div>
          </div>

          {/* Global Stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">{totalQuestions}</div>
              <div className="text-xs text-white/70">Preguntas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">{totalBlocks}</div>
              <div className="text-xs text-white/70">Bloques</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-xs text-white/70">Intentos</div>
            </div>
          </div>

          {/* Section title */}
          <h2 className="text-center text-lg md:text-xl font-semibold mb-6 text-white/90">
            Selecciona un cuestionario
          </h2>

          {/* Quiz Cards Grid - Smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {/* RA2 BDA Quiz Card - Main Card */}
            <button
              onClick={onStart}
              className="bg-white rounded-lg p-4 text-left shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              {/* Card Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>

              {/* Card Title */}
              <h3 className="text-base font-bold text-gray-800 mb-1">
                RA2 BDA
              </h3>

              {/* Card Description */}
              <p className="text-gray-500 mb-3 text-[11px] leading-relaxed">
                Casos de uso, computación distribuida, escalabilidad y sistemas distribuidos.
              </p>

              {/* Card Stats */}
              <div className="flex gap-2 mb-3">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-medium px-2 py-0.5 rounded">
                  {totalQuestions} preguntas
                </span>
                <span className="bg-purple-50 text-purple-600 text-[10px] font-medium px-2 py-0.5 rounded">
                  {totalBlocks} bloques
                </span>
              </div>

              {/* Card CTA */}
              <div className="flex items-center text-indigo-600 font-semibold text-xs group-hover:text-purple-600 transition-colors">
                <span>Comenzar</span>
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>

            {/* Placeholder for future quizzes - Disabled style */}
            <div className="bg-white/5 rounded-lg p-4 border border-dashed border-white/15 flex flex-col items-center justify-center text-center opacity-40">
              <svg className="w-6 h-6 text-white/30 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-white/40 text-[10px]">
                Próximamente
              </p>
            </div>
          </div>

          {/* Mode info */}
          <div className="text-center mt-6">
            <p className="text-white/50 text-xs">
              Modo repaso disponible · Explicaciones detalladas · Progreso guardado
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-3 px-6 text-center text-white/40 text-[10px]">
        <p>Desarrollado por alumnos del IES Carlos III con el tiempo libre que nos deja Rubén</p>
      </footer>
    </section>
  );
}
