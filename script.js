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

let currentQuestionIndex;
let score;

// Banco de preguntas
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
    pregunta: "¿Qué significa DS 132?",
    opciones: ["A) Documento de seguridad", "B) Decreto Supremo de Seguridad Minera", "C) Documento de sistema", "D) Departamento de salud"],
    respuesta_correcta: "B"
  },
  // Agrega más preguntas aquí si lo deseas...
];

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  startBtn.style.display = 'none';
  quizContainer.style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
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

  if (answer === questions[currentQuestionIndex].respuesta_correcta) {
    score++;
  }

  Array.from(optionsContainer.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === questions[currentQuestionIndex].respuesta_correcta) {
      button.style.backgroundColor = '#28a745';
      button.style.color = 'white';
    }
  });

  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
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
}

restartBtn.addEventListener('click', () => {
  resultContainer.style.display = 'none';
  startBtn.style.display = 'block';
});
