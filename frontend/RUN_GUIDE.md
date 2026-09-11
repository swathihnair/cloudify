# Cloudify Frontend - How to Run

## 📋 Prerequisites

Make sure you have installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

Verify installation:
```bash
node --version
npm --version
```

---

## 🚀 Quick Start (Development Mode)

### Step 1: Navigate to Frontend Directory
```bash
cd d:\Cloudify\cloudify\frontend
```

### Step 2: Install Dependencies
```bash
npm install
```
This installs all required packages from `package.json`:
- React, React Router
- Framer Motion (animations)
- Tailwind CSS (styling)
- Axios (HTTP client)
- Canvas-confetti (celebrations)
- html-to-image (export)

### Step 3: Run Development Server
```bash
npm run dev
```

**Output will show:**
```
VITE v5.4.21  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

### Step 4: Open in Browser
- Open your browser and go to: **http://localhost:5173/**
- The app will hot-reload whenever you make changes

---

## 🎯 Available Commands

### Development
```bash
npm run dev
```
- Starts Vite dev server with hot module reloading
- Perfect for development and testing
- Changes save automatically and reflect in browser

### Production Build
```bash
npm run build
```
- Optimizes and bundles the app for production
- Creates `dist/` folder with minified files
- Output: ~119 KB gzipped (very performant)

### Preview Build
```bash
npm run preview
```
- Serves the production build locally
- Use to test production build before deployment
- Access at: http://localhost:4173/

---

## 🔧 Configuration

### Mock API Mode (Default)
The app runs in **mock mode** by default - no backend needed!

To use real backend API, edit `src/hooks/usePrediction.js`:
```javascript
// Line 7 - Change from:
const MOCK_MODE = true

// To:
const MOCK_MODE = false

// Then set your backend URL (Line 8):
const API_BASE = 'http://localhost:8000/api'  // or your backend URL
```

### Environment Variables
Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Cloudify
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Mascot.jsx      # Animated cloud mascot
│   │   ├── DoodleOverlay.jsx
│   │   ├── StatBar.jsx
│   │   └── CloudHistoryStrip.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── usePrediction.js
│   │   └── useCloudHistory.js
│   ├── screens/            # Full-page screens (8 total)
│   │   ├── LandingScreen.jsx
│   │   ├── CameraCapture.jsx
│   │   ├── ProcessingScreen.jsx
│   │   ├── CloudCardScreen.jsx
│   │   ├── PersonalityStats.jsx
│   │   ├── HumanVsAiScreen.jsx
│   │   ├── CloudOfTheDayScreen.jsx
│   │   └── CloudHistoryScreen.jsx
│   ├── App.jsx             # Main router
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
├── vite.config.js         # Build config
├── tailwind.config.js     # Tailwind CSS config
└── index.html             # HTML template
```

---

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px (phones)
- **Tablet**: 640px - 1024px (iPad, tablets)
- **Desktop**: 1024px+ (laptops, desktops)

Test responsive design:
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select different devices to test

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```
Or kill the process using that port.

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json

# Reinstall
npm install
```

### Build Errors
```bash
# Check for errors
npm run build

# If Tailwind CSS isn't working, rebuild:
npm install -D tailwindcss@latest
npm run build
```

### Hot Reload Not Working
- Check browser console for errors (F12)
- Restart dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)

---

## 📊 Performance Tips

### During Development
- Keep DevTools closed when not debugging
- Use Firefox DevTools instead of Chrome for lighter performance
- Disable browser extensions that might slow down development

### For Production
- Build with `npm run build`
- Serve from a CDN or static host
- Gzip compression is enabled automatically

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel: https://vercel.com
3. It automatically builds and deploys

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify: https://netlify.com
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy Anywhere
1. Run: `npm run build`
2. Upload `dist/` folder to your server
3. Configure server to serve `index.html` for all routes

---

## 💾 localStorage Data

Cloud history is automatically saved to browser localStorage:
- **Key**: `cloudify_history`
- **Storage**: ~5-10 MB per domain
- **Persistence**: Across browser sessions
- **Clearing**: Open DevTools → Application → Clear Storage

---

## 🎓 Learning Resources

### File to Start With
1. `src/App.jsx` - Main router and structure
2. `src/screens/LandingScreen.jsx` - Simple screen to understand flow
3. `src/hooks/usePrediction.js` - API integration

### Key Libraries
- **Framer Motion**: Animation library - [Docs](https://www.framer.com/motion/)
- **Tailwind CSS**: Utility-first CSS - [Docs](https://tailwindcss.com/)
- **React Router**: Navigation - [Docs](https://reactrouter.com/)

---

## 📞 Support

### Check These First
- Run `npm install` to ensure all deps are installed
- Check `package.json` for correct scripts
- Verify Node.js version: `node --version`
- Check network tab in DevTools for API errors

### Common Issues
- **Blank page**: Check browser console for JS errors
- **Styles not loading**: Check Tailwind CSS output in DevTools
- **API errors**: Toggle `MOCK_MODE` to test without backend
- **Images not showing**: Check image paths and relative URLs

---

## 🎉 You're Ready!

Your Cloudify frontend is ready to run. Start with:
```bash
cd d:\Cloudify\cloudify\frontend
npm install
npm run dev
```

Then open: **http://localhost:5173/**

Enjoy discovering cloud personalities! ☁️✨
