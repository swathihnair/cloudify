from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid

SQLALCHEMY_DATABASE_URL = "sqlite:///./cloudify.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class CloudScan(Base):
    __tablename__ = "cloud_scans"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    original_image_url = Column(String, nullable=False)
    character_name = Column(String, nullable=False)
    top_guess = Column(String, nullable=False)
    confidence_score = Column(Integer, nullable=False)
    runner_up_guess = Column(String, nullable=False)
    runner_up_score = Column(Integer, nullable=False)
    identified_shapes = Column(JSON, nullable=True)  # NEW: List of all detected shapes with scores
    quote = Column(String, nullable=False)
    personality_type = Column(String, nullable=False)
    energy_score = Column(Integer, nullable=False)
    cuteness_score = Column(Integer, nullable=False)
    stats = Column(JSON, nullable=False)
    emoji = Column(String, nullable=True)
    user_poll_guess = Column(String, nullable=True)
    is_cloud_of_the_day = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)
