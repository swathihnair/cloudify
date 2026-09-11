# Cloudify Visual Guide & Component Reference

## 🎨 Visual Component Map

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVBAR (Fixed Top)                   │
│  ◀ Logo     [Cloudify]                    [☁ My Clouds]   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   CLOUD BACKGROUND (Behind)                 │
│  ☁ ☁ ☁ (Fast layer - 10s loop)                            │
│    ☁ ☁ (Medium layer - 14s loop)                          │
│      ☁ (Slow layer - 20s loop)                            │
│  Parallax floating effect creates depth                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    MAIN CONTENT AREA                        │
│                                                             │
│  • Landing Screen → 3 CTA buttons                          │
│  • Camera Capture → File picker + preview                  │
│  • Processing → 5-step checklist with mascot             │
│  • Cloud Card → Photo + overlay + personality            │
│  • Stats → Character traits + animated bars               │
│  • Poll → Vote interface with comparison                 │
│  • Featured → Polaroid card layout                        │
│  • History → Gallery with filters                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏠 Landing Screen Layout

```
┌─────────────────────────────────────┐
│                                     │
│           ☁ MASCOT ☁               │ (Animated entrance)
│          (Idle state)              │
│                                     │
│        ✨ CLOUDIFY ✨              │ (Large bold text)
│                                     │
│   "Discover magical creatures"     │ (Subtitle)
│    "hiding in the clouds"          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   📷 Capture or Upload      │   │ (Primary CTA)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   ✨ Cloud of the Day       │   │ (Secondary CTA)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   📚 My Clouds              │   │ (Tertiary CTA)
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 📸 Camera Capture Layout

```
┌─────────────────────────────────────┐
│                                     │
│    ┌─────────────────────────┐     │
│    │   [Image Preview Area]  │     │ (or camera indicator)
│    │   (Shows uploaded image) │     │
│    └─────────────────────────┘     │
│                                     │
│  "📸 Tip: Clear sky photos work    │
│   best for personality detection"  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   📁 Choose Image or 📷 Snap   │   │ (File picker)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   ▶ Analyze Cloud           │   │ (Submit button)
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## ⚙️ Processing Screen Layout

```
┌─────────────────────────────────────┐
│                                     │
│      🎊 MASCOT MASCOT 🎊           │ (Excited state with halo)
│       (Spinning, bouncing)         │
│                                     │
│      "Analyzing Cloud..."          │
│                                     │
│    ┌─────────────────────────┐     │
│    │ Progress: ████░░░░░░░░░ │     │ (Real-time bar)
│    │         45%              │     │
│    └─────────────────────────┘     │
│                                     │
│    Checklist:                       │
│    ✅ Uploading image              │
│    ✅ Detecting cloud region       │
│    ⏳ Segmenting shape (current)   │
│    ⏸ Inferring archetype           │
│    ⏸ Generating character          │
│                                     │
│  "✨ This usually takes 10-15 sec"  │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎴 Cloud Card Screen Layout

```
┌─────────────────────────────────────┐
│                                     │
│    ┌─────────────────────────┐     │
│    │                         │     │
│    │   [UPLOADED SKY PHOTO]  │     │
│    │                         │     │ (With SVG doodle overlay)
│    │   ~~~ Dinosaur Doodle~~~│     │
│    │                         │     │
│    └─────────────────────────┘     │
│                                     │
│   🦕 DINOSAUR | 82% confidence     │ (Title + confidence)
│                                     │
│   "Looks like it woke up five      │ (Personality caption)
│    minutes ago but is ready to     │
│    conquer the sky."               │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   ➡ View Personality Stats  │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 Personality Stats Layout

```
┌─────────────────────────────────────┐
│                                     │
│    "Fluffy Rex"  🏷️ Sleepy        │ (Name + trait badge)
│                                     │
│   Energy Score: ███████░░ 76%      │ (Energy meter)
│                                     │
│   ┌────────────────────────────┐   │
│   │ Personality Traits:        │   │
│   │                            │   │
│   │ Cuteness     ████████░░░░░ 91  │ (Animated bar)
│   │ Chaos        ███████░░░░░░ 74  │ (Shimmer effect)
│   │ Fluffiness   ███████████░░ 96  │ (Color-coded)
│   │ Main Energy  █████████░░░░ 88  │
│   │ Dino Energy  ████████░░░░░ 82  │
│   │                            │   │
│   └────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   ➡ Compare with AI Guess   │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🗳️ Human vs AI Screen Layout

```
┌─────────────────────────────────────┐
│                                     │
│    "What do YOU think it is?"       │ (Question)
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ 🦕      │  │ 🐉      │          │ (Choice pills)
│  │Dinosaur │  │ Dragon  │          │ (User selects)
│  └─────────┘  └─────────┘          │
│                                     │
│    "AI Thinks... 🧠"               │
│                                     │
│    🦕 Dinosaur 82%                 │ (AI prediction)
│    Alt: 🐉 Dragon 64%              │ (Alt prediction)
│                                     │
│    ☁️ Mascot Says:                 │
│   "Wow, you got it right! 🎉"     │ (Reaction bubble)
│                                     │
│  ┌─────────────────────────────┐   │
│  │   ➡ See Cloud of the Day    │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🏆 Cloud of the Day Layout

```
┌─────────────────────────────────────┐
│                                     │
│         Featured Discovery          │
│                                     │
│    ╭───────────────────────────╮   │
│    │                           │   │
│    │    ┌─────────────────┐    │   │
│    │    │ [CLOUD PHOTO]   │    │   │
│    │    └─────────────────┘    │   │ (Polaroid style)
│    │                           │   │
│    │  "Fluffy Rex"            │   │
│    │  The Sleepy Dinosaur     │   │
│    │                           │   │
│    │  Discovered: Today 3PM    │   │
│    │                           │   │
│    ╰───────────────────────────╯   │
│      📍 Pinned with effect        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   💾 Save to My Clouds      │   │ (Save triggers confetti)
│  └─────────────────────────────┘   │
│                                     │
│         🎊 Confetti Falls 🎊       │
│                                     │
└─────────────────────────────────────┘
```

---

## 📚 Cloud History Gallery Layout

```
┌─────────────────────────────────────┐
│                                     │
│  ▲ [Clouds] [This Week]           │ (Back button + filters)
│              [This Month]           │
│              [All Time]             │
│                                     │
│    "My Cloud Gallery" 🗑️           │ (Title + delete button)
│                                     │
│  ☁ (Mascot - idle if has clouds)  │
│                                     │
│  Gallery Grid:                      │
│  ┌─────────┐  ┌─────────┐         │
│  │ ☁       │  │ ☁       │         │
│  │ Dinosaur│  │ Dragon  │         │ (Card thumbnails)
│  │ 2h ago  │  │ 1d ago  │         │ (Timestamps)
│  │  ✕      │  │  ✕      │         │ (Delete each)
│  └─────────┘  └─────────┘         │
│                                     │
│  ┌─────────┐  ┌─────────┐         │
│  │ ☁       │  │ ☁       │         │
│  │ Bunny   │  │ Whale   │         │
│  │ 3d ago  │  │ 5d ago  │         │
│  │  ✕      │  │  ✕      │         │
│  └─────────┘  └─────────┘         │
│                                     │
│  "Delete all clouds?" (Confirm)    │ (When delete clicked)
│  [Cancel]  [Delete All]            │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎭 Mascot Mood States

```
SLEEP STATE              IDLE STATE              EXCITED STATE
  ○ ○                     ● ●                      ● ●
   ◡                       ◠                        ◡
 Gentle drift           Slow bounce              Fast bounce
 Eyes: Closed           Eyes: Open               Eyes: Wide open
                                                 Halo: Spinning
                                                 Scale: Pulsing

CURIOUS STATE           RESULT STATE
  ◦ ◦                     ● ●
 Tilting head            ◠ (Confident)
 Eyes: Side-eye          Eyes: Normal
```

---

## 📱 Responsive Breakpoints

```
MOBILE (320px-640px)
┌──────────────────┐
│ 🏠 Cloudify  ☁  │ ← Navbar (compact)
│                  │
│      ☁ ☁ ☁       │ ← Mascot (md size)
│                  │
│    CLOUDIFY      │ ← Large text
│                  │
│ [Button]         │ ← Full-width buttons
│                  │
└──────────────────┘

TABLET (640px-1024px)
┌────────────────────────┐
│ ◀ 🏠 Logo    ☁ Clouds │ ← Navbar expanded
│                        │
│        ☁ ☁ ☁           │
│      (MASCOT)          │ ← Centered mascot
│                        │
│      CLOUDIFY          │ ← Heading
│                        │
│  [Button] [Button]     │ ← Side-by-side options
│                        │
└────────────────────────┘

DESKTOP (1024px+)
┌─────────────────────────────────────────┐
│ ◀ 🏠 Logo        |    ☁ My Clouds     │
│                                         │
│                ☁ ☁ ☁                   │
│              (MASCOT - LG)             │
│                                         │
│            🎨 CLOUDIFY 🎨              │
│                                         │
│  [Primary CTA]  [Secondary] [Tertiary] │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎨 Color Reference

```
BACKGROUND GRADIENT (Top to Bottom)
  from-sky-300    (Light blue)
  via-sky-200     (Lighter blue)
  to-blue-50      (Almost white)

CLOUD COLORS
  Fill: #FFFFFF (White)
  Gradient overlay: #FFFFFF → transparent
  Opacity: 30% to 70% per layer

BUTTON COLORS
  Primary: from-blue-400 to-blue-500 (Vibrant blue)
  Secondary: bg-white/80 (Semi-transparent white)
  Danger: bg-red-500 (Error red)
  Success: bg-green-500 (Confirmed)

TEXT COLORS
  Heading: text-white (Pure white)
  Body: text-sky-900 (Dark blue)
  Muted: text-white/80 (Translucent white)
  Link: text-sky-600 (Medium blue)

STAT BAR COLORS (By Value)
  ≥80: bg-emerald-400 (Green - Excellent)
  60-80: bg-sky-400 (Blue - Good)
  40-60: bg-amber-400 (Yellow - Medium)
  <40: bg-rose-400 (Red - Low)

MASCOT CHEEKS
  Color: #FFB6D9 (Pink)
  Opacity: 60%
```

---

## 🔄 Navigation Flow Diagram

```
┌─────────────┐
│   LANDING   │
└──────┬──────┘
       │
       ├─→ [Capture] ──→ ┌──────────┐
       │                 │ CAMERA   │
       │                 └─────┬────┘
       │                       │
       │                       ▼
       │                ┌──────────────┐
       │                │  PROCESSING  │ (Auto-advance)
       │                └──────┬───────┘
       │                       │
       │                       ▼
       │                ┌──────────────┐
       │                │ CLOUD CARD   │
       │                └──┬───────┬───┘
       │                   │       │
       │    ┌──────────────┘       └────────────────┐
       │    │                                       │
       │    ▼                                       ▼
       │ ┌──────────┐                        ┌──────────┐
       │ │  STATS   │                        │  POLL    │
       │ └──────────┘                        └──────────┘
       │
       ├─→ [Featured] ──→ ┌──────────────┐
       │                  │ CLOUD OF DAY │
       │                  └──────────────┘
       │
       └─→ [History] ──→ ┌────────────────┐
                         │     GALLERY    │
                         │  (with filters)│
                         └────────┬───────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │ CLOUD CARD   │ (From history)
                          └──────────────┘
```

---

## 💾 Data Structure Visualization

```
CLOUD OBJECT
├── id: "cloud_1694567890123"
├── timestamp: "2024-09-11T10:30:45Z"
├── imageData: "data:image/jpeg;base64,..."
├── category: "dinosaur"
├── confidence: 82
├── alt_category: "dragon"
├── alt_confidence: 64
├── region: {
│   x: 120,
│   y: 340,
│   width: 200,
│   height: 150
│ }
└── personality: {
    name: "Fluffy Rex",
    trait: "Sleepy but powerful",
    caption: "Looks like it woke up...",
    stats: {
      cuteness: 91,
      chaos: 74,
      fluffiness: 96,
      main_character_energy: 88,
      dinosaur_energy: 82
    }
  }
```

---

## 🎬 Animation Timeline

```
LANDING SCREEN ENTRANCE
0ms:    Mascot scale 0, opacity 0
300ms:  Mascot scale 1, opacity 1 (spring)
300ms:  Title appears (fade-in)
500ms:  Subtitle appears (fade-in)
700ms:  Primary button appears (slide-up)
800ms:  Secondary button appears (slide-up)
900ms:  Tertiary button appears (slide-up)

PROCESSING SCREEN
0ms:     Start: Progress 0%, Step 0
1000ms:  Step 1 complete (duration 1000ms)
2500ms:  Step 2 complete (1500ms duration)
3700ms:  Step 3 complete (1200ms duration)
5500ms:  Step 4 complete (1800ms duration)
6500ms:  Step 5 complete (1000ms duration)
7000ms:  Auto-navigate to cloud card

CLOUD BACKGROUND (Continuous)
- Layer 1: 20-second loop (slowest)
- Layer 2: 14-second loop (medium)
- Layer 3: 10-second loop (fastest)
- All loops infinite and concurrent
```

---

## 🎯 Responsive Typography

```
MOBILE (320px)              TABLET (768px)              DESKTOP (1024px+)
Landing Title               Landing Title               Landing Title
4xl (36px)                  5xl (48px)                  6xl (60px)

Landing Subtitle            Landing Subtitle            Landing Subtitle
base (16px)                 lg (18px)                   xl (20px)

Button Text                 Button Text                 Button Text
sm (14px)                   base (16px)                 base (16px)

Screen Heading              Screen Heading              Screen Heading
2xl (24px)                  3xl (30px)                  4xl (36px)

Body Text                   Body Text                   Body Text
sm (14px)                   base (16px)                 base (16px)
```

---

## 📐 Spacing & Layout Units

```
PADDING
Mobile: p-4 (16px)
Tablet: sm:p-6 (24px)
Desktop: lg:p-8 (32px)

GAPS (Between elements)
Tight: gap-2 (8px)
Normal: gap-3 (12px)
Loose: gap-4 (16px)
Large: gap-6 (24px)

MAX-WIDTHS (Content containers)
Card: max-w-md (448px)
Content: max-w-lg (512px)
Full: max-w-4xl (896px)
```

This visual guide provides a complete reference for understanding the Cloudify UI layout, components, animations, and responsive behavior across all devices.
