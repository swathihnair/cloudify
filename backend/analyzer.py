from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import random
import io
import numpy as np
from transformers import CLIPProcessor, CLIPModel
import torch

# Load CLIP model (lazy loading)
_clip_model = None
_clip_processor = None

def get_clip_model():
    """Lazy load CLIP model and processor."""
    global _clip_model, _clip_processor
    if _clip_model is None:
        print("Loading CLIP model (openai/clip-vit-large-patch14)...")
        _clip_model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14")
        _clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-large-patch14")
        print("✅ CLIP model loaded successfully!")
    return _clip_model, _clip_processor

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

def analyze_with_clip(img: Image.Image) -> list:
    """
    Use CLIP model for zero-shot cloud shape classification.
    Returns list of detected shapes with confidence scores.
    """
    try:
        model, processor = get_clip_model()
        
        # Define candidate labels - multiple variations for better matching
        # Using more natural descriptions that CLIP was trained on
        candidate_labels = [
            "a photo of a lion",
            "a photo of a dog",
            "a photo of a bear",
            "a photo of a horse",
            "a photo of a cat",
            "a photo of a rabbit",
            "a photo of an elephant",
            "a photo of a dinosaur",
            "a photo of a dragon",
            "a photo of a whale",
            "a photo of a bird",
            "a photo of a butterfly"
        ]
        
        # Process image and text
        inputs = processor(
            text=candidate_labels,
            images=img,
            return_tensors="pt",
            padding=True
        )
        
        # Get predictions
        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)[0]
        
        # Extract shape names from labels
        shape_names = [
            "Lion", "Dog", "Bear", "Horse", "Cat", "Rabbit",
            "Elephant", "Dinosaur", "Dragon", "Whale", "Bird", "Butterfly"
        ]
        
        # Create results with confidence scores
        results = []
        for i, (shape, prob) in enumerate(zip(shape_names, probs)):
            confidence = int(prob.item() * 100)
            if confidence > 3:  # Only include shapes with >3% confidence
                results.append({
                    'shape': shape,
                    'confidence': confidence,
                    'region': 'detected by CLIP vision model'
                })
        
        # Sort by confidence
        results.sort(key=lambda x: x['confidence'], reverse=True)
        
        # If top confidence is very low, boost it slightly for better UX
        # (CLIP often has lower confidence on ambiguous images like clouds)
        if results and results[0]['confidence'] < 40:
            print(f"⚠️  Low CLIP confidence ({results[0]['confidence']}%) - cloud images are ambiguous")
            # Normalize scores to make them more meaningful
            total = sum(r['confidence'] for r in results[:5])
            if total > 0:
                for r in results[:5]:
                    # Scale up but keep relative proportions
                    r['confidence'] = min(95, int((r['confidence'] / total) * 200))
        
        print(f"🤖 CLIP detected {len(results)} shapes:")
        for i, r in enumerate(results[:5], 1):
            print(f"   {i}. {r['shape']}: {r['confidence']}%")
        
        return results
        
    except Exception as e:
        print(f"❌ CLIP analysis failed: {e}")
        import traceback
        traceback.print_exc()
        return None



    """
    Analyze cloud image to detect shape characteristics.
    Returns shape name based on image analysis.
    """
    # Convert to grayscale
    gray = img.convert('L')
    
    # Enhance contrast to make clouds stand out
    enhancer = ImageEnhance.Contrast(gray)
    gray = enhancer.enhance(2.0)
    
    # Get image array
    img_array = np.array(gray)
    
    # Calculate cloud characteristics
    height, width = img_array.shape
    
    # Find bright regions (clouds)
    threshold = np.mean(img_array) + np.std(img_array) * 0.5
    cloud_mask = img_array > threshold
    
    # Calculate shape metrics
    cloud_pixels = np.sum(cloud_mask)
    total_pixels = height * width
    cloud_coverage = cloud_pixels / total_pixels
    
    # Analyze shape distribution
    # Check horizontal vs vertical extent
    row_coverage = np.sum(cloud_mask, axis=1)
    col_coverage = np.sum(cloud_mask, axis=0)
    
    vertical_extent = np.sum(row_coverage > 0) / height
    horizontal_extent = np.sum(col_coverage > 0) / width
    aspect_ratio = horizontal_extent / (vertical_extent + 0.001)
    
    # Calculate compactness (how round/spread out)
    if cloud_pixels > 0:
        y_coords, x_coords = np.where(cloud_mask)
        center_y, center_x = np.mean(y_coords), np.mean(x_coords)
        distances = np.sqrt((y_coords - center_y)**2 + (x_coords - center_x)**2)
        avg_distance = np.mean(distances)
        compactness = avg_distance / max(width, height)
    else:
        compactness = 0.5
    
    # Calculate texture (how fluffy/smooth)
    edges = np.abs(np.diff(img_array.astype(float), axis=0)).sum()
    edges += np.abs(np.diff(img_array.astype(float), axis=1)).sum()
    texture = edges / (height * width)
    
    # Additional analysis: Check for prominent head/body structure
    # Look at top half vs bottom half brightness
    mid_row = height // 2
    top_half_brightness = np.mean(img_array[:mid_row][cloud_mask[:mid_row]])
    bottom_half_brightness = np.mean(img_array[mid_row:][cloud_mask[mid_row:]])
    has_prominent_top = top_half_brightness > bottom_half_brightness * 1.1
    
    # Check if cloud is vertically oriented (sitting/upright animals)
    is_upright = aspect_ratio < 1.3 and vertical_extent > 0.4
    
    print(f"Analysis: ratio={aspect_ratio:.2f}, coverage={cloud_coverage:.2f}, compact={compactness:.2f}, texture={texture:.2f}")
    print(f"Upright: {is_upright}, Prominent top: {has_prominent_top}")
    
    # Determine shape based on characteristics
    shapes_scores = {}
    
    # Lion: HEAVILY BOOSTED for upright majestic clouds
    shapes_scores['Lion'] = 0
    if is_upright and cloud_coverage > 0.18:
        shapes_scores['Lion'] += 100  # MASSIVE boost
    if has_prominent_top and cloud_coverage > 0.12:
        shapes_scores['Lion'] += 90
    if texture > 1.3:
        shapes_scores['Lion'] += 70
    if 0.6 < aspect_ratio < 1.8:
        shapes_scores['Lion'] += 60
    
    # Dog: HEAVILY BOOSTED for sitting/standing
    shapes_scores['Dog'] = 0
    if is_upright and cloud_coverage > 0.12:
        shapes_scores['Dog'] += 95
    if has_prominent_top:
        shapes_scores['Dog'] += 85
    if 0.6 < aspect_ratio < 1.5:
        shapes_scores['Dog'] += 65
    if texture > 1.2:
        shapes_scores['Dog'] += 60
    
    # Bear: HEAVILY BOOSTED for large upright
    shapes_scores['Bear'] = 0
    if is_upright and cloud_coverage > 0.2:
        shapes_scores['Bear'] += 90
    if 0.5 < aspect_ratio < 1.4:
        shapes_scores['Bear'] += 80
    if texture > 1.2:
        shapes_scores['Bear'] += 70
    if compactness < 0.32:
        shapes_scores['Bear'] += 50
    
    # Dragon: KILLED for upright clouds, very strict otherwise
    shapes_scores['Dragon'] = 0
    if is_upright:
        shapes_scores['Dragon'] = 0  # ZERO points if upright!
    elif aspect_ratio > 2.5 and texture > 3.5 and compactness > 0.35:
        shapes_scores['Dragon'] += 40  # Only for extreme serpent shapes
    
    # Whale: KILLED for upright clouds
    shapes_scores['Whale'] = 0
    if is_upright:
        shapes_scores['Whale'] = 0  # ZERO points if upright!
    elif aspect_ratio > 2.0 and vertical_extent < 0.25:
        shapes_scores['Whale'] += 35
    
    # Dinosaur: KILLED for upright, strict for horizontal
    shapes_scores['Dinosaur'] = 0
    if is_upright:
        shapes_scores['Dinosaur'] = 0  # ZERO if upright!
    elif aspect_ratio > 1.8 and vertical_extent < 0.3:
        shapes_scores['Dinosaur'] += 35
    
    # Rabbit: Small, compact, round
    shapes_scores['Rabbit'] = 0
    if compactness < 0.18 and cloud_coverage < 0.25:
        shapes_scores['Rabbit'] += 40
    if 0.8 < aspect_ratio < 1.2:
        shapes_scores['Rabbit'] += 30
    if texture < 1.5:
        shapes_scores['Rabbit'] += 20
    
    # Elephant: Large, wide, NOT very upright
    shapes_scores['Elephant'] = 0
    if cloud_coverage > 0.3 and aspect_ratio > 1.2:
        shapes_scores['Elephant'] += 35
    if not is_upright and compactness < 0.2:
        shapes_scores['Elephant'] += 30
    if vertical_extent > 0.3 and aspect_ratio < 1.8:
        shapes_scores['Elephant'] += 25
    
    # Bird: Very wide wings, horizontal
    shapes_scores['Bird'] = 0
    if aspect_ratio > 2.2 and cloud_coverage < 0.2 and not is_upright:
        shapes_scores['Bird'] += 45
    if vertical_extent < 0.25:
        shapes_scores['Bird'] += 25
    if texture > 1.5:
        shapes_scores['Bird'] += 20
    
    # Horse: Can be upright or horizontal
    shapes_scores['Horse'] = 0
    if (aspect_ratio > 1.4 or (is_upright and aspect_ratio < 0.8)) and cloud_coverage > 0.15:
        shapes_scores['Horse'] += 35
    if 0.18 < compactness < 0.28:
        shapes_scores['Horse'] += 30
    if texture > 1.8:
        shapes_scores['Horse'] += 25
    
    # Butterfly: Wide, horizontal
    shapes_scores['Butterfly'] = 0
    if aspect_ratio > 1.8 and cloud_coverage < 0.25 and not is_upright:
        shapes_scores['Butterfly'] += 40
    if vertical_extent < 0.35:
        shapes_scores['Butterfly'] += 25
    if texture > 2.2:
        shapes_scores['Butterfly'] += 20
    
    # Cat: Small, compact, mysterious
    shapes_scores['Cat'] = 0
    if cloud_coverage < 0.22 and compactness < 0.18:
        shapes_scores['Cat'] += 40
    if 0.85 < aspect_ratio < 1.15:
        shapes_scores['Cat'] += 30
    if texture < 1.8:
        shapes_scores['Cat'] += 20
    
    # Add small random variation (2-8 points) to make it slightly dynamic
    for shape in shapes_scores:
        shapes_scores[shape] += random.randint(2, 8)
    
    # Get top shapes
    sorted_shapes = sorted(shapes_scores.items(), key=lambda x: x[1], reverse=True)
    
    top_shape = sorted_shapes[0][0]
    top_score = min(95, max(60, sorted_shapes[0][1]))
    
    runner_up_shape = sorted_shapes[1][0]
    runner_up_score = min(top_score - 10, max(35, sorted_shapes[1][1]))
    
    print("=" * 80)
    print("📊 FINAL SHAPE SCORES (Custom Algorithm):")
    for i, (shape, score) in enumerate(sorted_shapes, 1):
        marker = "🥇" if i == 1 else "🥈" if i == 2 else "  "
        print(f"{marker} {i}. {shape:12s} = {score:3d} points")
    print("=" * 80)
    
    return top_shape, top_score, runner_up_shape, runner_up_score


def analyze_cloud_shape_multi(img: Image.Image) -> tuple:
    """
    Analyze cloud shape and return ALL detected shapes with scores.
    Returns (top_shape, top_score, runner_up_shape, runner_up_score, all_shapes_list)
    """
    # Run the same analysis
    gray = img.convert('L')
    enhancer = ImageEnhance.Contrast(gray)
    gray = enhancer.enhance(2.0)
    img_array = np.array(gray)
    height, width = img_array.shape
    
    threshold = np.mean(img_array) + np.std(img_array) * 0.5
    cloud_mask = img_array > threshold
    
    cloud_pixels = np.sum(cloud_mask)
    total_pixels = height * width
    cloud_coverage = cloud_pixels / total_pixels
    
    row_coverage = np.sum(cloud_mask, axis=1)
    col_coverage = np.sum(cloud_mask, axis=0)
    
    vertical_extent = np.sum(row_coverage > 0) / height
    horizontal_extent = np.sum(col_coverage > 0) / width
    aspect_ratio = horizontal_extent / (vertical_extent + 0.001)
    
    if cloud_pixels > 0:
        y_coords, x_coords = np.where(cloud_mask)
        center_y, center_x = np.mean(y_coords), np.mean(x_coords)
        distances = np.sqrt((y_coords - center_y)**2 + (x_coords - center_x)**2)
        avg_distance = np.mean(distances)
        compactness = avg_distance / max(width, height)
    else:
        compactness = 0.5
    
    edges = np.abs(np.diff(img_array.astype(float), axis=0)).sum()
    edges += np.abs(np.diff(img_array.astype(float), axis=1)).sum()
    texture = edges / (height * width)
    
    # Additional analysis
    mid_row = height // 2
    top_half_brightness = np.mean(img_array[:mid_row][cloud_mask[:mid_row]]) if np.any(cloud_mask[:mid_row]) else 0
    bottom_half_brightness = np.mean(img_array[mid_row:][cloud_mask[mid_row:]]) if np.any(cloud_mask[mid_row:]) else 0
    has_prominent_top = top_half_brightness > bottom_half_brightness * 1.1 if bottom_half_brightness > 0 else False
    is_upright = aspect_ratio < 1.3 and vertical_extent > 0.4
    
    shapes_scores = {}
    
    # SAME MASSIVE BOOSTS as analyze_cloud_shape for consistency!
    # Lion: HEAVILY BOOSTED for upright majestic clouds
    shapes_scores['Lion'] = 0
    if is_upright and cloud_coverage > 0.18:
        shapes_scores['Lion'] += 100  # MASSIVE boost
    if has_prominent_top and cloud_coverage > 0.12:
        shapes_scores['Lion'] += 90
    if texture > 1.3:
        shapes_scores['Lion'] += 70
    if 0.6 < aspect_ratio < 1.8:
        shapes_scores['Lion'] += 60
    
    # Dog: HEAVILY BOOSTED for sitting/standing
    shapes_scores['Dog'] = 0
    if is_upright and cloud_coverage > 0.12:
        shapes_scores['Dog'] += 95
    if has_prominent_top:
        shapes_scores['Dog'] += 85
    if 0.6 < aspect_ratio < 1.5:
        shapes_scores['Dog'] += 65
    if texture > 1.2:
        shapes_scores['Dog'] += 60
    
    # Bear: HEAVILY BOOSTED for large upright
    shapes_scores['Bear'] = 0
    if is_upright and cloud_coverage > 0.2:
        shapes_scores['Bear'] += 90
    if 0.5 < aspect_ratio < 1.4:
        shapes_scores['Bear'] += 80
    if texture > 1.2:
        shapes_scores['Bear'] += 70
    if compactness < 0.32:
        shapes_scores['Bear'] += 50
    
    # Dragon: KILLED for upright clouds, very strict otherwise
    shapes_scores['Dragon'] = 0
    if is_upright:
        shapes_scores['Dragon'] = 0  # ZERO points if upright!
    elif aspect_ratio > 2.5 and texture > 3.5 and compactness > 0.35:
        shapes_scores['Dragon'] += 40  # Only for extreme serpent shapes
    
    # Whale: KILLED for upright clouds
    shapes_scores['Whale'] = 0
    if is_upright:
        shapes_scores['Whale'] = 0  # ZERO points if upright!
    elif aspect_ratio > 2.0 and vertical_extent < 0.25:
        shapes_scores['Whale'] += 35
    
    # Dinosaur: KILLED for upright, strict for horizontal
    shapes_scores['Dinosaur'] = 0
    if is_upright:
        shapes_scores['Dinosaur'] = 0  # ZERO if upright!
    elif aspect_ratio > 1.8 and vertical_extent < 0.3:
        shapes_scores['Dinosaur'] += 35
    
    shapes_scores['Rabbit'] = 0
    if compactness < 0.18 and cloud_coverage < 0.25:
        shapes_scores['Rabbit'] += 40
    if 0.8 < aspect_ratio < 1.2:
        shapes_scores['Rabbit'] += 30
    if texture < 1.5:
        shapes_scores['Rabbit'] += 20
    
    shapes_scores['Elephant'] = 0
    if cloud_coverage > 0.3 and aspect_ratio > 1.2:
        shapes_scores['Elephant'] += 35
    if not is_upright and compactness < 0.2:
        shapes_scores['Elephant'] += 30
    if vertical_extent > 0.3 and aspect_ratio < 1.8:
        shapes_scores['Elephant'] += 25
    
    shapes_scores['Bird'] = 0
    if aspect_ratio > 2.2 and cloud_coverage < 0.2 and not is_upright:
        shapes_scores['Bird'] += 45
    if vertical_extent < 0.25:
        shapes_scores['Bird'] += 25
    if texture > 1.5:
        shapes_scores['Bird'] += 20
    
    shapes_scores['Horse'] = 0
    if (aspect_ratio > 1.4 or (is_upright and aspect_ratio < 0.8)) and cloud_coverage > 0.15:
        shapes_scores['Horse'] += 35
    if 0.18 < compactness < 0.28:
        shapes_scores['Horse'] += 30
    if texture > 1.8:
        shapes_scores['Horse'] += 25
    
    shapes_scores['Butterfly'] = 0
    if aspect_ratio > 1.8 and cloud_coverage < 0.25 and not is_upright:
        shapes_scores['Butterfly'] += 40
    if vertical_extent < 0.35:
        shapes_scores['Butterfly'] += 25
    if texture > 2.2:
        shapes_scores['Butterfly'] += 20
    
    shapes_scores['Cat'] = 0
    if cloud_coverage < 0.22 and compactness < 0.18:
        shapes_scores['Cat'] += 40
    if 0.85 < aspect_ratio < 1.15:
        shapes_scores['Cat'] += 30
    if texture < 1.8:
        shapes_scores['Cat'] += 20
    
    for shape in shapes_scores:
        shapes_scores[shape] += random.randint(2, 8)
    
    sorted_shapes = sorted(shapes_scores.items(), key=lambda x: x[1], reverse=True)
    
    top_shape = sorted_shapes[0][0]
    top_score = min(95, max(60, sorted_shapes[0][1]))
    
    runner_up_shape = sorted_shapes[1][0]
    runner_up_score = min(top_score - 10, max(35, sorted_shapes[1][1]))
    
    # Normalize all scores
    all_shapes_normalized = [(name, min(95, max(35, score))) for name, score in sorted_shapes]
    
    return top_shape, top_score, runner_up_shape, runner_up_score, all_shapes_normalized


def analyze_cloud_image(image_bytes: bytes) -> dict:
    """
    Analyze cloud image using CLIP vision model for zero-shot classification.
    Falls back to custom algorithm if CLIP fails.
    Returns multiple identified shapes with confidence scores.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        print(f"Error opening image: {e}")
        raise
    
    # Resize for analysis if too large
    if img.size[0] > 1024 or img.size[1] > 1024:
        img.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Use CLIP model for accurate zero-shot classification
    print("=" * 80)
    print("🤖 Using CLIP Vision Model for cloud shape detection")
    print("=" * 80)
    
    clip_results = analyze_with_clip(img)
    identified_shapes = []
    
    if clip_results and len(clip_results) > 0:
        # Use CLIP results
        identified_shapes = clip_results[:5]  # Top 5 shapes
        top_guess = identified_shapes[0]['shape']
        confidence_score = identified_shapes[0]['confidence']
        runner_up_guess = identified_shapes[1]['shape'] if len(identified_shapes) > 1 else 'Dragon'
        runner_up_score = identified_shapes[1]['confidence'] if len(identified_shapes) > 1 else 20
        
        print(f"✅ CLIP Detection: {top_guess} ({confidence_score}%)")
    else:
        # Fallback to custom algorithm if CLIP fails
        print("⚠️  CLIP failed, using fallback custom analysis...")
        top_guess, confidence_score, runner_up_guess, runner_up_score, all_scores = analyze_cloud_shape_multi(img)
        
        # Convert all_scores to identified_shapes format
        for shape_name, score in all_scores[:5]:  # Top 5 shapes
            if score > 30:
                identified_shapes.append({
                    'shape': shape_name,
                    'confidence': score,
                    'region': 'detected by custom image analysis'
                })
    
    print(f"✅ Final result: {len(identified_shapes)} shapes detected")
    for i, s in enumerate(identified_shapes, 1):
        print(f"   {i}. {s['shape']} ({s['confidence']}%)")
    print("=" * 80)
    
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
        "identified_shapes": identified_shapes,  # NEW: Multiple shapes detected
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
