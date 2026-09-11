# Testing Hunting Mode - Debug Guide

## What Should Happen

When you upload a cloud while hunting for "Lion":

1. **Frontend sends:** 
   - URL: `POST /api/analyze?hunting_for=Lion`
   - Body: FormData with file

2. **Backend receives:**
   - Logs: `🎯 USER IS HUNTING FOR: Lion`

3. **Analyzer processes:**
   - Logs: `🎯 FORCED SHAPE MODE: Drawing Lion on cloud!`
   - Logs: `🎨 Drawing Lion features on cloud...`
   - Logs: `✅ Successfully drew Lion outline`

4. **Result shows:**
   - Confidence: 100%
   - Shape: Lion
   - Image: Cloud with lion mane, eyes, nose drawn

## How to Debug

### Check Backend Logs

After uploading cloud while hunting, look for:

```
================================================================================
🆕 NEW ANALYSIS REQUEST RECEIVED
🎯 USER IS HUNTING FOR: Lion
================================================================================
Received image: [bytes] bytes
Saved image to: uploads/[uuid].jpg
Starting image analysis...
================================================================================
🎯 FORCED SHAPE MODE: Drawing Lion on cloud!
================================================================================
🎨 Drawing Lion features on cloud...
```

### If You DON'T See "USER IS HUNTING FOR"

**Problem:** Frontend isn't sending the parameter
**Check:** Browser console for the API request URL
**Should see:** `/api/analyze?hunting_for=Lion`

### If You See "USER IS HUNTING FOR" But No Drawing

**Problem:** Drawing function is failing
**Check:** Backend logs for error traceback
**Look for:** `⚠️  Failed to draw outline:`

### If Outline is Plain (No Animal Features)

**Problem:** Shape name mismatch
**Check:** Make sure shape name matches exactly:
- "Lion" (capital L)
- "Dog" (capital D)
- "IceCream" (capital I and C)

## Current Implementation

### Hunting for Animals (Lion, Dog, Cat, etc.)
- Draws full outline + features
- Shows eyes, nose, ears, etc.
- Uses shape-specific colors

### Hunting for IceCream
- Draws simple cloud outline
- No animal features
- Uses sky blue color
- Label says "✓ Fluffy Cloud"

## Testing Steps

1. **Test Regular Mode First:**
   - Upload cloud WITHOUT hunting
   - Should detect and draw automatically
   - If this fails, CLIP model issue

2. **Test Hunting Mode (Lion):**
   - Upload object photo of lion/similar
   - Click "Find Matching Clouds"
   - Click "Start Hunting!"
   - Upload cloud photo
   - Should draw lion features at 100% confidence

3. **Test Hunting Mode (IceCream):**
   - Upload ice cream photo
   - Follow same flow
   - Should draw simple cloud outline

## Expected Backend Output

```python
# Normal Mode
analyze_cloud_image(image_bytes, force_shape=None)
# Uses CLIP detection
# Draws detected shape

# Hunting Mode (Lion)
analyze_cloud_image(image_bytes, force_shape="Lion")
# Skips CLIP
# Draws Lion features
# Returns 100% confidence

# Hunting Mode (IceCream)
analyze_cloud_image(image_bytes, force_shape="IceCream")
# Skips CLIP
# Draws simple outline
# Returns 100% confidence
```

## If Still Not Working

1. **Restart Backend:** `python main.py` in backend folder
2. **Clear Browser Cache:** Hard refresh (Ctrl+Shift+R)
3. **Check Browser Console:** Look for errors
4. **Check Backend Terminal:** Look for Python errors
5. **Try Different Shape:** Maybe specific shape has bug
