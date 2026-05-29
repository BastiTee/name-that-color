(() => {
  const swatch = document.getElementById("swatch");
  const choiceBtns = Array.from(document.querySelectorAll(".choice-btn"));
  const infoPanel = document.getElementById("info-panel");
  const infoName = document.getElementById("info-name");
  const infoHex = document.getElementById("info-hex");
  const infoRgb = document.getElementById("info-rgb");
  const nextBtn = document.getElementById("next-btn");

  let currentColor = null;
  let lastColor = null;
  let answered = false;

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

  function startRound() {
    answered = false;

    // Pick a color different from the last one
    let color;
    do {
      color = COLORS[Math.floor(Math.random() * COLORS.length)];
    } while (color === lastColor);
    currentColor = color;

    // Pick two distinct distractors
    const distractor1 = pickRandom(COLORS, currentColor);
    let distractor2;
    do {
      distractor2 = pickRandom(COLORS, currentColor);
    } while (distractor2 === distractor1);

    const choices = shuffle([currentColor, distractor1, distractor2]);

    // Render swatch
    swatch.style.backgroundColor = currentColor.name;

    // Render choices
    choiceBtns.forEach((btn, i) => {
      btn.textContent = choices[i].name;
      btn.dataset.colorName = choices[i].name;
      btn.className = "choice-btn";
      btn.disabled = false;
    });

    // Hide info and next button
    infoPanel.classList.add("hidden");
    nextBtn.classList.add("hidden");
  }

  function revealAnswer(selectedBtn) {
    answered = true;
    lastColor = currentColor;

    const selectedName = selectedBtn.dataset.colorName;
    const isCorrect = selectedName === currentColor.name;

    // Mark all buttons
    choiceBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.colorName === currentColor.name) {
        btn.classList.add("correct");
      } else if (btn === selectedBtn && !isCorrect) {
        btn.classList.add("incorrect");
      }
    });

    // Show metadata
    infoName.textContent = currentColor.name;
    infoHex.textContent = currentColor.hex;
    infoRgb.textContent = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    infoPanel.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }

  // Wire up choice buttons
  choiceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!answered) revealAnswer(btn);
    });
  });

  // Wire up next button
  nextBtn.addEventListener("click", startRound);

  // Start the game
  startRound();
})();
