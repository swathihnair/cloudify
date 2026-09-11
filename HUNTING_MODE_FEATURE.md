# Hunting Mode Feature - Draw Specific Object on Cloud

## Feature Description
When a user identifies an object (e.g., ice cream 🍦, lion 🦁, dog 🐕) and starts hunting for clouds, the system will draw THAT specific object's features on any cloud they upload, instead of detecting what the cloud looks like.

## How It Works

### User Flow:
1. **Object Match Screen**: User uploads object photo (e.g., ice cream)
2. **Animation Screen**: Shows "Let's Find Matching Cloud Pair!"
3. **Camera Capture**: User clicks "Start Hunting!" and sees mission banner
4. **Upload Cloud Photo**: User uploads a cloud image
5. **Processing**: System draws the HUNTED object on the cloud (not what it detects)
6. **Result**: Cloud shows ice cream features with 100% confidence "requested by user"

### Technical Implementation:

#### Frontend Changes:

**1. CameraCapture.jsx**
- Receives `lookingFor` from navigation state
- Passes `huntingFor` to ProcessingScreen
```javascript
navigate('/processing', { state: { file, preview, huntingFor: lookingFor } })
```

**2. ProcessingScreen.jsx**
- Extracts `huntingFor` from location state
- Passes it to the `predict()` function
```javascript
const huntingFor = location.state?.huntingFor
predict(file, huntingFor)
```

**3. usePrediction.js**
- Updated `predict()` to accept `huntingFor` parameter
- Appends `hunting_for` to FormData if provided
```javascript
const predict = useCallback(async (imageFile, huntingFor = null) => {
  const formData = new FormData()
  formData.append('file', imageFile)
  if (huntingFor) {
    formData.append('hunting_for', huntingFor)
  }
  // ... send to API
})
```

#### Backend Changes:

**1. main.py**
- Added `Form` import from FastAPI
- Updated `/api/analyze` endpoint to accept `hunting_for` form parameter
```python
@app.post("/api/analyze")
async def analyze_cloud(
    file: UploadFile = File(...),
    hunting_for: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    analysis = analyze_cloud_image(image_bytes, force_shape=hunting_for)
```

**2. analyzer.py**
- Updated `analyze_cloud_image()` to accept `force_shape` parameter
- When `force_shape` is provided:
  - Skips CLIP detection
  - Sets confidence to 100% (user requested)
  - Draws the FORCED shape's features on cloud
  - Returns "requested by user" as detection source

```python
def analyze_cloud_image(image_bytes: bytes, force_shape: str = None) -> dict:
    if force_shape:
        print(f"🎯 FORCED SHAPE MODE: Drawing {force_shape} on cloud!")
        top_guess = force_shape
        confidence_score = 100  # User wanted this shape!
        
        identified_shapes = [{
            'shape': force_shape,
            'confidence': 100,
            'region': 'requested by user'
        }]
        
        # Draw the forced shape
        outlined_img = draw_outline_on_image(img, force_shape)
    else:
        # Normal CLIP detection...
```

## Special Handling

### Ice Cream (IceCream)
- When hunting for ice cream, the system shows a plain cloud outline
- No animal features are drawn (since ice cream isn't an animal)
- Still shows 100% confidence as "requested by user"

### Animal Shapes
- Lion: Draws mane, eyes, nose, smile
- Dog: Draws eyes, nose, smile
- Rabbit: Draws long ears, buck teeth, pink nose
- Dragon: Draws fierce eyes, teeth, spikes
- Elephant: Draws trunk, ears
- Whale: Draws water spout, smile
- Bird: Draws beak, eye, wing
- Butterfly: Draws antennae, wing patterns
- Cat: Draws eyes, whiskers
- Bear: Draws eyes, nose
- Horse: Draws mane, nostril
- Dinosaur: Draws fierce eyes, teeth

## Testing Instructions

### 1. Start Backend
```bash
cd backend
python main.py
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Test Flow
1. Go to landing page
2. Click "Find Cloud Shape"
3. Upload an ice cream photo (or any animal toy)
4. See the analysis and confidence
5. Click "Find Matching Clouds"
6. See the animation
7. Click "Start Hunting! 📸"
8. See the mission banner on camera screen
9. **Upload ANY cloud photo**
10. Watch it process
11. **Result: The cloud will have ICE CREAM drawn on it!** (or whatever you were hunting for)
12. Confidence shows 100% "requested by user"

### Expected Results:
- If hunting for 🍦: Plain cloud outline (no animal features)
- If hunting for 🦁: Cloud with lion mane, face, features drawn
- If hunting for 🐕: Cloud with dog eyes, nose, smile drawn
- If hunting for 🐰: Cloud with bunny ears, teeth, nose drawn
- Etc.

## API Changes

### Request Format
**Before:**
```
POST /api/analyze
Content-Type: multipart/form-data

file: [image file]
```

**After:**
```
POST /api/analyze
Content-Type: multipart/form-data

file: [image file]
hunting_for: "Lion" (optional)
```

### Response Format
Same as before, but when `hunting_for` is provided:
- `top_guess` = hunting_for value
- `confidence_score` = 100
- `identified_shapes[0].region` = "requested by user"

## Files Modified
1. `frontend/src/screens/CameraCapture.jsx` - Pass huntingFor to processing
2. `frontend/src/screens/ProcessingScreen.jsx` - Extract and pass to predict
3. `frontend/src/hooks/usePrediction.js` - Accept and send huntingFor param
4. `backend/main.py` - Accept hunting_for form parameter
5. `backend/analyzer.py` - Use force_shape to draw specific object

## Benefits
- User gets exactly what they're looking for
- Fun interactive experience
- Encourages cloud hunting in real life
- Shows that ANY cloud can be that shape if you imagine it!
- 100% confidence makes it clear this was the user's choice
