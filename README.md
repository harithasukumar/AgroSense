# AgroSense

AgroSense is a Buildathon 2.0 agriculture intelligence platform focused on connected resource planning across water, fertilizer, crop protection, energy, and labor.

## What this app includes
- Premium agriculture startup UI with forest-green and off-white theme
- Landing page, auth flow, dashboard, and all major farm intelligence pages
- Water, fertilizer, crop protection, energy, and labor modules
- Central cross-domain intelligence engine with explainable recommendations
- What-if farming simulator and waste detection
- Smart farm budget and crop recommendations
- Weather intelligence with Open-Meteo-style fallback behavior
- AI assistant with rule-based fallback
- MySQL schema and Express backend with demo-mode operations

## Stack
- Frontend: React + Vite + Recharts + Lucide React
- Backend: Node.js + Express.js
- Database: MySQL-ready schema + demo mode fallback

## Local setup

1. Install dependencies at the repository root:

   npm install

2. Start the development environment:

   npm run dev

3. Open the app in a browser:

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## Production build

npm run build

## Environment variables
Create a `.env` file in `server` if you want to connect to MySQL or use external APIs:

```env
PORT=4000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=agrosense
JWT_SECRET=agrosense-demo-secret
```

## Demo mode
The application starts in demo mode with simulated agricultural data and no paid API keys required.

## Notes
- Simulated data is clearly labeled in the UI.
- Weather API calls are optional; if unavailable, fallback data is used.
- MySQL schema is included under `server/db/schema.sql`.
