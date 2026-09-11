# Cloudify - AI Cloud Recognition App

A full-stack application that uses AI to analyze cloud photos and generate dynamic character personalities with stats, powered by FastAPI and React.

## 🌟 Features

- **Dynamic Cloud Analysis**: Upload cloud photos and get AI-generated character names, categories, and personality traits
- **Real-time Processing**: Animated multi-step analysis with progress tracking
- **Interactive Polls**: Compare your guesses with AI predictions
- **Cloud of the Day**: Featured cloud showcase with polaroid-style presentation
- **Collection History**: Browse and filter your cloud scans by date
- **Responsive Design**: Mobile-first glassmorphic UI with smooth animations

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **FastAPI** for REST API endpoints
- **SQLAlchemy** with SQLite for data persistence
- **Pillow** for image processing and analysis
- Dynamic character generation based on image properties
- RESTful API with proper error handling

### Frontend (React/Vite)
- **React 18** with React Router for navigation
- **Tailwind CSS** for styling with glassmorphic design
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

4. Start the backend server:
```bash
python main.py
```

Backend will run on `http://localhost:8000`

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
Upload and analyze a cloud image
- **Input**: `multipart/form-data` with image file
- **Output**: Complete cloud character data with stats

### POST `/api/clouds/{id}/poll`
Submit user's guess for a cloud
- **Input**: `{ "user_guess": "string" }`
- **Output**: AI response comparing guesses

### GET `/api/clouds/featured`
Get the current Cloud of the Day
- **Output**: Featured cloud data

### GET `/api/clouds/history?filter={all|this_week|this_month}`
Get filtered cloud history
- **Output**: Array of cloud scans

## 🎨 Design System

- **Colors**: Sky blue gradient backgrounds with glassmorphic white cards
- **Typography**: System fonts with bold headings
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Layout**: Mobile-first with max-w-md container

## 🧪 Key Features Implementation

### Dynamic Data Generation
All cloud characters, stats, and quotes are dynamically generated based on:
- Image brightness and variance
- Seeded randomization for consistency
- No hardcoded results

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
