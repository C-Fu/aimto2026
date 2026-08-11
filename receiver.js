import { CONFIG } from "./config.js";
import { subscribeTopic } from "./ntfy-client.js";

const popup = document.getElementById("alert-popup");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");
const notifyStatus = document.getElementById("notify-status");
const notifyBtn = document.getElementById("notify-btn");
const alertHistory = document.getElementById("alert-history");
const historyEmpty = document.getElementById("history-empty");

let audioCtx = null;
let popupTimer = null;

function playAlertSound() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
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

function addToHistory(title, message) {
  const item = document.createElement("li");
  const time = new Date().toLocaleTimeString();
  item.textContent = `[${time}] ${title} — ${message}`;
  alertHistory.prepend(item);
  historyEmpty.hidden = true;
}

function sendSystemNotification(title, message) {
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(title, { body: message, icon: "icon.svg" });
    } catch (err) {
      console.error("notification failed:", err);
    }
  }
}

function updateNotifyStatus() {
  if (!("Notification" in window)) {
    notifyStatus.textContent = "System notifications not supported in this browser.";
    notifyBtn.hidden = true;
    return;
  }
  if (Notification.permission === "granted") {
    notifyStatus.textContent = "System notifications enabled.";
    notifyBtn.hidden = true;
  } else if (Notification.permission === "denied") {
    notifyStatus.textContent = "Notifications blocked — enable them in browser settings.";
  } else {
    notifyStatus.textContent = "Tap the button to allow system notifications.";
  }
}

notifyBtn.addEventListener("click", async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      playAlertSound();
      new Notification("Family Alerts", { body: "Notifications enabled ✓" });
    }
  } catch (err) {
    console.error("notification permission failed:", err);
  }
  updateNotifyStatus();
});

updateNotifyStatus();

subscribeTopic(CONFIG.TOPIC, ({ title, message }) => {
  showPopup(title, message);
  addToHistory(title, message);
  sendSystemNotification(title, message);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch((err) => {
    console.error("service worker registration failed:", err);
  });
}
