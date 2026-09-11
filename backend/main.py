from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import uuid
from typing import Optional

# Load environment variables
load_dotenv()

from database import get_db, CloudScan
from analyzer import analyze_cloud_image, generate_poll_response

app = FastAPI(title="Cloudify API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

class PollRequest(BaseModel):
    user_guess: str

class SaveRequest(BaseModel):
    cloud_id: str

@app.post("/api/analyze")
async def analyze_cloud(
    file: UploadFile = File(...),
    hunting_for: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Analyze uploaded cloud image and generate dynamic character."""
    print("\n" + "=" * 80)
    print("🆕 NEW ANALYSIS REQUEST RECEIVED")
    if hunting_for:
        print(f"🎯 USER IS HUNTING FOR: {hunting_for}")
    print("=" * 80)
    try:
        # Read and save image
        image_bytes = await file.read()
        print(f"Received image: {len(image_bytes)} bytes")
        
        file_id = str(uuid.uuid4())
        file_extension = file.filename.split(".")[-1] if file.filename and "." in file.filename else "jpg"
        filename = f"{file_id}.{file_extension}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        with open(filepath, "wb") as f:
            f.write(image_bytes)
        print(f"Saved image to: {filepath}")
        
        # Analyze image
        print("Starting image analysis...")
        analysis = analyze_cloud_image(image_bytes, force_shape=hunting_for)
        print(f"Analysis complete: {analysis.get('character_name')}")
        
        # Save outlined image (with detected shape highlighted)
        outlined_filename = f"{file_id}_outlined.{file_extension}"
        outlined_filepath = os.path.join(UPLOAD_DIR, outlined_filename)
        if 'outlined_image' in analysis:
            analysis['outlined_image'].save(outlined_filepath)
            print(f"Saved outlined image to: {outlined_filepath}")
            outlined_image_url = f"/uploads/{outlined_filename}"
        else:
            outlined_image_url = f"/uploads/{filename}"  # Fallback to original
        
        # Create database entry
        cloud_scan = CloudScan(
            original_image_url=f"/uploads/{filename}",
            character_name=analysis["character_name"],
            top_guess=analysis["top_guess"],
            confidence_score=analysis["confidence_score"],
            runner_up_guess=analysis["runner_up_guess"],
            runner_up_score=analysis["runner_up_score"],
            identified_shapes=analysis.get("identified_shapes", []),  # NEW: Save all shapes
            quote=analysis["quote"],
            personality_type=analysis["personality_type"],
            energy_score=analysis["energy_score"],
            cuteness_score=analysis["cuteness_score"],
            stats=analysis["stats"],
            emoji=analysis.get("emoji", "☁️"),
        )
        
        db.add(cloud_scan)
        db.commit()
        db.refresh(cloud_scan)
        print(f"Saved to database with ID: {cloud_scan.id}")
        
        # Return response with no-cache headers
        response_data = {
            "id": cloud_scan.id,
            "original_image_url": cloud_scan.original_image_url,
            "outlined_image_url": outlined_image_url,  # NEW: Image with outline
            "character_name": cloud_scan.character_name,
            "top_guess": cloud_scan.top_guess,
            "confidence_score": cloud_scan.confidence_score,
            "runner_up_guess": cloud_scan.runner_up_guess,
            "runner_up_score": cloud_scan.runner_up_score,
            "identified_shapes": cloud_scan.identified_shapes,  # NEW: Return all shapes
            "quote": cloud_scan.quote,
            "personality_type": cloud_scan.personality_type,
            "energy_score": cloud_scan.energy_score,
            "cuteness_score": cloud_scan.cuteness_score,
            "stats": cloud_scan.stats,
            "emoji": cloud_scan.emoji,
        }
        
        print("\n" + "=" * 80)
        print(f"✅ RETURNING RESULT: {cloud_scan.top_guess} ({cloud_scan.confidence_score}%)")
        print("=" * 80 + "\n")
        
        return JSONResponse(
            content=response_data,
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
    
    except Exception as e:
        print(f"Error in analyze_cloud: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/find-cloud")
async def find_cloud_for_object(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload an object image and find which cloud shape it matches.
    Uses CLIP to compare the object against our cloud shape categories.
    """
    try:
        # Read image
        image_bytes = await file.read()
        print(f"Received object image: {len(image_bytes)} bytes")
        
        # Use CLIP to analyze what the object is
        from analyzer import analyze_object_with_clip
        
        print("Analyzing object with CLIP...")
        result = analyze_object_with_clip(image_bytes)
        
        if not result:
            raise HTTPException(status_code=400, detail="Could not analyze object")
        
        print(f"Object matched to: {result['matched_shape']} ({result['confidence']}%)")
        
        return JSONResponse(
            content={
                "matched_shape": result['matched_shape'],
                "confidence": result['confidence'],
                "all_matches": result['all_matches'],
                "message": f"Your object looks like a {result['matched_shape']}! Try uploading a cloud photo to find matching shapes."
            },
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
    
    except Exception as e:
        print(f"Error in find_cloud_for_object: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/clouds/{cloud_id}/poll")
async def submit_poll(
    cloud_id: str,
    poll_data: PollRequest,
    db: Session = Depends(get_db)
):
    """Submit user's guess and get AI response."""
    cloud = db.query(CloudScan).filter(CloudScan.id == cloud_id).first()
    
    if not cloud:
        raise HTTPException(status_code=404, detail="Cloud not found")
    
    # Generate dynamic response
    response = generate_poll_response(cloud.top_guess, poll_data.user_guess)
    
    # Save user's guess
    cloud.user_poll_guess = poll_data.user_guess
    db.commit()
    
    return {
        "ai_response": response,
        "ai_guess": cloud.top_guess,
        "user_guess": poll_data.user_guess,
    }

@app.get("/api/clouds/featured")
async def get_featured_cloud(db: Session = Depends(get_db)):
    """Get the Cloud of the Day."""
    # Try to get existing cloud of the day
    cloud = db.query(CloudScan).filter(
        CloudScan.is_cloud_of_the_day == True
    ).first()
    
    # If none exists, pick a random one and mark it
    if not cloud:
        cloud = db.query(CloudScan).order_by(CloudScan.created_at.desc()).first()
        if cloud:
            # Reset all clouds
            db.query(CloudScan).update({"is_cloud_of_the_day": False})
            cloud.is_cloud_of_the_day = True
            db.commit()
    
    if not cloud:
        raise HTTPException(status_code=404, detail="No clouds available")
    
    return {
        "id": cloud.id,
        "original_image_url": cloud.original_image_url,
        "character_name": cloud.character_name,
        "top_guess": cloud.top_guess,
        "confidence_score": cloud.confidence_score,
        "quote": cloud.quote,
        "emoji": cloud.emoji,
        "created_at": cloud.created_at.isoformat(),
    }

@app.get("/api/clouds/history")
async def get_cloud_history(
    filter: str = "all",
    db: Session = Depends(get_db)
):
    """Get filtered cloud history."""
    query = db.query(CloudScan)
    
    now = datetime.utcnow()
    
    if filter == "this_week":
        week_ago = now - timedelta(days=7)
        query = query.filter(CloudScan.created_at >= week_ago)
    elif filter == "this_month":
        month_ago = now - timedelta(days=30)
        query = query.filter(CloudScan.created_at >= month_ago)
    
    clouds = query.order_by(CloudScan.created_at.desc()).all()
    
    return [
        {
            "id": cloud.id,
            "original_image_url": cloud.original_image_url,
            "character_name": cloud.character_name,
            "top_guess": cloud.top_guess,
            "confidence_score": cloud.confidence_score,
            "emoji": cloud.emoji,
            "created_at": cloud.created_at.isoformat(),
        }
        for cloud in clouds
    ]

@app.get("/")
async def root():
    return {"message": "Cloudify API", "status": "running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
