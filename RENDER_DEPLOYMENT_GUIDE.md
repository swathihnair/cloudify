# Deploy Cloudify Backend to Render

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Render Account** - Sign up at https://render.com (free tier available)

## Step 1: Prepare Your Repository

### Push Backend to GitHub

```bash
# If not already initialized
cd backend
git init
git add .
git commit -m "Prepare backend for Render deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cloudify-backend.git
git branch -M main
git push -u origin main
```

### Files Added for Deployment

✅ `requirements.txt` - Python dependencies (updated)
✅ `Procfile` - Tells Render how to start the app
✅ `runtime.txt` - Specifies Python version
✅ `render.yaml` - Render configuration (optional)

## Step 2: Deploy on Render

### Option A: Using Render Dashboard (Easier)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect Your Repository**
   - Connect your GitHub account
   - Select your `cloudify-backend` repository
   - Click "Connect"

3. **Configure the Service**
   ```
   Name: cloudify-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend (if backend is in a subfolder)
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Select Plan**
   - Free tier (good for testing)
   - Or Starter ($7/mo) for better performance

5. **Environment Variables** (Add these in Render dashboard)
   ```
   No environment variables needed for basic setup
   ```

6. **Add Persistent Disk** (for uploaded images)
   - Go to "Disks" section
   - Click "Add Disk"
   - Name: `cloudify-uploads`
   - Mount Path: `/opt/render/project/src/uploads`
   - Size: 1 GB (free tier allows 1GB)

7. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for build (CLIP model is large!)
   - First deploy will take longer (~10 minutes) due to downloading CLIP model

### Option B: Using Blueprint (render.yaml)

1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect repository
4. Render will auto-detect `render.yaml`
5. Click "Apply"

## Step 3: Post-Deployment Configuration

### 1. Check Deployment Status
- Go to your service dashboard
- Check "Logs" tab for any errors
- Look for: `Uvicorn running on http://0.0.0.0:PORT`

### 2. Get Your API URL
Your backend URL will be:
```
https://cloudify-backend.onrender.com
```
(or whatever name you chose)

### 3. Test the API
```bash
# Test health endpoint
curl https://your-app-name.onrender.com/

# Should return: {"message": "Cloudify API", "status": "running"}
```

## Step 4: Update Frontend

Update your frontend to use the Render URL:

**File: `frontend/.env` (create if doesn't exist)**
```env
VITE_API_URL=https://your-app-name.onrender.com
```

Or update in frontend code directly.

## Important Notes

### ⚠️ Free Tier Limitations

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- CLIP model needs to reload (~30-60 seconds)
- 750 hours/month free

**Solutions:**
1. Use Starter plan ($7/mo) - no spin down
2. Keep alive with pings (use a service like UptimeRobot)
3. Show loading message: "Waking up server..."

### 🎯 CLIP Model Considerations

**Size:** ~1.7 GB download on first run
**Cache:** Model is cached after first download
**Memory:** Requires ~2GB RAM minimum

**Render Free Tier:** May struggle with CLIP model
**Recommendation:** Use Starter plan for production

### 📦 Uploaded Images Storage

**With Persistent Disk:**
- Images persist across deploys
- 1GB free storage
- Path: `/opt/render/project/src/uploads`

**Without Disk:**
- Images lost on each deploy
- Need external storage (AWS S3, Cloudinary, etc.)

## Step 5: Monitor & Maintain

### Check Logs
```
Render Dashboard → Your Service → Logs
```

### Common Issues

**1. Module Not Found**
- Check `requirements.txt` has all dependencies
- Trigger manual deploy

**2. Port Binding Error**
- Make sure using `--port $PORT` (not hardcoded 8000)
- Render sets `$PORT` environment variable

**3. CLIP Model Download Timeout**
- First deploy may timeout
- Increase timeout in Render settings
- Or use Starter plan

**4. Out of Memory**
- CLIP model needs RAM
- Upgrade to Starter plan (512MB → 2GB RAM)

**5. Database File Locked**
- SQLite not recommended for production
- Consider PostgreSQL for production use

## Upgrading to Production

### Use PostgreSQL Instead of SQLite

1. **Add PostgreSQL in Render:**
   - New + → PostgreSQL
   - Name: `cloudify-db`
   - Region: Same as web service
   - Create database

2. **Update `database.py`:**
   ```python
   import os
   
   DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./cloudify.db')
   
   # Render PostgreSQL URLs start with postgres://, need postgresql://
   if DATABASE_URL.startswith('postgres://'):
       DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
   
   engine = create_engine(DATABASE_URL)
   ```

3. **Add Environment Variable:**
   - In Render dashboard
   - Add: `DATABASE_URL` = (copy from PostgreSQL service)

4. **Add to requirements.txt:**
   ```
   psycopg2-binary>=2.9.0
   ```

### Use Cloud Storage for Images

**Option 1: Cloudinary (Free Tier)**
```bash
pip install cloudinary
```

**Option 2: AWS S3**
```bash
pip install boto3
```

**Option 3: Render Disk (Current Setup)**
- 1GB free persistent storage
- Good for small projects

## Testing Deployment

### Test Endpoints

1. **Root**
   ```bash
   curl https://your-app.onrender.com/
   ```

2. **Upload Test**
   ```bash
   curl -X POST https://your-app.onrender.com/api/analyze \
     -F "file=@cloud.jpg"
   ```

3. **Frontend Test**
   - Update frontend API URL
   - Test full flow: upload → analyze → results

## Cost Breakdown

### Free Tier
- Web Service: 750 hours/month (enough for 1 app)
- Disk: 1GB persistent storage
- Total: $0/month
- **Limitations:** Spins down, 512MB RAM

### Starter Plan ($7/month)
- Web Service: Always on
- 512MB RAM → **2GB RAM** (needed for CLIP!)
- Disk: 1GB included
- Total: $7/month
- **Recommended for production**

### PostgreSQL
- Free tier: 90 days, then $7/month
- 256MB RAM, 1GB storage

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `requirements.txt` updated
- [ ] `Procfile` created
- [ ] `runtime.txt` created
- [ ] Render service created
- [ ] Build successful
- [ ] Persistent disk added
- [ ] Service running (check logs)
- [ ] API accessible (test URL)
- [ ] Frontend updated with new API URL
- [ ] Test full workflow
- [ ] Monitor for 24 hours

## Troubleshooting

### Build Fails
```bash
# Check logs for specific error
# Common fixes:
1. Check requirements.txt formatting
2. Ensure Python 3.11 compatibility
3. Check for syntax errors
```

### App Crashes on Start
```bash
# Check logs for error
# Common issues:
1. Missing environment variables
2. Port binding (must use $PORT)
3. Database connection issues
```

### Slow Response
```bash
# Free tier spins down after 15 min
# Solutions:
1. Upgrade to Starter
2. Use external keepalive service
3. Show "waking up" message in frontend
```

## Success! 🎉

Your backend should now be live at:
```
https://your-app-name.onrender.com
```

Test it with:
```bash
curl https://your-app-name.onrender.com/
```

Update your frontend and you're good to go! 🚀
