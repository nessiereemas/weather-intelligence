# Cloudflare Pages Deployment & GitHub Integration Guide

## 1. Project Overview
The **Weather Intelligence App** is built as a high-performance, zero-secret Vite + React 19 Single-Page Application (SPA). It directly queries Open-Meteo's CORS-enabled global APIs for geocoding and real-time atmospheric forecasting, making it 100% turnkey and statically hostable on Cloudflare Pages edge infrastructure.

---

## 2. Step 1: Connect to GitHub

You can export or push this repository directly to GitHub:

```bash
# 1. Initialize Git (if not already initialized)
git init
git branch -m main

# 2. Stage and commit all project files
git add .
git commit -m "feat: Weather Intelligence App ready for Cloudflare Pages"

# 3. Add your remote GitHub repository
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 4. Push to GitHub
git push -u origin main
```

*(Alternatively, in Google AI Studio, use the top-right settings menu -> **Export to GitHub** to create or sync the repository directly).*

---

## 3. Step 2: Deploy on Cloudflare Pages

### Option A: Automatic Git Integration (Recommended)
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Compute (Workers & Pages)** > **Pages** > **Create a project**.
3. Select **Connect to Git** and choose your GitHub repository.
4. Configure the build settings:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (default)
5. Click **Save and Deploy**.
6. Cloudflare Pages will execute `npm run build`, bundle the static assets, and assign you a live deployment URL such as:
   `https://<your-project>.pages.dev`

### Option B: Direct CLI Deployment via Wrangler
You can also deploy directly from your local terminal or CI/CD without linking Git to the dashboard:

```bash
# Build production bundle
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=weather-intelligence-app
```

---

## 4. Step 3: Automated CI/CD with GitHub Actions
The repository includes `.github/workflows/deploy-cloudflare.yml`. To enable automated deployment on every commit to `main`:
1. Generate an API Token in Cloudflare with **Cloudflare Pages: Edit** permissions.
2. In your GitHub repository settings, go to **Secrets and variables** > **Actions** and add:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token.
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID (found on the Cloudflare dashboard overview).
3. Every push to `main` will automatically build and publish the latest app version.

---

## 5. Step 4: Verification & Proof of Running Artifact
Once deployed to Cloudflare Pages:
1. Open the assigned URL (e.g. `https://weather-intelligence-app.pages.dev`).
2. Test searching for any city (e.g., Tokyo, San Francisco, London).
3. Verify that real-time Open-Meteo weather data, 7-day forecast, and planning recommendations load instantaneously.
4. The built-in in-app **Cloudflare Verification Panel** allows you to test and validate your live URL directly with live status checks and embedded verification!
