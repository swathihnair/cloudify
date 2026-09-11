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

The `analyzer.py` module:
- Analyzes image brightness and variance
- Generates unique character names
- Creates dynamic stats and personality traits
- Ensures reproducible results via seeded randomization
