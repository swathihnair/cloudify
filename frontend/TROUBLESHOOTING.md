# Cloudify Frontend - Troubleshooting & Common Tasks

## 🆘 Quick Troubleshooting

### Issue: Dev Server Won't Start

**Problem**: `npm run dev` fails or port is already in use

**Solutions**:
```bash
# Option 1: Use a different port
npm run dev -- --port 3000

# Option 2: Kill the existing process using port 5173
# For PowerShell:
Get-Process node | Stop-Process -Force

# Option 3: Clear Node cache and reinstall
npm cache clean --force
npm install
npm run dev
```

---

### Issue: Styles Not Loading

**Problem**: Page looks unstyled or CSS is missing

**Solutions**:
```bash
# Clear browser cache
# Press: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# Restart dev server
# Ctrl+C in terminal, then:
npm run dev

# Check if Tailwind CSS is configured
# Verify tailwind.config.js exists and has:
content: ['./src/**/*.{js,jsx,ts,tsx}']
```

---

### Issue: Component Not Showing

**Problem**: A screen or component doesn't appear

**Check**:
1. **Browser console** (F12 → Console tab)
   - Look for red errors
   - Note the error message
   
2. **Verify imports** in the screen file
   ```javascript
   import ComponentName from '../components/ComponentName'
   ```

3. **Check route** in App.jsx
   ```javascript
   <Route path="/your-path" element={<YourScreen />} />
   ```

4. **Restart dev server**
   ```bash
   npm run dev
   ```

---

### Issue: Image Upload Not Working

**Problem**: Can't select or upload images

**Solutions**:
```bash
# Check browser permissions
# 1. Click the camera/file icon
# 2. Grant permission if prompted
# 3. Try again

# Check file size
# Max recommended: 5-10 MB

# Try different browser
# Chrome → Firefox → Edge

# Clear browser data
# Ctrl+Shift+Delete → Clear all
```

---

### Issue: API Not Connecting

**Problem**: "Failed to analyze cloud" message

**Solutions**:
1. **Verify mock mode is enabled**
   - Edit `src/hooks/usePrediction.js` line 7
   - Check: `const MOCK_MODE = true`

2. **If using real backend**:
   - Set `const MOCK_MODE = false`
   - Verify backend URL: `const API_BASE = 'http://localhost:8000/api'`
   - Start backend server first
   - Check Network tab (F12 → Network) for failed requests

3. **CORS errors?**
   - Backend needs CORS headers
   - Ask backend team to enable: `Access-Control-Allow-Origin: *`

---

### Issue: Build Errors

**Problem**: `npm run build` fails

**Solutions**:
```bash
# Full reset
npm cache clean --force
Remove-Item node_modules -Recurse -Force  # PowerShell
Remove-Item package-lock.json
npm install

# Build again
npm run build

# If still failing, check for specific errors
# Look at the error message, e.g.:
# "Component is not exported from..."
# → Fix the import statement
```

---

### Issue: Build Output Size Too Large

**Problem**: JS or CSS files are bigger than expected

**Solutions**:
```bash
# Verify production build
npm run build

# Check dist folder size
# Should be ~120 KB JS gzipped

# Analyze bundle
npm install -D webpack-bundle-analyzer

# Check what's included
# Remove unused imports and dependencies
```

---

### Issue: Responsive Design Not Working

**Problem**: Mobile layout doesn't change when resizing

**Solutions**:
1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Select a device** from dropdown
4. **Hard refresh** (Ctrl+Shift+R)

If still not working:
```javascript
// Check if Tailwind classes are correct
// Should start with: sm:, md:, lg:, etc.
<div className="p-4 sm:p-6 lg:p-8">
  // ✅ Correct: starts with Tailwind prefix
</div>
```

---

## 🔧 Common Tasks

### Task 1: Change App Colors

**Edit**: `tailwind.config.js`

Or use inline classes:
```jsx
// Old
<div className="from-sky-300 to-blue-50">

// New
<div className="from-purple-300 to-indigo-50">
```

Tailwind color options:
- `sky`, `blue`, `cyan`, `purple`, `pink`, `rose`, `red`, `green`, `emerald`, `amber`, `yellow`

---

### Task 2: Add New Screen

**Steps**:
1. Create new file `src/screens/NewScreen.jsx`
   ```jsx
   import React from 'react'
   
   export default function NewScreen() {
     return (
       <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
         <h1 className="text-3xl sm:text-4xl font-bold">New Screen</h1>
       </div>
     )
   }
   ```

2. Add route in `App.jsx`
   ```jsx
   import NewScreen from './screens/NewScreen'
   
   <Route path="/new-path" element={<NewScreen />} />
   ```

3. Add navigation button
   ```jsx
   <button onClick={() => navigate('/new-path')}>
     Go to New Screen
   </button>
   ```

---

### Task 3: Connect Real Backend

**Steps**:
1. Edit `src/hooks/usePrediction.js`:
   ```javascript
   // Line 7: Change from true to false
   const MOCK_MODE = false
   
   // Line 8: Set your backend URL
   const API_BASE = 'http://your-backend-url/api'
   ```

2. Start your backend server
   ```bash
   cd ../backend
   python main.py
   ```

3. Restart frontend dev server
   ```bash
   npm run dev
   ```

4. Test: Upload an image and check Network tab (F12) for requests

---

### Task 4: Customize Mascot Animations

**Edit**: `src/components/Mascot.jsx`

```javascript
// Change mood states
const animationVariants = {
  excited: {
    rotate: [0, 5, -5, 0],      // Amount of rotation
    y: [0, -12, 0],             // Bounce height
    scale: [1, 1.05, 1],        // Size variation
    transition: { duration: 1.5, repeat: Infinity } // Speed
  }
}
```

Duration values:
- Lower = Faster (try 0.5 for very fast)
- Higher = Slower (try 5 for very slow)

---

### Task 5: Change Processing Steps

**Edit**: `src/screens/ProcessingScreen.jsx`

```javascript
const STEPS = [
  { label: 'Step name', duration: 1000 },  // 1000ms = 1 second
  { label: 'Next step', duration: 1500 },  // 1500ms = 1.5 seconds
  // Add or remove steps here
]
```

Total time = sum of all durations
Example: 1000 + 1500 + 1200 = ~3.7 seconds total

---

### Task 6: Add Environmental Variables

**Create**: `.env` file in frontend directory

```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Cloudify
```

**Use in code**:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
const appName = import.meta.env.VITE_APP_NAME
```

---

### Task 7: Deploy to Vercel

**Steps**:
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repo
5. Framework: Vite
6. Deploy!

---

### Task 8: Deploy to Netlify

**Steps**:
1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

---

### Task 9: Clear Browser Data

**To clear localStorage** (saved clouds):
```javascript
// In browser console (F12):
localStorage.clear()
location.reload()
```

**To keep localStorage but start fresh:**
```javascript
localStorage.removeItem('cloudify_history')
```

---

### Task 10: Update Dependencies

**Check for updates**:
```bash
npm outdated
```

**Update all**:
```bash
npm update
npm install
```

**Update specific package**:
```bash
npm install react@latest
npm install framer-motion@latest
```

---

## 📊 Performance Optimization

### Check Bundle Size
```bash
npm run build
# Check dist folder size
# Should be under 400KB total
```

### Optimize Images
- Use compressed images (under 2MB each)
- Convert to WebP format for better compression
- Use `html-to-image` to generate optimized cards

### Reduce Animations
- Disable animations on low-end devices
- Use `prefers-reduced-motion` media query:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }
  ```

---

## 🔍 Debugging Tips

### Enable Debug Mode
Add to `main.jsx`:
```javascript
window.__DEBUG__ = true
```

### Console Logging
```javascript
console.log('Value:', variable)
console.table(arrayOfObjects)
console.error('Error message:', error)
```

### Network Debugging
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action
4. Look for requests
5. Click on request to see details

### React DevTools
Install browser extension:
- [React DevTools](https://react-devtools-tutorial.vercel.app/)

---

## 📝 Common Error Messages

### "Cannot find module"
**Cause**: Import path is wrong
**Fix**: Check file name and path
```javascript
// Wrong:
import Mascot from './components/mascot'  // lowercase

// Right:
import Mascot from '../components/Mascot'  // correct case
```

### "Unexpected token"
**Cause**: Syntax error in code
**Fix**: Check for:
- Missing semicolons
- Unclosed brackets
- Missing commas
- Typos

### "Tailwind classes not working"
**Cause**: Class not in Tailwind config
**Fix**:
```javascript
// In tailwind.config.js, ensure content includes:
content: ['./src/**/*.{js,jsx,ts,tsx}']
```

### "Port already in use"
**Cause**: Another app using the port
**Fix**:
```bash
npm run dev -- --port 3000  # Use different port
```

---

## 🎯 Performance Checklist

- [ ] Build size under 400KB
- [ ] Load time under 3 seconds
- [ ] All animations smooth (60fps)
- [ ] No console errors
- [ ] Responsive on mobile (DevTools)
- [ ] Images optimized (under 2MB each)
- [ ] localStorage working
- [ ] API integration (real or mock)
- [ ] Navigation smooth
- [ ] No memory leaks

---

## 🚀 Pre-Launch Checklist

- [ ] Test all 8 screens
- [ ] Verify all buttons work
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test image upload
- [ ] Verify history saving
- [ ] Test filtering
- [ ] Check animations
- [ ] Clear console errors
- [ ] Test on different browsers
- [ ] Verify build output
- [ ] Create production build
- [ ] Test production build locally
- [ ] Deploy to hosting
- [ ] Test live URL
- [ ] Monitor performance

---

## 📞 Getting Help

### Where to Look
1. **Browser Console** (F12) - JavaScript errors
2. **Network Tab** (F12) - API failures
3. **React DevTools** - Component issues
4. **Build Output** - Compilation errors

### Common Resources
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Vite Documentation](https://vitejs.dev)

### Report Issues
Include:
- Error message
- Steps to reproduce
- Browser and OS
- Screenshot
- Relevant code snippet

---

## ✅ Verification Steps

After setup, verify:
```bash
# 1. Dependencies installed
npm list react

# 2. Dev server starts
npm run dev
# Should show: http://localhost:5173

# 3. Build succeeds
npm run build
# Should create dist/ folder

# 4. No console errors
# F12 → Console tab should be empty

# 5. All screens accessible
# Navigate through all 8 screens

# 6. Images load
# Upload a test image

# 7. Animations work
# Watch mascot and background clouds

# 8. Responsive
# Resize browser window
```

---

**Remember**: Most issues are resolved by restarting the dev server and clearing the browser cache!

If all else fails: `npm cache clean --force && npm install && npm run dev`
