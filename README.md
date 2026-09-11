# Cloudify - Cloud Recognition App

A full-stack application that uses **OpenAI's CLIP Vision Model** to analyze cloud photos and generate dynamic character personalities with fun stats, powered by FastAPI and React.

## 🌟 Features

- **🤖 CLIP AI Vision**: Uses OpenAI's CLIP model for zero-shot cloud shape classification
- **🎨 Dynamic Cloud Characters**: Upload cloud photos and get AI-generated characters with emojis
- **✨ Fun Personality System**: Each shape has unique personality traits and ridiculous scores
- **📊 Interactive Stats**: Cuteness, Chaos, Fluffiness, Main-character energy, and more
- **🏆 Cloud of the Day**: Featured cloud showcase with polaroid-style presentation
- **📱 Beautiful UI**: Mobile-first glassmorphic design with Framer Motion animations
- **📅 Collection History**: Browse and filter your cloud scans

## 🦖 Shape Detection

The app detects and categorizes clouds into fun characters:

- 🦖 **Dinosaur** - Sleepy, Ancient, Powerful
- 🐉 **Dragon** - Chaotic, Mystical, Fierce
- 🐰 **Rabbit** - Energetic, Cute, Bouncy
- 🐘 **Elephant** - Gentle Giant, Wise, Calm
- 🐋 **Whale** - Peaceful, Dreamer, Graceful
- 🐦 **Bird** - Free Spirit, Adventurer
- 🐻 **Bear** - Cuddly, Protector, Cozy
- 🦁 **Lion** - Regal, Confident, Leader
- And more!

Each detected shape comes with:
- Unique personality traits
- Fun AI-generated quotes
- Ridiculous stats (Cuteness, Chaos, Fluffiness, etc.)
- Character emojis

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **FastAPI** for REST API endpoints
- **CLIP Vision Model** (`openai/clip-vit-large-patch14`) for AI-powered detection
- **Zero-shot classification** - no training needed!
- **SQLAlchemy** with SQLite for data persistence
- **Pillow + NumPy** for image processing
- **Fallback algorithm** for 100% reliability
- Dynamic character generation based on detected shapes

### Frontend (React/Vite)
- **React 18** with React Router for navigation
- **Tailwind CSS** for glassmorphic design
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Axios** for API calls

## 📁 Project Structure

```
cloudify/
├── backend/
│   ├── main.py              # FastAPI application & endpoints
│   ├── database.py          # SQLAlchemy models & DB setup
│   ├── analyzer.py          # Image analysis & character generation
│   ├── requirements.txt     # Python dependencies
│   └── uploads/             # User-uploaded images (auto-created)
│
└── frontend/
    ├── src/
    │   ├── screens/         # React screen components
    │   │   ├── Home.jsx
    │   │   ├── Capture.jsx
    │   │   ├── Processing.jsx
    │   │   ├── CharacterReveal.jsx
    │   │   ├── PersonalityStats.jsx
    │   │   ├── Poll.jsx
    │   │   ├── CloudOfTheDay.jsx
    │   │   └── History.jsx
    │   ├── App.jsx          # Main app component
    │   ├── api.js           # API client functions
    │   └── index.css        # Global styles
    ├── package.json
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn
- **~2GB free disk space** (for CLIP model - one-time download)
- **4GB RAM recommended** (for CLIP inference)
- Stable internet connection (for first-time model download)

### ⚡ Quick Start

```bash
# 1. Clone and navigate
cd cloudify

# 2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py  # ⏳ First run downloads CLIP model (2-5 min)

# 3. Frontend setup (in new terminal)
cd frontend
npm install
npm run dev

# 4. Open http://localhost:5173 and upload a cloud! ☁️
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

**Note**: First run will download the CLIP model (~1.7GB). This takes 2-5 minutes and happens automatically.

4. Start the backend server:
```bash
python main.py
```

Backend will run on `http://localhost:8000`

**First startup**: Waits for CLIP model download
**Subsequent startups**: Fast (~2-3 seconds)

**API Documentation**: Visit `http://localhost:8000/docs` for interactive Swagger UI

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### POST `/api/analyze`
Upload and analyze a cloud image using CLIP AI vision
- **Input**: `multipart/form-data` with image file
- **Output**: Complete cloud character with AI-detected shapes, personality, stats, and emoji
- **AI Model**: OpenAI CLIP (`clip-vit-large-patch14`) with zero-shot classification
- **Detection Method**: Compares image against 12 candidate labels ("a cloud shaped like a lion", etc.)

### POST `/api/clouds/{id}/poll`
Submit user's guess for a cloud
- **Input**: `{ "user_guess": "string" }`
- **Output**: Dynamic response comparing guesses

### GET `/api/clouds/featured`
Get the current Cloud of the Day
- **Output**: Featured cloud data with full character info

### GET `/api/clouds/history?filter={all|this_week|this_month}`
Get filtered cloud history
- **Output**: Array of cloud scans with emojis

## 🎨 Design System

- **Colors**: Sky blue gradient backgrounds with glassmorphic white cards
- **Typography**: System fonts with bold headings
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Layout**: Mobile-first with max-w-md container

## 🧪 Key Features Implementation

### CLIP AI Vision Detection
- **Model**: OpenAI's CLIP (`clip-vit-large-patch14`)
- **Method**: Zero-shot image classification
- **Candidate Labels**: 12 animals with cloud context
  - "a cloud shaped like a lion"
  - "a cloud shaped like a dog"
  - ... etc.
- **Output**: Confidence scores for all shapes
- **Accuracy**: State-of-the-art, trained on 400M image-text pairs
- **Fallback**: Custom computer vision if CLIP fails

### How CLIP Works
1. User uploads cloud image
2. CLIP processes image + 12 text labels ("a photo of a lion", etc.)
3. Calculates similarity scores (cosine similarity in embedding space)
4. **Normalizes low confidence scores** (clouds are ambiguous, so raw scores are often low)
5. Returns ranked results: Lion 99%, Dog 65%, Bear 58%, etc.
6. Top match becomes the cloud character!

**Note**: Cloud images are inherently ambiguous, so CLIP's raw confidence scores are often low (20-30%). We normalize these scores to make them more meaningful (60-95%) while preserving relative rankings.

### Dynamic Character System
Each detected shape has predefined personality traits:
```python
"Dinosaur": {
    "traits": ["Sleepy", "Ancient", "Powerful", "Lazy"],
    "emoji": "🦖",
    "quotes": ["Looks like it woke up five minutes ago..."]
}
```

### Fun Stats Generation
Generates ridiculous but entertaining stats:
- Cuteness (60-99%)
- Chaos (60-99%)
- Fluffiness (60-99%)
- Main-character energy (60-99%)
- [Shape] energy (60-99%)
- And more dynamically selected traits!

### Database Schema
```python
CloudScan:
- id (UUID)
- original_image_url
- character_name (dynamic)
- top_guess + confidence_score
- runner_up_guess + runner_up_score
- quote (dynamic)
- personality_type
- energy_score, cuteness_score
- stats (JSON)
- user_poll_guess
- is_cloud_of_the_day
- created_at
```

## 📱 Screen Flow

1. **Home** → Landing page with hero and navigation
2. **Capture** → Upload/camera interface with preview
3. **Processing** → Multi-step animated analysis
4. **Character Reveal** → Show generated character with stats
5. **Personality Stats** → Detailed trait breakdown with animated bars
6. **Poll** → Interactive human vs AI guessing game
7. **Cloud of the Day** → Featured cloud in polaroid frame
8. **History** → Filterable collection gallery

## 🛠️ Development Notes

- Backend uses image metrics (brightness, variance) to seed character generation
- Frontend uses Vite proxy to connect to backend API
- All animations are hardware-accelerated via Framer Motion
- Responsive design tested on mobile and desktop viewports

## 📄 License

MIT License - feel free to use for personal or commercial projects
