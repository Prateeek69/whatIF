<p align="center">
  <img src="client/public/icon.png" alt="WhatIF Logo" width="160" />
</p>

<h1 align="center">🔮 WhatIF — AI-Driven Cognitive Time Simulator</h1>

<p align="center">
  <strong>Experience the future before you choose it.</strong>
</p>

<p align="center">
  <a href="https://what-if-pc.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://www.youtube.com/watch?v=LTtSO9-LDhg" target="_blank">
    <img src="https://img.shields.io/badge/Demo_Video-YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Demo Video" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TS-61DAFB?style=flat-square&logo=react" alt="Frontend" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=flat-square&logo=node.js" alt="Backend" />
  <img src="https://img.shields.io/badge/Database-Prisma%20%7C%20Supabase%20%7C%20SQLite-3900?style=flat-square&logo=prisma" alt="Database" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat-square&logo=google-gemini" alt="AI" />
</p>

---

### 🌟 Overview

**WhatIF** is an AI-powered cognitive decision-making simulator that generates and visualizes multiple parallel future timelines based on critical choices you make today. Leveraging **Google Gemini AI**, it projects personalized, multi-dimensional outcomes across emotional, financial, career, and relationship spectrums.

It's designed to reduce decision anxiety and democratize scenario planning, showing you the long-term impacts of your choices before you take the leap.

---

## ✨ Features

- **🧠 Multi-Timeline Generation** — Get 3-5 distinct future scenarios (Optimistic, Pragmatic, Pessimistic) for any life decision powered by Gemini.
- **👤 Personalized Simulations** — The simulator factors in your risk tolerance, age, location, priorities, and unique life situation.
- **📊 Interactive Metrics** — Track and compare emotional, financial, career, and relationship scores over time.
- **⚖️ Side-by-Side Comparison** — Compare up to 3 timelines concurrently to weigh trade-offs and potential outcomes.
- **🔄 Dynamic Branching (Follow-up Decisions)** — Inject subsequent decisions into any generated timeline to see how paths evolve dynamically.
- **🔐 Secure Session & Auth** — Full guest session persistence and user login/signup with secure JWT-based authentication.
- **🎨 Immersive Glassmorphism UI** — A premium, responsive interface featuring ambient background animations, dark/light modes, and interactive sound effects.

---

## 📸 App Showcase

<table align="center">
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/0cd4854c-4bd5-4a91-b549-00f7549f432c" width="280" /><br /><sub>01. Landing Page</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/f472dbd4-e74c-4490-83ea-659db1f07863" width="280" /><br /><sub>02. Features</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/ee71924b-18fa-4b71-b7c5-d9ee04129924" width="280" /><br /><sub>03. Sign in</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/52b59e34-11d4-461a-95c7-a03d2a16d1fb" width="280" /><br /><sub>04. Alias (if guest)</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/d5464588-9f8f-426d-8351-d7db7c13c435" width="280" /><br /><sub>05. Dashboard/Home page</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/f0c751f1-5746-4eef-88f2-cb5b0b3a07ac" width="280" /><br /><sub>06. Prompt Area</sub></td>    
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/3659bc36-b7b9-4575-ba97-03d1ce3bd788" width="280" /><br /><sub>07. Interactive Graph</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/36ddb49a-be22-4a5d-bc48-fc7b0946ccdd" width="280" /><br /><sub>08. Side-by-Side Comparison</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/60101dc6-a833-4b41-a80f-9e9af0d2180a" width="280" /><br /><sub>09.  Follow-up Branching</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/7141ddf2-75e6-4726-99da-2e261b52afbf" width="280" /><br /><sub>10. New Child Timeline</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/2e318ba2-7440-47cb-b1a3-0a98a690b13a" width="280" /><br /><sub>11. Final Timeline visualisation</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/253ead90-9279-4991-a011-e19121cd3c0e" width="280" /><br /><sub>12. Model selection</sub></td>
  </tr>
</table>

## 🛠️ Tech Stack

- **Frontend:** React (TS), Vite, Zustand (State Management), React Query (Data Fetching), Glassmorphism UI
- **Backend:** Node.js, Express, Prisma (ORM)
- **Database:** SQLite (local development), Supabase PostgreSQL (production)
- **AI Core:** Google Gemini API (supporting latest Gemini models with fallback configurations)
- **Hosting:** Vercel (Frontend), Render (Backend)

---

## 🏗️ System Architecture

The client-server architecture utilizes a structured Prompt Engine to leverage Generative AI:

```mermaid
graph TD
    User[User] -->|Interacts| Client[React Client]
    Client -->|API Requests| Server[Node/Express Server]
    
    subgraph Backend
    Server -->|Auth & Data| DB[(Database: SQLite / Postgres)]
    Server -->|Context Construction| PromptEngine[Prompt Engine]
    end
    
    subgraph AI Cloud
    PromptEngine -->|Structured Prompt| Gemini[Google Gemini API]
    Gemini -->|JSON Timeline Data| PromptEngine
    end
    
    PromptEngine -->|Parsed Response| Server
    Server -->|Real-time Updates| Client
```

---

## 🧠 Gemini Integration & Prompt Engineering

WhatIF leverages the semantic and structured capabilities of Google Gemini to model life pathways.

### 1. Context-Aware Construction
Instead of basic prompts, we assemble a rich context containing:
* **User Profile**: Risk profile, priorities, age, location, and relationship status.
* **Current State**: Cumulative results of previous timeline decisions.
* **Decision Matrix**: The specific choice to simulate.

### 2. Multi-Timeline Modeling
Gemini generates **3 archetypal scenarios** simultaneously:
* **The Optimistic Path:** High-risk, high-return choices.
* **The Pragmatic Path:** Realistic, balanced, and sustainable choices.
* **The Pessimistic Path:** Stagnant, low-risk, or worst-case choices.

### 3. Structured JSON Schema
Using Gemini's structured output mode, we ensure valid and consistent JSON payloads:
```json
{
  "year": 1,
  "event": "Description of event...",
  "impact_score": 7,
  "category": "Career"
}
```

---

## 🌍 Potential Impact

* **Democratizing Foresight:** Brings strategic planning tools down to personal life choices.
* **Mitigating Anxiety:** Visualizing different outcomes helps reduce choice paralysis and helps users take bold, informed pivots.
* **Educational & Personal Growth:** Great for career counseling, financial planning, and habit visualizers.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Gemini API Key ([Get it on Google AI Studio](https://aistudio.google.com/apikey))

### Quick Setup

#### 1. Clone the repository
```bash
git clone https://github.com/prateekiitg/whatif.git
cd whatif
```

#### 2. Configure & Start Server
```bash
cd server
npm install
cp .env.example .env
# Edit .env and enter your GEMINI_API_KEY
npx prisma migrate dev
npm run dev
```

#### 3. Configure & Start Client
In a new terminal:
```bash
cd client
npm install
npm run dev
```

#### 4. Access the App
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Project Structure

```
whatif/
├── client/                 # React frontend (Vite + TS)
│   ├── src/
│   │   ├── components/     # UI elements
│   │   ├── pages/          # Full page views
│   │   ├── stores/         # Zustand global states
│   │   └── services/       # API integration
│   └── public/             # Static icons & sounds
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # Express endpoints
│   │   ├── services/       # AI logic / Prompt engines
│   │   └── middleware/     # JWT Auth & error filters
│   └── prisma/             # SQLite/PostgreSQL schemas
│
└── DEPLOY.md               # Production deployment guide
```

---

## 🔑 Environment Configuration

### Backend (`/server/.env`)

| Variable | Description |
| :--- | :--- |
| `PORT` | Server port (default: `3001`) |
| `DATABASE_URL` | Local SQLite or Supabase Postgres URI |
| `JWT_SECRET` | Secret token for JWT encryption |
| `GEMINI_API_KEY` | Google AI Studio Developer Key |

For hosting this application on Render and Vercel, check the step-by-step [DEPLOY.md](DEPLOY.md) file.
