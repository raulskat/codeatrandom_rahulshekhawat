# CodeAtRandom Career Navigator

A full-stack assignment for CodeAtRandom AI that analyzes skill gaps, suggests a three-phase career roadmap, and surfaces the latest tech news from HackerNews.

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express
- **Styling:** Vanilla CSS (responsive cards layout)
- **External API:** HackerNews REST API

## Project Structure

```
backend/   → Express server with Skill Gap, Roadmap, and News endpoints
frontend/  → React dashboard consuming backend APIs
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev   # or npm start for production
```

The server defaults to `http://localhost:5000`. Optional environment variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port for Express server | `5000` |

### Frontend

```bash
cd frontend
npm install
npm run dev   # Vite dev server at http://localhost:5173
```

The Vite dev server proxies `/api/*` calls to `http://localhost:5000`, so run the backend first. For deployments, set `VITE_API_URL` to your backend URL.

### Build

- Frontend: `npm run build` (outputs to `frontend/dist`)
- Backend: use any Node hosting (Render, Railway, etc). The server is stateless and only writes to `backend/data/submissions.json`.

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/skill-gap` | Returns matched skills, missing skills, recommendations, and learning order for a given role/skill set (data persisted to JSON). |
| `POST` | `/api/roadmap` | Returns a 3-phase roadmap for supported roles (mock AI logic). |
| `GET` | `/api/news` | Fetches the latest 5 HackerNews stories (title, url, score, time, author). |
| `GET` | `/api/health` | Simple health check. |

## UI Flow

1. Enter a target role and comma-separated skills.
2. Click **Analyze My Career Path** to call both backend POST endpoints in parallel.
3. View skill gap results (matched/missing/recommendations) on the left and the roadmap on the right.
4. Latest HackerNews stories are always shown at the bottom.

## Notes & Assumptions

- Skill reference data follows the prompt exactly (`FrontendDeveloper`, `Backend Developer`, `Data Analyst`) and is case/whitespace insensitive.
- Roadmap data is mock logic; extend `backend/src/constants.js` to support more roles.
- HackerNews data is fetched server-side to avoid CORS and rate issues.
- Persistence is optional; the backend appends each analysis request to `backend/data/submissions.json` for demo purposes.

## Deployment Tips

- Host the backend on Render/Railway/Heroku (Node 18+).
- Deploy the frontend to Vercel/Netlify; remember to set `VITE_API_URL` to the hosted backend.
- Update this README with the live URL(s) before submission.

