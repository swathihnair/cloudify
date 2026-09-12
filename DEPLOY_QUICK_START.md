# Quick Deploy to Render - 5 Minutes ⚡

## 1. Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Deploy backend"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cloudify-backend.git
git push -u origin main
```

## 2. Deploy on Render
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub and select your repo
4. Fill in:
   - **Name:** cloudify-backend
   - **Root Directory:** `backend` (if backend is in subfolder, otherwise leave blank)
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **"Create Web Service"**

## 3. Add Disk for Images
1. Go to service → **"Disks"**
2. Click **"Add Disk"**
   - Name: `cloudify-uploads`
   - Mount Path: `/opt/render/project/src/uploads`
   - Size: 1 GB
3. Click **"Save"**

## 4. Wait for Deploy
- Takes ~10 minutes first time (CLIP model is 1.7GB!)
- Watch logs for: `Uvicorn running on http://0.0.0.0:PORT`

## 5. Get Your URL
Your API is now live at:
```
https://cloudify-backend.onrender.com
```

## 6. Update Frontend
Create `frontend/.env`:
```env
VITE_API_URL=https://cloudify-backend.onrender.com
```

## 7. Test It!
```bash
curl https://cloudify-backend.onrender.com/
```

Should return:
```json
{"message": "Cloudify API", "status": "running"}
```

## Done! 🎉

### Important Notes:
- **Free tier spins down** after 15 min idle (first request takes 30-60s)
- **Upgrade to Starter ($7/mo)** for always-on + more RAM (needed for CLIP)
- **First deploy is slow** because it downloads CLIP model

### Need Help?
See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions!
