import type { Block } from '../domain/types';

/**
 * Quiz data for RA2 BDA (Big Data Analytics)
 * This file contains ONLY data - no logic, no functions
 */
export const quizBlocks: Block[] = [
  {
    id: 'casos-uso',
    title: 'Casos de uso de Big Data',
    color: 'indigo',
    questions: [
      {
        id: 'cu-1',
        question: 'Según el inicio del capítulo 4, ¿qué se busca al presentar casos de uso de Big Data?',
        options: [
          'Mostrar únicamente diagramas ideales sin entrar en problemas reales',
          'Presentar una lista cerrada de herramientas que hay que instalar obligatoriamente',
          'Conectar conceptos abstractos con escenarios concretos como logs, clickstream o IoT',
          'Demostrar que Big Data resuelve cualquier problema sin diseño ni planificación'
        ],
        correctIndex: 2,
        explanation: 'El objetivo de los casos de uso es aterrizar conceptos teóricos en problemas reales y reconocibles. Logs, eventos de usuario o sensores IoT permiten entender por qué surgen las arquitecturas Big Data y qué necesidades prácticas resuelven en sistemas reales.'
      },
      {
        id: 'cu-2',
        question: '¿Qué problema práctico empuja a pasar de logs locales a un sistema de logging centralizado?',
        options: [
          'No poder generar gráficos de colores en los paneles de monitorización',
          'Pérdida automática de los logs tras reiniciar cualquier proceso o máquina',
          'No saber en qué máquina mirar cuando una incidencia afecta a múltiples servicios',
          'Evitar configurar permisos de lectura del sistema de archivos local'
        ],
        correctIndex: 2,
        explanation: 'En sistemas distribuidos, los errores se reparten entre múltiples servicios y máquinas. El logging centralizado permite correlacionar eventos, investigar incidencias de forma global y evitar depender de acceder manualmente a cada servidor afectado.'
      },
      {
        id: 'cu-3',
        question: 'En una arquitectura de logs con agentes, Kafka y ElasticSearch, ¿qué papel típico juega Kafka?',
        options: [
          'Actuar como cola distribuida que recibe, amortigua y reparte los eventos de log',
          'Servir directamente los dashboards finales de Kibana al usuario de negocio',
          'Indexar y buscar cadenas de texto dentro de cada mensaje de log recibido',
          'Agregar métricas numéricas calculando promedio y percentiles sobre los logs'
        ],
        correctIndex: 0,
        explanation: 'Kafka desacopla productores y consumidores de logs, absorbe picos de carga y garantiza un flujo ordenado y tolerante a fallos. No indexa ni visualiza, sino que actúa como buffer y sistema de distribución de eventos.'
      },
      {
        id: 'cu-4',
        question: '¿Por qué muchas organizaciones pasan de solo usar Google Analytics a capturar eventos propios de clickstream?',
        options: [
          'Para dejar de depender de cualquier servicio de analítica y eliminar el tracking público',
          'Para responder preguntas avanzadas sobre recorridos, experimentos A/B y modelos de recomendación',
          'Porque Google Analytics no funciona con eventos del navegador en móviles nativos',
          'Para reducir drásticamente el coste mensual de licencias sin perder funcionalidad'
        ],
        correctIndex: 1,
        explanation: 'Los eventos propios permiten un control total del dato y responder preguntas complejas sobre comportamiento de usuario, personalización y experimentación. Google Analytics resulta limitado cuando se necesitan análisis avanzados o integración con modelos propios.'
      },
      {
        id: 'cu-5',
        question: '¿Qué característica clave tienen los datos de sensores en un escenario IoT según el texto?',
        options: [
          'Provienen siempre de uno o dos dispositivos muy potentes ubicados en un único centro',
          'Cada dispositivo envía poca información, pero el conjunto genera un flujo continuo relevante',
          'Son siempre estructurados, con esquema fijo y validados antes de enviarse a la nube',
          'Requieren siempre sincronización centralizada en origen antes de comenzar a procesar'
        ],
        correctIndex: 1,
        explanation: 'Los sistemas IoT se caracterizan por miles o millones de dispositivos enviando pequeños mensajes. Aunque cada evento individual es pequeño, el volumen agregado genera flujos continuos que requieren arquitecturas escalables y eficientes.'
      },
      {
        id: 'cu-6',
        question: '¿Qué describe mejor la relación entre batch y streaming en un caso como detección de fraude?',
        options: [
          'Batch decide en tiempo real y streaming recalcula lentamente los históricos cada noche',
          'Streaming aporta decisiones rápidas y batch aporta análisis profundos sobre el histórico completo',
          'Streaming entrena el modelo y batch solo carga los datos nuevos en la base',
          'Ambos duplican el mismo cálculo para garantizar coherencia por comparación diaria'
        ],
        correctIndex: 1,
        explanation: 'El streaming permite reaccionar en tiempo casi real ante eventos sospechosos, mientras que el procesamiento batch analiza grandes históricos para detectar patrones, ajustar modelos y obtener conclusiones más profundas a largo plazo.'
      },
      {
        id: 'cu-7',
        question: '¿Por qué los "small files" son un problema frecuente en arquitecturas de logs y eventos?',
        options: [
          'Porque el sistema dedica mucho tiempo a abrir y cerrar miles de archivos minúsculos en lugar de procesar datos',
          'Porque los ficheros pequeños no permiten aplicar compresión efectiva en ningún formato conocido',
          'Porque HDFS y S3 cobran por fichero, haciendo que muchos archivos pequeños sean muy caros',
          'Porque impiden la ejecución paralela al forzar que todo se lea secuencialmente desde disco'
        ],
        correctIndex: 0,
        explanation: 'El exceso de ficheros pequeños genera sobrecarga en metadatos y operaciones de E/S. Esto reduce el rendimiento global del sistema y desaprovecha recursos que deberían destinarse al procesamiento efectivo de datos.'
      },
      {
        id: 'cu-8',
        question: '¿Qué efecto producen los hotspots y el skew en sistemas distribuidos de datos o cómputo?',
        options: [
          'Reparten de forma perfecta la carga para aprovechar al máximo todos los nodos sin desequilibrio',
          'Hacen que algunas particiones o tareas se saturen mientras otras quedan casi ociosas',
          'Duplican el consumo de memoria en todos los nodos por igual hasta agotar el clúster',
          'Optimizan el tiempo total al concentrar cómputo donde hay más datos acumulados'
        ],
        correctIndex: 1,
        explanation: 'El skew provoca un reparto desigual de datos o trabajo, haciendo que algunos nodos se conviertan en cuellos de botella. Esto reduce el paralelismo efectivo y empeora el rendimiento total del sistema distribuido.'
      },
      {
        id: 'cu-9',
        question: '¿Cómo ajustan muchas empresas maduras el almacenamiento de logs para equilibrar coste y capacidad de análisis?',
        options: [
          'Guardan únicamente métricas agregadas y descartan todos los eventos individuales desde el inicio',
          'Mantienen todo en alta disponibilidad con réplicas síncronas durante años sin compresión',
          'Combinan logs crudos baratos a largo plazo con una ventana corta indexada y métricas agregadas',
          'Borran los logs al cabo de 24 horas para cumplir con normativas de privacidad estrictas'
        ],
        correctIndex: 2,
        explanation: 'Este enfoque permite conservar datos históricos a bajo coste sin perder capacidad analítica reciente. La indexación se limita a ventanas útiles, mientras que los datos antiguos se mantienen comprimidos para auditoría o análisis puntual.'
      },
      {
        id: 'cu-10',
        question: 'Según el cierre del capítulo, ¿qué enfoque se propone al elegir tecnologías para un sistema Big Data?',
        options: [
          'Optar siempre por la herramienta más nueva para evitar problemas de compatibilidad futura',
          'Elegir únicamente tecnologías open source sin considerar las capacidades del equipo técnico',
          'Partir del problema, los datos, los plazos, el presupuesto y la tolerancia al fallo',
          'Seguir la arquitectura de referencia de alguna empresa grande sin adaptar nada al contexto'
        ],
        correctIndex: 2,
        explanation: 'No existe una arquitectura universal válida. La elección tecnológica debe adaptarse al contexto real del problema, considerando restricciones técnicas, económicas y operativas en lugar de seguir modas o arquitecturas de referencia.'
      }
    ]
  },
  {
    id: 'computacion-distribuida',
    title: 'Computación distribuida y resiliencia',
    color: 'purple',
    questions: [
      {
        id: 'cd-1',
        question: '¿Qué problema principal resuelven los motores de computación distribuida frente al "script nocturno" único?',
        options: [
          'Ejecutar el mismo script varias veces en la misma máquina sin cambios generales',
          'Trocear el trabajo y ejecutarlo en paralelo sobre datos repartidos en el clúster',
          'Evitar configurar cron porque el motor lo programa automáticamente cada noche',
          'Deshabilitar la compresión para que los ficheros se lean con mayor velocidad garantizada'
        ],
        correctIndex: 1,
        explanation: 'Los motores distribuidos permiten dividir grandes volúmenes de datos y procesarlos en paralelo. Esto reduce tiempos de ejecución y permite escalar el procesamiento más allá de las limitaciones de una sola máquina.'
      },
      {
        id: 'cd-2',
        question: '¿Qué caracteriza al procesamiento batch frente a otras formas de computación distribuida?',
        options: [
          'Procesar eventos individualmente según llegan, manteniendo jobs activos de forma continua',
          'Acumular datos durante un periodo y lanzar jobs que recorren grandes lotes',
          'Leer datos directamente desde memoria principal sin pasar por el sistema de archivos',
          'Usar únicamente bases relacionales sincronizadas para evitar redundancia del almacenamiento'
        ],
        correctIndex: 1,
        explanation: 'El batch se basa en procesar grandes volúmenes de datos acumulados en intervalos definidos. No responde evento a evento, sino que prioriza análisis completos, consistentes y eficientes sobre grandes datasets.'
      },
      {
        id: 'cd-3',
        question: 'En el modelo de streaming descrito en el capítulo, ¿cómo se entiende el procesamiento de datos?',
        options: [
          'Como servicios que consumen flujos de eventos continuos y producen resultados casi en tiempo real',
          'Como jobs programados cada minuto para ejecutar lotes sobre datos que llegan de golpe',
          'Como procesos que solo operan durante horario comercial y se detienen por la noche',
          'Como consultas SQL lanzadas manualmente sobre tablas históricas cuando alguien lo pide'
        ],
        correctIndex: 0,
        explanation: 'El streaming trata los datos como flujos infinitos de eventos. Los sistemas están siempre activos, procesando información conforme llega y generando resultados con baja latencia.'
      },
      {
        id: 'cd-4',
        question: '¿Qué provoca una operación tipo groupByKey o reduceByKey en motores como Spark o Flink?',
        options: [
          'Garantiza que cada tarea lea solo datos locales sin usar la red del clúster en producción',
          'Evita toda coordinación porque distribuye las claves de forma aleatoria sin reagrupar nada',
          'Hace que todos los datos con la misma clave se reorganicen hacia la misma tarea',
          'Obliga a que todos los executors ejecuten la misma función sin particiones intermedias'
        ],
        correctIndex: 2,
        explanation: 'Estas operaciones requieren un shuffle, redistribuyendo los datos por clave entre nodos. Esto implica uso de red y sincronización, siendo una de las operaciones más costosas en sistemas distribuidos.'
      },
      {
        id: 'cd-5',
        question: 'Ante un fallo parcial donde solo muere un executor, ¿cómo actúa típicamente Spark según el capítulo?',
        options: [
          'Reejecuta únicamente las tareas falladas en otro executor manteniendo el resto del job en marcha',
          'Cancela todo el job y vuelve a ejecutarlo desde el inicio completo sin reaprovechar nada',
          'Continúa ignorando las tareas perdidas porque Spark garantiza siempre que todo sigue sin fallos',
          'Guarda en memoria RAM del driver el estado completo y lo redistribuye globalmente'
        ],
        correctIndex: 0,
        explanation: 'Spark está diseñado para tolerar fallos parciales. Al perder un executor, solo se relanzan las tareas afectadas, evitando reiniciar todo el job y mejorando la eficiencia y resiliencia.'
      },
      {
        id: 'cd-6',
        question: '¿Qué combinación permite a un job de Flink reanudarse tras un fallo sin empezar desde cero?',
        options: [
          'Usar solo memoria local en cada operador para guardar el estado reciente de los cálculos',
          'Checkpoints consistentes del estado más offsets de lectura almacenados de las fuentes como Kafka',
          'Duplicar cada mensaje en dos topics distintos y comparar resultados al final del día',
          'Confiar en que las fuentes reenvían automáticamente todo sin necesidad de guardar offsets'
        ],
        correctIndex: 1,
        explanation: 'Los checkpoints guardan el estado del job y la posición de lectura. Tras un fallo, Flink puede restaurar el estado y continuar desde el último punto consistente sin reprocesar todo.'
      },
      {
        id: 'cd-7',
        question: '¿Qué busca evitar el uso de backoff en los reintentos de operaciones fallidas?',
        options: [
          'Que los logs registren muchos errores repetidos y difíciles de filtrar luego manualmente siempre también',
          'Que los reintentos no saturen aún más un sistema ya debilitado por el primer fallo',
          'Que el framework tenga que medir tiempos de espera variables complicando el código',
          'Que nunca se reintente ninguna operación fallida asumiendo que es definitivamente incorrecta'
        ],
        correctIndex: 1,
        explanation: 'El backoff introduce pausas progresivas entre reintentos para evitar tormentas de peticiones. Esto protege al sistema de sobrecargas adicionales cuando ya está en una situación inestable.'
      },
      {
        id: 'cd-8',
        question: '¿Qué describe mejor una operación idempotente en el contexto de sistemas de datos resilientes?',
        options: [
          'Una operación que nunca se ejecuta dos veces porque el sistema prohíbe cualquier reintento posible',
          'Una operación cuyo resultado final es el mismo aunque se ejecute varias veces seguidas',
          'Una operación que siempre falla con el mismo error garantizando consistencia de mensajes',
          'Una operación que suma valores cada vez que se aplica, acumulando un total progresivo'
        ],
        correctIndex: 1,
        explanation: 'La idempotencia es clave en sistemas con reintentos. Permite repetir operaciones sin efectos secundarios indeseados, garantizando consistencia incluso ante duplicados o fallos parciales.'
      },
      {
        id: 'cd-9',
        question: 'Cuando un sistema ofrece garantías at-least-once sobre el procesamiento de mensajes, ¿qué está prometiendo?',
        options: [
          'Que cada mensaje se procesará cero o una vez, pero nunca se duplicará en ningún escenario',
          'Que cada mensaje se procesará al menos una vez, pudiendo repetirse en ciertos fallos',
          'Que se descartarán automáticamente todos los mensajes repetidos antes de procesarlos',
          'Que exactamente un nodo procesa cada mensaje sin reparticiones ni reintentos adicionales'
        ],
        correctIndex: 1,
        explanation: 'At-least-once prioriza no perder mensajes, aceptando posibles duplicados. Es una garantía común en sistemas distribuidos donde la fiabilidad es más importante que evitar reprocesamientos.'
      },
      {
        id: 'cd-10',
        question: '¿Qué idea resume mejor la resiliencia según el capítulo de computación distribuida y resiliencia?',
        options: [
          'Es una propiedad exclusiva del framework de cómputo y no del resto de componentes externos',
          'Es una propiedad del conjunto donde diseño, motores, colas, bases y métricas colaboran',
          'Depende únicamente de contratar más nodos para tolerar la pérdida de cualquier servidor',
          'Se logra automáticamente sin diseño si usas herramientas modernas del ecosistema Big Data'
        ],
        correctIndex: 1,
        explanation: 'La resiliencia no depende solo del motor de cómputo. Es el resultado de un diseño global que integra colas, almacenamiento, monitorización y buenas decisiones arquitectónicas.'
      }
    ]
  },
  {
    id: 'escalabilidad',
    title: 'Escalabilidad y elasticidad',
    color: 'pink',
    questions: [
      {
        id: 'ee-1',
        question: 'Según el capítulo, ¿qué relación distingue mejor escalabilidad de elasticidad?',
        options: [
          'La escalabilidad mide únicamente latencias y la elasticidad solo throughput agregado',
          'La escalabilidad describe cómo crece el sistema y la elasticidad cómo se adapta a la carga',
          'La escalabilidad se refiere solo a hardware y elasticidad solo a software de aplicación',
          'La escalabilidad aplica únicamente al batch mientras la elasticidad es solo para streaming'
        ],
        correctIndex: 1,
        explanation: 'La escalabilidad indica la capacidad de crecer sin degradarse. La elasticidad describe la capacidad de ajustar recursos dinámicamente según la demanda, aumentando o reduciendo capacidad automáticamente.'
      },
      {
        id: 'ee-2',
        question: '¿Qué describe mejor el escalado vertical según el texto?',
        options: [
          'Duplicar el número de réplicas de lectura en un clúster de bases de datos',
          'Mover datos entre particiones para mejorar el balance de carga distribuido',
          'Aumentar CPU, RAM y disco de una misma máquina haciéndola más grande',
          'Reescribir código de forma más eficiente para reducir el consumo de recursos'
        ],
        correctIndex: 2,
        explanation: 'El escalado vertical consiste en reforzar una única máquina. Aunque es sencillo, tiene límites físicos y de coste, y no elimina los puntos únicos de fallo.'
      },
      {
        id: 'ee-3',
        question: '¿Cuál de estas afirmaciones refleja mejor el escalado horizontal en sistemas distribuidos?',
        options: [
          'Usar varias máquinas similares coordinadas en lugar de un único servidor gigante',
          'Aumentar el ancho de banda de red entre el servidor central y los clientes finales',
          'Sustituir discos mecánicos por SSD para multiplicar las IOPS de entrada y salida',
          'Comprimir todos los datos almacenados para liberar espacio en un solo nodo grande'
        ],
        correctIndex: 0,
        explanation: 'El escalado horizontal reparte carga entre múltiples nodos. Permite crecer de forma más flexible, mejorar tolerancia a fallos y aprovechar mejor arquitecturas distribuidas.'
      },
      {
        id: 'ee-4',
        question: '¿Qué idea capta mejor la elasticidad tal como se explica en el capítulo?',
        options: [
          'Configurar manualmente un número fijo alto de nodos y no cambiarlo nunca',
          'Crear siempre un clúster nuevo para cada job y destruirlo inmediatamente al terminar',
          'Aumentar y reducir recursos automáticamente según métricas como CPU o tamaño de colas',
          'Mantener todos los nodos encendidos siempre al máximo para evitar latencias de arranque'
        ],
        correctIndex: 2,
        explanation: 'La elasticidad permite adaptar dinámicamente los recursos según la carga real. Esto optimiza costes y rendimiento, evitando tanto la infrautilización como la saturación del sistema.'
      },
      {
        id: 'ee-5',
        question: '¿Cuál es el papel principal de las colas en un sistema elástico según el texto?',
        options: [
          'Eliminar la necesidad de escalar consumidores porque la cola procesa mensajes por sí misma',
          'Amortiguar picos permitiendo que productores y consumidores trabajen a ritmos diferentes',
          'Garantizar que siempre haya un único consumidor activo para evitar competencia por mensajes',
          'Reducir automáticamente el número de mensajes descartando los más antiguos del buffer'
        ],
        correctIndex: 1,
        explanation: 'Las colas desacoplan productores y consumidores, absorben picos de carga y facilitan el escalado independiente. Son un elemento clave para mantener estabilidad en sistemas elásticos.'
      },
      {
        id: 'ee-6',
        question: 'Además del coste económico, ¿qué otro coste importante introduce la escalabilidad horizontal?',
        options: [
          'Añadir más discos locales siempre reduce la complejidad de la arquitectura de datos',
          'Aumenta la complejidad y la coordinación entre nodos, particiones y reequilibrios',
          'Elimina la necesidad de monitorizar porque cada nodo se gestiona de forma independiente',
          'Reduce el tiempo necesario para entrenar al equipo en operaciones y mantenimiento del sistema'
        ],
        correctIndex: 1,
        explanation: 'Escalar horizontalmente implica gestionar particiones, sincronización y balanceo. Esto incrementa la complejidad operativa y requiere mayor esfuerzo en diseño, monitorización y mantenimiento.'
      },
      {
        id: 'ee-7',
        question: '¿Qué se entiende por throughput en el contexto de escalabilidad del capítulo?',
        options: [
          'La cantidad de trabajo que el sistema realiza por unidad de tiempo',
          'El porcentaje de CPU libre que queda disponible en cada nodo del clúster',
          'El tiempo medio que tarda una petición individual desde que entra hasta que sale',
          'El número de particiones configuradas en el sistema de mensajería de la plataforma'
        ],
        correctIndex: 0,
        explanation: 'El throughput mide la capacidad global del sistema para procesar trabajo. Es un indicador clave para evaluar si el sistema escala correctamente al aumentar carga o recursos.'
      },
      {
        id: 'ee-8',
        question: '¿Cómo se define la latencia según el capítulo sobre escalabilidad?',
        options: [
          'La cantidad total de datos almacenados en todos los nodos del sistema distribuido',
          'El tiempo que transcurre desde que una petición entra hasta que se produce la respuesta',
          'El número de mensajes procesados por segundo sumando todos los consumidores activos',
          'El intervalo de tiempo entre dos ejecuciones consecutivas de un job batch programado'
        ],
        correctIndex: 1,
        explanation: 'La latencia mide el tiempo de respuesta individual. A diferencia del throughput, se centra en la experiencia de cada petición y es crítica en sistemas interactivos o en tiempo real.'
      },
      {
        id: 'ee-9',
        question: '¿Qué indica una utilización de CPU muy baja y estable en todos los nodos mientras se quejan de falta de recursos?',
        options: [
          'Que el sistema está correctamente dimensionado y no necesita ajustes de capacidad alguna',
          'Que probablemente la configuración de colas, límites o particiones está impidiendo usar bien la capacidad',
          'Que la red está saturada y por eso los nodos no reciben suficiente carga para procesar',
          'Que los jobs están optimizados al máximo y todo el procesamiento ocurre en memoria caché'
        ],
        correctIndex: 1,
        explanation: 'Una baja utilización indica cuellos de botella lógicos. El problema no suele ser falta de hardware, sino configuraciones que impiden aprovechar los recursos disponibles.'
      },
      {
        id: 'ee-10',
        question: 'Según los patrones prácticos descritos, ¿por qué muchas organizaciones crean más particiones de Kafka de las que necesitan al principio?',
        options: [
          'Aumentar la latencia de lectura para que los consumidores procesen más despacio de forma controlada',
          'Facilitar que el sistema pueda escalar consumidores en el futuro sin rediseñar el topic',
          'Forzar que cada productor escriba en todas las particiones de forma obligatoria y balanceada',
          'Reducir el espacio total en disco necesario al fragmentar los mensajes entre más directorios'
        ],
        correctIndex: 1,
        explanation: 'Kafka no permite aumentar particiones sin impacto. Crear más desde el inicio ofrece flexibilidad futura para escalar consumidores sin rediseñar la arquitectura.'
      }
    ]
  },
  {
    id: 'sistemas-distribuidos',
    title: 'Sistemas distribuidos',
    color: 'emerald',
    questions: [
      {
        id: 'sd-1',
        question: '¿Qué describe mejor un sistema distribuido según el capítulo?',
        options: [
          'Un servidor único muy potente y centralizado',
          'Conjunto de máquinas cooperando por red coherente',
          'Varios programas independientes sin comunicación entre ellos',
          'Grupo de procesos coordinados que aparentan un único sistema'
        ],
        correctIndex: 1,
        explanation: 'Un sistema distribuido está formado por múltiples nodos que colaboran mediante comunicación en red para ofrecer un servicio conjunto, compartiendo carga y tolerando fallos.'
      },
      {
        id: 'sd-2',
        question: '¿En qué situación típica alguien acaba diciendo "esto hay que distribuirlo"?',
        options: [
          'Cuando el servidor tiene recursos de sobra libres',
          'Cuando disminuye el tráfico y baja el número de usuarios',
          'Cuando informes tardan horas y el servidor se satura',
          'Cuando las copias de seguridad caben cómodamente en disco'
        ],
        correctIndex: 2,
        explanation: 'La necesidad de distribuir surge cuando una sola máquina no puede manejar la carga. El aumento de tiempos de respuesta y saturación indica que se ha alcanzado el límite del enfoque centralizado.'
      },
      {
        id: 'sd-3',
        question: '¿Por qué escalar solo "hacia arriba" una máquina tiene fecha de caducidad?',
        options: [
          'Porque las instancias pequeñas no aceptan bases grandes',
          'Porque la nube encarece mucho las máquinas gigantes demasiado',
          'Porque los discos SSD siempre son más lentos que los mecánicos',
          'Porque hay límites físicos y de coste al crecer una sola máquina'
        ],
        correctIndex: 3,
        explanation: 'El escalado vertical no es infinito. Existen límites de hardware, coste y fiabilidad, lo que hace necesario adoptar arquitecturas distribuidas para crecer de forma sostenible.'
      },
      {
        id: 'sd-4',
        question: '¿Cómo debe plantearse el diseño frente a fallos en un sistema distribuido?',
        options: [
          'Aceptar fallos frecuentes y diseñar para seguir operando',
          'Suponer que las excepciones casi nunca ocurren en producción',
          'Tratar cualquier error como un caso imposible de ver',
          'Confiar en que todos los nodos funcionen siempre perfectos'
        ],
        correctIndex: 0,
        explanation: 'Los fallos son inevitables en sistemas distribuidos. El diseño debe asumirlos como normales y garantizar que el sistema siga funcionando mediante redundancia y recuperación automática.'
      },
      {
        id: 'sd-5',
        question: '¿Qué suposición realista debe hacerse sobre la red en sistemas distribuidos?',
        options: [
          'Que todos los mensajes llegarán siempre en estricto orden',
          'Que la red ofrece latencia fija y totalmente predecible',
          'Que algunos mensajes llegarán tarde, duplicados o desordenados',
          'Que solo hay problemas cuando se cae todo el data center'
        ],
        correctIndex: 2,
        explanation: 'La red no es fiable ni predecible. Diseñar sistemas distribuidos implica aceptar latencias variables, pérdidas y desorden en los mensajes.'
      },
      {
        id: 'sd-6',
        question: 'Según el teorema CAP, ¿qué obliga a decidir una partición de red?',
        options: [
          'Se mantiene siempre consistencia fuerte, disponibilidad y particiones',
          'Debes elegir entre consistencia fuerte o disponibilidad plena',
          'Puedes seguir teniendo todas las propiedades sin sacrificios',
          'Desaparece la tolerancia a fallos y el sistema se detiene'
        ],
        correctIndex: 1,
        explanation: 'Cuando ocurre una partición de red, no es posible garantizar simultáneamente consistencia y disponibilidad. El sistema debe priorizar una de ellas según sus requisitos.'
      },
      {
        id: 'sd-7',
        question: '¿Cuál de estos ejemplos refleja mejor consistencia eventual?',
        options: [
          'Ver el saldo bancario actualizado al instante en todos',
          'Obtener error hasta que todas las réplicas confirmen cambios',
          'Nunca mostrar diferencias entre almacén y sistema de pedidos',
          'Ver que el contador de likes tarda pero converge'
        ],
        correctIndex: 3,
        explanation: 'La consistencia eventual permite divergencias temporales entre réplicas, pero garantiza que, con el tiempo, todas convergen al mismo valor final.'
      },
      {
        id: 'sd-8',
        question: '¿Cuál es el objetivo principal de replicar datos en sistemas como HDFS o Kafka?',
        options: [
          'Aumentar tolerancia a fallos guardando copias en nodos',
          'Reducir el tamaño total eliminando datos duplicados',
          'Evitar para siempre la necesidad de hacer backups',
          'Guardar todos los datos completos solo en una máquina'
        ],
        correctIndex: 0,
        explanation: 'La replicación protege frente a fallos de nodos individuales. Permite que el sistema siga funcionando y recuperando datos sin pérdida incluso cuando fallan componentes.'
      },
      {
        id: 'sd-9',
        question: '¿Por qué se particionan los datos en sistemas tipo Cassandra o ElasticSearch?',
        options: [
          'Conseguir que cada nodo almacene exactamente todos los datos',
          'Repartir datos y carga entre nodos con particiones',
          'Forzar que cada consulta recorra el cluster completo siempre',
          'Convertir todas las operaciones en un proceso totalmente secuencial'
        ],
        correctIndex: 1,
        explanation: 'El particionado distribuye datos y trabajo entre nodos, permitiendo paralelismo, escalabilidad y mejor aprovechamiento de recursos en sistemas distribuidos.'
      },
      {
        id: 'sd-10',
        question: '¿Qué describe mejor el skew en un job de Spark u otro motor distribuido?',
        options: [
          'Cuando todas las tareas terminan al mismo tiempo exacto',
          'Cuando el cluster queda parado y no se lanzan tareas',
          'Cuando pocas tareas reciben muchos más datos que el resto',
          'Cuando hay demasiadas particiones pequeñas ocupando muy poca memoria'
        ],
        correctIndex: 2,
        explanation: 'El skew provoca desequilibrios de carga que reducen el paralelismo efectivo. Algunas tareas se convierten en cuellos de botella, alargando el tiempo total de ejecución del job.'
      }
    ]
  }
];

/** Helper to get all questions from all blocks */
export const getAllQuestions = () =>
  quizBlocks.flatMap(block => block.questions);

/** Helper to get a block by ID */
export const getBlockById = (id: string) =>
  quizBlocks.find(block => block.id === id);
