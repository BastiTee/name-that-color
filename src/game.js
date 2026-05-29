import { COLORS } from './colors.js';
import { t, getLocale, setLocale, LOCALES } from './i18n.js';

function rgbToLab(r, g, b) {
  // sRGB → linear
  const lin = v => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const rl = lin(r), gl = lin(g), bl = lin(b);
  // linear RGB → XYZ (D65)
  const x = (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / 0.95047;
  const y = (rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750) / 1.00000;
  const z = (rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041) / 1.08883;
  // XYZ → Lab
  const f = v => v > 0.008856 ? Math.cbrt(v) : (7.787 * v) + 16 / 116;
  return { L: 116 * f(y) - 16, a: 500 * (f(x) - f(y)), b: 200 * (f(y) - f(z)) };
}

function labToHue(a, b) {
  const h = Math.atan2(b, a) * 180 / Math.PI;
  return h < 0 ? h + 360 : h;
}

function findNeighbors(color) {
  const seen = new Set();
  const unique = COLORS.filter(c => {
    if (c.hex === color.hex || seen.has(c.hex)) return false;
    seen.add(c.hex);
    return true;
  });
  const target = rgbToLab(color.r, color.g, color.b);
  const targetHue = labToHue(target.a, target.b);
  const ranked = unique
    .map(c => {
      const lab = rgbToLab(c.r, c.g, c.b);
      const dE = Math.sqrt((lab.L - target.L) ** 2 + (lab.a - target.a) ** 2 + (lab.b - target.b) ** 2);
      const hue = labToHue(lab.a, lab.b);
      return { c, dE, hue };
    })
    .sort((a, b) => a.dE - b.dE);

  const first = ranked[0];
  const second = ranked[1];
  const firstLower = first.hue <= targetHue;
  const secondLower = second.hue <= targetHue;

  let left, right;
  if (firstLower !== secondLower) {
    left = firstLower ? first.c : second.c;
    right = firstLower ? second.c : first.c;
  } else {
    const opposite = ranked.find(e => (e.hue <= targetHue) !== firstLower);
    if (firstLower) {
      left = first.c;
      right = opposite ? opposite.c : second.c;
    } else {
      left = opposite ? opposite.c : second.c;
      right = first.c;
    }
  }
  return { left, right };
}

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
const similarPanel = document.getElementById("similar-panel");
const simLeftSwatch = document.getElementById("sim-left-swatch");
const simCenterSwatch = document.getElementById("sim-center-swatch");
const simRightSwatch = document.getElementById("sim-right-swatch");
const simLeftName = document.getElementById("sim-left-name");
const simCenterName = document.getElementById("sim-center-name");
const simRightName = document.getElementById("sim-right-name");

let currentColor = null;
let lastColor = null;
let answered = false;
let currentChoices = [];
let currentNeighbors = null;

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

function renderSimilarPanel() {
  if (!currentNeighbors) return;
  const { left, right } = currentNeighbors;
  simLeftSwatch.style.backgroundColor = left.name;
  simCenterSwatch.style.backgroundColor = currentColor.name;
  simRightSwatch.style.backgroundColor = right.name;
  simLeftName.textContent = t('colors.' + left.name);
  simCenterName.textContent = t('colors.' + currentColor.name);
  simRightName.textContent = t('colors.' + right.name);
}

function renderUI() {
  titleEl.textContent = t('ui.title');
  nextBtn.textContent = t('ui.next');
  revealBtn.textContent = t('ui.reveal');
}

function startRound() {
  answered = false;
  currentNeighbors = null;

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

  choicesDiv.classList.add("hidden");
  revealBtn.classList.remove("hidden");

  infoPanel.classList.add("hidden");
  similarPanel.classList.add("hidden");
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

  currentNeighbors = findNeighbors(currentColor);

  renderInfoPanel();
  renderSimilarPanel();
  renderUI();
  infoPanel.classList.remove("hidden");
  similarPanel.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

function onLocaleChange() {
  renderUI();
  renderButtons();
  if (answered) {
    renderInfoPanel();
    renderSimilarPanel();
  }
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
