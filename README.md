# Weather Intelligence App

A modern, responsive weather intelligence and activity planning web application built in **Google AI Studio App Build** and deployed to **Cloudflare Pages**.

Powered by the **Open-Meteo Geocoding API** and **Open-Meteo Forecast API** with zero external API keys, real-time client-side queries, and intelligent city deduplication.

---

## Live Deployment
- **Cloudflare Pages Live URL**: [https://weather-intelligence-d57.pages.dev/](https://weather-intelligence-d57.pages.dev/)
- **Google AI Studio Development URL**: `https://ais-dev-bzvasrjw5regxrjw3may24-868619009887.us-east1.run.app`

---

## Features
- **Global City Search with Auto-Complete**:
  - Live query resolution via Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search`).
  - Proximity and signature deduplication for sovereign city-states (e.g. Singapore, Monaco) and duplicate administrative boundaries.
  - Keyboard navigation and quick popular destination pills.
- **Current Observation Telemetry**:
  - Real-time temperature and apparent ("feels like") temperature.
  - Relative humidity, wind speed & direction (with compass indicator), UV index, cloud cover, and surface pressure.
  - Precise local sunrise and sunset timings.
- **24-Hour Timeline & 7-Day Extended Forecast**:
  - Hourly forecast cards with weather condition icons and precipitation probabilities.
  - 7-day forecast cards featuring high/low temperature distribution bars and rain probability badges.
- **Activity & Health Intelligence Engine**:
  - **Outdoor Sports & Fitness**: Real-time evaluation of running, cycling, and hiking conditions.
  - **Attire & Layering**: Tailored advice on layers, rain protection, and footwear.
  - **Travel & Commute**: Driving safety alerts, hydroplaning risk, and visibility conditions.
  - **Sun & Skin Protection**: UV risk rating and SPF / shade recommendations.
- **Error Handling & Resilience**:
  - Graceful handling for invalid city inputs, network errors, and offline states with actionable retry controls.
- **Unit Customization**:
  - One-click toggle between Metric (°C, km/h) and Imperial (°F, mph) across all cards and timelines.

---

## APIs Used
| API | Endpoint | Purpose |
| :--- | :--- | :--- |
| **Open-Meteo Geocoding API** | `https://geocoding-api.open-meteo.com/v1/search` | Resolves city names into coordinates (latitude/longitude), country, and administrative region. |
| **Open-Meteo Forecast API** | `https://api.open-meteo.com/v1/forecast` | Fetches current conditions, hourly metrics, and 7-day daily forecasts without API keys. |

---

## Project Structure
```text
├── .github/
│   └── workflows/
│       └── deploy-cloudflare.yml   # Optional GitHub Actions deployment to Cloudflare Pages
├── public/                         # Static assets and favicons
├── src/
│   ├── components/
│   │   ├── CitySearch.tsx          # Geocoding search & deduplicated suggestions
│   │   ├── CurrentWeather.tsx      # Main observation card & metrics grid
│   │   ├── HourlyForecast.tsx      # 24-hour timeline view
│   │   ├── SevenDayForecast.tsx    # 7-day extended outlook
│   │   ├── WeatherRecommendations.tsx # 4-pillar weather intelligence advisory
│   │   ├── CloudflareVerifyModal.tsx  # In-app deployment & verification hub
│   │   └── UnitToggle.tsx          # Metric/Imperial switch
│   ├── services/
│   │   └── weatherApi.ts           # Open-Meteo API integrations & caching
│   ├── types.ts                    # Strict TypeScript definitions
│   ├── App.tsx                     # Main layout & app state
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind CSS styling
├── DEPLOYMENT.md                   # Step-by-step Cloudflare Pages deployment guide
├── wrangler.toml                   # Cloudflare Pages configuration
├── vite.config.ts                  # Vite build configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # Documentation
```

---

## Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### 3. Production Build
```bash
npm run build
```
The compiled, production-ready static assets are bundled into the `dist/` directory.

---

## Cloudflare Pages Deployment Settings

When connecting this repository to **Cloudflare Pages**:
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Node.js version**: `18` or `20` (default)
