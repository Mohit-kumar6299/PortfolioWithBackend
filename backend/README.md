# Portfolio Backend — API

A small Node.js/Express API for Mohit Kumar's portfolio. It does two things:

1. **Serves the portfolio content as JSON** (education, skills, experience, projects, certificates) so the frontend can fetch it instead of hard-coding it.
2. **Handles the contact form** — validates submissions, saves them to disk, and (optionally) emails you when someone gets in touch.

## 1. Setup

```bash
cd portfolio-backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `CORS_ORIGIN` — the URL your frontend runs on (e.g. `http://localhost:5173` for dev, or your deployed frontend URL in production)
- `SMTP_*` and `CONTACT_RECEIVER` — only needed if you want email notifications for contact-form submissions (see below). If left blank, messages are still saved to `data/messages.json`, just not emailed.
- `ADMIN_API_KEY` — a long random string you choose, used to view stored messages.

## 2. Run it

```bash
npm run dev      # with auto-reload (nodemon)
# or
npm start        # plain node
```

The API starts on `http://localhost:5000` by default.

## 3. Enabling email notifications (optional)

If you want an email every time someone submits the contact form, using Gmail as an example:
1. Turn on 2-Step Verification on the Gmail account.
2. Create an **App Password** at https://myaccount.google.com/apppasswords.
3. Put the Gmail address in `SMTP_USER` and the generated app password in `SMTP_PASS`.

Any other SMTP provider (SendGrid, Mailgun, Outlook, etc.) works too — just change `SMTP_HOST`/`SMTP_PORT` accordingly.

## API Reference

| Method | Endpoint              | Description                                      |
|--------|------------------------|---------------------------------------------------|
| GET    | `/api/all`             | All portfolio data in one response                |
| GET    | `/api/profile`         | Name, title, contact links, summary                |
| GET    | `/api/education`       | Education history                                  |
| GET    | `/api/skills`          | Skills grouped by category                         |
| GET    | `/api/experience`      | Work experience                                    |
| GET    | `/api/projects`        | Projects list                                      |
| GET    | `/api/certificates`    | Certificates list                                   |
| POST   | `/api/contact`         | Submit the contact form — body: `{ name, email, message }` |
| GET    | `/api/contact`         | List stored messages — requires header `x-admin-key: <ADMIN_API_KEY>` |
| GET    | `/api/health`          | Health check                                        |

**Example — submitting the contact form:**

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Loved your portfolio, let'"'"'s connect!"}'
```

**Example — viewing stored messages as the admin:**

```bash
curl http://localhost:5000/api/contact -H "x-admin-key: <your ADMIN_API_KEY>"
```

The contact endpoint is rate-limited to 5 submissions per 15 minutes per IP, and includes a hidden honeypot field (`website`) to filter out simple bots.

## Connecting the frontend

In your React app, point requests at this API, e.g.:

```js
fetch("http://localhost:5000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});
```

In production, set `VITE_API_URL` in the frontend to your deployed backend URL, and update `CORS_ORIGIN` here to match your deployed frontend URL.

## Deploying

Any Node host works. Easiest free options:

**Render**
1. Push this folder to a GitHub repo.
2. On [render.com](https://render.com) → "New Web Service" → connect the repo.
3. Build command: `npm install`. Start command: `npm start`.
4. Add your `.env` values under Render's "Environment" tab.

**Railway**
1. Push to GitHub → [railway.app](https://railway.app) → "New Project" → "Deploy from GitHub repo".
2. Add the same environment variables in the Railway dashboard.

Either way, once deployed, copy the live URL and use it as `VITE_API_URL` in your frontend, and set `CORS_ORIGIN` here to your live frontend URL.

## Notes on the storage

Messages are stored in `data/messages.json` — fine for a personal portfolio's traffic level. If you outgrow it, swap `src/utils/store.js` for a real database (Postgres, MongoDB, etc.) without touching the routes.
