# Deployment Guide — Usaid

Target stack:

- **Frontend** — Vercel (Vite static build)
- **Backend** — Render (Node web service)
- **Database** — Supabase (Postgres)
- **Source of truth** — GitHub (auto-deploy on push)

End-to-end this takes ~25 minutes the first time.

---

## 0. Prerequisites

- Node 18+ locally
- A GitHub account
- A Supabase account (free) — https://supabase.com
- A Render account (free) — https://render.com
- A Vercel account (free) — https://vercel.com
- A Google AI Studio API key for Gemini — https://aistudio.google.com/apikey

---

## 1. Provision the database (Supabase)

1. https://supabase.com/dashboard → **New project**.
   - Name: `usaid`
   - **Database password**: generate and save it somewhere (1Password, etc.) — Supabase will not show it again.
   - Region: pick the one closest to your Render region.
   - Plan: Free.
2. Wait ~2 min for provisioning.
3. **Project Settings → Database → Connection string → URI** tab. You need two strings:
   - **Pooler** (port `6543`) — copy and substitute `[YOUR-PASSWORD]`.
     Append `?pgbouncer=true&connection_limit=1`.
     → this is your `DATABASE_URL`.
   - **Direct** (port `5432`) — same substitution, no query params.
     → this is your `DIRECT_URL`.

You'll paste both into `server/.env` next.

---

## 2. Run the first migration locally

The first migration creates the `prisma/migrations/` directory which gets committed to git. Render runs `prisma migrate deploy` on each deploy to apply pending migrations against prod.

```bash
cd server
cp .env.example .env
# Edit .env: paste your Supabase DATABASE_URL + DIRECT_URL, a fresh JWT_SECRET,
# and your GEMINI_API_KEY.

npm install
npm run db:migrate -- --name init   # creates migrations/, applies to Supabase
```

Verify it worked: Supabase dashboard → **Table editor** should show `User`, `Decision`, `Timeline`, `TimelineEvent`, `Feedback`.

Now boot the dev server to make sure your local stack still works:

```bash
npm run dev
# in another terminal:
cd ../client && npm install && npm run dev
```

> **Note**: your old `server/dev.db` SQLite file is now obsolete. Safe to delete, or just leave it — Prisma ignores it.

---

## 3. Push to GitHub

```bash
# from the repo root
git init -b main
git add .
git commit -m "Initial commit"
```

Then on github.com create a new empty repo (no README/license) called e.g. `usaid`. Then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/usaid.git
git push -u origin main
```

---

## 4. Deploy the backend (Render)

1. https://dashboard.render.com/blueprints → **New Blueprint Instance**.
2. Connect the GitHub repo. Render detects `render.yaml` at the repo root and proposes a `usaid-api` web service.
3. Click **Apply**.
4. Render will fail the first deploy because the secret env vars are unset. Click on **usaid-api → Environment** and add:

   | Key | Value |
   |---|---|
   | `JWT_SECRET` | A long random string. Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
   | `DATABASE_URL` | Your Supabase pooler URL (port 6543, with `?pgbouncer=true&connection_limit=1`) |
   | `DIRECT_URL` | Your Supabase direct URL (port 5432) |
   | `GEMINI_API_KEY` | Your Google AI Studio key |
   | `FRONTEND_URL` | Leave empty for now — you'll set it after Vercel deploys |

5. Click **Manual Deploy → Deploy latest commit**.
6. When the service is "Live", note the URL — something like `https://usaid-api.onrender.com`. Hit `/health` to confirm:
   ```bash
   curl https://usaid-api.onrender.com/health
   # → {"status":"ok",…}
   ```

> **Free tier caveat**: Render free web services spin down after 15 min of inactivity. The first request after that takes 30–60 s to wake up. Fine for demos; upgrade to Starter ($7/mo) if you need always-on.

---

## 5. Deploy the frontend (Vercel)

1. https://vercel.com/new → import the GitHub repo.
2. **Root directory**: `client`.
3. **Framework preset**: Vite (auto-detected).
4. **Environment variables** — add one:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://usaid-api.onrender.com/api/v1` (note the `/api/v1` suffix) |

5. Deploy. You'll get a URL like `https://usaid.vercel.app`.

---

## 6. Wire CORS (Render → Vercel)

The server's CORS allowlist comes from `FRONTEND_URL`. Go back to **Render → usaid-api → Environment** and set:

```
FRONTEND_URL = https://usaid.vercel.app
```

(Use your actual Vercel URL — no trailing slash.)

Render will redeploy automatically.

---

## 7. Smoke test

Open your Vercel URL and:

1. Click **Try as guest** → should land on the dashboard.
2. Create a decision → timelines render (the first call after a wake-up may be slow on Render free).
3. Inject a follow-up → child decision page shows the parent breadcrumb; navigating back to the parent shows the branch listed.
4. Log out, then **Try as guest** again — should restore the same guest session if within 60 min.
5. Register a real account → log out → log back in with "Remember me" checked → JWT in DevTools shows 30-day expiry.

If anything fails, the most likely culprits are:

- CORS — confirm `FRONTEND_URL` exactly matches your Vercel URL.
- Postgres — confirm `DATABASE_URL` uses port `6543` with `?pgbouncer=true&connection_limit=1`.
- Migrations — Render's deploy log should show `Applying migration 'init'` once.
- `VITE_API_URL` typo — must include the `/api/v1` suffix.

---

## Ongoing workflow

```bash
# Make changes locally:
git checkout -b feature/foo
# …edit…
npm --prefix server run db:migrate -- --name foo   # if schema changed
git add . && git commit -m "feat: foo"
git push origin feature/foo
# Open PR → merge → both Render and Vercel auto-deploy main.
```

For schema changes, ALWAYS run `db:migrate` locally before pushing, so the generated migration SQL gets committed. Render only runs `migrate deploy` (applies existing files); it never generates them.

---

## Known limitations of this deploy

- **Free tier spin-down** on Render (first request after idle = slow).
- **Long-lived JWTs** when "Remember me" is checked (30 days, no revocation). Replace with refresh tokens before going public.
- **Password reset flow** still in demo mode — returns the token in the response. Wire an email provider (Resend, Postmark, SES) before exposing forgot-password publicly.
- **Fake CAPTCHA** — bots can register/login at the per-IP rate-limit ceiling. Integrate Cloudflare Turnstile or hCaptcha before going public.

The audit report at `~/.claude/plans/you-are-a-senior-zazzy-hoare.md` has the full list and remediation plan.
