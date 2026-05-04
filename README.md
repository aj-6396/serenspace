# 🌿 Serenspace

**Serenspace** is an emotionally intelligent, zero-friction, and privacy-first digital space designed to provide instant emotional relief and grounding. It is not a clinical or diagnostic tool, but rather a safe and quiet sanctuary on the internet.

---

## 🌟 Core Philosophy

- **Presence over Productivity**: Focus on calm stillness rather than task-oriented actions.
- **Instant Relief**: Accessible immediately in under 2 seconds.
- **Privacy First**: Everything runs entirely in your local browser memory.
- **No Friction**: No signups, no logins, no tracking, and zero data persistence.

---

## 🎨 Visual Identity & Theme

- **Aesthetic**: Minimalist, elegant, and soft edge designs. Glassmorphism overlays and vibrant glowing tokens to soothe the mind.
- **Dark Theme**: 
  - `Background`: Deep Charcoal
  - `Accent`: Muted Amber
  - `Secondary`: Soft Sage Green
  - `Text`: Warm Gray
- **Typography**: Highly readable, dyslexia-friendly fonts with generous line spacing and medium weights.

---

## 🛠️ Features & Components

### 1. "I Need Support" Hero
- Accessible landing screen with single-click emotion tiles (`I feel anxious`, `I feel alone`, `I feel lost`, `I feel overwhelmed`).
- Direct navigation without page reload.

### 2. "Burn After Reading" Venting Space
- A complete visual distraction-free venting textarea.
- "Release" button that animates and dissolves the user's input before completely purging it from memory.

### 3. Breathing Orb (Mindful Exercise)
- An animated, guided 4-phase breathing cycle (Inhale, Hold, Exhale, Rest) with a live interactive visual and countdown timer.

---

## ⌨️ Global Keyboard Accessibility

| Shortcut | Action |
| --- | --- |
| `Escape` | Return to Home |
| `Alt + V` | Open Venting Space |
| `Alt + B` | Open Breathing Guided Exercise |

---

## 🔒 Privacy & Local-Only Architecture

- **Zustand memory-only state management**: The platform avoids `localStorage`, `sessionStorage`, cookies, and any database persistence to keep user interactions perfectly private.
- **Dynamic Dissolve Sequence**: When you release a thought, its React state is purged instantly. When the browser tab is closed, everything is gone.

---

## 💻 Tech Stack

- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Future Integration Server**: Deno Edge Functions (Supabase)

---

## 🚀 Running Locally

Follow these steps to run the platform locally on your machine:

1. Clone or download this repository.
2. Ensure you have Node.js installed.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL (defaults to `http://localhost:5173/`).

---

## 📝 Future AI Support (Edge Functions)

To enable future AI companion workflows through the platform's skeleton edge function:
1. Ensure the Supabase CLI is installed locally.
2. Run command:
   ```bash
   supabase functions deploy support
   ```
3. Add the required environment variables (`AI_API_KEY`, `AI_API_ENDPOINT`) in the Supabase Dashboard.
