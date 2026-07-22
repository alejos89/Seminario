/* =====================================================
   SISTEMA DE SEGURIDAD - LÓGICA
   Tema: Hacker / Terminal
   
   PARA CAMBIAR EL PIN CORRECTO:
   Modifica la constante CORRECT_PIN más abajo.
   Debe ser exactamente 8 dígitos (string).
   ===================================================== */

// ---------- CONFIGURACIÓN FÁCIL DE CAMBIAR ----------
const CORRECT_PIN = "27242727";   // <-- Cambia este valor por el PIN real de 8 dígitos

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
  } else {
    showSection(errorSection);
  }
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

document.addEventListener("DOMContentLoaded", () => {
 
  pinInput.focus();
});

/* =====================================================
   NOTA PARA MODIFICAR:
   - Cambia CORRECT_PIN al valor de 8 dígitos que quieras.
   - Ajusta VERIFY_DURATION si quieres la animación más rápida o lenta.
   - Los mensajes de statusMessages se pueden editar libremente.
   ===================================================== */
