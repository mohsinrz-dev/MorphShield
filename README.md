# MorphShield
**Real-Time Deepfake Voice & Video Scam Detection**
Team DIAMOND · Hackathon Prototype 2026

---

## ▶ Run the project

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm start
```
Runs at → http://localhost:8080

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs at → http://localhost:5173

Then open http://localhost:5173 in your browser.

## GitHub Pages

The frontend is deployed from the `frontend` directory by the
[Deploy GitHub Pages workflow](./.github/workflows/deploy-pages.yml) whenever
changes are pushed to `main`. The live site is
https://mohsinrz-dev.github.io/MorphShield/.

GitHub Pages hosts only static frontend files. API-backed features require the
backend to be deployed separately and the frontend API URL to be configured for
that hosted backend.

---

## ✅ What is complete

### Backend — 100% COMPLETE
All endpoints are working. Pre-seeded with mock data from the Figma design.

| File | Status | What it does |
|------|--------|--------------|
| `backend/server.js` | ✅ Done | Main Express app, runs on port 8080 |
| `backend/data/store.js` | ✅ Done | In-memory store with 6 pre-seeded detections |
| `backend/routes/health.js` | ✅ Done | GET /api/health |
| `backend/routes/auth.js` | ✅ Done | POST /api/auth/login, logout, register, GET /me |
| `backend/routes/detection.js` | ✅ Done | POST analyze / demo / voice / video / live/start / live/stop / live/assessment + GET /:id |
| `backend/routes/history.js` | ✅ Done | GET list with stats, GET /:id, DELETE /:id, DELETE /clear |
| `backend/routes/settings.js` | ✅ Done | GET and PUT /api/settings |
| `backend/routes/robustness.js` | ✅ Done | POST /api/robustness/test |
| `backend/routes/plans.js` | ✅ Done | GET /api/plans (Family Guardian + Individual Pro) |
| `backend/routes/safety.js` | ✅ Done | GET /api/safety (core rules, red flags, emergency) |

### Frontend — 6 of 15 pages complete

| Page | File | Status | Route |
|------|------|--------|-------|
| Home | `pages/Home.jsx` | ✅ Done | `/` |
| Detection Dashboard | `pages/Detection.jsx` | ✅ Done | `/detect` |
| Results | `pages/Results.jsx` | ✅ Done | `/results` |
| Robustness Testing | `pages/Robustness.jsx` | ✅ Done | `/robustness` |
| Settings | `pages/Settings.jsx` | ✅ Done | `/settings` |
| About | `pages/About.jsx` | ✅ Done | `/about` |

### Frontend config — FIXED
| File | Status | Why |
|------|--------|-----|
| `frontend/index.html` | ✅ Added | Was missing — Vite needs this |
| `frontend/tailwind.config.js` | ✅ Added | Was missing — caused all CSS to break |
| `frontend/postcss.config.js` | ✅ Added | Was missing — caused Tailwind to not process |

---

## 🚧 What is NOT done (Figma pages pending)

These pages exist in the Figma prototype but have not been built in React yet.
Each one has a placeholder that shows exactly what needs to be built and which API to call.
The backend for every single one of these is already complete.

| Page | File | Route | Figma Screenshot |
|------|------|-------|-----------------|
| Login | `pages/Login.jsx` | `/login` | Image 9 |
| Get Started / Pricing | `pages/GetStarted.jsx` | `/get-started` | Image 2 |
| How It Works | `pages/HowItWorks.jsx` | `/how-it-works` | Image 5 |
| Detection History | `pages/History.jsx` | `/history` | Image 7 |
| Safety Tips | `pages/SafetyTips.jsx` | `/safety-tips` | Image 11 |
| Voice Detection (upload) | `pages/VoiceDetection.jsx` | `/voice-detection` | Image 1 |
| Detection Result | `pages/DetectionResult.jsx` | `/detection-result` | Image 3 |
| Live Call Detection | `pages/LiveCallDetection.jsx` | `/live-call` | Image 4 |
| Live Call Guardian | `pages/LiveCallGuardian.jsx` | `/live-guardian` | Image 8 |

**To build any of these:** Open the placeholder page file — it lists every visual element from the Figma screenshot and the exact API call to use.

---

## 🔌 API Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | Health check |
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Sign up |
| POST | /api/detection/demo | Demo (low / suspicious / high) |
| POST | /api/detection/voice | Analyse voice file |
| POST | /api/detection/video | Analyse video file |
| POST | /api/detection/live/start | Start live call session |
| POST | /api/detection/live/stop | End live call session |
| POST | /api/detection/live/assessment | Get live risk score |
| GET | /api/detection/:id | Get result by ID |
| GET | /api/history | List all detections + stats |
| DELETE | /api/history/clear | Clear cache |
| GET | /api/settings | Get settings |
| PUT | /api/settings | Update settings |
| GET | /api/plans | Pricing plans |
| GET | /api/safety | Safety tips content |

Demo endpoint: `POST /api/detection/demo` with body `{ "scenario": "high" }` → shows 94.8% AI Clone result.

---

## Project structure

```
MorphShield/
├── README.md                   ← You are here
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── data/
│   │   └── store.js            ← In-memory data (pre-seeded)
│   └── routes/
│       ├── health.js
│       ├── auth.js
│       ├── detection.js        ← Main detection logic
│       ├── history.js
│       ├── settings.js
│       ├── robustness.js
│       ├── plans.js
│       └── safety.js
└── frontend/
    ├── index.html              ← Fixed (was missing)
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js      ← Fixed (was missing, caused CSS to break)
    ├── postcss.config.js       ← Fixed (was missing)
    └── src/
        ├── App.jsx             ← All 15 routes registered
        ├── main.jsx
        ├── index.css
        ├── services/
        │   └── api.js          ← All API calls to localhost:8080
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── RiskMeter.jsx
        │   ├── shared.jsx      ← DemoBanner, WarningCard, Card, StatusPill
        │   └── TodoPage.jsx    ← Placeholder component for unfinished pages
        └── pages/
            ├── Home.jsx        ✅ Complete
            ├── Detection.jsx   ✅ Complete
            ├── Results.jsx     ✅ Complete
            ├── Robustness.jsx  ✅ Complete
            ├── Settings.jsx    ✅ Complete
            ├── About.jsx       ✅ Complete
            ├── Login.jsx       🚧 Placeholder
            ├── GetStarted.jsx  🚧 Placeholder
            ├── HowItWorks.jsx  🚧 Placeholder
            ├── History.jsx     🚧 Placeholder
            ├── SafetyTips.jsx  🚧 Placeholder
            ├── VoiceDetection.jsx    🚧 Placeholder
            ├── DetectionResult.jsx   🚧 Placeholder
            ├── LiveCallDetection.jsx 🚧 Placeholder
            └── LiveCallGuardian.jsx  🚧 Placeholder
```

---

MorphShield · Team DIAMOND · Hackathon Prototype 2026 · Not for production use
