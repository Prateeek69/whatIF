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
    <td align="center"><img src="https://github.com/user-attachments/assets/3cfddcec-4d88-4d06-929e-8d5b27688109" width="280" /><br /><sub>01. Dashboard</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/f0c6c8fa-7357-41e7-9905-c260feeaae4e" width="280" /><br /><sub>02. Add Decision</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/fb262fe0-e522-4e16-9b44-db37e0d98754" width="280" /><br /><sub>03. Simulating</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/651b1856-6917-46e6-88d7-be717eddc891" width="280" /><br /><sub>04. Timelines Overview</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/b0bc022e-861c-4b0c-b1f9-92d5e206f3b7" width="280" /><br /><sub>05. Side-by-Side Comparison</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/2f239571-bd2d-4062-88f5-f9ed417b3d3d" width="280" /><br /><sub>06. Timeline Details</sub></td>    
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/0da9ebec-4457-49a9-9a2f-e658c15b550e" width="280" /><br /><sub>07. Interactive Graph</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/c09765a4-560d-4406-8900-21e07a4a9cd8" width="280" /><br /><sub>08. Follow-up Branching</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/b3c1117e-5b74-4902-a3d6-619bf2df7df2" width="280" /><br /><sub>09. Profile Settings</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/511b3fef-afd9-4638-9d39-0c147a524bc0" width="280" /><br /><sub>10. Auth Screen</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/e8dce624-9fda-4ce0-94fe-26e339334d5d" width="280" /><br /><sub>11. Sound & Settings</sub></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/dba319ff-04d3-4026-841c-45460f72416a" width="280" /><br /><sub>12. History</sub></td>
  </tr>
</table>


(will be adding it soon,i am just procrastinating , pls wait)
---

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
