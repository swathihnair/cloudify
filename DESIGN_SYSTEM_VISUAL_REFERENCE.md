# Cloud Shape Classifier - Visual Reference & Mockups

## Screen 1: Landing Page

```
┌─────────────────────────────────────────────┐
│           ✨ ⭐ Floating sparkles ✨         │
│                                             │
│                    ☁️                       │  60% height
│                  Happy smile                │  Mascot floating gently
│                  Big smile :)               │
│                                             │
│             ✨        ⭐        ✨           │  Sparkles orbit
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        Cloud Shape Finder                   │
│                                             │  Headline
│        Ever looked at a cloud and           │
│        thought it looked like something     │
│        magical? Let's discover together!    │  Tagline
│                                             │
│       ╔═══════════════════════════╗        │
│       ║ Upload a Cloud ✨         ║        │  Orange gradient button
│       ║ (Pill-shaped, shadow)     ║        │
│       ╚═══════════════════════════╝        │
│                                             │
│       Use camera or upload a photo          │  Hint text
│                                             │
└─────────────────────────────────────────────┘
```

### Visual Elements
- **Hero**: Large happy cloud mascot with gentle float animation
- **Sparkles**: 3-5 twinkling stars/sparkles orbiting cloud
- **Title**: Bold, friendly typography
- **Button**: Prominent orange gradient, pill-shaped, shadows
- **Background**: Sky blue gradient (light to lighter)

---

## Screen 2: Upload Page

```
┌─────────────────────────────────────────────┐
│ ← Back  |  Let's Upload! 🌤️                │  Header
│                                             │
│                   ☁️                        │  Curious expression
│                  ? Tilted head              │  Head tilt: -5°
│                  Question mark decoration   │
│                                             │
│         Animation: Gentle bounce            │
│                                             │
│         "Curious to see your photo!"        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│    ╔═══════════════════════════════════╗   │
│    ║           ☁️                       ║   │  Upload zone
│    ║                                   ║   │  Dashed border
│    ║  Drop your cloud photo here       ║   │
│    ║  PNG, JPG • Max 10MB              ║   │
│    ║                                   ║   │  40px padding
│    ╚═══════════════════════════════════╝   │
│                                             │
│              ── or ──                       │  Divider
│                                             │
│    ╔═════════════╗  ╔═════════════╗        │
│    ║ 📷 Camera   ║  ║ 🖼️ Gallery  ║        │  Alt buttons
│    ╚═════════════╝  ╚═════════════╝        │  (Pill, blue border)
│                                             │
│      Can't wait to analyze! ⚡              │  Encouragement
│                                             │
└─────────────────────────────────────────────┘
```

### Visual Elements
- **Mascot**: Curious expression, head tilted -5°
- **Animation**: Question mark bobs up/down (1.5s)
- **Upload Zone**: Dashed border, light blue background, large padding
- **Hover State**: Solid border, light blue tint, scale up slightly
- **Drag State**: Background brightens, shadow expands

---

## Screen 3: Processing/Loading

```
┌─────────────────────────────────────────────┐
│                                             │
│        Analyzing your cloud...              │  Title
│                                             │
│                  ☁️ 💧                      │  Excited mascot
│              Squinted happy eyes            │
│              Wide grin :D                   │  Vigorous bounce
│             Sweat drops falling             │  Animation: Fast bounce
│               🔥  ⚡                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ╔═══════════════════════════════════╗    │
│  ║ Looking at the shape and beauty!  ║    │  Card
│  ║                                   ║    │
│  ║ ████████░░  65%                   ║    │  Progress bar
│  ║                                   ║    │
│  ║ ✓ Uploading image                 ║    │ Completed
│  ║ ✓ Detecting cloud region          ║    │ Completed
│  ║ ⊕ Segmenting shape                ║    │ Current (pulse)
│  ║ ○ Inferring archetype             ║    │ Pending
│  ║ ○ Generating character            ║    │ Pending
│  ║                                   ║    │
│  ║ 🎨 Finding the perfect match...   ║    │
│  ╚═══════════════════════════════════╝    │
│                                             │
│        Just a moment...                     │
│                                             │
└─────────────────────────────────────────────┘
```

### Visual Elements
- **Mascot**: Impatient/excited, squinted happy eyes, vigorous bounce
- **Sweat drops**: Fall animation + fade (1.5s, staggered)
- **Progress bar**: Smooth orange fill (adaptive duration)
- **Step checklist**: ✓ (green), ⊕ (orange pulse), ○ (gray)
- **Surrounding**: 🔥⚡ emoji with pulse animation

---

## Screen 4: Results Page

```
┌─────────────────────────────────────────────┐
│         ✨ YOUR CLOUD IS...                 │  Header band
├─────────────────────────────────────────────┤
│                                             │
│  ╔═══════════════════════════════════╗    │
│  ║                                   ║    │  Image section
│  ║          [Cloud Image]            ║    │  Light blue bg
│  ║       ╭─────────────────╮         ║    │  With doodle overlay
│  ║       │  ✨⭐ ✨        │         ║    │  (arrow, circle, sparkles)
│  ║       ╰─────────────────╯         ║    │
│  ║                                   ║    │
│  ╚═══════════════════════════════════╝    │
│                                             │
│  ╔═══════════════════════════════════╗    │
│  ║ 🎨 LOOKS LIKE                     ║    │
│  ║                                   ║    │  Gold/yellow box
│  ║ "A majestic brachiosaurus         ║    │  Dashed border
│  ║  dreaming of pizza"               ║    │
│  ╚═══════════════════════════════════╝    │
│                                             │
│  TOP MATCHES                                │
│                                             │
│  🦖 DINOSAUR              ████████░░  82%  │  Prediction 1
│  🐉 DRAGON                ██████░░░░  68%  │  Prediction 2
│  🐋 WHALE                 ███████░░░  72%  │  Prediction 3
│  🦅 EAGLE                 █████░░░░░  53%  │  Prediction 4
│  🐢 TURTLE                ████░░░░░░  48%  │  Prediction 5
│                                             │
│    ╔══════════════╗  ╔══════════════╗     │
│    ║ ← Try Again  ║  ║ Share This → ║     │  Buttons
│    ╚══════════════╝  ╚══════════════╝     │
│                                             │
└─────────────────────────────────────────────┘
```

### Visual Elements
- **Header**: Sky blue band with "YOUR CLOUD IS..." label
- **Image**: Large cloud photo with dashed outline overlay
- **Sparkles**: ✨⭐💫 scattered around image
- **Description**: Gold/yellow background, dashed border, funny AI text
- **Predictions**: List with emoji, name, confidence bar (orange), percentage
- **Bars**: Orange gradient fill, proportional to confidence
- **Buttons**: Left (white/blue border), Right (orange gradient, prominent)

---

## Screen 5: Share Template

```
╔════════════════════════════════╗
║   🌤️ Check this out!           ║
║                                ║
║                                ║
║            [Cloud]             ║  Stories format
║           /Image\              ║  9:16 aspect
║            🌤️                  ║
║          🔶 ← Arrow             ║
║        ✨⭐ Sparkles 💫        ║
║                                ║
║  My Cloud is a DINOSAUR!       ║
║  82% match • Cloud Finder      ║
║                                ║
║  #MyCloudIs #CloudFinder       ║
║  #CloudWatching                ║
║                                ║
║     Cloud Shape Finder         ║
╚════════════════════════════════╝

[Buttons Below]
📱 Instagram    𝕏 Twitter    ⬇️ Download
```

### Visual Elements
- **Card**: 9:16 aspect ratio (Stories), sky gradient background
- **Image**: Large, centered cloud photo with doodle overlays
- **Decorations**: Arrow (dashed), circle highlight, scattered sparkles/emoji
- **Text**: Main prediction bold/uppercase, stat line, hashtags
- **Doodle style**: Hand-drawn feel with consistent line weight (2px)

---

## Screen 6: Collection Grid

```
┌─────────────────────────────────────────────┐
│                                             │
│  All Possible Predictions                   │
│  What could YOUR cloud be?                  │
│                                             │
│  ╔─────────────────╗  ╔─────────────────╗  │
│  ║                 ║  ║                 ║  │
│  ║      🦖         ║  ║      🐉         ║  │
│  ║                 ║  ║                 ║  │  3-column grid
│  ║   DINOSAUR      ║  ║     DRAGON      ║  │  (mobile: 2 col)
│  ║  82% Match      ║  ║  68% Match      ║  │
│  ║                 ║  ║                 ║  │
│  ╚─────────────────╝  ╚─────────────────╝  │  Pastel backgrounds
│                                             │  (different color each)
│  ╔─────────────────╗  ╔─────────────────╗  │
│  ║                 ║  ║                 ║  │
│  ║      🐋         ║  ║      🦅         ║  │
│  ║                 ║  ║                 ║  │
│  ║     WHALE       ║  ║     EAGLE       ║  │
│  ║  72% Match      ║  ║  53% Match      ║  │
│  ║                 ║  ║                 ║  │
│  ╚─────────────────╝  ╚─────────────────╝  │
│                                             │
│  ╔─────────────────╗  ╔─────────────────╗  │
│  ║                 ║  ║                 ║  │
│  ║      🐢         ║  ║      🦑         ║  │
│  ║                 ║  ║                 ║  │
│  ║     TURTLE      ║  ║    OCTOPUS      ║  │
│  ║  48% Match      ║  ║  42% Match      ║  │
│  ║                 ║  ║                 ║  │
│  ╚─────────────────╝  ╚─────────────────╝  │
│                                             │
│       ⬇️ Download Full Collection           │
│   Perfect for Instagram & Twitter!          │
│                                             │
└─────────────────────────────────────────────┘
```

### Visual Elements
- **Grid**: 3 columns (responsive: 2 mobile, 2-3 tablet)
- **Cards**: Pastel gradient backgrounds (cycles through palette)
- **Content**: Emoji (48px), Name (uppercase), Stat (small)
- **Hover**: Scale 1.05, shadow expands
- **Gap**: 20px between cards, 16px padding
- **Download**: Orange gradient button, prominent placement

---

## Mascot Expression States

### 1. HAPPY (Landing)
```
      ◉━━◉
      ╭─ ─╮
      ╰━━━╯   (Big smile)
        ◯ ◯   (Blush spots)
```

### 2. CURIOUS (Upload)
```
      ◉━━◉  (tilted)
      ╰─ ─╭
      ╭─━ ╮  (Questioning open mouth)
        ◯ ◯   (Blush spots)
        
      ? (Nearby question mark)
```

### 3. EXCITED (Loading)
```
      ◉━━◉  (Squinted)
      ╭━━ ━╮
      ╰━━━╯  (Huge grin)
        ◯ ◯   (Large blush)
      💧💧   (Sweat drops)
```

### 4. PROUD (Results)
```
      ◉━━◉  (Sparkly)
      ╭─ ─╮
      ╰━━━╯  (Confident smile)
        ◯ ◯   (Prominent blush)
      ✨✨   (Sparkles around)
```

### 5. THINKING (Processing)
```
      ◉━━◉  (Focused)
      ╭─ ─╮
      ╰─ ─╯  (Contemplative mouth)
        ◯ ◯   (Subtle blush)
        
      🤔 (Thought bubble)
```

---

## Color Palette Visual Reference

```
Primary Sky Blues
┌─────────────────┐
│ Light: #c5e1ff  │  Used for: Buttons, borders, light fills
└─────────────────┘

┌─────────────────┐
│ Medium: #90caf9 │  Used for: Hover states, secondary elements
└─────────────────┘

┌─────────────────┐
│ Dark: #5b9cf2   │  Used for: Emphasis, active states
└─────────────────┘

Accent Oranges
┌─────────────────┐
│ Peach: #ff9f5a  │  Used for: Primary CTA, highlights
└─────────────────┘

┌─────────────────┐
│ Warm: #ff8a4a   │  Used for: Darker orange for depth
└─────────────────┘

┌─────────────────┐
│ Gold: #ffb700   │  Used for: Premium elements, success
└─────────────────┘

Accent Colors
┌──────────────────┐
│ Yellow: #ffc107  │  Sparkles, highlights
└──────────────────┘

┌──────────────────┐
│ Pink: #ffb7c5    │  Blush, soft accents
└──────────────────┘

┌──────────────────┐
│ Mint: #a8d8d8    │  Alternative accent
└──────────────────┘

Text Colors
┌──────────────────────┐
│ Dark: #1a3a52        │  Primary text
└──────────────────────┘

┌──────────────────────┐
│ Medium: #4a6fa5      │  Secondary text
└──────────────────────┘

┌──────────────────────┐
│ Light: #7ba3c0       │  Tertiary text
└──────────────────────┘

┌──────────────────────┐
│ Hint: #a8b8d0        │  Disabled, hints
└──────────────────────┘
```

---

## Animation Timing Reference

### Landing Page
```
Mascot Float:     3.0s  ease-in-out  ∞
Sparkles Twinkle: 1.5s  ease-in-out  ∞ (staggered 0.3s)
Button Pulse:     0.5s  ease-out     (on load)
Aura Glow:        2.0s  ease-in-out  ∞
```

### Upload Page
```
Mascot Bounce:    2.5s  ease-in-out  ∞
Question Mark:    1.5s  ease-in-out  ∞
Upload Zone:      0.2s  ease-in-out  (on interaction)
Button Hover:     0.2s  ease-out     (immediate)
```

### Processing Page
```
Mascot Bounce:    2.0s  ease-in-out  ∞ (vigorous)
Sweat Drops:      1.5s  ease-in      ∞ (staggered)
Sparkles:         0.8s  ease-out     ∞ (loop)
Progress Bar:     ∞     ease-in       (adaptive)
Step Pulse:       1.0s  ease-in-out  ∞
Encouragement:    2.0s  ease-in-out  ∞
```

### Results Page
```
Image Overlay:    1.0s  ease-out     (on entrance)
Sparkles:         1.5s  ease-in-out  ∞ (staggered)
Predictions:      0.3s  ease-out     ∞ (staggered per item)
Button Hover:     0.2s  ease-out     (immediate)
Victory Bounce:   2.0s  ease-in-out  (1x on load)
```

---

## Typography Examples

### Headlines
```
🎯 Cloud Shape Finder
   Font: Poppins Bold, 36px
   Line Height: 1.2
   Letter Spacing: -0.5px
   Color: #1a3a52

✨ Ever looked at a cloud...
   Font: Poppins Regular, 16px
   Line Height: 1.6
   Color: #4a6fa5
```

### Body Text
```
Drop your cloud photo here
   Font: Poppins Regular, 14px
   Line Height: 1.6
   Color: #1a3a52

PNG, JPG • Max 10MB
   Font: Poppins Regular, 13px
   Line Height: 1.5
   Color: #7ba3c0
```

### UI Labels
```
UPLOAD A CLOUD ✨
   Font: Poppins SemiBold, 14px
   Line Height: 1.5
   Letter Spacing: 0.25px
   Color: #ffffff

✨ YOUR CLOUD IS...
   Font: Poppins Medium, 12px
   Line Height: 1.5
   Letter Spacing: 0.5px
   Color: #ff9f5a
```

---

## Responsive Behavior Examples

### Mobile (< 480px)
```
┌─────────────────────────────────────────┐
│ ← Back | Upload                         │
├─────────────────────────────────────────┤
│                                         │
│              [Mascot]                   │
│          (size: medium)                 │
│                                         │
│  ╔─────────────────────────────────╗   │
│  ║   Upload zone (2 column grid)   ║   │
│  ║                                 ║   │
│  ║  📷 Camera  🖼️ Gallery         ║   │
│  ║                                 ║   │
│  ╚─────────────────────────────────╝   │
│                                         │
│  Stacked buttons (full width)          │
│  ╔─────────────────────────────────╗   │
│  ║ Upload a Cloud ✨              ║   │
│  ╚─────────────────────────────────╝   │
│                                         │
└─────────────────────────────────────────┘
```

### Tablet (480-768px)
```
┌──────────────────────────────────────────────┐
│ ← Back | Let's Upload!                       │
├──────────────────────────────────────────────┤
│              [Mascot]                        │
│          (size: medium-large)                │
│                                              │
│  ╔─────────────────────────────────────╗    │
│  ║    Upload zone (centered)           ║    │
│  ║   📷 Camera  🖼️ Gallery  [center]  ║    │
│  ╚─────────────────────────────────────╝    │
│                                              │
│  ╔───────────────┐  ┌───────────────╗       │
│  ║  Try Again    │  │ Share This →  ║       │
│  ╚───────────────┘  └───────────────╝       │
│                                              │
└──────────────────────────────────────────────┘
```

### Desktop (> 768px)
```
┌──────────────────────────────────────────────────┐
│ ← Back | Let's Upload!                           │
├──────────────────────────────────────────────────┤
│                  [Mascot]                        │
│              (size: large-xl)                    │
│                                                  │
│      ╔──────────────────────────────╗           │
│      ║   Upload zone (full width)   ║           │
│      ║  [Camera] [Gallery] [Drag]   ║           │
│      ╚──────────────────────────────╝           │
│                                                  │
│   ╔────────────────┐  ┌────────────────╗        │
│   ║   Try Again    │  │  Share This →  ║        │
│   ╚────────────────┘  └────────────────╝        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Component State Variations

### Button States
```
Default:    [Upload a Cloud ✨]  (orange gradient, shadow)
Hover:      [Upload a Cloud ✨]  (scale 1.05, larger shadow)
Active:     [Upload a Cloud ✨]  (scale 0.98, deep shadow)
Disabled:   [Upload a Cloud ✨]  (opacity 0.5, no shadow)
Loading:    [⏳ Processing...]    (spinner icon, disabled)
```

### Upload Zone States
```
Default:    ☁️ Drop files here  (dashed border, light blue bg)
Hover:      ☁️ Drop files here  (solid border, slightly darker)
Dragging:   ☁️ Release to upload (solid border, bright blue, scale 1.02)
Success:    ✓ File uploaded!    (green checkmark, green border)
Error:      ✗ File too large    (red border, error text)
```

### Progress Bar States
```
0%:         [░░░░░░░░░░░░░░░░░░░░]  0%
25%:        [████░░░░░░░░░░░░░░░░]  25%
50%:        [████████░░░░░░░░░░░░]  50%
75%:        [███████████░░░░░░░░░░]  75%
100%:       [████████████████████]  100%
```

---

## Spacing Examples

### Card Layouts
```
Compact (Gap 12px):
┌────────────────────┐
│ ┌──────────────┐   │  12px between
│ │ Content 1    │   │
│ └──────────────┘   │
│ ┌──────────────┐   │
│ │ Content 2    │   │
│ └──────────────┘   │
└────────────────────┘

Normal (Gap 16px):
┌────────────────────┐
│ ┌──────────────┐   │  16px between
│ │ Content 1    │   │
│ └──────────────┘   │
│ ┌──────────────┐   │
│ │ Content 2    │   │
│ └──────────────┘   │
└────────────────────┘

Spacious (Gap 24px):
┌────────────────────┐
│ ┌──────────────┐   │  24px between
│ │ Content 1    │   │
│ └──────────────┘   │
│                    │
│ ┌──────────────┐   │
│ │ Content 2    │   │
│ └──────────────┘   │
└────────────────────┘
```

---

## Final Design Philosophy

✨ **Playful** — Make users smile at every interaction
🌤️ **Friendly** — The cloud is your companion
💫 **Delightful** — Smooth animations, rewarding feedback
🎨 **Beautiful** — Consistent colors, thoughtful typography
♿ **Accessible** — Clear contrast, keyboard navigation
📱 **Responsive** — Works perfectly on all devices

---

**Ready for:** Figma implementation + Developer handoff
**Design System Version:** 1.0
**Last Updated:** September 11, 2024
