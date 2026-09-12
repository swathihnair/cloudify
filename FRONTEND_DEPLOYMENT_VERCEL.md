# Deploy Frontend to Vercel (Recommended)

## Why Vercel?
- ✅ Free tier (perfect for React/Vite)
- ✅ Automatic deployments from Git
- ✅ Lightning fast CDN
- ✅ Zero configuration for Vite
- ✅ Instant previews for PRs

## Step 1: Prepare Frontend

Files created:
- ✅ `frontend/.env.production` - Production API URL
- ✅ `frontend/vercel.json` - Vercel configuration

## Step 2: Push to GitHub

```bash
cd frontend
git add .
git commit -m "Prepare frontend for Vercel deployment"
git push
```

## Step 3: Deploy on Vercel

### A. Sign Up / Login
1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repos

### B. Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your repo in the list
3. Click **"Import"**

### C. Configure Project
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### D. Environment Variables (Important!)
Add this in Vercel dashboard:
```
VITE_API_URL = https://cloudify-1.onrender.com
```

### E. Deploy!
1. Click **"Deploy"**
2. Wait 1-2 minutes
3. Get your URL: `https://your-app.vercel.app`

## Step 4: Test Your App

Your app will be live at:
```
https://cloudify-frontend.vercel.app
```
(or whatever name you chose)

Test the flow:
1. Click "Find Cloud Shape"
2. Upload object photo
3. Go through animation
4. Upload cloud photo
5. See results!

## Updating Your App

Every time you push to GitHub:
- Vercel auto-deploys
- New version live in ~1 minute
- Zero downtime

## Custom Domain (Optional)

Add your own domain in Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL auto-configured

## Troubleshooting

### API Requests Failing?
Check:
1. CORS in backend allows your Vercel domain
2. VITE_API_URL is correct
3. Backend is running: https://cloudify-1.onrender.com

### Build Fails?
Check:
1. `npm run build` works locally
2. All dependencies in package.json
3. No TypeScript errors

### Blank Page?
Check:
1. Console for errors
2. Routing configured (vercel.json handles this)
3. Environment variables set

## Success! 🎉

Your full-stack app is now live:
- Backend: https://cloudify-1.onrender.com
- Frontend: https://your-app.vercel.app

Share the frontend URL and start using Cloudify! ☁️✨
