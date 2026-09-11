# Hunting Mode - User Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         LANDING SCREEN                          │
│                                                                 │
│  [Capture or Upload]  [Find Cloud Shape]  [Cloud of the Day]   │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Click "Find Cloud Shape"
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OBJECT MATCH SCREEN                          │
│                                                                 │
│  Upload object photo (🍦 ice cream, 🦁 lion, 🐕 dog, etc.)      │
│                                                                 │
│  [Choose Photo Button]                                          │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Upload & Analyze
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                       ANALYSIS RESULT                           │
│                                                                 │
│  🍦                                                              │
│  Ice Cream Cloud!                                               │
│  95% Match                                                       │
│                                                                 │
│  "This looks like ice cream! Look for fluffy cumulus clouds..." │
│                                                                 │
│  [Try Another]  [Find Matching Clouds]                          │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Click "Find Matching Clouds"
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ANIMATION SCREEN (Full Screen)               │
│                                                                 │
│              ☁️  (floating and rotating)                        │
│                                                                 │
│                    Let's Find                                   │
│              Matching Cloud Pair!                               │
│                                                                 │
│         ┌─────────────────────────┐                             │
│         │         🍦              │                             │
│         │   Looking for           │                             │
│         │   Fluffy Cloud          │                             │
│         └─────────────────────────┘                             │
│                                                                 │
│                    👇 (bouncing)                                │
│                                                                 │
│              [Start Hunting! 📸]                                │
│                                                                 │
│              (Back to results)                                  │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Click "Start Hunting!"
                                  │ Pass: lookingFor = "IceCream"
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAMERA CAPTURE SCREEN                        │
│                                                                 │
│  ╔═══════════════════════════════════════════════════════════╗ │
│  ║ 🍦   🎯 ON A MISSION                            🔍       ║ │
│  ║     Looking for Fluffy Clouds!                           ║ │
│  ╚═══════════════════════════════════════════════════════════╝ │
│                                                                 │
│               [Cloud Preview Area]                              │
│                                                                 │
│  [📷 Take Photo]  [📁 Upload from Gallery]                      │
│                                                                 │
│  [✓ Analyze This Cloud]                                         │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Upload cloud photo
                                  │ Pass: huntingFor = "IceCream"
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROCESSING SCREEN                            │
│                                                                 │
│  Analyzing Cloud...                                             │
│  [Progress Bar] 100%                                            │
│                                                                 │
│  ✓ Uploading image                                              │
│  ✓ Detecting cloud region                                       │
│  ✓ Segmenting shape                                             │
│  ✓ Drawing IceCream features  ← FORCED SHAPE MODE!             │
│  ✓ Generating character                                         │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ API Call with hunting_for="IceCream"
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                 │
│                                                                 │
│  analyze_cloud_image(image_bytes, force_shape="IceCream")      │
│                                                                 │
│  🎯 FORCED SHAPE MODE: Drawing IceCream on cloud!               │
│                                                                 │
│  ✓ Skip CLIP detection                                          │
│  ✓ Set confidence = 100%                                        │
│  ✓ Draw ice cream outline (plain cloud, no animal features)    │
│  ✓ Return "requested by user"                                   │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Return result
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                       RESULT SCREEN                             │
│                                                                 │
│  ┌─────────────────────────────────────────┐                   │
│  │  [Cloud image with ice cream outline]   │                   │
│  │  ✓ IceCream                             │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
│  🍦 Fluffy McCloud                                              │
│  Top Guess: IceCream (100%) ← User requested!                  │
│  Runner Up: IceCream (95%)                                      │
│                                                                 │
│  "Look for fluffy cumulus clouds..."                            │
│                                                                 │
│  Personality: Sweet                                             │
│  Stats: Cuteness 99, Fluffiness 100, etc.                      │
│                                                                 │
│  [View Full Stats] [Compare with AI]                            │
└─────────────────────────────────────────────────────────────────┘
```

## Key Points:

1. **Normal Flow**: Object detection → CLIP analyzes cloud → draws detected shape
2. **Hunting Flow**: Object detection → user hunts → draws REQUESTED shape (not detected)

## Data Flow:

```
ObjectMatchScreen
    └─> result.matched_shape = "IceCream"
        └─> navigate('/capture', { lookingFor: "IceCream" })
            └─> CameraCapture
                └─> navigate('/processing', { huntingFor: "IceCream" })
                    └─> ProcessingScreen
                        └─> predict(file, "IceCream")
                            └─> usePrediction
                                └─> FormData: { file, hunting_for: "IceCream" }
                                    └─> POST /api/analyze
                                        └─> analyze_cloud_image(bytes, force_shape="IceCream")
                                            └─> draw_outline_on_image(img, "IceCream")
                                                └─> Returns: confidence=100%, region="requested by user"
```

## State Propagation:

| Screen | State Variable | Value |
|--------|---------------|-------|
| ObjectMatchScreen | `result.matched_shape` | "IceCream" |
| CameraCapture | `lookingFor` (from nav state) | "IceCream" |
| ProcessingScreen | `huntingFor` (from nav state) | "IceCream" |
| usePrediction | `huntingFor` (param) | "IceCream" |
| Backend API | `hunting_for` (form data) | "IceCream" |
| analyzer.py | `force_shape` (param) | "IceCream" |

## Result Difference:

**Without Hunting Mode:**
- Cloud analyzed with CLIP
- Detected: "Lion" (75% confidence)
- Features: Lion mane, face drawn
- Source: "detected by CLIP vision model"

**With Hunting Mode (hunting for IceCream):**
- Cloud NOT analyzed (skips detection)
- Forced: "IceCream" (100% confidence)
- Features: Plain cloud outline (no animal)
- Source: "requested by user"

This creates a fun experience where users can "see" whatever they want in the clouds! 🎉
