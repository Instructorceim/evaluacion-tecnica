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

// Banco de 60 preguntas
const questions = [
  {
    pregunta: "¿Qué tipo de planos incluyen representaciones de tuberías, válvulas y equipos en procesos industriales?",
    opciones: ["A) Planos arquitectónicos", "B) P&ID", "C) Planos topográficos", "D) Planos eléctricos"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es la finalidad del control de versiones en planos técnicos?",
    opciones: ["A) Aumentar la cantidad de archivos", "B) Asegurar trazabilidad, integridad y evitar confusiones", "C) Reducir el tamaño de los archivos", "D) Mejorar la velocidad de carga"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál de los siguientes es un estándar internacional para dibujo técnico?",
    opciones: ["A) ISO", "B) NCh 3262", "C) DS 132", "D) Ley 16.744"],
    respuesta_correcta: "A"
  },
  {
    pregunta: "¿Qué debe considerarse al definir el alcance de un paquete de planos?",
    opciones: ["A) Solo el tiempo disponible", "B) Necesidades de los activos, procedimientos y riesgos", "C) Solo el costo del proyecto", "D) Solo la opinión del cliente"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué sistema se utiliza comúnmente para gestionar la trazabilidad de documentos en minería?",
    opciones: ["A) Microsoft Word", "B) SAP u otros sistemas ERP", "C) Google Drive", "D) PowerPoint"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué significa “levantamiento en terreno” en el contexto de planos técnicos?",
    opciones: ["A) Eliminar información antigua", "B) Recopilar información real de instalaciones o equipos", "C) Dibujar planos sin salir de oficina", "D) Solo revisar planos antiguos"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un plano isométrico?",
    opciones: ["A) Representación en dos dimensiones", "B) Representación tridimensional simplificada de tuberías", "C) Plano topográfico", "D) Plano de edificio"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse si se encuentra una discrepancia entre el plano y la realidad en terreno?",
    opciones: ["A) Ignorarla", "B) Registrarla, evaluarla y proponer actualización", "C) Cambiar el plano sin revisión", "D) Dejarlo para otro turno"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué tipo de archivo es recomendable usar para gestionar planos CAD?",
    opciones: ["A) PDF", "B) DWG o DWF", "C) JPG", "D) TXT"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es una buena práctica para gestionar archivos maestros?",
    opciones: ["A) Guardar todo en el escritorio", "B) Usar nomenclatura estandarizada y control de versiones", "C) Renombrar archivos al azar", "D) Guardar solo una copia"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué herramienta se puede usar para medir distancias en terreno durante un levantamiento?",
    opciones: ["A) Solo cinta métrica", "B) Estación total, cinta métrica o láser", "C) Solo lápiz y papel", "D) Solo planos antiguos"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe verificarse antes de actualizar un archivo CAD?",
    opciones: ["A) Que esté guardado en la nube", "B) Que sea la versión correcta y esté respaldado", "C) Que tenga colores bonitos", "D) Que se haya impreso"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es el propósito de una capa (layer) en un archivo CAD?",
    opciones: ["A) Cambiar el color del archivo", "B) Organizar información gráfica de manera lógica", "C) Aumentar el tamaño del archivo", "D) Solo decorar el dibujo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse al terminar un levantamiento en terreno?",
    opciones: ["A) Irse sin más", "B) Comparar con planos anteriores y registrar discrepancias", "C) Solo tomar fotos", "D) Mandar un correo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un bloque (block) en AutoCAD?",
    opciones: ["A) Un archivo protegido", "B) Un grupo de objetos que se inserta como un solo elemento", "C) Un tipo de texto", "D) Una herramienta de impresión"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es el objetivo del modelado 3D en ingeniería?",
    opciones: ["A) Solo para impresión", "B) Visualizar, simular y coordinar sistemas complejos", "C) Aumentar el peso del archivo", "D) Solo para presentaciones"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un plano de layout?",
    opciones: ["A) Diseño de un edificio", "B) Distribución general de equipos y estructuras", "C) Solo planos eléctricos", "D) Plano de seguridad"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse si un plano no coincide con el terreno?",
    opciones: ["A) Ajustar el terreno", "B) Actualizar el plano con la información real", "C) Dejarlo como está", "D) Borrarlo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es el propósito del control documental?",
    opciones: ["A) Aumentar el número de archivos", "B) Asegurar integridad, acceso y trazabilidad", "C) Hacer backups en la nube", "D) Comprimir archivos"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es PLM?",
    opciones: ["A) Programa de Lenguaje Mecánico", "B) Gestión del Ciclo de Vida del Producto", "C) Plan de Lectura Mecánica", "D) Proceso de Levantamiento Minero"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es la calibración de un instrumento?",
    opciones: ["A) Limpiarlo", "B) Comparar su lectura con un patrón de referencia", "C) Guardarlo en caja", "D) Cambiar su color"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué significa trazabilidad en metrología?",
    opciones: ["A) Seguir a los operarios", "B) Relación demostrable con patrones nacionales o internacionales", "C) Registrar el número de veces usado", "D) Imprimir etiquetas"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál de los siguientes NO es un instrumento de medición?",
    opciones: ["A) Pie de metro", "B) Reloj comparador", "C) Martillo", "D) Micrómetro"],
    respuesta_correcta: "C"
  },
  {
    pregunta: "¿Qué se evalúa al medir la incertidumbre de una medición?",
    opciones: ["A) Solo el precio del instrumento", "B) La confiabilidad del resultado", "C) La duración del proceso", "D) El color del instrumento"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es la resolución de un instrumento?",
    opciones: ["A) Su capacidad para resolver problemas", "B) La menor diferencia que puede detectar", "C) Su tiempo de respuesta", "D) Su tamaño físico"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es el propósito de un patrón de calibración?",
    opciones: ["A) Decorar el laboratorio", "B) Servir como referencia de medida confiable", "C) Aumentar la velocidad de medición", "D) Reducir costos"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse antes de iniciar una medición?",
    opciones: ["A) Comenzar sin preparación", "B) Verificar estado del instrumento y calibración", "C) Solo revisar la batería", "D) Guardar el instrumento"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un sistema de unidades?",
    opciones: ["A) Un grupo de usuarios", "B) Conjunto de unidades de medida estandarizadas", "C) Un tipo de archivo", "D) Un programa de dibujo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es el sistema internacional de unidades?",
    opciones: ["A) Imperial", "B) SI (Sistema Internacional)", "C) Técnico", "D) Binario"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué significa “exactitud” en metrología?",
    opciones: ["A) Rapidez de medición", "B) Cercanía del resultado al valor verdadero", "C) Tamaño del instrumento", "D) Cantidad de mediciones hechas"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse si una medición está fuera de tolerancia?",
    opciones: ["A) Ignorarla", "B) Registrarla, evaluarla y reportarla", "C) Ajustarla manualmente", "D) Volver a medir sin registrar"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué sistema se usa comúnmente para reportar mediciones en minería?",
    opciones: ["A) Correo personal", "B) SAP u otro sistema ERP", "C) WhatsApp", "D) Cartelera física"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es la repetibilidad en metrología?",
    opciones: ["A) Medir varias veces con diferentes instrumentos", "B) Obtener resultados similares bajo mismas condiciones", "C) Cambiar el método de medición", "D) Medir solo una vez"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué se debe considerar al elegir un instrumento de medición?",
    opciones: ["A) Solo el color", "B) Parámetro a medir, rango y tolerancia", "C) Solo el precio", "D) Solo la marca"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué tipo de desgaste se evalúa frecuentemente con metrología?",
    opciones: ["A) Desgaste visual", "B) Desgaste dimensional", "C) Desgaste de color", "D) Desgaste de sonido"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es la comprobación de mediciones?",
    opciones: ["A) Medir solo una vez", "B) Verificar la validez y exactitud del resultado", "C) Solo revisar el instrumento", "D) Guardar el valor en papel"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cuál es el propósito de medir tolerancias?",
    opciones: ["A) Aumentar el tamaño del objeto", "B) Asegurar que el componente funcione correctamente", "C) Cambiar el material", "D) Reducir la velocidad de producción"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué tipo de medición se realiza para evaluar desalineaciones?",
    opciones: ["A) Dimensional", "B) Geométrica (como coaxialidad o paralelismo)", "C) Solo visual", "D) Solo de temperatura"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe incluirse en el registro de una medición?",
    opciones: ["A) Solo el valor", "B) Fecha, responsable, valor, instrumento y condiciones", "C) Solo el nombre del equipo", "D) Solo el turno"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué relación existe entre metrología y mantenimiento?",
    opciones: ["A) No tienen relación", "B) La metrología permite evaluar estado de equipos", "C) Solo se usa en ventas", "D) Solo se aplica en talleres"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué significa DS 132?",
    opciones: ["A) Documento de seguridad", "B) Decreto Supremo de Seguridad Minera", "C) Documento de sistema", "D) Departamento de salud"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un ART?",
    opciones: ["A) Análisis de Riesgos del Trabajo", "B) Accidente Realizado en Turno", "C) Área de Reparación Temporal", "D) Acción Responsable de Turno"],
    respuesta_correcta: "A"
  },
  {
    pregunta: "¿Cuál es la función del EPP?",
    opciones: ["A) Proteger la ropa de trabajo", "B) Proteger al trabajador de riesgos", "C) Solo para apariencia", "D) Registrar horas de trabajo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un FRM?",
    opciones: ["A) Factor de Riesgo Mínimo", "B) Factor de Riesgo Crítico", "C) Fondo de Riesgo Minero", "D) Formulario de Riesgo Mensual"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse si se detecta una condición insegura?",
    opciones: ["A) Continuar trabajando", "B) Detener la tarea, notificar y aplicar controles", "C) Esperar a que ocurra un accidente", "D) Decirlo al final del día"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un espacio confinado?",
    opciones: ["A) Un lugar con mucha luz", "B) Área con ventilación limitada y posibles riesgos", "C) Un lugar amplio", "D) Solo un baño"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un near miss?",
    opciones: ["A) Un error grave", "B) Un incidente que pudo haber causado daño", "C) Un accidente leve", "D) Un descanso"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse en caso de una emergencia?",
    opciones: ["A) Quedarse quieto", "B) Seguir el plan de emergencia", "C) Salir corriendo sin aviso", "D) Esperar a que otros actúen"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es ISO 45001?",
    opciones: ["A) Sistema de calidad", "B) Sistema de seguridad y salud ocupacional", "C) Sistema ambiental", "D) Sistema financiero"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse al recibir una orden de trabajo?",
    opciones: ["A) Comenzar sin leer", "B) Leerla, aclarar dudas y evaluar riesgos", "C) Solo firmarla", "D) Entregarla a otro compañero"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué significa ISO 14001?",
    opciones: ["A) Sistema de calidad", "B) Sistema de gestión ambiental", "C) Sistema de seguridad", "D) Sistema de logística"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Cómo se debe manejar la disposición de aceites usados?",
    opciones: ["A) Tirarlos en el drenaje", "B) Disponerlos en contenedores designados y certificados", "C) Mezclarlos con otros residuos", "D) Dejarlos en el taller"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es una buena práctica de eficiencia energética?",
    opciones: ["A) Dejar equipos prendidos siempre", "B) Apagar equipos innecesarios y optimizar uso", "C) Usar solo bombillas tradicionales", "D) Aumentar el consumo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse si se detecta un derrame de sustancia peligrosa?",
    opciones: ["A) Limpiarlo solo si es pequeño", "B) Seguir procedimiento de contingencia y notificar", "C) Dejarlo para otro turno", "D) Ignorarlo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es la clasificación de residuos?",
    opciones: ["A) Agruparlos por tamaño", "B) Separarlos según su naturaleza y tratamiento", "C) Ponerlos todos juntos", "D) Solo guardarlos"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué significa NCh 3262?",
    opciones: ["A) Norma de calidad", "B) Norma de equidad y no discriminación", "C) Norma de dibujo técnico", "D) Norma de seguridad"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse para proteger los recursos hídricos en la operación?",
    opciones: ["A) Usarlos sin control", "B) Implementar buenas prácticas de uso eficiente y prevención de contaminación", "C) Solo monitorear el caudal", "D) Aumentar el consumo"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué tipo de residuos deben separarse en la operación minera?",
    opciones: ["A) Solo los grandes", "B) Todos según su clasificación (orgánicos, inorgánicos, peligrosos, etc.)", "C) Solo los electrónicos", "D) Solo los de oficina"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué es un plan de contingencia ambiental?",
    opciones: ["A) Un plan para aumentar producción", "B) Un plan para responder a emergencias ambientales", "C) Un plan de vacaciones", "D) Un plan de compras"],
    respuesta_correcta: "B"
  },
  {
    pregunta: "¿Qué debe hacerse al notar un impacto ambiental?",
    opciones: ["A) No hacer nada", "B) Comunicarlo a supervisión y seguir protocolos", "C) Solo tomar foto", "D) Esperar a que desaparezca"],
    respuesta_correcta: "B"
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
      finishQuiz();
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

  // Mostrar resumen de respuestas
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

function finishQuiz() {
  clearInterval(timer);
  showResult();
}

restartBtn.addEventListener('click', () => {
  resultContainer.style.display = 'none';
  startBtn.style.display = 'block';
});
