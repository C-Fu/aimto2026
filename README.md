# Family Alerts 📢

[**Bahasa Melayu**](README.ms-MY.md) | English

A tiny, no-backend web app that lets family members send quick alerts and short messages to each other — with emoji and sound. Fork it, change one setting, and you have your own family alert app.

**Live demo:** https://c-fu.github.io/aimto2026/

---

## 📽️ Media & pitch materials

**Watch the demo (2 min):**

<video src="Family_Alert_System.mp4" controls style="max-width:100%;"></video>

**Slide decks:**
- 🇲🇾 [Family Alert System — Malaysia Pitch](Family%20Alert%20System%20-%20Malaysia%20Pitch.pptx) — pitch deck (PowerPoint)
- 📶 [Signal Over Noise](Signal_Over_Noise.pptx) — concept deck (PowerPoint)

**One-image pitch:**

![Custom Family Alert System Guide](Custom_Family_Alert_System_Guide.png)

---

## What this is

A static single-page website. The sender taps a preset button (or types a short emoji message) and it is instantly delivered to the family's **ntfy topic**. The receiver sees it as a push notification (on the ntfy phone app) or as an in-page popup with a sound (on a browser tab). No backend, no accounts, no sign-ups.

---

## What is ntfy.sh?

[ntfy.sh](https://ntfy.sh) is a free, open-source "push notification" service — think of it as a **WhatsApp message for your phone, but without any accounts or groups**.

### What it does
- You pick a **topic** — a secret word like `gomokelategomo-sjhasjhsa`. That topic is your "phone number".
- Any app or website that knows the topic can send a message to it.
- Anyone subscribed to that topic receives the message instantly as a push notification on their phone or browser.

### What it can do
- Send **push notifications** to the ntfy app (Android/iOS) — works even when the app is closed
- Send messages that show up as **popups with sound** in any open browser tab
- Set a **title**, **priority** (quiet to very urgent), and **emoji tags**
- Messages are **fire-and-forget** — no history, no accounts, no tracking

### Why this project uses it
ntfy is perfect here because it is **free, needs no sign-up, and has no backend**. The whole project is just static files (HTML + JavaScript) that talk directly to ntfy — so it can be hosted for free on GitHub Pages with zero servers to run or bills to pay.

---

## How this project uses ntfy

| Step | What happens |
|------|--------------|
| **You tap a preset** (e.g. "🚗 Dad arrived at school") | The page sends a `POST` to `https://ntfy.sh/gomokelategomo-sjhasjhsa` with the message, title, and priority |
| **Receiver's phone (ntfy app)** | Instantly shows a push notification — high/urgent alerts use louder sounds |
| **Receiver's browser (this page, open)** | Shows a popup with a three-tone sound + writes to a received-alerts list |
| **Anyone, anywhere** | Anyone with the topic can also watch it at `https://ntfy.sh/gomokelategomo-sjhasjhsa` in a browser |

**This project's topic:** `gomokelategomo-sjhasjhsa`
**Watch it here:** https://ntfy.sh/gomokelategomo-sjhasjhsa

> ⚠️ The topic is the password. Anyone who knows it can send to it. Keep it private, and rotate it if it ever leaks (see below).

---

## For non-tech people: how to make this app your own (fork it)

You don't need to write code — you only need to copy ("fork") this project and change one word. Here's the full path from zero to your own family alert app:

### Step 1 — Get a GitHub account
Go to https://github.com and sign up for a free account (if you don't have one).

### Step 2 — Fork this project
1. Open the project page: https://github.com/C-Fu/aimto2026
2. Click the **Fork** button (top-right corner). This creates **your own copy** of the project.
3. GitHub will take you to your new copy. Its address will look like `https://github.com/YOUR-NAME/aimto2026`.

### Step 3 — Create your own secret topic
1. Open https://ntfy.sh in a browser and look for the topic name generator (or just make up a long random word with letters, numbers, dashes or underscores — e.g. `myfamily-2026-r7x9k2`).
2. **Tip:** use something random like `myfamily-r7x9k2-blue-42` — never your family name or phone number.

### Step 4 — Change the topic in your copy
1. In your forked project, open the file **`config.js`**.
2. Find the line that says:
   `TOPIC: "gomokelategomo-sjhasjhsa"`
3. Replace `gomokelategomo-sjhasjhsa` with **your own secret topic**, e.g.:
   `TOPIC: "myfamily-r7x9k2-blue-42"`
4. Click **Commit changes** (green button). Done — you just edited a file!

### Step 5 — Publish your app to the web (free, 5 minutes)
1. In your fork, open **Settings** → **Pages** (in the left menu).
2. Under **Source**, choose: **Deploy from a branch**.
3. Set **Branch** to `master` (or `main`) and folder to `/ (root)`. Click **Save**.
4. Wait about 1 minute. GitHub will show you your live address — something like `https://YOUR-NAME.github.io/aimto2026/`.

> 📖 For the full step-by-step guide (turning it on, finding your URL, updating, troubleshooting, custom domain), see **["How to enable & use GitHub Pages"](#how-to-enable--use-github-pages-complete-guide)** below.

### Step 6 — Tell your family
1. Send everyone the link to your live site (from Step 5).
2. Ask them to **install the free ntfy app** (Android or iOS) and subscribe to your topic:
   open the app → tap **+** → type your topic, e.g. `myfamily-r7x9k2-blue-42`.
3. Open your site on your phone. Tap a preset or type a message. Everyone who subscribed hears it immediately! 🎉

### Changing the preset buttons (optional, no code)
Open `config.js` and edit the **`PRESETS`** list — each line is one button. Example:
```js
{ id: "school", emoji: "🚗", label: "Dad arrived at school", title: "🚗 Dad arrived", priority: "default" },
```
Change the `label` (what the button says), the `emoji`, and the `priority` (`default` = normal, `high` = loud, `urgent` = very loud). Save, commit, and your site updates.

### Rotating a leaked topic
If your topic leaks, change it back in `config.js` (Step 4), commit, and tell everyone to subscribe to the new one. That instantly revokes the old one.

---

## How to enable & use GitHub Pages (complete guide)

GitHub Pages is the **free web hosting** that publishes your repository as a website. This project needs no build step — you just tell GitHub to serve the files, and it does.

### A. Turn on GitHub Pages (5 minutes)

1. Go to your forked repository on github.com (e.g. `https://github.com/YOUR-NAME/aimto2026`).
2. Click **Settings** (the tab near the top-right of the repo page).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment → Source**, click the dropdown and choose **Deploy from a branch**.
5. Under **Branch**, click the dropdown and choose your branch — `master` or `main` (whichever exists in your fork).
6. Next to the branch, keep the folder as **`/ (root)`**.
7. Click **Save**.
8. Wait about 1–2 minutes. GitHub is building your site.

> 💡 If you don't see a `Pages` option, your repo may be empty or you may be on the wrong repository — make sure you're on **your fork**, not the original.

### B. Find your live website address

- Your site URL is automatically: `https://YOUR-NAME.github.io/aimto2026/`
- (If your repo is named differently, the last part changes to match: `https://YOUR-NAME.github.io/REPO-NAME/`)
- GitHub shows the URL at the top of the **Settings → Pages** page once the build finishes.
- You can also check under the **Actions** tab — a green checkmark means the deploy succeeded.

### C. Update your site after changes

Every time you change files (e.g. edit `config.js` or the presets) and click **Commit changes** on GitHub, Pages **automatically re-publishes** the site. Wait ~1 minute and refresh your page to see the update.

### D. Troubleshooting

| Symptom | Fix |
|---------|-----|
| Site shows "404" or blank | Wait 2 more minutes (first build takes longest). Then check **Actions** tab for a green checkmark. |
| You see the folder listing, not the app | You selected a wrong branch/folder in Step A — it must be branch `master`/`main` and folder `/ (root)`. |
| Styles/sounds missing | Your browser cached an old version — hard refresh (Ctrl+Shift+R on desktop). |
| Red ✗ in Actions | Open the failed run, read the message, and ask for help (or open a GitHub issue). |
| `YOUR-NAME.github.io` isn't loading | You need at least one file in the repo root — this project already has `index.html`, so this only happens on empty repos. |

### E. Make it your own address (optional)

You can use a custom domain (e.g. `alerts.myfamily.com`) instead of the default URL:

1. Buy a domain from any registrar.
2. In the registrar's DNS settings, add a CNAME record pointing to `YOUR-NAME.github.io`.
3. In **Settings → Pages → Custom domain**, enter your domain and click **Save**.
4. Enable **Enforce HTTPS** after DNS propagates (a few hours).

---

## Receiver setup (ntfy app)

1. Install the ntfy app (Android / iOS).
2. Subscribe to your topic (the secret word you chose).
3. Enable notifications + sound in the app settings. High/urgent alerts use louder sounds.

---

## Run it on your own computer (optional)

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

---

## Known limitations

- **Open access** — anyone with the topic can send. Keep it secret.
- **Fire-and-forget** — alerts are not logged, no message history.
- **In-page alerts require an open tab.** (The ntfy phone app works with the app closed; the browser page does not.)
- **Delivery depends on the free ntfy.sh service.**

---

## Ideas to make it better (for your own use)

This project is deliberately tiny so you can fork it and build on it. Here are ideas, from easy to more advanced:

- **More presets** — add your family's real messages ("Dinner ready", "I'm home", "Call me"). Just add lines to `PRESETS` in `config.js`.
- **Two-way chat** — add a sender section for both sides so any family member can reply.
- **Different sounds per person** — ntfy maps priorities to sounds; give each family member their own priority or their own topic.
- **Name/avatar per family member** — show who sent the alert in the popup and in the received-alerts list.
- **Vibration pattern** — trigger a custom vibration with the Web Vibration API on mobile.
- **Wake lock / keep tab awake** — use the Wake Lock API so the receiver tab doesn't sleep on mobile.
- **Location preset** — a "Pick me up" button that sends your location link (using the browser's geolocation).
- **Scheduled or repeat alerts** — e.g. a medication reminder that repeats.
- **Attachments** — ntfy supports images/files; add a button to send a photo ("Here's what I bought").
- **UnifiedPush** — integrate ntfy's UnifiedPush for Android to save battery.
- **Password-protect your topic** — ntfy supports access tokens; add a simple passcode gate if you want more control than "keep it secret".
- **Message log (optional)** — ntfy keeps recent messages in its web view; decide whether you want a small on-page history.

---

## Tech notes (for curious users)

- 100% static: pure HTML, CSS, vanilla JavaScript. No build step.
- Hosted on GitHub Pages (free). PWA installable (add to home screen).
- Talks to ntfy via simple HTTPS calls (`fetch` POST to publish, Server-Sent Events to receive).
- No frameworks, no dependencies, no cookies, no tracking.

---

*Made for the family. Fork it, make it yours.*
