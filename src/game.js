import { COLORS } from './colors.js';
import { t, getLocale, setLocale, LOCALES } from './i18n.js';

const swatch = document.getElementById("swatch");
const choicesDiv = document.getElementById("choices");
const choiceBtns = Array.from(document.querySelectorAll(".choice-btn"));
const infoPanel = document.getElementById("info-panel");
const infoName = document.getElementById("info-name");
const infoHex = document.getElementById("info-hex");
const infoRgb = document.getElementById("info-rgb");
const nextBtn = document.getElementById("next-btn");
const revealBtn = document.getElementById("reveal-btn");
const titleEl = document.getElementById("title");
const langSelect = document.getElementById("lang-select");

let currentColor = null;
let lastColor = null;
let answered = false;
let currentChoices = [];

function pickRandom(arr, exclude = null) {
  const pool = exclude ? arr.filter(c => c !== exclude) : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderButtons() {
  choiceBtns.forEach((btn, i) => {
    btn.textContent = t('colors.' + currentChoices[i].name);
    btn.dataset.colorName = currentChoices[i].name;
  });
}

function renderInfoPanel() {
  infoName.textContent = t('colors.' + currentColor.name);
  infoHex.textContent = currentColor.hex;
  infoRgb.textContent = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
}

function renderUI() {
  titleEl.textContent = t('ui.title');
  nextBtn.textContent = t('ui.next');
  revealBtn.textContent = t('ui.reveal');
}

function startRound() {
  answered = false;

  let color;
  do {
    color = COLORS[Math.floor(Math.random() * COLORS.length)];
  } while (color === lastColor);
  currentColor = color;

  const distractor1 = pickRandom(COLORS, currentColor);
  let distractor2;
  do {
    distractor2 = pickRandom(COLORS, currentColor);
  } while (distractor2 === distractor1);

  currentChoices = shuffle([currentColor, distractor1, distractor2]);

  swatch.style.backgroundColor = currentColor.name;

  choiceBtns.forEach(btn => {
    btn.className = "choice-btn";
    btn.disabled = false;
    btn.style.removeProperty('--btn-color');
  });

  renderButtons();
  renderUI();

  // Pre-reveal phase: hide choices, show reveal button
  choicesDiv.classList.add("hidden");
  revealBtn.classList.remove("hidden");

  infoPanel.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

function revealAnswer(selectedBtn) {
  answered = true;
  lastColor = currentColor;

  const selectedName = selectedBtn.dataset.colorName;
  const isCorrect = selectedName === currentColor.name;

  choiceBtns.forEach(btn => {
    btn.disabled = true;
    btn.classList.add("answered");
    btn.style.setProperty('--btn-color', btn.dataset.colorName);
    if (btn.dataset.colorName === currentColor.name) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  renderInfoPanel();
  renderUI();
  infoPanel.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

function onLocaleChange() {
  renderUI();
  renderButtons();
  if (answered) renderInfoPanel();
}

// Populate lang switcher
LOCALES.forEach(({ code, label }) => {
  const opt = document.createElement('option');
  opt.value = code;
  opt.textContent = label;
  langSelect.appendChild(opt);
});
langSelect.value = getLocale();

langSelect.addEventListener('change', () => setLocale(langSelect.value));
document.addEventListener('localechange', onLocaleChange);

revealBtn.addEventListener('click', () => {
  choicesDiv.classList.remove("hidden");
  revealBtn.classList.add("hidden");
});

choiceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!answered) revealAnswer(btn);
  });
});

nextBtn.addEventListener("click", startRound);

startRound();
