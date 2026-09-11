# Cloud Shape Classifier - Complete Design System

## 📋 Project Overview

A playful, whimsical AI app that analyzes cloud photos and identifies shapes. Combines the warm, friendly aesthetic of Cloudify with interactive mascot personalities and delightful micro-animations.

---

## 🎨 DESIGN SYSTEM

### 1. COLOR PALETTE

#### Primary Colors
```css
--sky-light: #c5e1ff;        /* Light sky blue */
--sky-medium: #90caf9;       /* Medium sky blue */
--sky-dark: #5b9cf2;         /* Dark sky blue */
--sky-gradient-light: #e8f4ff;  /* Lightest sky */

--white: #ffffff;
--off-white: #fafbfc;
```

#### Accent Colors
```css
--orange-light: #ff9f5a;     /* Warm peach orange */
--orange-warm: #ff8a4a;      /* Warm orange */
--orange-deep: #ffb700;      /* Deep orange/gold */

--yellow-accent: #ffc107;    /* Bright yellow */
--pink-soft: #ffb7c5;        /* Soft pink (blush) */
--mint-accent: #a8d8d8;      /* Soft mint */
```

#### Text Colors
```css
--text-dark: #1a3a52;        /* Dark blue-gray */
--text-medium: #4a6fa5;      /* Medium blue-gray */
--text-light: #7ba3c0;       /* Light gray-blue */
--text-hint: #a8b8d0;        /* Very light gray */
```

#### Background Gradients
```css
/* Sky gradient */
linear-gradient(135deg, #c5e1ff 0%, #e8f4ff 50%, #ffffff 100%)

/* Warm accent gradient */
linear-gradient(135deg, #ff9f5a 0%, #ff8a4a 100%)

/* Card gradient (subtle) */
linear-gradient(135deg, #ffffff 0%, #f8fcff 100%)

/* Gold/yellow accent */
linear-gradient(135deg, #ffc107 0%, #ffb700 100%)
```

---

### 2. TYPOGRAPHY

#### Font Family
```css
--font-primary: 'Poppins', 'Outfit', 'Inter', sans-serif;
--font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Type Scale
```css
/* Display / Hero */
--text-h1: 36px, bold (700), line-height: 1.2, letter-spacing: -0.5px
--text-h2: 28px, bold (700), line-height: 1.3, letter-spacing: -0.3px

/* Headings */
--text-h3: 24px, semibold (600), line-height: 1.4, letter-spacing: 0
--text-h4: 20px, semibold (600), line-height: 1.4, letter-spacing: 0

/* Body */
--text-body-lg: 16px, regular (400), line-height: 1.6, letter-spacing: 0
--text-body-md: 14px, regular (400), line-height: 1.6, letter-spacing: 0
--text-body-sm: 13px, regular (400), line-height: 1.5, letter-spacing: 0

/* UI Labels */
--text-label: 12px, medium (500), line-height: 1.5, letter-spacing: 0.5px
--text-button: 14px, semibold (600), line-height: 1.5, letter-spacing: 0.25px

/* Small Text */
--text-xs: 11px, regular (400), line-height: 1.4, letter-spacing: 0.25px
```

#### Weight Usage
- **700 (Bold)**: H1, H2, button text
- **600 (SemiBold)**: H3, H4, strong labels
- **500 (Medium)**: UI labels, badges
- **400 (Regular)**: Body text, descriptions

---

### 3. SPACING SYSTEM

```css
/* Base unit: 4px */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
--spacing-4xl: 40px;
--spacing-5xl: 48px;

/* Responsive padding */
--padding-mobile: 16px;
--padding-tablet: 24px;
--padding-desktop: 32px;

/* Gap between elements */
--gap-compact: 12px;
--gap-normal: 16px;
--gap-spacious: 24px;
```

---

### 4. SHADOWS & DEPTH

```css
/* Light shadow - subtle depth */
--shadow-sm: 0 2px 8px rgba(100, 150, 200, 0.15);

/* Medium shadow - cards */
--shadow-md: 0 4px 12px rgba(100, 150, 200, 0.25);

/* Strong shadow - hover states */
--shadow-lg: 0 8px 16px rgba(100, 150, 200, 0.3);

/* Accent shadow - buttons, hover */
--shadow-accent: 0 4px 12px rgba(255, 140, 80, 0.3);

/* Deep shadow - modals, overlays */
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.15);
```

---

### 5. BORDER RADIUS

```css
/* Buttons & pills */
--radius-full: 50px;

/* Cards & panels */
--radius-lg: 16px;
--radius-md: 12px;
--radius-sm: 8px;

/* Input fields */
--radius-input: 12px;

/* Images */
--radius-image: 12px;
```

---

### 6. ANIMATIONS

```css
/* Durations */
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-very-slow: 800ms;

/* Easing functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Common animations */

/* Float: gentle up/down */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
--animation-float: float 3s ease-in-out infinite;

/* Bounce: playful jump */
@keyframes bounce-soft {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
--animation-bounce: bounce-soft 2s ease-in-out infinite;

/* Pulse: gentle scale */
@keyframes pulse-gentle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
--animation-pulse: pulse-gentle 2s ease-in-out infinite;

/* Spin: loading indicator */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
--animation-spin: spin 1.5s linear infinite;

/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
--animation-fade-in: fade-in 0.3s ease-out;

/* Slide up */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
--animation-slide-up: slide-up 0.4s ease-out;
```

---

## 🌤️ MASCOT DESIGN SYSTEM

### Base Cloud Shape
```
Composition: 6 overlapping white ellipses
- Main body: 60x40px
- Left puff: 42x35px (offset -30px, +5px)
- Right puff: 42x35px (offset +30px, +5px)
- Top peak: 35x32px (offset 0px, -18px)
- Bottom left: 28x24px (offset -20px, +20px)
- Bottom right: 28x24px (offset +20px, +20px)

Stroke: #e0f2fe (light blue), 0.5px
Fill: Radial gradient (volumetric 3D effect)
Drop shadow: 0 20px 30px rgba(140, 190, 255, 0.5)
```

### Mascot Expressions (5 States)

#### 1. HAPPY (Landing Page)
```
Eyes:
  - Pupils: Black circles (r=7)
  - Catchlights: Offset white circles (r=2.5)
  - Eyelids: Soft curves above eyes
  - Animation: Gentle blink (0.5s)

Mouth:
  - Path: M 42 68 Q 60 75 78 68
  - Stroke: #1a1a1a, width 2.5px
  - Shape: Wide, warm smile
  - Corners: Slightly upturned

Blush:
  - Position: (20, 75) and (100, 75)
  - Color: #ffb7c5 (soft pink)
  - Radius: 12-14px
  - Opacity: 0.7

Body Animation:
  - Float up/down: -12px to +0px
  - Duration: 3s
  - Easing: ease-in-out
  - Effect: Gentle, welcoming
```

#### 2. CURIOUS (Upload Page)
```
Eyes:
  - Pupils: Slightly tilted (rotation: -3°)
  - Catchlights: Bright (opacity: 1)
  - Size: Slightly enlarged (scale: 1.08)
  - Expression: Inquisitive gaze

Mouth:
  - Path: M 42 65 Q 60 78 78 65
  - Shape: Open, surprised O-shape
  - Stroke width: 2px
  - Effect: "What's that?"

Blush:
  - Opacity: 0.6
  - Radius: 13px (slightly larger)

Head Position:
  - Tilt: -5° (head tilted)
  - Slight rotation

Decoration:
  - Add question mark (?) nearby
  - Position: Above right cloud
  - Color: #ff9f5a (orange)
  - Size: 24px, italic
  - Animation: Gentle bob, 1.5s

Body Animation:
  - Subtle bounce
  - Duration: 2.5s
```

#### 3. IMPATIENT/EXCITED (Loading Page)
```
Eyes:
  - Pupils: Squinted (scaleY: 0.7)
  - Catchlights: Very bright (opacity: 1)
  - Effect: Big excited grin
  - Blinking: Fast blink animation (0.3s)

Mouth:
  - Path: M 38 62 Q 60 82 82 62
  - Shape: Very wide, joyful grin
  - Stroke: #1a1a1a, 2.5px

Blush:
  - Opacity: 1 (maximum)
  - Radius: 16px
  - Animation: Pulse in/out, 1.5s

Body Animation:
  - Vigorous bounce: -20px to +5px
  - Duration: 2s
  - Effect: Impatient, excited energy
  - Scale: Squish/stretch (scaleX: 1.05-0.95)

Decorations:
  - Sweat drops (💧) nearby
  - Position: Scattered around cloud
  - Animation: Fall down, fade out
  - Color: Light blue (#a8d8d8)

Surrounding Effects:
  - Emit sparkles (✨)
  - Particle emitters: 2-3 around cloud
  - Effect: Excitement/energy
```

#### 4. PROUD/CELEBRATORY (Results Page)
```
Eyes:
  - Pupils: Confident, clear
  - Catchlights: Sparkly (animated glints)
  - Expression: Peaceful, accomplished
  - Size: Normal (scale: 1)

Mouth:
  - Path: M 42 68 Q 60 75 78 68
  - Shape: Confident smile
  - Closed, happy expression

Blush:
  - Opacity: 0.8
  - Radius: 14px
  - Slightly more prominent

Body Animation:
  - Victory bounce: 3 bounces
  - Duration: 2s
  - Height: -25px, -20px, -15px
  - Effect: Celebratory jumping

Crown/Decoration:
  - Optional: Small crown above head
  - Or: Sparkles radiating outward
  - Animation: Rotate, pulse
  - Duration: 3s
```

#### 5. THINKING/PROCESSING (Processing Page)
```
Eyes:
  - Pupils: Focused look (slight scale up)
  - One eye slightly squinted
  - Catchlights: Dim (opacity: 0.5)
  - Expression: Thoughtful concentration

Mouth:
  - Path: M 45 70 Q 60 72 75 70
  - Shape: Neutral, thinking expression
  - Small, contemplative smile

Blush:
  - Opacity: 0.5
  - Radius: 11px
  - Subtle presence

Head Position:
  - Tilt: +3° (right side up)
  - Slight chin-forward tilt

Body Animation:
  - Slow gentle sway
  - Duration: 4s
  - Rotation: -2° to +2°
  - Effect: Thinking, processing

Thought Bubble:
  - Position: Above/right of cloud
  - Contents: Animated thought process
  - Icons: 🤔 → ⚙️ → 💡
  - Duration: 3s per cycle
```

---

## 📱 SCREEN DESIGNS

### Screen 1: Landing Page

#### Layout Structure
```
├─ Hero Section (60% height)
│  ├─ Decorative floating clouds (background, opacity 40%)
│  ├─ Cloud mascot (centered, happy expression)
│  │  └─ Animation: Float gently (3s cycle)
│  ├─ Sparkles around mascot (✨⭐💫)
│  │  └─ Animation: Twinkle (1.5s staggered)
│  └─ Glowing aura behind mascot
│     └─ Color: Soft blue-yellow gradient
│
└─ Content Section (40% height)
   ├─ Title: "Cloud Shape Finder" (h1, bold)
   ├─ Tagline: "Ever looked at a cloud..."
   │  └─ Color: --text-medium
   ├─ Spacer (--spacing-3xl)
   ├─ Primary CTA Button
   │  ├─ Text: "Upload a Cloud ✨"
   │  ├─ Background: Orange gradient (--orange-warm to --orange-deep)
   │  ├─ Text color: White
   │  ├─ Border radius: --radius-full
   │  ├─ Padding: 16px 32px
   │  ├─ Font: --text-button
   │  ├─ Shadow: --shadow-accent
   │  ├─ Hover: Scale 1.05, shadow-lg
   │  └─ Animation: Subtle pulse on load (0.5s)
   │
   ├─ Spacer (--spacing-lg)
   └─ Hint text: "Use camera or upload a photo"
      └─ Color: --text-hint
```

#### Colors
- Background: Sky gradient (--sky-light to --sky-gradient-light)
- Button: Orange gradient
- Text: Dark blue-gray (--text-dark)

#### Animations
```
Mascot float: 3s ease-in-out infinite
Sparkles: Twinkle 1.5s, staggered 0.3s
Button pulse: Fade in 0.5s on load
Aura glow: Subtle scale pulse 2s
```

---

### Screen 2: Upload Page (Curious Cloud)

#### Layout Structure
```
├─ Header Section
│  ├─ Back button (← icon)
│  └─ Title: "Let's Upload! 🌤️"
│
├─ Mascot Section
│  ├─ Cloud mascot (curious expression)
│  │  ├─ Head tilt: -5°
│  │  └─ Animation: Subtle bounce (2.5s)
│  ├─ Question mark (?) decoration
│  │  └─ Animation: Bob up/down (1.5s)
│  └─ Text: "Curious to see your photo!"
│
├─ Upload Zone (Main CTA)
│  ├─ Border: Dashed, 2px, --sky-medium
│  ├─ Background: --off-white with gradient overlay
│  ├─ Border radius: --radius-lg
│  ├─ Padding: --spacing-4xl
│  ├─ Contents:
│  │  ├─ Cloud emoji (☁️) - large, 48px
│  │  ├─ Text: "Drop your cloud photo here"
│  │  │  └─ Font: --text-body-lg, bold
│  │  └─ Hint: "PNG, JPG • Max 10MB"
│  │     └─ Font: --text-xs, --text-light
│  ├─ Hover state:
│  │  ├─ Background: Light blue tint
│  │  ├─ Border: Solid --sky-medium
│  │  └─ Shadow: --shadow-md
│  └─ Active state (file dragging):
│     ├─ Background: --sky-light (opaque)
│     ├─ Scale: 1.02
│     └─ Shadow: --shadow-lg
│
├─ Divider Section
│  ├─ Text: "── or ──"
│  └─ Color: --text-hint
│
├─ Alternative Actions
│  ├─ Camera Button
│  │  ├─ Icon: 📷
│  │  ├─ Text: "Take a Photo"
│  │  ├─ Background: White
│  │  ├─ Border: 2px --sky-medium
│  │  ├─ Border radius: --radius-full
│  │  ├─ Padding: 14px 28px
│  │  ├─ Hover: Background --sky-light
│  │  └─ Animation: Transition 200ms
│  │
│  └─ Gallery Button
│     ├─ Icon: 🖼️
│     ├─ Text: "From Gallery"
│     ├─ Background: White
│     ├─ Border: 2px --sky-medium
│     └─ (same styling as Camera Button)
│
└─ Bottom Text
   ├─ "Can't wait to analyze! ⚡"
   └─ Font: --text-sm, italic, --text-medium
```

#### Colors
- Background: Sky gradient (--sky-light to --sky-gradient-light)
- Upload zone border: --sky-medium (dashed)
- Upload zone background: --off-white
- Buttons: White with blue border

#### Animations
```
Mascot bounce: 2.5s ease-in-out
Question mark bob: 1.5s ease-in-out
Upload zone drag: Scale 1.02, shadow-lg
Button hover: Transition 200ms ease-out
```

---

### Screen 3: Processing/Loading Page

#### Layout Structure
```
├─ Header Section (minimal)
│  └─ Title: "Analyzing your cloud..."
│     └─ Font: --text-h2, --text-dark
│
├─ Mascot Section
│  ├─ Cloud mascot (impatient/excited)
│  │  ├─ Eyes: Squinted happily
│  │  ├─ Mouth: Wide grin
│  │  └─ Animation: Vigorous bounce (2s)
│  │
│  ├─ Sweat drops (💧)
│  │  ├─ Position: Scattered around cloud
│  │  ├─ Count: 3-4 drops
│  │  └─ Animation: Fall down + fade, 1.5s, staggered
│  │
│  ├─ Sparkles/Energy effects
│  │  ├─ Position: Radiating from cloud
│  │  ├─ Count: 4-6 sparkles
│  │  └─ Animation: Scale up + fade, 0.8s, loop
│  │
│  └─ Surrounding emoji
│     ├─ 🔥 ⚡ nearby
│     └─ Animation: Pulse opacity (1.5s)
│
├─ Spacer (--spacing-3xl)
│
├─ Processing Card
│  ├─ Background: White (--off-white)
│  ├─ Border radius: --radius-lg
│  ├─ Padding: --spacing-3xl
│  ├─ Shadow: --shadow-md
│  ├─ Contents:
│  │  ├─ Status text: "Looking at the shape and beauty!"
│  │  │  └─ Font: --text-body-md, --text-medium
│  │  │
│  │  ├─ Spacer (--spacing-2xl)
│  │  │
│  │  ├─ Progress Bar
│  │  │  ├─ Background: --sky-light
│  │  │  ├─ Height: 6px
│  │  │  ├─ Border radius: --radius-full
│  │  │  ├─ Fill: Orange gradient (--orange-warm to --orange-deep)
│  │  │  ├─ Animation: Smooth fill (varies, 8-20s total)
│  │  │  └─ Percent label: Right side, "65%"
│  │  │
│  │  ├─ Spacer (--spacing-2xl)
│  │  │
│  │  ├─ Step Checklist
│  │  │  ├─ Items:
│  │  │  │  ├─ ✓ Uploading image
│  │  │  │  ├─ ✓ Detecting cloud region
│  │  │  │  ├─ ⊕ Segmenting shape (current)
│  │  │  │  ├─ ○ Inferring archetype
│  │  │  │  └─ ○ Generating character
│  │  │  │
│  │  │  ├─ Completed items: Green checkmark (✓)
│  │  │  ├─ Current item: Orange circle with pulse animation
│  │  │  └─ Pending items: Gray circle
│  │  │
│  │  └─ Bottom hint text
│  │     ├─ "🎨 Finding the perfect match..."
│  │     └─ Font: --text-sm, italic
│  │
│  └─ Animation (entrance): Slide up 0.4s ease-out
│
└─ Floating Encouragement Text (optional)
   ├─ "Just a moment..."
   ├─ Animation: Fade in/out (2s)
   └─ Font: --text-xs, --text-hint
```

#### Colors
- Background: Sky gradient
- Card: White (--off-white)
- Progress bar: Orange gradient
- Checkmark: Green (#4caf50)
- Current step: Orange (#ff9f5a) with pulse

#### Animations
```
Mascot bounce: 2s ease-in-out, vigorous
Sweat drops: Fall + fade 1.5s, staggered
Sparkles: Scale + fade 0.8s, loop
Progress bar: Smooth fill (adaptive duration)
Current step: Pulse opacity 1s infinite
Encouragement text: Fade 2s infinite
```

---

### Screen 4: Results Page

#### Layout Structure
```
├─ Header Section
│  ├─ Label: "✨ YOUR CLOUD IS..."
│  │  └─ Font: --text-label, all-caps, --orange-warm
│  ├─ Background: Sky blue band
│  └─ Height: 60px
│
├─ Image Display Section
│  ├─ Background: --sky-light
│  ├─ Padding: --spacing-2xl
│  ├─ Border radius: --radius-image
│  ├─ Contents:
│  │  ├─ Cloud image (large)
│  │  │  ├─ Border radius: --radius-image
│  │  │  ├─ Size: 100% width, auto height
│  │  │  └─ Max-height: 300px
│  │  │
│  │  ├─ Animated overlay
│  │  │  ├─ Contour outline (dashed orange)
│  │  │  ├─ Highlight circle
│  │  │  └─ Animation: Draw outline effect 1s
│  │  │
│  │  └─ Sparkle/emoji overlays
│  │     ├─ Position: Scattered around image
│  │     ├─ Emoji: ✨⭐💫
│  │     └─ Animation: Scale + fade, 1.5s, staggered
│  │
│  └─ Shadow: --shadow-md
│
├─ Description Box
│  ├─ Background: Yellow/gold gradient (#fffaeb to #fff9e6)
│  ├─ Border radius: --radius-lg
│  ├─ Padding: --spacing-2xl
│  ├─ Margin: --spacing-xl
│  ├─ Border: 2px dashed --orange-warm
│  ├─ Contents:
│  │  ├─ Label: "🎨 LOOKS LIKE"
│  │  │  └─ Font: --text-label, all-caps
│  │  │
│  │  └─ Description (AI-generated)
│  │     ├─ Text: Italic, funny description
│  │     ├─ Font: --text-body-md, italic
│  │     ├─ Color: --text-dark
│  │     └─ Example: "A majestic brachiosaurus dreaming of pizza"
│  │
│  └─ Shadow: --shadow-sm
│
├─ Predictions List
│  ├─ Title: "TOP MATCHES"
│  │  └─ Font: --text-h4, bold
│  │
│  └─ Items (5 predictions):
│     ├─ Item structure:
│     │  ├─ Emoji: Large, 24px (🦖 🐉 🐋 🦅 🐢)
│     │  ├─ Name: "DINOSAUR"
│     │  │  └─ Font: --text-body-md, bold, all-caps
│     │  ├─ Spacer
│     │  ├─ Confidence Bar
│     │  │  ├─ Background: --sky-light
│     │  │  ├─ Height: 4px
│     │  │  ├─ Fill: Orange gradient
│     │  │  ├─ Width: Based on percentage (82% = 82px of 100px)
│     │  │  └─ Border radius: --radius-full
│     │  │
│     │  └─ Percentage: "82%"
│     │     └─ Font: --text-label, bold, --orange-warm
│     │
│     ├─ Layout: Flex row, space-between
│     ├─ Gap: --gap-normal
│     ├─ Padding: --spacing-lg
│     ├─ Border bottom: 1px --sky-light (except last)
│     └─ Animation: Slide up staggered 0.3s
│
├─ Spacer (--spacing-3xl)
│
└─ Action Buttons
   ├─ Button 1: "← Try Again"
   │  ├─ Background: White
   │  ├─ Border: 2px --sky-medium
   │  ├─ Text color: --sky-medium
   │  ├─ Border radius: --radius-full
   │  ├─ Padding: 14px 28px
   │  ├─ Font: --text-button
   │  ├─ Hover: Background --sky-light
   │  └─ Animation: Transition 200ms
   │
   └─ Button 2: "Share This →"
      ├─ Background: Orange gradient
      ├─ Text color: White
      ├─ Border radius: --radius-full
      ├─ Padding: 14px 28px
      ├─ Font: --text-button
      ├─ Shadow: --shadow-accent
      ├─ Hover: Scale 1.05, shadow-lg
      └─ Animation: Transition 200ms
```

#### Colors
- Background: White (--off-white)
- Header: Sky blue
- Image section: Light sky
- Description box: Gold/yellow gradient
- Bars: Orange gradient
- Text: Dark blue-gray

#### Animations
```
Image overlay: Draw 1s ease-out
Sparkles: Scale + fade 1.5s, staggered
Predictions list: Slide up 0.3s, staggered
Button hover: Scale 1.05 200ms
```

---

### Screen 5: Share Post Template

#### Layout Structure
```
├─ Share Card Container
│  ├─ Aspect ratio: Instagram Stories (9:16)
│  ├─ Background: Sky gradient (--sky-light to --sky-gradient-light)
│  ├─ Border radius: --radius-lg
│  ├─ Padding: --spacing-2xl
│  ├─ Shadow: --shadow-xl (for depth)
│  │
│  └─ Contents:
│     ├─ Top Section
│     │  ├─ Emoji: 🌤️ (large, 32px)
│     │  └─ Text: "Check this out!"
│     │     └─ Font: --text-label, all-caps
│     │
│     ├─ Image Display (Main focus)
│     │  ├─ Cloud image (centered)
│     │  ├─ Size: 80% width of card
│     │  ├─ Border radius: --radius-image
│     │  │
│     │  └─ Decorative overlays:
│     │     ├─ Arrow decoration
│     │     │  ├─ Curved arrow (SVG)
│     │     │  ├─ Color: --orange-warm
│     │     │  ├─ Position: Top-right, pointing at cloud
│     │     │  └─ Stroke: 2px, dashed
│     │     │
│     │     ├─ Circle highlight
│     │     │  ├─ Dashed circle around interesting part
│     │     │  ├─ Color: --yellow-accent
│     │     │  ├─ Stroke: 2px
│     │     │  └─ Position: Variable
│     │     │
│     │     └─ Scattered sparkles
│     │        ├─ Emoji: ✨⭐💫
│     │        ├─ Opacity: 0.8
│     │        └─ Rotation: Various angles
│     │
│     ├─ Bottom Text Section
│     │  ├─ Main text: "My Cloud is a [PREDICTION]!"
│     │  │  └─ Font: --text-h3, bold, all-caps
│     │  │
│     │  ├─ Stat: "82% match • Cloud Shape Finder"
│     │  │  └─ Font: --text-sm
│     │  │
│     │  └─ Hashtags: "#MyCloudIs #CloudFinder #CloudWatching"
│     │     └─ Font: --text-xs, --text-medium
│     │
│     └─ Footer (optional branding)
│        ├─ Logo/text: "Cloud Shape Finder"
│        └─ Font: --text-xs
│
├─ Spacer (outside card)
│
└─ Action Buttons
   ├─ Button 1: "📱 Instagram Stories"
   │  └─ Share to Instagram Stories
   │
   ├─ Button 2: "𝕏 Post to X"
   │  └─ Share to Twitter/X
   │
   ├─ Button 3: "⬇️ Download Image"
   │  └─ Download as PNG/JPG
   │
   └─ Button 4: "🔗 Copy Link"
      └─ Copy shareable link
```

#### Visual Style (Doodle Elements)
```
Dashes: Consistent 2px strokes
Arrow: Hand-drawn curved style (using SVG path)
Circle: Dashed, not filled
Color scheme: Orange, yellow, blue accents
Emoji style: Native emoji (no custom graphics)
Font: Consistent with design system
Shadow/depth: Soft shadows on decorative elements
```

#### Colors
- Card background: Sky gradient
- Overlay elements: Orange, yellow, blue
- Text: Dark blue-gray
- Decorations: Orange/gold accents

#### Sharing Integration
- Instagram: Use Instagram SDK for Stories
- Twitter/X: Pre-populate tweet with text
- Download: Convert canvas to image
- Link: Generate shareable URL with prediction data

---

### Screen 6: Collection Grid (Optional)

#### Layout Structure
```
├─ Header Section
│  ├─ Title: "All Possible Predictions"
│  │  └─ Font: --text-h2, bold
│  └─ Subtitle: "What could YOUR cloud be?"
│     └─ Font: --text-body-md, --text-medium
│
├─ Grid Container
│  ├─ Layout: 3 columns
│  │  ├─ Mobile: 2 columns
│  │  ├─ Tablet: 2-3 columns
│  │  └─ Desktop: 3 columns
│  │
│  └─ Cards (12 total, one for each archetype):
│     ├─ Card structure:
│     │  ├─ Background: Pastel gradient (different for each)
│     │  │  ├─ Card 1: Blue gradient (#c5e1ff to #e8f4ff)
│     │  │  ├─ Card 2: Orange gradient (#ff9f5a to #ffb700)
│     │  │  ├─ Card 3: Green gradient (#a8d8d8 to #c8f0f0)
│     │  │  └─ (etc., cycling through palette)
│     │  │
│     │  ├─ Border radius: --radius-lg
│     │  ├─ Padding: --spacing-2xl
│     │  ├─ Shadow: --shadow-md
│     │  ├─ Min-height: 140px
│     │  │
│     │  └─ Contents:
│     │     ├─ Emoji (large, 48px)
│     │     │  └─ Position: Centered top
│     │     │
│     │     ├─ Label (centered, all-caps)
│     │     │  ├─ Font: --text-body-md, bold
│     │     │  └─ Color: --text-dark
│     │     │
│     │     └─ Stat (small, bottom)
│     │        ├─ Text: "82% Match" (example)
│     │        ├─ Font: --text-xs
│     │        └─ Color: --text-medium
│     │
│     ├─ Hover state:
│     │  ├─ Scale: 1.05
│     │  ├─ Shadow: --shadow-lg
│     │  └─ Animation: 200ms ease-out
│     │
│     └─ Click action:
│        └─ Navigate to detail page or expand
│
│  ├─ Gap: --gap-normal (20px)
│  ├─ Padding: --padding-mobile
│  └─ Animation: Staggered fade-in 0.3s per card
│
├─ Spacer (--spacing-4xl)
│
└─ Download Section
   ├─ Button: "⬇️ Download Full Collection"
   │  ├─ Background: Orange gradient
   │  ├─ Text: White, bold
   │  ├─ Padding: 16px 32px
   │  └─ Border radius: --radius-full
   │
   ├─ Spacer (--spacing-lg)
   │
   └─ Info text
      ├─ "Perfect for Instagram, Pinterest, or Twitter!"
      └─ Font: --text-sm, --text-medium
```

#### Card Background Gradients (12-card cycle)
```
1. Blue:   #c5e1ff → #e8f4ff
2. Orange: #ff9f5a → #ffb700
3. Green:  #a8d8d8 → #c8f0f0
4. Pink:   #ffb7c5 → #ffc9d8
5. Yellow: #ffc107 → #ffb700
6. Purple: #d4b8ff → #e6d4ff
7. Teal:   #80deea → #a8f0f8
8. Coral:  #ff8a4a → #ff9f5a
9. Mint:   #b0e0e6 → #d8f0f0
10. Peach: #ffcc99 → #ffe6cc
11. Lavender: #e1bee7 → #f3e5f5
12. Sky:   #81d4fa → #b3e5fc
```

#### Responsive Behavior
```
Mobile (< 480px):   2 columns, --padding-mobile
Tablet (480-768px): 2-3 columns, --padding-tablet
Desktop (> 768px):  3 columns, --padding-desktop
```

---

## 🎬 ANIMATION SPECIFICATIONS

### Global Animations

#### Float (Mascot at rest)
```javascript
// Smooth up/down bobbing
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

Duration: 3s
Easing: ease-in-out
Repeat: infinite
Apply to: Landing page mascot
```

#### Bounce (Excited mascot)
```javascript
// Playful jumping
@keyframes bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

Duration: 2s
Easing: ease-in-out (cubic-bezier(0.34, 1.56, 0.64, 1))
Repeat: infinite
Apply to: Processing/excited mascot
```

#### Pulse (Attention grabber)
```javascript
// Gentle scale + opacity
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

Duration: 2s
Easing: ease-in-out
Repeat: infinite
Apply to: Buttons, badges, loading indicator
```

#### Spin (Loading indicator)
```javascript
// Continuous rotation
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

Duration: 1.5s
Easing: linear
Repeat: infinite
Apply to: Loading spinner (if used)
```

#### Fade-In (UI entrance)
```javascript
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

Duration: 300ms
Easing: ease-out
Apply to: Cards, text on entrance
```

#### Slide-Up (UI entrance from bottom)
```javascript
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0px); }
}

Duration: 400ms
Easing: ease-out
Apply to: Result cards, content reveal
```

### State Transitions

#### Button Hover
```
Duration: 200ms
Easing: ease-out
Changes:
  - Scale: 1 → 1.05
  - Shadow: --shadow-md → --shadow-lg
  - Color: Slight brighten
```

#### Upload Zone Drag-Over
```
Duration: 200ms
Easing: ease-in-out
Changes:
  - Background: Lighten
  - Border: Dashed → Solid
  - Scale: 1 → 1.02
  - Shadow: --shadow-md → --shadow-lg
```

#### Progress Bar Fill
```
Duration: Varies (adaptive to actual progress)
Easing: ease-in
Changes:
  - Width: 0% → 100%
  - Animation shows actual progress
```

#### Tab/Section Transitions
```
Duration: 300ms
Easing: ease-in-out
Changes:
  - Fade out old: 300ms
  - Fade in new: 300ms (offset)
  - Result: Smooth crossfade
```

---

## 🔧 COMPONENT LIBRARY

### Buttons

#### Primary Button (CTA)
```jsx
<Button variant="primary">
  Upload a Cloud ✨
</Button>

// CSS
background: linear-gradient(135deg, #ff9f5a 0%, #ff8a4a 100%);
color: white;
border-radius: 50px;
padding: 16px 32px;
font-size: 14px;
font-weight: 600;
box-shadow: 0 4px 12px rgba(255, 140, 80, 0.3);

&:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 140, 80, 0.5);
  transition: 200ms ease-out;
}

&:active {
  transform: scale(0.98);
}
```

#### Secondary Button
```jsx
<Button variant="secondary">
  Try Again
</Button>

// CSS
background: white;
color: #90caf9;
border: 2px solid #90caf9;
border-radius: 50px;
padding: 14px 28px;
font-size: 14px;
font-weight: 600;

&:hover {
  background: #e8f4ff;
  transition: 200ms ease-out;
}
```

#### Icon Button
```jsx
<IconButton icon="camera">
  Take Photo
</IconButton>

// CSS
Similar to secondary, with icon spacing
gap: 8px;
display: flex;
align-items: center;
```

### Cards

#### Content Card
```jsx
<Card>
  <CardContent>
    Content here
  </CardContent>
</Card>

// CSS
background: white;
border-radius: 16px;
padding: 24px;
box-shadow: 0 4px 12px rgba(100, 150, 200, 0.25);
border: 1px solid rgba(200, 220, 240, 0.5);
```

#### Upload Drop Zone
```jsx
<UploadZone>
  Drop files here
</UploadZone>

// CSS
border: 2px dashed #90caf9;
background: #fafbfc;
border-radius: 16px;
padding: 40px;
text-align: center;
transition: 200ms ease-in-out;

&:hover {
  background: #e8f4ff;
  border-color: #5b9cf2;
}

&.dragging {
  background: #c5e1ff;
  border-style: solid;
  transform: scale(1.02);
}
```

#### Result Card
```jsx
<ResultCard
  emoji="🦖"
  name="Dinosaur"
  confidence={82}
/>

// CSS
border-bottom: 1px solid #e8f4ff;
padding: 16px;
display: flex;
gap: 16px;
align-items: center;

.emoji {
  font-size: 24px;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.confidence-bar {
  flex: 1;
  height: 4px;
  background: #c5e1ff;
  border-radius: 50px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(135deg, #ff9f5a 0%, #ff8a4a 100%);
  width: ${confidence}%;
}

.percentage {
  font-size: 12px;
  font-weight: 600;
  color: #ff9f5a;
}
```

### Progress Indicators

#### Progress Bar
```jsx
<ProgressBar value={65} />

// CSS
background: #c5e1ff;
height: 6px;
border-radius: 50px;
overflow: hidden;

.fill {
  height: 100%;
  background: linear-gradient(90deg, #ff9f5a 0%, #ffb700 100%);
  width: ${value}%;
  transition: width 300ms ease-in;
}
```

#### Step Indicator
```jsx
<StepIndicator
  steps={["Upload", "Processing", "Results"]}
  current={1}
/>

// CSS
display: flex;
gap: 16px;
align-items: center;

.step {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #c5e1ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.step.completed {
  background: #4caf50;
  color: white;
}

.step.active {
  background: #ff9f5a;
  color: white;
  animation: pulse 1s ease-in-out infinite;
}

.step.pending {
  background: #a8b8d0;
  color: white;
}

.connector {
  flex: 1;
  height: 2px;
  background: #c5e1ff;
}

.connector.completed {
  background: #4caf50;
}
```

### Badges

#### Confidence Badge
```jsx
<Badge value={82} label="Match" />

// CSS
background: linear-gradient(135deg, #ffc107 0%, #ffb700 100%);
color: #1a3a52;
padding: 8px 16px;
border-radius: 50px;
font-size: 12px;
font-weight: 600;
display: inline-block;
```

#### Tag Badge
```jsx
<Badge type="tag" text="AI Generated" />

// CSS
background: #e8f4ff;
color: #5b9cf2;
padding: 6px 12px;
border-radius: 20px;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.5px;
```

---

## 📐 LAYOUT GRID & SPACING

### Responsive Breakpoints
```css
/* Mobile-first */
--bp-mobile: 0px;      /* Default */
--bp-sm: 480px;        /* Small mobile */
--bp-md: 768px;        /* Tablet */
--bp-lg: 1024px;       /* Desktop */
--bp-xl: 1280px;       /* Large desktop */

/* Container max-widths */
--container-mobile: 480px;
--container-tablet: 768px;
--container-desktop: 1200px;
```

### Spacing Scale
```
4px (--spacing-xs)
8px (--spacing-sm)
12px (--spacing-md)
16px (--spacing-lg)
20px (--spacing-xl)
24px (--spacing-2xl)
32px (--spacing-3xl)
40px (--spacing-4xl)
48px (--spacing-5xl)
```

### Safe Areas
```
Mobile: 16px padding on all sides
Tablet: 24px padding on sides, 20px top/bottom
Desktop: 32px padding
Never: Text or buttons within 16px of screen edge
```

---

## 🎨 BRAND GUIDELINES

### Logo Usage
- Use full logo on landing page
- Use icon-only on smaller screens
- Always maintain clear space (min 20px around)
- Never distort or rotate logo

### Tone of Voice
- Playful and whimsical
- Friendly and encouraging
- Never corporate or serious
- Use emoji as punctuation (✨⚡🌤️)
- Make users smile

### Accessibility
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Button sizes: Minimum 44px touch target
- Font sizes: 14px minimum for body text
- Always include alt text for images
- Keyboard navigation fully supported
- Focus indicators visible

---

## ✅ DESIGN CHECKLIST

### Before Handoff to Development

- [ ] All screens designed (6 main + variations)
- [ ] Mascot expressions designed (5 states)
- [ ] Color tokens extracted to CSS variables
- [ ] Typography scale finalized
- [ ] All animations specified with timing
- [ ] Responsive breakpoints tested
- [ ] Accessibility audit completed
- [ ] Component library documented
- [ ] Figma file organized and exportable
- [ ] Design specs document (this file)
- [ ] Asset naming conventions defined
- [ ] Export guidelines for developers

---

## 📤 DELIVERABLES

### Figma File Structure
```
Cloud Shape Classifier Design
├─ Design System
│  ├─ Colors
│  ├─ Typography
│  ├─ Icons
│  ├─ Components
│  └─ Patterns
│
├─ Screens
│  ├─ Landing Page
│  ├─ Upload Page
│  ├─ Processing Page
│  ├─ Results Page
│  ├─ Share Template
│  └─ Collection Grid
│
├─ Mascot
│  ├─ Expressions (5)
│  ├─ Animations
│  └─ Details
│
└─ Assets
   ├─ Icons
   ├─ Emojis
   └─ Gradients
```

### Export Guidelines
```
Colors:
  - Format: CSS variables
  - Naming: --color-[name]-[shade]
  - Include: RGB, Hex, HSL

Typography:
  - Format: CSS font-size, font-weight, line-height
  - Include: All scales used

Icons:
  - Format: SVG (20, 24, 32, 48px sizes)
  - Naming: [icon-name].svg
  - Color: Use --color-text-dark

Images:
  - Format: PNG (transparent) or JPG (with background)
  - Resolution: 2x for retina support
  - Naming: [screen-name]-[element].png

Animation Specs:
  - Format: JSON or YAML
  - Include: Duration, easing, repeat
```

---

## 🚀 IMPLEMENTATION NOTES

### For Developers

1. **Use CSS Custom Properties** for all colors and spacing
2. **Mobile-first approach** for responsive design
3. **GPU acceleration** for animations (use `transform` and `opacity`)
4. **Lazy load** images on collection grid
5. **Preload** emoji fonts for better performance
6. **Test animations** at 60fps (use DevTools Performance)
7. **Ensure keyboard navigation** works on all interactive elements
8. **Use semantic HTML** for accessibility
9. **Add ARIA labels** where needed
10. **Test on actual devices** (not just browser DevTools)

### For Designers

1. Create interactive prototypes in Figma
2. Test all animations at proper speeds
3. Verify color contrast on all text
4. Check responsive behavior at breakpoints
5. Include all mascot states and transitions
6. Document all edge cases and states
7. Prepare high-res assets (2x for retina)
8. Get developer feedback on feasibility

---

## 📝 FINAL NOTES

This design system creates a **playful, delightful experience** that makes users smile. The mascot is the heart—it reacts, bounces, and expresses joy. Every interaction should feel smooth and rewarding. Use the color palette consistently, keep animations purposeful (not frivolous), and always prioritize usability over decoration.

**Key philosophy:** "Design should feel like playing with a cute cloud friend, not using technology."

---

**Status:** ✅ DESIGN SYSTEM COMPLETE
**Last Updated:** September 11, 2024
**Ready for:** Figma design + Developer handoff
