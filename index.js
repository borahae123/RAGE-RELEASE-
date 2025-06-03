const rageZone = document.getElementById('rage-zone');
const calmZone = document.getElementById('calm-zone');
const rantZone = document.getElementById('rant-zone');
const finalZone = document.getElementById('final-zone');
const calmWords = document.getElementById('calm-words');
const rantInput = document.getElementById('rant-input');
const submitBtn = document.getElementById('submit-rant');

let rageTimer;
let calmTimer;

const frustrationWords = ["Ugh!", "Grr!", "Why?!", "Noooo!", "Damn!", "Argh!", "Freak!"];
const calmPhrases = ["That's right", "You're okay", "Take a deep breath", "I'm with you", "You got this", "One moment at a time"];

// Utility function to clear all rage event listeners
function clearRageListeners() {
  document.removeEventListener('keydown', handleRageTrigger);
  document.body.removeEventListener('touchstart', handleRageTrigger);
}

// The single rage effect function for both keydown and tap events
function doRageEffect() {
  clearTimeout(rageTimer);

  const word = frustrationWords[Math.floor(Math.random() * frustrationWords.length)];
  const span = document.createElement('span');
  span.textContent = word;
  span.style.position = 'fixed';
  span.style.color = 'crimson';
  span.style.fontWeight = '900';
  span.style.fontSize = `${Math.floor(Math.random() * 20 + 18)}px`;
  span.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  span.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  span.style.userSelect = 'none';
  span.style.pointerEvents = 'none';
  span.style.zIndex = '1000';

  const animation = span.animate([
    { transform: 'translate(0, 0)' },
    { transform: `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)` },
    { transform: 'translate(0, 0)' }
  ], {
    duration: 800,
    iterations: Infinity,
    direction: 'alternate'
  });

  document.body.appendChild(span);

  setTimeout(() => {
    animation.cancel();
    span.remove();
  }, 1500);

  // Flickering red-black gradient background
  document.body.style.background = `radial-gradient(circle, rgba(139,0,0,0.8), black 70%)`;

  // After 3 seconds of no input, move to calm phase
  rageTimer = setTimeout(() => {
    clearRageListeners();
    startCalmPhase();
  }, 3000);
}

// Handler for both keydown and touchstart to trigger rage effect
function handleRageTrigger(e) {
  e.preventDefault(); // For touch, prevent ghost clicks; for keyboard it’s harmless
  doRageEffect();
}

// Show only the active phase and hide others
function showPhase(phase) {
  document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
  phase.classList.add('active');
}

function startRagePhase() {
  showPhase(rageZone);
  document.body.style.backgroundColor = '#330000';
  document.body.style.backgroundImage = 'none';

  // Attach event listeners to whole document/body so ANY tap or key triggers rage
  document.addEventListener('keydown', handleRageTrigger);
  document.body.addEventListener('touchstart', handleRageTrigger, { passive: false });
}

function startCalmPhase() {
  showPhase(calmZone);
  calmWords.textContent = '';
  document.body.style.backgroundColor = '#f0e6ff'; // soft purple cream
  document.body.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/07/15/20/44/flower-1526848_960_720.png")'; 
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center bottom';
  document.body.style.backgroundSize = 'contain';

  let index = 0;

  calmTimer = setInterval(() => {
    if (index < calmPhrases.length) {
      calmWords.textContent = calmPhrases[index++];
    } else {
      clearInterval(calmTimer);
      startRantPhase();
    }
  }, 1500);
}

function startRantPhase() {
  showPhase(rantZone);
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#fff0f5'; // light calm pinkish
}

submitBtn.addEventListener('click', () => {
  startFinalZone();
});

function startFinalZone() {
  showPhase(finalZone);
  document.body.style.backgroundColor = '#fbefff';
  document.body.style.backgroundImage = 'none';
}

// Kick off the game
window.onload = () => {
  startRagePhase();
};
