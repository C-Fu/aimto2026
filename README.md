# Family Alerts

## What this is

A static single-page family alert site. The sender taps a preset (or types a short emoji message) and it is delivered to the family's ntfy topic. The receiver sees a push notification (ntfy app) or an in-page popup with sound (open browser tab). No backend, no accounts.

## How it works

- **Send:** the browser POSTs to `https://ntfy.sh/<topic>` with the message, title, and priority.
- **Receive:** the ntfy app delivers a push, OR the open page subscribes to the topic (Server-Sent Events) and shows a popup with sound. The browser tab must stay open to receive in-page alerts.

## Setup: your own family topic

1. Generate a random unguessable topic — use the generator at https://ntfy.sh (or any random string matching `[-_A-Za-z0-9]`, max 64 chars). **The topic is the password: do not use family names.**
2. Open `config.js` and replace `CONFIG.TOPIC` with your topic.
3. Commit and deploy.

**Topic rotation:** to revoke a leaked topic, change `CONFIG.TOPIC` here and re-deploy — every device must use the new value.

## Receiver setup (ntfy app)

1. Install the ntfy app (Android / iOS).
2. Subscribe to your topic: `ntfy.sh/<your-topic>`.
3. Enable notifications + sound in the app settings. High/urgent alerts use louder sounds — per-priority sounds are configurable in the app.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Repo → Settings → Pages.
3. Source: **Deploy from a branch** → branch `master` / `(root)` → Save.
4. Wait for the Pages build, then open the published URL.

The site is 100% static — no build command, no CI config needed (`.nojekyll` is included).

## Known limitations

- **Open access** — anyone with the topic can send. Keep it secret.
- **Fire-and-forget** — alerts are not logged, no message history.
- **In-page alerts require an open tab.**
- **Delivery depends on the free ntfy.sh service.**

## Demo verification checklist

1. Run the local server, open the page.
2. Tap a preset — hear the confirmation sound, status shows "Sent ✓".
3. Open `https://ntfy.sh/<topic>` in another tab — the message with its title appears.
4. With the page open and subscribed, send from another device — popup + sound.
5. The ntfy app receives the push.
