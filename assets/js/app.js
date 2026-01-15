// Logique du jeu du nombre mystère

// Niveaux de difficulté
const difficulties = {
  facile: { min: 0, max: 50, maxAttempts: 20, label: "Facile (0-50, 20 coups)" },
  normal: { min: 0, max: 100, maxAttempts: 10, label: "Normal (0-100, 10 coups)" },
  difficile: { min: 0, max: 100, maxAttempts: 5, label: "Difficile (0-100, 5 coups)" },
  legendaire: { min: 0, max: 100, maxAttempts: 1, label: "Légendaire (0-100, 1 coup)" }
};
let currentDifficulty = 'normal';
let min = difficulties[currentDifficulty].min;
let max = difficulties[currentDifficulty].max;
let maxAttempts = difficulties[currentDifficulty].maxAttempts;
let secret = Math.floor(Math.random() * (max - min + 1)) + min;
let attempts = 0;
let history = [];
let gameOver = false;

const gameContainer = document.getElementById('game-container');
gameContainer.innerHTML = `
  <label for="difficulty">Difficulté :</label>
  <div class="nes-select" style="margin-bottom: 12px;">
    <select id="difficulty">
      ${Object.entries(difficulties).map(([key, val]) => `<option value="${key}">${val.label}</option>`).join('')}
    </select>
  </div>
  <label for="guess">Votre proposition :</label>
  <input class="nes-input" type="number" id="guess" min="${min}" max="${max}" autofocus />
  <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 12px; justify-content: center;">
    <button class="nes-btn is-success" id="validate" disabled>Valider</button>
    <button class="nes-btn" id="restart">Recommencer</button>
  </div>
  <div id="feedback"></div>
  <div id="attempts-info" style="margin-top: 10px;"></div>
  <ul id="history"></ul>
`;

const difficultySelect = document.getElementById('difficulty');
const guessInput = document.getElementById('guess');
const validateBtn = document.getElementById('validate');
const restartBtn = document.getElementById('restart');
const feedbackDiv = document.getElementById('feedback');
const historyList = document.getElementById('history');
const attemptsInfo = document.getElementById('attempts-info');

function updateAttemptsInfo() {
  attemptsInfo.textContent = `Tentatives : ${attempts} / ${maxAttempts}`;
}

difficultySelect.value = currentDifficulty;
difficultySelect.addEventListener('change', () => {
  currentDifficulty = difficultySelect.value;
  min = difficulties[currentDifficulty].min;
  max = difficulties[currentDifficulty].max;
  maxAttempts = difficulties[currentDifficulty].maxAttempts;
  guessInput.setAttribute('min', min);
  guessInput.setAttribute('max', max);
  startNewGame();
});

guessInput.addEventListener('input', () => {
  validateBtn.disabled = !guessInput.value || isNaN(guessInput.value) || guessInput.value < min || guessInput.value > max;
});

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !validateBtn.disabled) {
    submitGuess();
  }
});

validateBtn.addEventListener('click', submitGuess);
restartBtn.addEventListener('click', startNewGame);

guessInput.focus();
updateAttemptsInfo();

function submitGuess() {
  if (gameOver) return;
  const value = Number(guessInput.value);
  if (isNaN(value) || value < min || value > max) {
    feedbackDiv.textContent = 'Veuillez entrer un nombre valide.';
    feedbackDiv.style.color = '#ff3b30';
    return;
  }
  
  // Easter egg 67
  if (value === 67) {
    triggerEasterEgg67();
  }
  
  attempts++;
  history.push(value);
  updateHistory();
  updateAttemptsInfo();
  if (value < secret) {
    feedbackDiv.textContent = 'Trop petit !';
    feedbackDiv.style.color = '#ff6b35';
    feedbackDiv.style.textShadow = '0 0 8px rgba(255, 107, 53, 0.6)';
    if (typeof audioManager !== 'undefined') audioManager.playSound('wrong');
  } else if (value > secret) {
    feedbackDiv.textContent = 'Trop grand !';
    feedbackDiv.style.color = '#ff3b30';
    feedbackDiv.style.textShadow = '0 0 8px rgba(255, 59, 48, 0.6)';
    if (typeof audioManager !== 'undefined') audioManager.playSound('wrong');
  } else {
    feedbackDiv.textContent = `Bravo ! Vous avez trouvé en ${attempts} coups.`;
    feedbackDiv.style.color = '#00ff41';
    feedbackDiv.style.textShadow = '0 0 10px rgba(0, 255, 65, 0.8)';
    if (typeof audioManager !== 'undefined') audioManager.playSound('correct');
    gameOver = true;
    guessInput.disabled = true;
    validateBtn.disabled = true;
    return;
  }
  if (attempts >= maxAttempts) {
    feedbackDiv.textContent = `Perdu ! Le nombre était ${secret}.`;
    feedbackDiv.style.color = '#ff3b30';
    feedbackDiv.style.textShadow = '0 0 10px rgba(255, 59, 48, 0.7)';
    gameOver = true;
    guessInput.disabled = true;
    validateBtn.disabled = true;
  }
  guessInput.value = '';
  validateBtn.disabled = true;
  guessInput.focus();
}

function updateHistory() {
  historyList.innerHTML = '';
  history.forEach((val, i) => {
    const li = document.createElement('li');
    let result = '';
    if (val < secret) {
      result = 'est trop petit';
    } else if (val > secret) {
      result = 'est trop grand';
    } else {
      result = 'est correct';
    }
    li.textContent = `Essai ${i + 1} : ${val} ${result}`;
    li.className = 'fade-in';
    historyList.appendChild(li);
  });
  historyList.scrollTop = historyList.scrollHeight;
}

function startNewGame() {
  secret = Math.floor(Math.random() * (max - min + 1)) + min;
  attempts = 0;
  history = [];
  gameOver = false;
  feedbackDiv.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  validateBtn.disabled = true;
  updateHistory();
  updateAttemptsInfo();
  guessInput.focus();
}

// Easter egg 67
function triggerEasterEgg67() {
  // Activer le curseur personnalisé
  document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ctext y=\'24\' font-size=\'24\'%3E🎉%3C/text%3E%3C/svg%3E"), auto';
  
  // Vibration continue sur smartphone (3 fois)
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }
  
  // Créer 67 éléments qui tombent
  for (let i = 0; i < 67; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.className = 'falling-67';
      emoji.textContent = '67';
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.animationDelay = Math.random() * 2 + 's';
      emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
      document.body.appendChild(emoji);
      
      // Supprimer après l'animation
      setTimeout(() => emoji.remove(), 5000);
    }, i * 50);
  }
  
  // Musique easter egg 67
  if (typeof audioManager !== 'undefined') {
    audioManager.playSound('easterEgg67');
  }
  
  // Restaurer le curseur après 5 secondes
  setTimeout(() => {
    document.body.style.cursor = '';
  }, 5000);
}
