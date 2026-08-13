# Mohit Kumar — Portfolio (Full Stack)

This project has two parts:

- **`frontend/`** — the React + Vite portfolio site
- **`backend/`** — the Express API that powers the contact form and serves portfolio data as JSON

## Quick start

Open two terminals.

**Terminal 1 — backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5000

**Terminal 2 — frontend**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5173

Open http://localhost:5173 — the contact form at the bottom of the page now
actually sends messages to the backend, which validates them, saves them to
`backend/data/messages.json`, and optionally emails you (see
`backend/README.md` for enabling email).

## Deploying

Deploy the two parts separately:
- **Frontend** → Vercel or Netlify (see `frontend/README.md`)
- **Backend** → Render or Railway (see `backend/README.md`)

After deploying, set:
- In the frontend's environment: `VITE_API_URL` = your live backend URL
- In the backend's environment: `CORS_ORIGIN` = your live frontend URL

Full details, API reference, and troubleshooting are in each folder's own
README.
