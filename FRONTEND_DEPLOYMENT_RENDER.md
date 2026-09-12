# Deploy Frontend to Render (Alternative)

## If You Prefer Render for Everything

### Step 1: Configure for Render

Update frontend `.env.production`:
```env
VITE_API_URL=https://cloudify-1.onrender.com
```

### Step 2: Create Static Site on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repo
4. Configure:

```
Name: cloudify-frontend
Root Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

### Step 3: Environment Variables

Add in Render dashboard:
```
VITE_API_URL = https://cloudify-1.onrender.com
```

### Step 4: Deploy

Click **"Create Static Site"**

Wait 2-3 minutes for build

Your URL: `https://cloudify-frontend.onrender.com`

## Render vs Vercel for Frontend

| Feature | Vercel | Render |
|---------|--------|--------|
| Speed | ⚡⚡⚡ Very Fast | ⚡⚡ Fast |
| Free Tier | 100GB bandwidth | 100GB bandwidth |
| Auto-deploy | ✅ Yes | ✅ Yes |
| CDN | Global | Global |
| Build Time | ~1 min | ~2-3 min |
| Best For | React/Vite | Full-stack |

**Recommendation:** Use **Vercel** for frontend (faster builds, better for Vite)

## Success!

Full-stack deployed:
- Backend: https://cloudify-1.onrender.com (Render)
- Frontend: https://cloudify-frontend.onrender.com (Render)

OR

- Backend: https://cloudify-1.onrender.com (Render)
- Frontend: https://cloudify-frontend.vercel.app (Vercel)
