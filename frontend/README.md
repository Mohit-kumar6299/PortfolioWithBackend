# Mohit Kumar — Portfolio

A React + Vite portfolio site.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Backend

The contact form on this site posts to a separate backend API (see the
`portfolio-backend` project). Run that alongside this frontend:

```bash
cd ../portfolio-backend
npm install
cp .env.example .env
npm run dev
```

It runs on `http://localhost:5000` by default, matching `VITE_API_URL` in
`.env.example`. In production, deploy the backend separately and set
`VITE_API_URL` to its live URL.

## Build for production

```bash
npm run build
```

This creates a `dist/` folder with the static site, ready to deploy anywhere.

## Deploy

**Vercel (easiest)**
1. Push this project to a GitHub repo.
2. Go to https://vercel.com → "Add New Project" → import the repo.
3. Vercel auto-detects Vite. Click Deploy.

**Netlify**
1. Push to GitHub.
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project".
3. Build command: `npm run build`, publish directory: `dist`.

**GitHub Pages**
1. `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"deploy": "vite build && gh-pages -d dist"`
3. Set `base: "/your-repo-name/"` in `vite.config.js`
4. Run `npm run deploy`
