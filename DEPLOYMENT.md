# Deployment Guide

This guide covers deploying both the backend and frontend to production.

## Prerequisites

- GitHub account
- Accounts on deployment platforms:
  - **Backend**: Render, Railway, or Fly.io (free tier available)
  - **Frontend**: Vercel or Netlify (free tier available)

---

## Step 1: Push Code to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CodeAtRandom assignment"
   git branch -M main
   ```

2. **Create a GitHub repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Copy the repository URL

3. **Push code to GitHub**:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

---

## Step 2: Deploy Backend

### Option A: Deploy to Render (Recommended - Free Tier Available)

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"

2. **Connect GitHub Repository**
   - Select "Build and deploy from a Git repository"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure Service**
   - **Name**: `codeatrandom-backend` (or any name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if preferred)

4. **Environment Variables** (optional):
   - `PORT` - Render sets this automatically, but you can specify if needed
   - No other variables required for this project

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Once deployed, copy the service URL (e.g., `https://codeatrandom-backend.onrender.com`)

**Note**: Free tier services on Render spin down after 15 minutes of inactivity. First request after spin-down may take 30-60 seconds.

### Option B: Deploy to Railway

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app) and sign up/login
   - Click "New Project" → "Deploy from GitHub repo"

2. **Select Repository**
   - Choose your GitHub repository
   - Railway will auto-detect it's a Node.js project

3. **Configure Service**
   - Click on the service → Settings
   - Set **Root Directory**: `backend`
   - Set **Start Command**: `npm start`
   - Railway auto-detects Node.js version

4. **Get URL**
   - Go to Settings → Domains
   - Railway generates a URL automatically (e.g., `https://your-app.up.railway.app`)
   - Copy this URL

---

## Step 3: Deploy Frontend

### Option A: Deploy to Vercel (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com) and sign up/login
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Connect your GitHub account if not already connected
   - Select your repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Environment Variables**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com` (use your backend URL from Step 2)
   - Make sure it's set for **Production**, **Preview**, and **Development**

5. **Deploy**
   - Click "Deploy"
   - Wait for build and deployment (1-2 minutes)
   - Once deployed, Vercel provides a URL (e.g., `https://codeatrandom.vercel.app`)

### Option B: Deploy to Netlify

1. **Go to Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Import an existing project"

2. **Connect GitHub Repository**
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com` (use your backend URL from Step 2)

5. **Deploy**
   - Click "Deploy site"
   - Wait for build and deployment (1-2 minutes)
   - Netlify provides a URL (e.g., `https://codeatrandom.netlify.app`)

---

## Step 4: Verify Deployment

1. **Test Backend API**:
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Test Frontend**:
   - Visit your frontend URL
   - Try submitting a career goal analysis
   - Check browser console for any API errors

3. **Check CORS**:
   - If you see CORS errors, ensure your backend has `cors()` middleware enabled (already configured in `server.js`)

---

## Troubleshooting

### Backend Issues

- **Service not starting**: Check Render/Railway logs for errors
- **Port issues**: Ensure `PORT` environment variable is set (Render sets this automatically)
- **Module errors**: Ensure `package.json` has `"type": "module"` (already configured)

### Frontend Issues

- **API calls failing**: 
  - Verify `VITE_API_URL` environment variable is set correctly
  - Check browser console for CORS errors
  - Ensure backend URL is accessible (test in browser)
- **Build errors**: Check Vercel/Netlify build logs
- **404 on routes**: Ensure `vercel.json` or `netlify.toml` has proper redirects (already configured)

### Common Fixes

1. **CORS Errors**: Backend already has `cors()` enabled, but if issues persist:
   ```javascript
   // In backend/src/server.js (already configured)
   app.use(cors({
     origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173']
   }));
   ```

2. **Environment Variables Not Working**:
   - Vite requires `VITE_` prefix for environment variables
   - Rebuild after adding environment variables
   - Check that variables are set for the correct environment (Production/Preview)

---

## Quick Reference

### Backend URLs
- **Local**: `http://localhost:5000`
- **Production**: `https://your-backend-url.onrender.com` (or Railway URL)

### Frontend URLs
- **Local**: `http://localhost:5173`
- **Production**: `https://your-frontend-url.vercel.app` (or Netlify URL)

### API Endpoints
- `GET /api/health` - Health check
- `POST /api/skill-gap` - Skill gap analysis
- `POST /api/roadmap` - Career roadmap
- `GET /api/news` - HackerNews stories

---

## Next Steps

1. Update `README.md` with your live URLs
2. Test all features on production
3. Share the deployment URLs with your evaluator

---

## Notes

- **Free Tier Limitations**:
  - Render: Services spin down after 15 min inactivity (first request may be slow)
  - Railway: Limited hours per month on free tier
  - Vercel/Netlify: Generous free tier for frontend hosting

- **Cost**: All platforms offer free tiers sufficient for this assignment

- **Custom Domain**: Optional - you can add custom domains on all platforms (paid feature on some)
