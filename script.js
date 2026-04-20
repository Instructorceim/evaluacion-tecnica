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

// Banco de 60 preguntas alineadas con competencias y actividades clave del instituto
const questions = [
  {
    pregunta: "¿Cuál es la función principal de un dibujante técnico en la operación minera?",
    opciones: ["A) Operar máquinas", "B) Elaborar y actualizar planos técnicos", "C) Supervisar turnos", "D) Gestionar contratos"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Con qué área se coordina habitualmente un dibujante técnico para recibir requerimientos de planos?",
    opciones: ["A) Recursos humanos", "B) Mantenimiento o ingeniería", "C) Logística", "D) Finanzas"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué tipo de sistema se utiliza comúnmente para gestionar la trazabilidad de planos en minería?",
    opciones: ["A) SAP", "B) Word", "C) Excel", "D) PowerPoint"],
    respuesta_correcta: "A",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué información revisa habitualmente un dibujante para definir el alcance de un paquete de planos?",
    opciones: ["A) Costos históricos", "B) Procedimientos, P&IDs, órdenes de trabajo", "C) Horarios de turno", "D) Listas de asistencia"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse antes de iniciar un levantamiento en terreno?",
    opciones: ["A) Avisar al cliente", "B) Verificar EPP y permisos", "C) Comprar herramientas", "D) Imprimir planos"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse si se encuentra una discrepancia entre el plano y la realidad en terreno?",
    opciones: ["A) Ignorarla", "B) Registrarla y evaluarla", "C) Cambiar el plano sin revisión", "D) Esperar a que otro lo vea"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué tipo de planos incluyen representaciones de tuberías, válvulas y controles del proceso?",
    opciones: ["A) Planos arquitectónicos", "B) P&ID", "C) Planos civiles", "D) Planos eléctricos"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cuál es la finalidad del control de versiones en planos técnicos?",
    opciones: ["A) Aumentar archivos", "B) Garantizar trazabilidad e integridad", "C) Hacer copias de seguridad", "D) Comprimir archivos"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es un plano isométrico?",
    opciones: ["A) Vista en 2D", "B) Vista 3D simplificada de tuberías", "C) Plano de planta", "D) Plano de fachada"],
    respuesta_correcta: "B",
    categoria: "Básicos"
  },
  {
    pregunta: "¿Qué herramienta se puede usar para medir distancias en terreno durante un levantamiento?",
    opciones: ["A) Solo cinta métrica", "B) Estación total, cinta, láser", "C) Solo planos", "D) Solo papel"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cuál es el propósito de una capa (layer) en CAD?",
    opciones: ["A) Cambiar color", "B) Organizar información gráfica", "C) Aumentar tamaño", "D) Decorar dibujo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse antes de actualizar un archivo CAD?",
    opciones: ["A) Guardar en la nube", "B) Verificar versión y respaldar", "C) Imprimirlo", "D) Enviar por correo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse al terminar un levantamiento en terreno?",
    opciones: ["A) Irse sin más", "B) Comparar con planos anteriores y registrar discrepancias", "C) Tomar fotos", "D) Firmar planos"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
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
    pregunta: "¿Qué sistema internacional de unidades se usa en ingeniería?",
    opciones: ["A) Imperial", "B) SI", "C) Técnico", "D) Binario"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse si una medición está fuera de tolerancia?",
    opciones: ["A) Ignorarla", "B) Registrarla y reportarla", "C) Ajustarla manualmente", "D) Volver a medir sin registrar"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué sistema se usa comúnmente para reportar mediciones en minería?",
    opciones: ["A) Correo personal", "B) SAP u otro sistema ERP", "C) WhatsApp", "D) Cartelera"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la repetibilidad en metrología?",
    opciones: ["A) Medir con diferentes instrumentos", "B) Obtener resultados similares bajo mismas condiciones", "C) Cambiar método", "D) Medir una vez"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse antes de iniciar una medición?",
    opciones: ["A) Comenzar sin preparación", "B) Verificar estado del instrumento y calibración", "C) Solo revisar batería", "D) Guardar instrumento"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué es la calibración de un instrumento?",
    opciones: ["A) Limpiarlo", "B) Comparar con un patrón de referencia", "C) Guardarlo", "D) Cambiar color"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué significa trazabilidad en metrología?",
    opciones: ["A) Seguir a operarios", "B) Relación con patrones nacionales/internacionales", "C) Registrar veces usado", "D) Imprimir etiquetas"],
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
    opciones: ["A) Medir solo una vez", "B) Verificar validez del resultado", "C) Solo revisar instrumento", "D) Guardar valor"],
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
    pregunta: "¿Qué debe incluirse en el registro de una medición?",
    opciones: ["A) Solo el valor", "B) Fecha, responsable, valor, instrumento y condiciones", "C) Solo nombre del equipo", "D) Solo turno"],
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
    pregunta: "¿Qué es un ART?",
    opciones: ["A) Análisis de Riesgos del Trabajo", "B) Accidente Realizado en Turno", "C) Área de Reparación Temporal", "D) Acción Responsable de Turno"],
    respuesta_correcta: "A",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué significa DS 132?",
    opciones: ["A) Documento de seguridad", "B) Decreto Supremo de Seguridad Minera", "C) Documento de sistema", "D) Departamento de salud"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Cuál es la función del EPP?",
    opciones: ["A) Proteger ropa", "B) Proteger al trabajador de riesgos", "C) Solo para apariencia", "D) Registrar horas"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es un FRM?",
    opciones: ["A) Factor de Riesgo Mínimo", "B) Factor de Riesgo Crítico", "C) Fondo de Riesgo Minero", "D) Formulario de Riesgo Mensual"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse si se detecta una condición insegura?",
    opciones: ["A) Continuar trabajando", "B) Detener la tarea y notificar", "C) Esperar accidente", "D) Decirlo al final del día"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es un espacio confinado?",
    opciones: ["A) Lugar con mucha luz", "B) Área con ventilación limitada y posibles riesgos", "C) Lugar amplio", "D) Solo baño"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es un near miss?",
    opciones: ["A) Error grave", "B) Incidente que pudo haber causado daño", "C) Accidente leve", "D) Descanso"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse en caso de una emergencia?",
    opciones: ["A) Quedarse quieto", "B) Seguir el plan de emergencia", "C) Salir corriendo sin aviso", "D) Esperar a que otros actúen"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es ISO 45001?",
    opciones: ["A) Sistema de calidad", "B) Sistema de seguridad y salud ocupacional", "C) Sistema ambiental", "D) Sistema financiero"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse al recibir una orden de trabajo?",
    opciones: ["A) Comenzar sin leer", "B) Leerla, aclarar dudas y evaluar riesgos", "C) Solo firmarla", "D) Entregarla a otro"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué significa ISO 14001?",
    opciones: ["A) Sistema de calidad", "B) Sistema de gestión ambiental", "C) Sistema de seguridad", "D) Sistema de logística"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Cómo se debe manejar la disposición de aceites usados?",
    opciones: ["A) Tirar en drenaje", "B) Disponer en contenedores certificados", "C) Mezclar con otros", "D) Dejar en taller"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es una buena práctica de eficiencia energética?",
    opciones: ["A) Dejar equipos prendidos", "B) Apagar equipos innecesarios", "C) Usar bombillas tradicionales", "D) Aumentar consumo"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse si se detecta un derrame de sustancia peligrosa?",
    opciones: ["A) Limpiar si es pequeño", "B) Seguir procedimiento de contingencia", "C) Dejar para otro turno", "D) Ignorarlo"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es la clasificación de residuos?",
    opciones: ["A) Agrupar por tamaño", "B) Separar según su naturaleza y tratamiento", "C) Poner todos juntos", "D) Solo guardar"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué significa NCh 3262?",
    opciones: ["A) Norma de calidad", "B) Norma de equidad y no discriminación", "C) Norma de dibujo técnico", "D) Norma de seguridad"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse para proteger los recursos hídricos en la operación?",
    opciones: ["A) Usar sin control", "B) Implementar buenas prácticas de uso eficiente", "C) Solo monitorear caudal", "D) Aumentar consumo"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué tipo de residuos deben separarse en la operación minera?",
    opciones: ["A) Solo los grandes", "B) Todos según clasificación", "C) Solo electrónicos", "D) Solo de oficina"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué es un plan de contingencia ambiental?",
    opciones: ["A) Plan para aumentar producción", "B) Plan para responder a emergencias ambientales", "C) Plan de vacaciones", "D) Plan de compras"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse al notar un impacto ambiental?",
    opciones: ["A) No hacer nada", "B) Comunicar a supervisión y seguir protocolos", "C) Solo tomar foto", "D) Esperar que desaparezca"],
    respuesta_correcta: "B",
    categoria: "Normativos"
  },
  {
    pregunta: "¿Qué debe hacerse para planificar la elaboración de un paquete de planos?",
    opciones: ["A) Solo dibujar", "B) Definir hitos, recursos, revisiones y responsables", "C) Solo revisar", "D) No es necesario planificar"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe incluir un informe de prefactibilidad documental?",
    opciones: ["A) Solo imágenes", "B) Perfil técnico, costos, tiempos y riesgos", "C) Solo planos nuevos", "D) Opinión personal"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cómo se debe validar los requerimientos con el cliente interno?",
    opciones: ["A) No es necesario", "B) Compartir borradores y confirmar expectativas", "C) Solo enviar correo", "D) Validar solo con jefe"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué aspectos verifica en terreno antes de dar por válido un levantamiento?",
    opciones: ["A) Solo que esté limpio", "B) Que coincida con planos y esté seguro", "C) Solo iluminación", "D) Solo temperatura"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué criterios aplica para nombrar archivos actualizados?",
    opciones: ["A) Al azar", "B) Usar nomenclatura estandarizada", "C) Solo fecha", "D) Solo número"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cómo verifica la repetibilidad de un resultado de medición?",
    opciones: ["A) Medir solo una vez", "B) Repetir medición y comparar resultados", "C) Solo revisar instrumento", "D) Asumir que es correcto"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse si un resultado de medición no coincide con lo esperado?",
    opciones: ["A) Ignorarlo", "B) Investigar causa y reportar", "C) Cambiar valor", "D) Volver a medir sin registrar"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué tipo de medición evalúa desalineaciones?",
    opciones: ["A) Dimensional", "B) Geométrica", "C) Solo visual", "D) Solo temperatura"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué herramienta se usa comúnmente para evaluar desgaste dimensional?",
    opciones: ["A) Cámara", "B) Pie de metro, micrómetro", "C) Termómetro", "D) Cronómetro"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse para asegurar que la medición no se vea afectada por condiciones del entorno?",
    opciones: ["A) No importa el entorno", "B) Verificar condiciones de estabilidad y ambiente", "C) Medir rápido", "D) Usar cualquier lugar"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué tipo de análisis se usa para evaluar esfuerzos en piezas?",
    opciones: ["A) Análisis de mercado", "B) Análisis de elementos finitos", "C) Análisis de costo", "D) Análisis de tiempo"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Qué debe hacerse para asegurar que la modificación de un plano no afecte otros relacionados?",
    opciones: ["A) No es necesario", "B) Validar compatibilidad con otros planos", "C) Solo revisar uno", "D) Solo notificar"],
    respuesta_correcta: "B",
    categoria: "Técnicos"
  },
  {
    pregunta: "¿Cómo se deja trazabilidad de un cambio en un plano?",
    opciones: ["A) No es necesario", "B) Registrar en sistema con fecha y responsable", "C) Solo avisar verbalmente", "D) Solo en papel"],
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
