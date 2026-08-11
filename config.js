/**
 * Family Alert System — configuration (single source of truth).
 *
 * @typedef {Object} Preset
 * @property {string} id — stable identifier for the preset button.
 * @property {string} emoji — emoji glyph shown first in the button.
 * @property {string} label — button text (user-visible).
 * @property {string} title — ntfy X-Title shown in the notification.
 * @property {string} priority — ntfy X-Priority ("default"|"high"|"urgent"); selects the receiver-side sound.
 */

/**
 * Global configuration for one sender/receiver pair (CFG-01).
 * TOPIC is the per-pair ntfy topic. The committed value is a demo placeholder —
 * replace it with a random unguessable topic before real family use (see README).
 * Topic charset: [-_A-Za-z0-9], max 64 chars, no leading "ntfy.sh/".
 */
export const CONFIG = {
  TOPIC: "gomokelategomo-sjhasjhsa", // topic is the shared secret — change per pair, keep unguessable
  MAX_MESSAGE_LENGTH: 200,       // ALRT-02 limit, enforced in script.js
  SENDER_NAME: "Family",         // used as custom-message title prefix
};

/**
 * Preset alerts rendered as one-tap buttons. Each maps to an ntfy publish with a
 * distinctive title; priority drives the receiver-side sound. Fork and edit for your family.
 */
export const PRESETS = [
  { id: "school", emoji: "🚗", label: "Dad arrived at school", title: "🚗 Dad arrived", priority: "default" },
  { id: "food",   emoji: "🍲", label: "Food ready, come down!", title: "🍲 Food ready", priority: "high" },
  { id: "rain",   emoji: "🌧️", label: "Rain coming, take in the clothes", title: "🌧️ Rain coming", priority: "urgent" },
];
