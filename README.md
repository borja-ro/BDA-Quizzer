# BDA-Quizzer

Aplicación web interactiva de cuestionarios para ***Big Data Aplicado***

***BDA-Quizzer*** es una aplicación creada para quienes desean aprender y autoevaluarse en temas de Big Data de manera sencilla y efectiva. Su objetivo es ofrecer una experiencia interactiva que facilite la comprensión y el repaso de conceptos clave, ideal tanto para estudiantes como para profesionales que quieren reforzar sus conocimientos.

## Arquitectura

El proyecto sigue una arquitectura modular con separación clara entre capas:

```
src/
├── data/           # Datos estáticos del cuestionario
│   └── quizData.ts       # Preguntas organizadas por bloques
│
├── domain/         # Lógica de negocio (funciones puras, sin efectos secundarios)
│   ├── types.ts          # Definiciones de tipos TypeScript
│   ├── quizEngine.ts     # Motor del quiz (sesiones, respuestas, resultados)
│   ├── scoring.ts        # Sistema de puntuación y calificaciones
│   └── shuffle.ts        # Algoritmo Fisher-Yates para barajar
│
├── storage/        # Capa de persistencia
│   └── progressStorage.ts # LocalStorage con versionado de esquema
│
├── ui/             # Capa de presentación (React)
│   ├── components/       # Componentes reutilizables
│   │   ├── HeroSection.tsx     # Pantalla de bienvenida
│   │   ├── BlockSelector.tsx   # Selector de bloques temáticos
│   │   ├── QuizCard.tsx        # Tarjeta de pregunta
│   │   ├── OptionButton.tsx    # Botón de opción de respuesta
│   │   ├── ProgressBar.tsx     # Barra de progreso
│   │   ├── ControlsBar.tsx     # Controles (volver, barajar, reiniciar)
│   │   └── ResultsView.tsx     # Vista de resultados finales
│   │
│   ├── hooks/
│   │   └── useQuiz.ts          # Hook principal que conecta todo
│   │
│   └── utils/
│       └── confettiEffects.ts  # Efectos de celebración
│
├── App.tsx         # Componente raíz
└── main.tsx        # Punto de entrada
```

## Componentes principales

### Domain Layer (Lógica pura)

- **quizEngine.ts**: Maneja el estado del quiz sin efectos secundarios. Funciones para crear sesiones, registrar respuestas y calcular resultados.
- **scoring.ts**: Calcula calificaciones según el porcentaje de aciertos.
- **shuffle.ts**: Implementación del algoritmo Fisher-Yates para aleatorizar preguntas y opciones.

### UI Layer (Presentación)

- **useQuiz**: Hook central que conecta la lógica del dominio con los componentes React. Gestiona el estado de la aplicación y expone acciones.
- **Componentes**: Cada componente es responsable únicamente de su presentación, recibiendo datos y callbacks como props.

### Storage Layer (Persistencia)

- **progressStorage.ts**: Almacena el progreso del usuario en localStorage con versionado de esquema para migraciones futuras.

## Patrones clave

- **Capa de dominio pura**: Las funciones en `domain/` no tienen efectos secundarios y son fácilmente testeables
- **UI recibe datos via props**: Los componentes son presentacionales, reciben datos y callbacks
- **Hook de estado único**: `useQuiz.ts` conecta la lógica de dominio con React y gestiona todo el estado de la aplicación
- **localStorage con versionado**: `progressStorage.ts` maneja migraciones de esquema

## Sistema de tipos

Tipos principales definidos en `src/domain/types.ts`:

- `Question`, `Block`, `Answer` - Estructuras de datos principales
- `QuizMode` - Tipo unión: single-block | all-blocks | review-wrong
- `QuizState`, `QuizResults` - Estado de sesión y resultados
- `ViewState` - Navegación UI: hero | block-selection | quiz | results

## Tecnologías

- **React 19** + **TypeScript** (modo estricto)
- **Vite** (bundler con HMR)
- **Tailwind CSS v4** via plugin `@tailwindcss/vite`
- **canvas-confetti** (efectos visuales)
- **ESLint** con plugins react-hooks y react-refresh

## Estilos

- Colores de bloques: indigo, purple, pink, emerald (tipo `BlockColor`)
- Estilos personalizados en `src/index.css`

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo (Vite con HMR)
npm run build      # Comprobación TypeScript + build de producción
npm run lint       # Ejecutar ESLint
npm run preview    # Preview del build de producción
```

## Despliegue en GitHub Pages

El proyecto está configurado para desplegarse en:
`https://borja-ro.github.io/BDA-Quizzer/`

La configuración de Vite incluye `base: '/BDA-Quizzer/'` para que las rutas funcionen correctamente.

## Bloques temáticos

El cuestionario **RA2 BDA** incluye 40 preguntas organizadas en 4 bloques:

1. **Casos de uso de Big Data** - Aplicaciones prácticas
2. **Computación distribuida** - Fundamentos de procesamiento distribuido
3. **Escalabilidad** - Escalado horizontal y vertical
4. **Sistemas distribuidos** - Arquitecturas y conceptos

## Funcionalidades

- Selección de bloques individuales o todos los bloques
- Barajado aleatorio de preguntas y opciones
- Retroalimentación inmediata con explicaciones
- Sistema de medallas según puntuación (oro, plata, bronce)
- Efectos visuales de celebración (confetti, lluvia de medallas)
- Persistencia de mejores puntuaciones
- Modo de repaso de preguntas falladas

## Estilo de código

- TypeScript en modo estricto
- ESLint con plugins react-hooks y react-refresh
- Preferir funciones puras en la capa de dominio
- Mantener los componentes enfocados en presentación


Creado con licencia MIT por Borja Ramos con la ayuda de sus compañeros de IES Carlos III
