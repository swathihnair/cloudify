# Cloudify Backend

FastAPI backend for cloud image analysis with dynamic character generation.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run server:
```bash
python main.py
```

Server runs on `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database

SQLite database (`cloudify.db`) is created automatically on first run.

## Image Analysis

The `analyzer.py` module uses **OpenAI's CLIP vision model** for state-of-the-art cloud shape detection:

### CLIP Model (`openai/clip-vit-large-patch14`)
- **Zero-shot classification** - compares images against text labels
- **Candidate labels**: "a cloud shaped like a lion", "a cloud shaped like a dog", etc.
- **Returns**: Confidence scores for all 12 animal shapes
- **Accuracy**: Very high - trained on 400M image-text pairs
- **First run**: Downloads 1.7GB model (cached for future use)
- **Inference time**: ~0.5-1 second per image

### Fallback Algorithm
If CLIP fails (memory, error, etc.), custom computer vision activates:
- Contrast enhancement and edge detection
- Orientation detection (upright vs horizontal)
- Texture, compactness, and aspect ratio analysis
- Ensures 100% uptime

### Character Generation
- Generates unique character names and personality traits
- Creates fun stats (Cuteness, Chaos, Fluffiness, etc.)
- Reproducible results via seeded randomization
