import { CONFIG, PRESETS } from "./config.js";
import { sendAlert, subscribeTopic } from "./ntfy-client.js";

const statusEl = document.getElementById("status");
const presetGrid = document.getElementById("preset-grid");
const customForm = document.getElementById("custom-form");
const customInput = document.getElementById("custom-input");
const charCount = document.getElementById("char-count");

const STATUS_SENDING = "Sending…";
const STATUS_SENT = "Sent ✓";
const STATUS_FAILED = "Couldn't send — check your connection and try again";

let audioCtx = null;

function playConfirmSound() {
  try {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    const now = audioCtx.currentTime;
    [660, 880].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = now + i * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.3, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + 0.16);
    });
  } catch (err) {
    console.error("confirm sound failed:", err);
  }
}

function playAlertSound() {
  try {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    const now = audioCtx.currentTime;
    [660, 880, 1320].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = now + i * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.35, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + 0.17);
    });
  } catch (err) {
    console.error("alert sound failed:", err);
  }
}

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.classList.remove("status-success", "status-error");
  if (text === STATUS_SENT) statusEl.classList.add("status-success");
  if (isError) statusEl.classList.add("status-error");
}

async function handleSend(opts) {
  setStatus(STATUS_SENDING);
  const ok = await sendAlert({ topic: CONFIG.TOPIC, ...opts });
  if (ok) {
    setStatus(STATUS_SENT);
    playConfirmSound();
  } else {
    setStatus(STATUS_FAILED, true);
    console.error("send failed:", opts);
  }
}

PRESETS.forEach((preset) => {
  const button = document.createElement("button");
  button.className = "preset-btn";
  button.type = "button";
  button.textContent = preset.emoji + " " + preset.label;
  button.dataset.presetId = preset.id;
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      await handleSend({
        message: preset.emoji + " " + preset.label,
        title: preset.title,
        priority: preset.priority,
      });
    } finally {
      button.disabled = false;
    }
  });
  presetGrid.appendChild(button);
});

customForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = customInput.value.trim();
  if (!value) {
    setStatus("Please type a message first", true);
    return;
  }
  if (value.length > CONFIG.MAX_MESSAGE_LENGTH) {
    setStatus(`Message is too long (max ${CONFIG.MAX_MESSAGE_LENGTH} characters)`, true);
    return;
  }
  try {
    await handleSend({
      message: value,
      title: CONFIG.SENDER_NAME + " 📢 alert",
      priority: "default",
    });
    customInput.value = "";
    updateCharCount();
  } catch (err) {
    setStatus(STATUS_FAILED, true);
    console.error("send failed:", err);
  }
});

function updateCharCount() {
  const length = customInput.value.length;
  charCount.textContent = `${length}/${CONFIG.MAX_MESSAGE_LENGTH}`;
  charCount.classList.toggle("visible", length > CONFIG.MAX_MESSAGE_LENGTH / 2);
}

customInput.addEventListener("input", updateCharCount);

// Receiver: popup + sound for incoming alerts.
const popup = document.getElementById("alert-popup");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");
let popupTimer = null;

function showPopup(title, message) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.hidden = false;
  popup.setAttribute("aria-hidden", "false");
  playAlertSound();
  if (popupTimer) clearTimeout(popupTimer);
  popupTimer = setTimeout(() => hidePopup(), 8000);
}

function hidePopup() {
  popup.hidden = true;
  popup.setAttribute("aria-hidden", "true");
  if (popupTimer) {
    clearTimeout(popupTimer);
    popupTimer = null;
  }
}

popupClose.addEventListener("click", hidePopup);

subscribeTopic(CONFIG.TOPIC, ({ title, message }) => {
  showPopup(title, message);
});
