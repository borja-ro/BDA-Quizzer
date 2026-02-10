import confetti from 'canvas-confetti';

type ConfettiEffect = () => void;

// Basic burst from center
const classicBurst: ConfettiEffect = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Firework effect - shoots up then explodes
const firework: ConfettiEffect = () => {
  const duration = 300;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#6366f1', '#8b5cf6', '#a855f7']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#6366f1', '#8b5cf6', '#a855f7']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

// Stars falling from top
const starShower: ConfettiEffect = () => {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0, x: 0.5 },
    gravity: 0.8,
    shapes: ['star'],
    colors: ['#fbbf24', '#f59e0b', '#d97706']
  });
};

// Side cannons - shoots from both sides
const sideCannons: ConfettiEffect = () => {
  // Left cannon
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 50,
    origin: { x: 0, y: 0.7 },
    colors: ['#10b981', '#34d399', '#6ee7b7']
  });
  // Right cannon
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 50,
    origin: { x: 1, y: 0.7 },
    colors: ['#10b981', '#34d399', '#6ee7b7']
  });
};

// Rainbow explosion
const rainbowExplosion: ConfettiEffect = () => {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']
  });
};

// Confetti rain from top
const confettiRain: ConfettiEffect = () => {
  const duration = 500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      startVelocity: 0,
      origin: { x: Math.random(), y: 0 },
      gravity: 0.5,
      drift: Math.random() - 0.5
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

// Burst with circles
const bubbleBurst: ConfettiEffect = () => {
  confetti({
    particleCount: 60,
    spread: 80,
    origin: { y: 0.6 },
    shapes: ['circle'],
    colors: ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3']
  });
};

// All effects for correct answers
const correctAnswerEffects: ConfettiEffect[] = [
  classicBurst,
  firework,
  starShower,
  sideCannons,
  rainbowExplosion,
  confettiRain,
  bubbleBurst
];

// Pick a random effect for correct answers
export function triggerCorrectAnswerConfetti(): void {
  const randomIndex = Math.floor(Math.random() * correctAnswerEffects.length);
  correctAnswerEffects[randomIndex]();
}

// Grand celebration for high scores (90%+)
export function triggerCelebrationConfetti(): void {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    // Left side
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#6366f1', '#8b5cf6', '#a855f7', '#fbbf24']
    });
    // Right side
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#6366f1', '#8b5cf6', '#a855f7', '#fbbf24']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

// Gold medal rain effect - golden particles falling like medals
export function triggerGoldMedalRain(): void {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    // Gentle golden rain from top
    confetti({
      particleCount: 2,
      startVelocity: 10,
      origin: { x: Math.random(), y: 0 },
      gravity: 0.4,
      drift: Math.random() * 0.4 - 0.2,
      ticks: 300,
      shapes: ['circle'],
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#fcd34d', '#fef3c7']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}
