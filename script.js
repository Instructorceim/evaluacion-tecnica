const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreText = document.getElementById('score-text');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');
const timerDisplay = document.getElementById('time-left');
const reviewList = document.getElementById('review-list');

let currentQuestionIndex;
let score;
let userAnswers = [];
let timer;
let timeLeft = 30 * 60; // 30 minutos en segundos

// Banco de 60 preguntas con categoría (Técnicos, Normativos, Básicos)
const questions = [
  {
    pregunta: "¿Cuál es el propósito de un P&ID en ingeniería industrial?",
    opciones: ["A) Representar la distribución de equipos en planta", "B) Mostrar tuberías, válvulas y controles del proceso", "C) Mostrar planos arquitectónicos", "D) Representar circuitos eléctricos"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué significa ISO 9001 en el contexto de gestión documental?",
    opciones: ["A) Seguridad laboral", "B) Gestión de calidad", "C) Gestión ambiental", "D) Eficiencia energética"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Cuál es la función de un bloque (block) en AutoCAD?",
    opciones: ["A) Aumentar el tamaño del archivo", "B) Grupo de objetos insertado como uno", "C) Solo decorar el dibujo", "D) Cambiar el color del archivo"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué norma chilena se refiere a equidad y no discriminación?",
    opciones: ["A) ISO 14001", "B) NCh 3262", "C) DS 132", "D) Ley 16.744"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué sistema se utiliza comúnmente para la trazabilidad de documentos en minería?",
    opciones: ["A) SAP", "B) Word", "C) Excel", "D) PowerPoint"],
    respuesta_correcta: "A",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe verificarse antes de iniciar un levantamiento en terreno?",
    opciones: ["A) Que el sol esté visible", "B) Que haya electricidad", "C) Que los EPP estén disponibles y en buen estado", "D) Que haya internet"],
    respuesta_correcta: "C",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Cuál es el propósito del control de versiones en planos?",
    opciones: ["A) Aumentar el número de archivos", "B) Garantizar integridad y trazabilidad", "C) Hacer copias de seguridad", "D) Comprimir archivos"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es un plano isométrico?",
    opciones: ["A) Vista en 2D de un objeto", "B) Vista tridimensional simplificada de tuberías", "C) Vista de planta", "D) Vista de fachada"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Cuál es un riesgo común en un espacio confinado?",
    opciones: ["A) Ruido excesivo", "B) Falta de ventilación y gases tóxicos", "C) Temperatura alta", "D) Iluminación baja"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué significa DS 132?",
    opciones: ["A) Ley de tránsito", "B) Decreto Supremo de Seguridad Minera", "C) Documento de sistema", "D) Norma de calidad"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Cuál es la función del FRM en minería?",
    opciones: ["A) Factor de Riesgo Mínimo", "B) Factor de Riesgo Crítico", "C) Fondo de Riesgo Minero", "D) Formulario de Riesgo Mensual"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse si se detecta una condición insegura en terreno?",
    opciones: ["A) Ignorarla", "B) Continuar trabajando", "C) Detener la tarea y notificar", "D) Esperar a que ocurra un accidente"],
    respuesta_correcta: "C",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un near miss?",
    opciones: ["A) Un error grave", "B) Un incidente que pudo haber causado daño", "C) Un accidente leve", "D) Un descanso"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué representa un plano de layout?",
    opciones: ["A) Vista en corte de una estructura", "B) Distribución general de equipos", "C) Detalle de una pieza", "D) Vista de fachada"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Cuál es el propósito de la calibración de un instrumento?",
    opciones: ["A) Limpiarlo", "B) Comparar con un patrón de referencia", "C) Cambiar su color", "D) Guardar en caja"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué significa trazabilidad en metrología?",
    opciones: ["A) Seguir a los operarios", "B) Relación con patrones nacionales o internacionales", "C) Registrar el número de veces usado", "D) Imprimir etiquetas"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué sistema internacional de unidades se usa en ingeniería?",
    opciones: ["A) Imperial", "B) SI", "C) Técnico", "D) Binario"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es un plano de fabricación?",
    opciones: ["A) Plano de edificio", "B) Representación detallada para construir una pieza", "C) Plano de planta", "D) Vista de fachada"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Cuál es un ejemplo de gestión ambiental en minería?",
    opciones: ["A) Aumentar producción", "B) Segregar residuos según clasificación", "C) Aumentar horas de trabajo", "D) Reducir salario"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué significa ISO 14001?",
    opciones: ["A) Sistema de calidad", "B) Sistema de gestión ambiental", "C) Sistema de seguridad", "D) Sistema de logística"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué es un sistema ERP?",
    opciones: ["A) Plan de evacuación", "B) Software para gestionar recursos empresariales", "C) Método de dibujo", "D) Norma de seguridad"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Cuál es un ejemplo de herramienta de medición de precisión?",
    opciones: ["A) Martillo", "B) Pie de metro", "C) Lápiz", "D) Escuadra"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué es un plano de montaje?",
    opciones: ["A) Representación de un edificio", "B) Representación de cómo se unen piezas", "C) Vista de planta", "D) Vista de fachada"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué es PLM?",
    opciones: ["A) Plan de Lectura Mecánica", "B) Gestión del Ciclo de Vida del Producto", "C) Proceso de Levantamiento Minero", "D) Plan de Mantenimiento"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un modelo BIM?",
    opciones: ["A) Sistema de calidad", "B) Modelo 3D de información del edificio", "C) Método de pintura", "D) Norma de dibujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cuál es una buena práctica de eficiencia energética?",
    opciones: ["A) Dejar equipos prendidos", "B) Apagar equipos innecesarios", "C) Aumentar el consumo", "D) Usar bombillas tradicionales"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse si se detecta un derrame de sustancia peligrosa?",
    opciones: ["A) Limpiarlo solo si es pequeño", "B) Seguir procedimiento de contingencia", "C) Dejarlo para otro turno", "D) Ignorarlo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cuál es el propósito de un ART?",
    opciones: ["A) Análisis de Riesgos del Trabajo", "B) Accidente Realizado en Turno", "C) Área de Reparación Temporal", "D) Acción Responsable de Turno"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse al recibir una orden de trabajo?",
    opciones: ["A) Comenzar sin leer", "B) Leerla, aclarar dudas y evaluar riesgos", "C) Solo firmarla", "D) Entregarla a otro compañero"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué significa ISO 45001?",
    opciones: ["A) Sistema de calidad", "B) Sistema de seguridad y salud ocupacional", "C) Sistema ambiental", "D) Sistema financiero"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un sistema de unidades?",
    opciones: ["A) Grupo de usuarios", "B) Conjunto de unidades de medida estandarizadas", "C) Tipo de archivo", "D) Programa de dibujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un espacio confinado?",
    opciones: ["A) Área con mucha luz", "B) Área con ventilación limitada y posibles riesgos", "C) Lugar amplio", "D) Solo un baño"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse en caso de una emergencia?",
    opciones: ["A) Quedarse quieto", "B) Seguir el plan de emergencia", "C) Salir corriendo sin aviso", "D) Esperar a que otros actúen"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un plano de detalle?",
    opciones: ["A) Vista general de un sistema", "B) Representación precisa de una pieza", "C) Mapa del terreno", "D) Diagrama de flujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es una capa (layer) en CAD?",
    opciones: ["A) Cambiar el color del archivo", "B) Organizar información gráfica", "C) Aumentar el tamaño del archivo", "D) Solo decorar el dibujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un patrón de calibración?",
    opciones: ["A) Decorar el laboratorio", "B) Referencia de medida confiable", "C) Aumentar velocidad de medición", "D) Reducir costos"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la resolución de un instrumento?",
    opciones: ["A) Resolver problemas", "B) Menor diferencia que puede detectar", "C) Tiempo de respuesta", "D) Tamaño físico"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la exactitud en metrología?",
    opciones: ["A) Rapidez de medición", "B) Cercanía al valor verdadero", "C) Tamaño del instrumento", "D) Cantidad de mediciones"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse si una medición está fuera de tolerancia?",
    opciones: ["A) Ignorarla", "B) Registrarla, evaluarla y reportarla", "C) Ajustarla manualmente", "D) Volver a medir sin registrar"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la repetibilidad en metrología?",
    opciones: ["A) Medir con diferentes instrumentos", "B) Obtener resultados similares bajo mismas condiciones", "C) Cambiar el método", "D) Medir solo una vez"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué tipo de desgaste se evalúa frecuentemente con metrología?",
    opciones: ["A) Visual", "B) Dimensional", "C) De color", "D) De sonido"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la comprobación de mediciones?",
    opciones: ["A) Medir solo una vez", "B) Verificar validez del resultado", "C) Solo revisar el instrumento", "D) Guardar el valor"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cuál es el propósito de medir tolerancias?",
    opciones: ["A) Aumentar tamaño", "B) Asegurar que el componente funcione", "C) Cambiar material", "D) Reducir velocidad"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué tipo de medición evalúa desalineaciones?",
    opciones: ["A) Dimensional", "B) Geométrica", "C) Solo visual", "D) Solo de temperatura"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe incluirse en el registro de una medición?",
    opciones: ["A) Solo el valor", "B) Fecha, responsable, valor, instrumento y condiciones", "C) Solo nombre del equipo", "D) Solo el turno"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué relación existe entre metrología y mantenimiento?",
    opciones: ["A) No tienen relación", "B) Evalúa estado de equipos", "C) Solo se usa en ventas", "D) Solo en talleres"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es DS 594?",
    opciones: ["A) Norma de calidad", "B) DS de condiciones sanitarias y ambientales", "C) Ley de tránsito", "D) Norma de dibujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué significa Ley 16.744?",
    opciones: ["A) Seguridad minera", "B) Accidentes del trabajo y enfermedades profesionales", "C) Eficiencia energética", "D) Gestión ambiental"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es ORD. Nº2438 de la Dirección del Trabajo?",
    opciones: ["A) Norma de calidad", "B) Reglamento sobre condiciones de trabajo", "C) Ley de minería", "D) Norma de dibujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un sistema de gestión de documentos?",
    opciones: ["A) Programa de dibujo", "B) Sistema para organizar y controlar archivos", "C) Método de impresión", "D) Norma de seguridad"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un estándar de control de atrapamiento?",
    opciones: ["A) Norma de seguridad", "B) Método de dibujo", "C) Procedimiento de rescate", "D) Tipo de herramienta"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es una vía de evacuación?",
    opciones: ["A) Camino de entrada", "B) Ruta segura para salir del lugar", "C) Pasillo de oficina", "D) Área de trabajo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un procedimiento de emergencia?",
    opciones: ["A) Plan de trabajo", "B) Acciones a seguir en caso de emergencia", "C) Documento de dibujo", "D) Norma de calidad"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un formato para registros escritos?",
    opciones: ["A) Plantilla para documentos", "B) Archivo de imagen", "C) Video instructivo", "D) Gráfico de barras"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es el comportamiento de los materiales?",
    opciones: ["A) Cómo se ven", "B) Cómo responden a fuerzas y ambientes", "C) Cómo se pintan", "D) Cómo se almacenan"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es el concepto de esfuerzo mecánico?",
    opciones: ["A) Fuerza aplicada por unidad de área", "B) Velocidad de rotación", "C) Temperatura de fusión", "D) Color del material"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la corrosión?",
    opciones: ["A) Cambio de color", "B) Degradación de un material por reacciones químicas", "C) Aumento de temperatura", "D) Cambio de forma"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es el análisis mediante elementos finitos?",
    opciones: ["A) Método para calcular resistencia y deformaciones", "B) Método de pintura", "C) Técnica de dibujo", "D) Forma de soldadura"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la interpretación de espacios y distribución?",
    opciones: ["A) Cómo se ve un lugar", "B) Cómo se organizan los equipos en planta", "C) Cómo se limpia un área", "D) Cómo se pinta una pared"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué son los procesos de planta minera?",
    opciones: ["A) Actividades de extracción y procesamiento de minerales", "B) Cultivo de plantas", "C) Actividades de oficina", "D) Ventas internacionales"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la resistencia de materiales?",
    opciones: ["A) Cómo se almacena un material", "B) Estudio de la capacidad de los materiales para soportar fuerzas", "C) Cómo se pinta un metal", "D) Cómo se transporta un material"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un mecanismo de desgaste?",
    opciones: ["A) Cómo se almacena un material", "B) Proceso de deterioro por fricción o uso", "C) Cómo se transporta un material", "D) Cómo se pinta un metal"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la comunicación por radio en minería?",
    opciones: ["A) Forma de entretenimiento", "B) Medio de comunicación formal en campo", "C) Sistema de dibujo", "D) Método de medición"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  }
];

startBtn.addEventListener('click', startQuiz);

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      finishQuizByTimeout();
    }
  }, 1000);
}

function startQuiz() {
  startBtn.style.display = 'none';
  quizContainer.style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  timeLeft = 30 * 60;
  startTimer();
  showQuestion();
}

function updateProgressBar() {
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.pregunta;

  currentQuestion.opciones.forEach((opcion, index) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = opcion;
    button.dataset.answer = opcion.charAt(0); // A, B, C o D
    button.addEventListener('click', selectAnswer);
    optionsContainer.appendChild(button);
  });

  updateProgressBar();
}

function resetState() {
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
  nextBtn.style.display = 'none';
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const answer = selectedButton.dataset.answer;

  Array.from(optionsContainer.children).forEach(button => {
    button.classList.remove('selected');
    if (button.dataset.answer === answer) {
      button.classList.add('selected');
    }
  });

  userAnswers.push(answer);

  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  const currentQuestion = questions[currentQuestionIndex];
  if (userAnswers[userAnswers.length - 1] === currentQuestion.respuesta_correcta) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
});

function finishQuizByTimeout() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  scoreText.textContent = "La evaluación ha terminado por tiempo.";
  statusText.textContent = "⏰ Tiempo agotado.";
  statusText.style.color = '#ff6600';

  reviewList.innerHTML = '';
  questions.forEach((q, i) => {
    const li = document.createElement('li');
    li.classList.add('review-item');
    const userAns = userAnswers[i] || 'No respondida';
    const isCorrect = userAns === q.respuesta_correcta;
    li.innerHTML = `
      <strong>P${i+1}:</strong> ${q.pregunta}<br>
      Tu respuesta: ${userAns} - Correcta: ${q.respuesta_correcta} 
      <span style="color:${isCorrect ? 'green' : 'red'}">${isCorrect ? '✔' : '✘'}</span>
    `;
    reviewList.appendChild(li);
  });
}

function showResult() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  const percentage = Math.round((score / questions.length) * 100);
  scoreText.textContent = `Obtuviste ${score} de ${questions.length} (${percentage}%)`;

  if (percentage >= 70) {
    statusText.textContent = '✅ ¡Aprobado!';
    statusText.style.color = '#28a745';
  } else {
    statusText.textContent = '❌ Reprobado.';
    statusText.style.color = '#dc3545';
  }

  reviewList.innerHTML = '';
  questions.forEach((q, i) => {
    const li = document.createElement('li');
    li.classList.add('review-item');
    const userAns = userAnswers[i];
    const isCorrect = userAns === q.respuesta_correcta;
    li.innerHTML = `
      <strong>P${i+1}:</strong> ${q.pregunta}<br>
      Tu respuesta: ${userAns} - Correcta: ${q.respuesta_correcta} 
      <span style="color:${isCorrect ? 'green' : 'red'}">${isCorrect ? '✔' : '✘'}</span>
    `;
    reviewList.appendChild(li);
  });
}

restartBtn.addEventListener('click', () => {
  resultContainer.style.display = 'none';
  startBtn.style.display = 'block';
});
