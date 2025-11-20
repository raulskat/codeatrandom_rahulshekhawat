# Quick Deployment Checklist

## 🚀 Fast Track Deployment

### 1. Backend (Render - 5 minutes)
- [ ] Push code to GitHub
- [ ] Go to render.com → New Web Service
- [ ] Connect repo, set Root Directory: `backend`
- [ ] Build: `npm install`, Start: `npm start`
- [ ] Copy backend URL: `https://xxx.onrender.com`

### 2. Frontend (Vercel - 3 minutes)
- [ ] Go to vercel.com → Add Project
- [ ] Import GitHub repo
- [ ] Set Root Directory: `frontend`
- [ ] Add env var: `VITE_API_URL` = your backend URL
- [ ] Deploy → Copy frontend URL

### 3. Test
- [ ] Visit frontend URL
- [ ] Test career analysis feature
- [ ] Check browser console for errors

## 📝 Files Created
- `DEPLOYMENT.md` - Full detailed guide
- `vercel.json` - Vercel configuration
- `netlify.toml` - Netlify configuration
- `frontend/.env.example` - Environment variable template

## 🔗 Quick Links
- Render: https://render.com
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Railway: https://railway.app

