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

export function HeroSection() {
  return (
    <section className="pt-4 pb-8 bg-transparent text-white overflow-hidden">
      {/* Hero content - Intro only */}
      <div className="flex flex-col items-center justify-center px-6">
        <div className="w-full animate-fade-in">
          {/* Subtitle */}
          <div className="text-center mb-6">
            <p className="text-sm md:text-base text-white/80">
              Practica con cuestionarios interactivos · Fallos y aciertos explicados al detalle
            </p>
          </div>

          {/* Marquees */}
          <div className="mb-8 space-y-3">
            {/* Marquee Line 1 - Left to Right */}
            <div className="relative overflow-hidden py-1 marquee-fade">
              <div className="animate-marquee-left flex">
                {/* Duplicate content for seamless loop */}
                {[...termsLine1, ...termsLine1].map((term, i) => (
                  <MarqueePill key={`l1-${i}`} text={term} />
                ))}
              </div>
            </div>

            {/* Marquee Line 2 - Right to Left */}
            <div className="relative overflow-hidden py-1 marquee-fade">
              <div className="animate-marquee-right flex">
                {/* Duplicate content for seamless loop */}
                {[...termsLine2, ...termsLine2].map((term, i) => (
                  <MarqueePill key={`l2-${i}`} text={term} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
