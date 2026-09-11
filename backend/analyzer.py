from PIL import Image
import random
import io

# Dynamic cloud character generation
CLOUD_PREFIXES = ["Fluffy", "Nimbus", "Cirrus", "Stratus", "Cumulo", "Misty", "Whispy", "Dreamy", "Cotton", "Vapor"]
CLOUD_SUFFIXES = ["Rex", "Knight", "Buddy", "Spirit", "Wonder", "Dreamer", "Guardian", "Wanderer", "Beast", "Phoenix"]

CATEGORIES = [
    "Dinosaur", "Dragon", "Elephant", "Whale", "Castle", "Mountain", 
    "Heart", "Butterfly", "Ship", "Phoenix", "Rabbit", "Bear",
    "Face", "Angel", "Horse", "Lion", "Bird", "Turtle"
]

PERSONALITY_TYPES = ["Sleepy", "Chaotic", "Dreamer", "Adventurer", "Gentle Giant", "Mischievous", "Peaceful", "Energetic"]

QUOTES = [
    "This cloud has seen things you wouldn't believe.",
    "A masterpiece floating in the sky!",
    "Nature's canvas at its finest.",
    "Every cloud tells a story, this one's a bestseller.",
    "The sky is an artist, and this is its signature work.",
    "A fleeting moment of perfection.",
    "This cloud is vibing on a whole different level.",
    "Majestic, mysterious, and magnificent.",
    "The universe is showing off today.",
    "This cloud belongs in a museum.",
]

def analyze_cloud_image(image_bytes: bytes) -> dict:
    """
    Dynamically analyze cloud image and generate character data.
    Uses image properties (brightness, complexity) to influence results.
    """
    img = Image.open(io.BytesIO(image_bytes))
    
    # Convert to grayscale for analysis
    gray = img.convert('L')
    pixels = list(gray.getdata())
    
    # Calculate image metrics
    avg_brightness = sum(pixels) / len(pixels)
    brightness_variance = sum((p - avg_brightness) ** 2 for p in pixels) / len(pixels)
    
    # Use metrics to influence randomness (seeded by image properties)
    seed_value = int(avg_brightness * brightness_variance) % 10000
    random.seed(seed_value)
    
    # Generate dynamic character
    character_name = f"{random.choice(CLOUD_PREFIXES)} {random.choice(CLOUD_SUFFIXES)}"
    
    # Primary and runner-up predictions
    categories = random.sample(CATEGORIES, 2)
    top_guess = categories[0]
    runner_up_guess = categories[1]
    
    # Scores based on image complexity
    base_confidence = int(65 + (brightness_variance / 1000) % 30)
    confidence_score = min(95, max(60, base_confidence))
    runner_up_score = random.randint(35, confidence_score - 10)
    
    # Personality traits
    personality_type = random.choice(PERSONALITY_TYPES)
    energy_score = int(50 + (avg_brightness / 5) % 50)
    cuteness_score = random.randint(60, 98)
    
    # Dynamic stats
    stat_names = ["Fluffiness", "Dreaminess", "Mystique", "Whimsy", "Majesty", "Playfulness"]
    random.shuffle(stat_names)
    stats = {
        stat_names[0]: random.randint(70, 99),
        stat_names[1]: random.randint(60, 95),
        stat_names[2]: random.randint(50, 90),
        stat_names[3]: random.randint(40, 85),
    }
    
    quote = random.choice(QUOTES)
    
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
        "stats": stats
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
