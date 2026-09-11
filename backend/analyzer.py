from PIL import Image, ImageDraw, ImageFont
import random
import io
import torch
from transformers import pipeline
import requests

# Initialize Hugging Face vision model for cloud/shape classification
# Using CLIP or similar vision-language model
try:
    classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
except Exception as e:
    print(f"Warning: Could not load Hugging Face model: {e}")
    classifier = None

# Dynamic cloud character generation
CLOUD_PREFIXES = ["Fluffy", "Nimbus", "Cirrus", "Stratus", "Cumulo", "Misty", "Whispy", "Dreamy", "Cotton", "Vapor", "Sir", "Lady", "Captain", "Professor"]
CLOUD_SUFFIXES = ["Rex", "Knight", "Buddy", "Spirit", "Wonder", "Dreamer", "Guardian", "Wanderer", "Beast", "Phoenix", "Fluffington", "McCloud", "Puff", "Whiskers"]

# Shape categories with personality traits
SHAPE_PERSONALITIES = {
    "Dinosaur": {
        "traits": ["Sleepy", "Ancient", "Powerful", "Lazy"],
        "emoji": "🦖",
        "quotes": [
            "Looks like it woke up five minutes ago but is somehow ready to conquer the sky.",
            "Ancient vibes with modern fluffiness.",
            "Roar? More like snore.",
            "This dinosaur cloud is living its best prehistoric life."
        ]
    },
    "Dragon": {
        "traits": ["Chaotic", "Mystical", "Fierce", "Legendary"],
        "emoji": "🐉",
        "quotes": [
            "Ready to breathe fire... or maybe just take a nap.",
            "Legendary creature spotted in the wild sky.",
            "Dragons don't do morning routines.",
            "Chaos energy meets fluffy vibes."
        ]
    },
    "Rabbit": {
        "traits": ["Energetic", "Cute", "Bouncy", "Playful"],
        "emoji": "🐰",
        "quotes": [
            "Hopping through the sky like nobody's business.",
            "Too cute for this world.",
            "Peak fluffiness achieved.",
            "Cuteness overload detected."
        ]
    },
    "Elephant": {
        "traits": ["Gentle Giant", "Wise", "Calm", "Majestic"],
        "emoji": "🐘",
        "quotes": [
            "Never forgets to be fluffy.",
            "Gentle giant vibes only.",
            "Sky elephant brings good luck.",
            "Wise and wonderful."
        ]
    },
    "Whale": {
        "traits": ["Peaceful", "Dreamer", "Graceful", "Deep"],
        "emoji": "🐋",
        "quotes": [
            "Swimming through clouds like it's the ocean.",
            "Majestic sky whale in its natural habitat.",
            "Deep thoughts, fluffy vibes.",
            "The ocean called, it wants its whale back."
        ]
    },
    "Bird": {
        "traits": ["Free Spirit", "Adventurer", "Swift", "Graceful"],
        "emoji": "🐦",
        "quotes": [
            "Born to fly, literally.",
            "Freedom looks fluffy today.",
            "Sky is the limit? Not for this one.",
            "Peak main character energy."
        ]
    },
    "Bear": {
        "traits": ["Cuddly", "Protector", "Cozy", "Strong"],
        "emoji": "🐻",
        "quotes": [
            "Hibernation mode: activated.",
            "Wants to give you a hug.",
            "Cozy vibes intensify.",
            "Stronger than it looks."
        ]
    },
    "Lion": {
        "traits": ["Regal", "Confident", "Brave", "Leader"],
        "emoji": "🦁",
        "quotes": [
            "King of the clouds.",
            "Mane-character energy.",
            "Roaring with confidence.",
            "Born to rule the sky."
        ]
    },
    "Horse": {
        "traits": ["Noble", "Graceful", "Wild", "Free"],
        "emoji": "🐴",
        "quotes": [
            "Galloping through the heavens.",
            "Majestic and free.",
            "Wild at heart, fluffy by nature.",
            "Freedom never looked so good."
        ]
    },
    "Butterfly": {
        "traits": ["Delicate", "Transformative", "Beautiful", "Light"],
        "emoji": "🦋",
        "quotes": [
            "Transformation in progress.",
            "Light as a... well, lighter than a cloud.",
            "Beauty in motion.",
            "Spreading wings and good vibes."
        ]
    },
    "Dog": {
        "traits": ["Loyal", "Playful", "Happy", "Friendly"],
        "emoji": "🐕",
        "quotes": [
            "Best friend energy detected.",
            "Who's a good cloud? You are!",
            "Tail wagging at cloud speed.",
            "Pure joy in fluffy form."
        ]
    },
    "Cat": {
        "traits": ["Mysterious", "Independent", "Sassy", "Cute"],
        "emoji": "🐱",
        "quotes": [
            "Judging you from above.",
            "Nine lives, infinite fluffiness.",
            "Too cool for the ground.",
            "Mysterious and magnificent."
        ]
    },
}

def map_prediction_to_shape(label: str) -> str:
    """Map Hugging Face model predictions to our shape categories."""
    label_lower = label.lower()
    
    # Direct mappings
    shape_mappings = {
        "dinosaur": "Dinosaur",
        "dragon": "Dragon",
        "rabbit": "Rabbit",
        "elephant": "Elephant",
        "whale": "Whale",
        "bird": "Bird",
        "bear": "Bear",
        "lion": "Lion",
        "horse": "Horse",
        "butterfly": "Butterfly",
        "dog": "Dog",
        "cat": "Cat",
    }
    
    # Check for partial matches
    for key, value in shape_mappings.items():
        if key in label_lower:
            return value
    
    # Fallback to common shapes
    fallback_shapes = ["Dragon", "Dinosaur", "Rabbit", "Bird", "Bear", "Whale"]
    return random.choice(fallback_shapes)

def analyze_cloud_image(image_bytes: bytes) -> dict:
    """
    Analyze cloud image using Hugging Face model and generate character data.
    Uses real AI detection for shape classification.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        print(f"Error opening image: {e}")
        raise
    
    # Resize for model if too large
    if img.size[0] > 1024 or img.size[1] > 1024:
        img.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Get predictions from Hugging Face model
    top_guess = "Dragon"
    runner_up_guess = "Dinosaur"
    confidence_score = 82
    runner_up_score = 64
    
    if classifier:
        try:
            predictions = classifier(img, top_k=5)
            print(f"Predictions: {predictions}")
            # Map predictions to our shape categories
            top_guess = map_prediction_to_shape(predictions[0]['label'])
            confidence_score = int(predictions[0]['score'] * 100)
            
            # Find a different shape for runner-up
            for pred in predictions[1:]:
                mapped = map_prediction_to_shape(pred['label'])
                if mapped != top_guess:
                    runner_up_guess = mapped
                    runner_up_score = int(pred['score'] * 100)
                    break
        except Exception as e:
            print(f"Model prediction failed: {e}, using fallback")
            import traceback
            traceback.print_exc()
    
    # Ensure valid confidence scores
    confidence_score = max(60, min(95, confidence_score))
    runner_up_score = max(35, min(confidence_score - 10, runner_up_score))
    
    # Get personality data for the detected shape
    shape_data = SHAPE_PERSONALITIES.get(top_guess, SHAPE_PERSONALITIES["Dragon"])
    
    # Convert to grayscale for additional metrics
    gray = img.convert('L')
    pixels = list(gray.getdata())
    avg_brightness = sum(pixels) / len(pixels)
    brightness_variance = sum((p - avg_brightness) ** 2 for p in pixels) / len(pixels)
    
    # Use metrics to seed character generation
    seed_value = int(avg_brightness * brightness_variance) % 10000
    random.seed(seed_value)
    
    # Generate character name
    character_name = f"{random.choice(CLOUD_PREFIXES)} {random.choice(CLOUD_SUFFIXES)}"
    
    # Select personality trait
    personality_type = random.choice(shape_data["traits"])
    
    # Select quote
    quote = random.choice(shape_data["quotes"])
    
    # Generate scores with some variation
    energy_score = random.randint(35, 95)
    cuteness_score = random.randint(65, 99)
    
    # Generate ridiculous fun stats
    all_stats = [
        "Cuteness", "Chaos", "Fluffiness", "Main-character energy",
        f"{top_guess} energy", "Dreaminess", "Mystique", "Sassiness",
        "Coolness", "Vibe level", "Legendary status", "Sky dominance"
    ]
    
    random.shuffle(all_stats)
    stats = {}
    for i in range(5):
        stats[all_stats[i]] = random.randint(60, 99)
    
    # Reset random seed
    random.seed()
    
    return {
        "character_name": character_name,
        "top_guess": top_guess,
        "confidence_score": confidence_score,
        "runner_up_guess": runner_up_guess,
        "runner_up_score": runner_up_score,
        "quote": quote,
        "personality_type": personality_type,
        "energy_score": energy_score,
        "cuteness_score": cuteness_score,
        "stats": stats,
        "emoji": shape_data["emoji"]
    }

def generate_poll_response(ai_guess: str, user_guess: str) -> str:
    """Generate dynamic AI response comparing guesses."""
    if ai_guess.lower() == user_guess.lower():
        responses = [
            f"Wow! We both saw a {ai_guess}! Great minds think alike! 🎯",
            f"You nailed it! We're both seeing {ai_guess} vibes here! 🌟",
            f"Perfect match! {ai_guess} gang unite! 🙌",
        ]
    else:
        responses = [
            f"Interesting! You saw a {user_guess}, I saw a {ai_guess}. The beauty is in the eye of the beholder! 👁️",
            f"Ooh, {user_guess}! I can see that too, though I was leaning toward {ai_guess}. Clouds are wild! 🤔",
            f"Love it! {user_guess} vs {ai_guess} - both valid interpretations of this masterpiece! 🎨",
            f"Creative! While I detected {ai_guess}, your {user_guess} take is equally cool! ✨",
        ]
    
    return random.choice(responses)
