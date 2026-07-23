


const CORRECT_PIN = "27242727";   

const VERIFY_DURATION = 2800;


const pinSection = document.getElementById("pin-section");
const verifySection = document.getElementById("verify-section");
const errorSection = document.getElementById("error-section");
const successSection = document.getElementById("success-section");

const pinInput = document.getElementById("pin-input");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");

const progressFill = document.getElementById("progress-fill");
const progressBars = document.getElementById("progress-bars");
const verifyStatus = document.getElementById("verify-status");

const discoverBtn = document.getElementById("discover-btn");
const gifContainer = document.getElementById("gif-container");

const statusMessages = [
  "Iniciando escaneo de credenciales...",
  "Comprobando integridad del código...",
  "Validando acceso al sistema...",
  "Autenticación en proceso...",
  "Finalizando verificación..."
];


const barStages = [
  "█░░░░░░░░░",
  "███░░░░░░░",
  "██████░░░░",
  "████████░░",
  "██████████"
];


function showSection(sectionToShow) {
  pinSection.classList.add("hidden");
  verifySection.classList.add("hidden");
  errorSection.classList.add("hidden");
  successSection.classList.add("hidden");

  sectionToShow.classList.remove("hidden");
}


function resetToPin() {
  pinInput.value = "";
  pinInput.disabled = false;
  submitBtn.disabled = false;
  progressFill.style.width = "0%";
  progressBars.textContent = barStages[0];

 
  if (gifContainer) {
    gifContainer.classList.add("hidden");
    gifContainer.classList.remove("show");
  }
  if (discoverBtn) {
    discoverBtn.classList.remove("hidden");
  }

  showSection(pinSection);
  pinInput.focus();
}


function filterNumericInput(event) {
  if (event.key === "Backspace" || event.key === "Delete" || 
      event.key === "Tab" || event.key === "Enter" ||
      event.key === "ArrowLeft" || event.key === "ArrowRight") {
    return;
  }

  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
}


function runVerificationAnimation() {
  return new Promise((resolve) => {
    let startTime = null;
    const totalSteps = barStages.length;

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / VERIFY_DURATION, 1);

      progressFill.style.width = (progress * 100) + "%";

      const stepIndex = Math.min(
        Math.floor(progress * totalSteps),
        totalSteps - 1
      );
      progressBars.textContent = barStages[stepIndex];
      verifyStatus.textContent = statusMessages[stepIndex];

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        progressFill.style.width = "100%";
        progressBars.textContent = barStages[totalSteps - 1];
        verifyStatus.textContent = statusMessages[totalSteps - 1];
        setTimeout(resolve, 300);
      }
    }

    requestAnimationFrame(animate);
  });
}


async function handleSubmit() {
  const enteredPin = pinInput.value.trim();

  if (enteredPin.length !== 8 || !/^\d{8}$/.test(enteredPin)) {
    pinInput.classList.add("shake");
    setTimeout(() => pinInput.classList.remove("shake"), 400);
    return;
  }

  pinInput.disabled = true;
  submitBtn.disabled = true;

  showSection(verifySection);
  await runVerificationAnimation();

  if (enteredPin === CORRECT_PIN) {
    showSection(successSection);
    
    launchConfetti();
  } else {
    showSection(errorSection);
  }
}


function launchConfetti() {
 
  let canvas = document.getElementById("confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#00ff41", "#00cc33", "#39ff14", "#7CFC00", "#ADFF2F", "#ffffff"];
  const particleCount = 120;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 - 50,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 1,
      decay: Math.random() * 0.015 + 0.008
    });
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;

    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravedad
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.life -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (alive) {
      requestAnimationFrame(animateConfetti);
    } else {
      
      setTimeout(() => {
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }, 500);
    }
  }

  animateConfetti();
}


if (discoverBtn) {
  discoverBtn.addEventListener("click", () => {
    // Ocultar el botón
    discoverBtn.classList.add("hidden");

 
    gifContainer.classList.remove("hidden");
   
    void gifContainer.offsetWidth;
    gifContainer.classList.add("show");
  });
}


submitBtn.addEventListener("click", handleSubmit);

pinInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

pinInput.addEventListener("keydown", filterNumericInput);

pinInput.addEventListener("paste", (event) => {
  event.preventDefault();
  const pasted = (event.clipboardData || window.clipboardData).getData("text");
  const numbersOnly = pasted.replace(/\D/g, "").slice(0, 8);
  pinInput.value = numbersOnly;
});

retryBtn.addEventListener("click", resetToPin);

// ---------- INICIALIZACIÓN ----------
document.addEventListener("DOMContentLoaded", () => {
  pinInput.focus();
});
