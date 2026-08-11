# Simple Family Alert System (HTML + ntfy)

## 🎯 Idea
A lightweight one-way alert system between two devices.  
Purpose: let family members send quick alerts + short messages (with emoji + sound) to notify each other in daily life.

Examples:
- 👨 Father → 👦 Son: "🚗 Dad arrived at school"
- 👩 Mother → 👧 Child: "🍲 Food ready, turun bawah!"
- 👩 Wife → 👨 Husband: "🌧️ Rain coming, pick up clothes!"

## 🛠️ Tech Stack
- **Frontend only**: Pure HTML, CSS, JS (hosted on GitHub Pages)
- **Messaging**: [ntfy](https://ntfy.sh) topics for push notifications
- **No backend**: Direct client-side fetch calls to ntfy API
- **Customization**: Fork and edit to suit your family’s needs

## 🔑 Design Decisions
- ✅ Emoji + short message + alert sound
- ✅ Push notification via ntfy (mobile app or browser)
- ✅ Open access (no authentication)
- ✅ As simple as possible (single button or quick input)
- ✅ Alerts disappear after being read (no logging/history)
- ✅ Each sender/receiver pair uses a **unique ntfy channel**
- ✅ Simple English + friendly Bahasa Melayu phrases

## 🚀 How It Works
1. Each family member has their own ntfy topic (e.g., `ntfy.sh/father-son`).
2. Sender clicks a button or enters a short message → JS sends POST to ntfy topic.
3. Receiver gets:
   - Push notification via ntfy app, OR
   - Alert sound + message popup on the GitHub Pages site.

## 📂 Structure
