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

def analyze_object_with_clip(image_bytes: bytes) -> dict:
    """
    Analyze an uploaded object image and match it to cloud shapes.
    Returns which animal/shape the object most resembles.
    Supports both animals and common objects like ice cream.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        
        # Resize if too large
        if img.size[0] > 512 or img.size[1] > 512:
            img.thumbnail((512, 512), Image.Resampling.LANCZOS)
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        model, processor = get_clip_model()
        
        # First, check if it's a common object or animal
        object_check_labels = [
            "ice cream",
            "ice cream cone",
            "frozen dessert",
            "a lion",
            "a dog", 
            "a bear",
            "a horse",
            "a cat",
            "a rabbit",
            "an elephant",
            "a dinosaur",
            "a dragon",
            "a whale",
            "a bird",
            "a butterfly"
        ]
        
        # Process image and text
        inputs = processor(
            text=object_check_labels,
            images=img,
            return_tensors="pt",
            padding=True
        )
        
        # Get predictions
        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)[0]
        
        # Check top result
        top_idx = probs.argmax().item()
        top_confidence = int(probs[top_idx].item() * 100)
        top_label = object_check_labels[top_idx]
        
        # Handle ice cream specially
        if any(word in top_label.lower() for word in ['ice cream', 'frozen', 'dessert']):
            # Normalize confidence
            if top_confidence < 40:
                total = probs[:3].sum().item()
                if total > 0:
                    top_confidence = min(95, int((probs[top_idx].item() / total) * 200))
            
            return {
                'matched_shape': 'IceCream',
                'confidence': top_confidence,
                'all_matches': [
                    {'shape': 'Ice Cream Cone', 'confidence': top_confidence},
                    {'shape': 'Fluffy Tower', 'confidence': max(20, top_confidence - 30)},
                    {'shape': 'Sweet Cloud', 'confidence': max(15, top_confidence - 40)}
                ],
                'message': '🍦 This looks like ice cream! Look for fluffy, towering cumulus clouds that look like scoops of ice cream stacked high!'
            }
        
        # Extract shape names for animals
        shape_names = [
            "IceCream", "IceCream", "IceCream",  # First 3 are ice cream variants
            "Lion", "Dog", "Bear", "Horse", "Cat", "Rabbit",
            "Elephant", "Dinosaur", "Dragon", "Whale", "Bird", "Butterfly"
        ]
        
        # Create results
        results = []
        for i, (shape, prob) in enumerate(zip(shape_names, probs)):
            if i < 3:  # Skip ice cream entries for animal results
                continue
            confidence = int(prob.item() * 100)
            if confidence > 5:
                results.append({
                    'shape': shape,
                    'confidence': confidence
                })
        
        # Sort by confidence
        results.sort(key=lambda x: x['confidence'], reverse=True)
        
        if not results:
            return None
        
        # Normalize if needed
        if results[0]['confidence'] < 50:
            total = sum(r['confidence'] for r in results[:5])
            if total > 0:
                for r in results[:5]:
                    r['confidence'] = min(99, int((r['confidence'] / total) * 250))
        
        print(f"🔍 Object analysis: {results[0]['shape']} ({results[0]['confidence']}%)")
        
        return {
            'matched_shape': results[0]['shape'],
            'confidence': results[0]['confidence'],
            'all_matches': results[:5]
        }
        
    except Exception as e:
        print(f"❌ Object analysis failed: {e}")
        import traceback
        traceback.print_exc()
        return None


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


def draw_shape_features(draw, cloud_mask, shape_name, width, height):
    """
    Draw characteristic features for the detected shape (eyes, ears, nose, etc.)
    with improved positioning and styling
    """
    # Find cloud centroid and bounds
    cloud_points = np.argwhere(cloud_mask)
    if len(cloud_points) == 0:
        return
    
    # Get bounding box
    min_y, min_x = cloud_points.min(axis=0)
    max_y, max_x = cloud_points.max(axis=0)
    
    cloud_width = max_x - min_x
    cloud_height = max_y - min_y
    center_x = (min_x + max_x) // 2
    center_y = (min_y + max_y) // 2
    
    # Scale features based on cloud size - make them bigger!
    feature_scale = min(cloud_width, cloud_height) // 12
    feature_scale = max(8, min(feature_scale, 40))  # Bigger range
    
    # Better colors
    eye_white = (255, 255, 255, 255)
    eye_black = (0, 0, 0, 255)
    highlight = (255, 255, 255, 180)
    
    # Helper function for cartoon eyes
    def draw_cartoon_eye(x, y, size):
        # White of eye
        draw.ellipse([x - size, y - size, x + size, y + size],
                    fill=eye_white, outline=eye_black, width=2)
        # Pupil
        pupil_size = size * 0.6
        draw.ellipse([x - pupil_size, y - pupil_size, x + pupil_size, y + pupil_size],
                    fill=eye_black)
        # Highlight
        highlight_size = size * 0.3
        draw.ellipse([x - size * 0.4, y - size * 0.5, 
                     x - size * 0.4 + highlight_size, y - size * 0.5 + highlight_size],
                    fill=highlight)
    
    # Shape-specific feature drawing with improved positioning
    if shape_name in ["Lion", "Dog", "Cat", "Bear"]:
        # Position eyes in upper third of cloud
        eye_y = min_y + int(cloud_height * 0.3)
        eye_spacing = int(cloud_width * 0.35)
        eye_size = feature_scale * 1.5
        
        # Left eye
        left_eye_x = center_x - eye_spacing // 2
        draw_cartoon_eye(int(left_eye_x), int(eye_y), int(eye_size))
        
        # Right eye
        right_eye_x = center_x + eye_spacing // 2
        draw_cartoon_eye(int(right_eye_x), int(eye_y), int(eye_size))
        
        # Nose - positioned below eyes
        nose_y = eye_y + int(feature_scale * 2.5)
        nose_size = feature_scale * 0.8
        # Triangle nose
        draw.polygon([
            (center_x, nose_y - nose_size),
            (center_x - nose_size, nose_y + nose_size),
            (center_x + nose_size, nose_y + nose_size)
        ], fill=(50, 50, 50, 255))
        
        # Cute smile
        mouth_y = nose_y + int(feature_scale * 1.5)
        mouth_width = feature_scale * 2
        draw.arc([center_x - mouth_width, mouth_y - feature_scale//2,
                 center_x + mouth_width, mouth_y + feature_scale * 1.5],
                start=0, end=180, fill=eye_black, width=3)
        
        # Whiskers for Cat
        if shape_name == "Cat":
            whisker_length = feature_scale * 3
            whisker_y = nose_y
            # Left whiskers
            for offset in [-feature_scale, 0, feature_scale]:
                draw.line([center_x - eye_spacing, whisker_y + offset,
                          center_x - eye_spacing - whisker_length, whisker_y + offset],
                         fill=eye_black, width=2)
            # Right whiskers
            for offset in [-feature_scale, 0, feature_scale]:
                draw.line([center_x + eye_spacing, whisker_y + offset,
                          center_x + eye_spacing + whisker_length, whisker_y + offset],
                         fill=eye_black, width=2)
    
    if shape_name == "Lion":
        # Majestic mane - golden circles around head
        mane_radius = int(cloud_width * 0.45)
        num_mane_puffs = 12
        mane_color = (255, 215, 0, 180)  # Golden
        
        for i in range(num_mane_puffs):
            angle = (i / num_mane_puffs) * 2 * 3.14159
            mane_x = center_x + int(mane_radius * np.cos(angle))
            mane_y = min_y + int(cloud_height * 0.35) + int(mane_radius * 0.5 * np.sin(angle))
            puff_size = feature_scale * 0.8
            draw.ellipse([mane_x - puff_size, mane_y - puff_size,
                         mane_x + puff_size, mane_y + puff_size],
                        fill=mane_color)
    
    elif shape_name == "Rabbit":
        # Super long cute ears
        ear_width = feature_scale * 1.5
        ear_height = feature_scale * 5
        ear_color = (255, 192, 203, 200)  # Pink
        ear_inner = (255, 228, 225, 200)  # Light pink
        
        # Left ear
        left_ear_x = center_x - int(cloud_width * 0.25)
        ear_top_y = min_y - ear_height
        draw.ellipse([left_ear_x - ear_width, ear_top_y,
                     left_ear_x + ear_width, min_y + feature_scale],
                    fill=ear_color, outline=eye_black, width=2)
        # Inner ear
        draw.ellipse([left_ear_x - ear_width//2, ear_top_y + feature_scale,
                     left_ear_x + ear_width//2, min_y],
                    fill=ear_inner)
        
        # Right ear
        right_ear_x = center_x + int(cloud_width * 0.25)
        draw.ellipse([right_ear_x - ear_width, ear_top_y,
                     right_ear_x + ear_width, min_y + feature_scale],
                    fill=ear_color, outline=eye_black, width=2)
        # Inner ear
        draw.ellipse([right_ear_x - ear_width//2, ear_top_y + feature_scale,
                     right_ear_x + ear_width//2, min_y],
                    fill=ear_inner)
        
        # Face features
        eye_y = min_y + int(cloud_height * 0.3)
        eye_spacing = int(cloud_width * 0.3)
        draw_cartoon_eye(center_x - eye_spacing//2, eye_y, int(feature_scale * 1.2))
        draw_cartoon_eye(center_x + eye_spacing//2, eye_y, int(feature_scale * 1.2))
        
        # Cute bunny nose
        nose_y = eye_y + feature_scale * 2
        draw.ellipse([center_x - feature_scale//2, nose_y - feature_scale//2,
                     center_x + feature_scale//2, nose_y + feature_scale//2],
                    fill=(255, 182, 193, 255))
        
        # Buck teeth
        tooth_width = feature_scale * 0.6
        tooth_height = feature_scale * 1.2
        draw.rectangle([center_x - tooth_width - 2, nose_y + feature_scale//2,
                       center_x - 2, nose_y + feature_scale//2 + tooth_height],
                      fill=eye_white, outline=eye_black, width=1)
        draw.rectangle([center_x + 2, nose_y + feature_scale//2,
                       center_x + tooth_width + 2, nose_y + feature_scale//2 + tooth_height],
                      fill=eye_white, outline=eye_black, width=1)
    
    elif shape_name == "Elephant":
        # Eyes positioned high
        eye_y = min_y + int(cloud_height * 0.25)
        eye_spacing = int(cloud_width * 0.4)
        draw_cartoon_eye(center_x - eye_spacing//2, eye_y, int(feature_scale * 1.5))
        draw_cartoon_eye(center_x + eye_spacing//2, eye_y, int(feature_scale * 1.5))
        
        # Long trunk
        trunk_start_y = center_y
        trunk_end_y = max_y + int(feature_scale * 4)
        trunk_width = feature_scale * 2.5
        trunk_color = (169, 169, 169, 200)  # Gray
        
        # Draw trunk as a curved path
        trunk_points = []
        num_segments = 10
        for i in range(num_segments + 1):
            t = i / num_segments
            y = trunk_start_y + (trunk_end_y - trunk_start_y) * t
            # Add slight curve
            x_offset = int(feature_scale * 2 * np.sin(t * 3.14159))
            trunk_points.append((center_x + x_offset, int(y)))
        
        # Draw trunk outline
        for i in range(len(trunk_points) - 1):
            draw.line([trunk_points[i], trunk_points[i+1]], 
                     fill=trunk_color, width=int(trunk_width))
        
        # Trunk tip
        draw.ellipse([trunk_points[-1][0] - trunk_width//2, trunk_points[-1][1] - trunk_width//2,
                     trunk_points[-1][0] + trunk_width//2, trunk_points[-1][1] + trunk_width//2],
                    fill=trunk_color, outline=eye_black, width=2)
        
        # Big ears (optional, simple circles)
        ear_size = feature_scale * 2
        ear_y = eye_y + feature_scale
        draw.ellipse([min_x - ear_size, ear_y - ear_size,
                     min_x + ear_size, ear_y + ear_size],
                    fill=trunk_color, outline=eye_black, width=2)
        draw.ellipse([max_x - ear_size, ear_y - ear_size,
                     max_x + ear_size, ear_y + ear_size],
                    fill=trunk_color, outline=eye_black, width=2)
    
    elif shape_name in ["Dragon", "Dinosaur"]:
        # Fierce reptile eyes with slit pupils
        eye_y = min_y + int(cloud_height * 0.3)
        eye_x_start = min_x + int(cloud_width * 0.2)
        eye_spacing = int(cloud_width * 0.15)
        eye_size = feature_scale * 1.3
        eye_color = (255, 255, 0, 255)  # Yellow
        
        for i in range(2):
            eye_x = eye_x_start + i * eye_spacing
            # Yellow eye
            draw.ellipse([eye_x - eye_size, eye_y - eye_size,
                         eye_x + eye_size, eye_y + eye_size],
                        fill=eye_color, outline=eye_black, width=2)
            # Vertical slit pupil
            slit_width = eye_size * 0.3
            draw.ellipse([eye_x - slit_width, eye_y - eye_size * 0.8,
                         eye_x + slit_width, eye_y + eye_size * 0.8],
                        fill=eye_black)
        
        # Sharp teeth/mouth
        mouth_y = eye_y + feature_scale * 3
        mouth_length = cloud_width // 3
        # Zigzag for teeth
        teeth = []
        num_teeth = 6
        for i in range(num_teeth + 1):
            x = eye_x_start + (mouth_length * i) // num_teeth
            y = mouth_y + (feature_scale if i % 2 == 0 else 0)
            teeth.append((x, y))
        draw.line(teeth, fill=eye_black, width=3)
        
        if shape_name == "Dragon":
            # Spikes along back
            spike_color = (255, 69, 0, 200)  # Orange-red
            num_spikes = 6
            spike_height = feature_scale * 3
            for i in range(num_spikes):
                spike_x = min_x + (cloud_width * i) // (num_spikes - 1)
                spike_base_y = min_y - feature_scale
                draw.polygon([
                    (spike_x, spike_base_y - spike_height),
                    (spike_x - feature_scale, spike_base_y),
                    (spike_x + feature_scale, spike_base_y)
                ], fill=spike_color, outline=eye_black, width=2)
    
    elif shape_name == "Bird":
        # Bird positioned at front of cloud
        eye_x = min_x + int(cloud_width * 0.25)
        eye_y = min_y + int(cloud_height * 0.35)
        eye_size = feature_scale * 1.3
        
        draw_cartoon_eye(eye_x, eye_y, int(eye_size))
        
        # Prominent beak
        beak_length = feature_scale * 3
        beak_color = (255, 165, 0, 255)  # Orange
        beak_start_x = eye_x + int(eye_size * 1.5)
        draw.polygon([
            (beak_start_x, eye_y),
            (beak_start_x + beak_length, eye_y - feature_scale),
            (beak_start_x + beak_length, eye_y + feature_scale)
        ], fill=beak_color, outline=eye_black, width=2)
        
        # Wing indication
        wing_x = center_x
        wing_y = center_y + feature_scale
        wing_size = feature_scale * 2
        draw.arc([wing_x - wing_size, wing_y - wing_size,
                 wing_x + wing_size, wing_y + wing_size],
                start=30, end=150, fill=eye_black, width=3)
    
    elif shape_name == "Whale":
        # Eye positioned forward
        eye_x = min_x + int(cloud_width * 0.2)
        eye_y = min_y + int(cloud_height * 0.35)
        draw_cartoon_eye(eye_x, eye_y, int(feature_scale * 1.5))
        
        # Water spout (blowhole)
        spout_x = center_x - int(cloud_width * 0.1)
        spout_base_y = min_y
        spout_height = feature_scale * 5
        spout_color = (135, 206, 235, 180)  # Light blue
        
        # Multiple water streams
        for i in range(-1, 2):
            stream_x = spout_x + i * feature_scale
            # Draw wavy water stream
            points = []
            for j in range(8):
                y = spout_base_y - (spout_height * j) // 7
                x_wave = stream_x + int(feature_scale * 0.5 * np.sin(j * 0.8))
                points.append((x_wave, y))
            draw.line(points, fill=spout_color, width=4)
            # Water droplets at top
            drop_y = spout_base_y - spout_height
            draw.ellipse([stream_x - feature_scale//3, drop_y - feature_scale//3,
                         stream_x + feature_scale//3, drop_y + feature_scale//3],
                        fill=spout_color)
        
        # Smile
        smile_y = eye_y + feature_scale * 2
        smile_width = feature_scale * 3
        draw.arc([eye_x - smile_width, smile_y,
                 eye_x + smile_width, smile_y + feature_scale * 2],
                start=0, end=180, fill=eye_black, width=3)
    
    elif shape_name == "Butterfly":
        # Body in center
        body_length = feature_scale * 4
        body_width = feature_scale * 0.8
        draw.ellipse([center_x - body_width, center_y - body_length//2,
                     center_x + body_width, center_y + body_length//2],
                    fill=eye_black)
        
        # Antennae
        antenna_length = feature_scale * 4
        antenna_color = eye_black
        for x_offset in [-body_width, body_width]:
            antenna_x = center_x + x_offset
            # Curved antenna
            points = []
            for i in range(5):
                t = i / 4
                y = center_y - body_length//2 - antenna_length * t
                x = antenna_x + int(feature_scale * t * 1.5 * (1 if x_offset > 0 else -1))
                points.append((x, int(y)))
            draw.line(points, fill=antenna_color, width=2)
            # Antenna tip
            draw.ellipse([points[-1][0] - 4, points[-1][1] - 4,
                         points[-1][0] + 4, points[-1][1] + 4],
                        fill=(255, 105, 180, 255))
        
        # Wing patterns (simple circles on wing areas)
        wing_color = (255, 105, 180, 150)
        pattern_size = feature_scale * 0.6
        # Left wing patterns
        for i in range(3):
            px = center_x - feature_scale * (2 + i)
            py = center_y + i * feature_scale
            draw.ellipse([px - pattern_size, py - pattern_size,
                         px + pattern_size, py + pattern_size],
                        fill=wing_color)
        # Right wing patterns
        for i in range(3):
            px = center_x + feature_scale * (2 + i)
            py = center_y + i * feature_scale
            draw.ellipse([px - pattern_size, py - pattern_size,
                         px + pattern_size, py + pattern_size],
                        fill=wing_color)
    
    elif shape_name == "Horse":
        # Horse head features
        eye_y = min_y + int(cloud_height * 0.3)
        eye_x = center_x - int(cloud_width * 0.15)
        draw_cartoon_eye(eye_x, eye_y, int(feature_scale * 1.3))
        
        # Nostril
        nostril_y = eye_y + feature_scale * 3
        draw.ellipse([eye_x - feature_scale//2, nostril_y - feature_scale//3,
                     eye_x + feature_scale//2, nostril_y + feature_scale//3],
                    fill=(100, 100, 100, 255), outline=eye_black, width=1)
        
        # Mane
        mane_color = (139, 69, 19, 180)  # Brown
        num_mane_strands = 5
        for i in range(num_mane_strands):
            strand_x = center_x - int(cloud_width * 0.25) + i * feature_scale * 2
            strand_top_y = min_y - feature_scale * 3
            strand_bottom_y = min_y + feature_scale
            # Wavy strand
            points = [(strand_x, strand_top_y)]
            for j in range(1, 4):
                y = strand_top_y + (strand_bottom_y - strand_top_y) * j // 3
                x = strand_x + int(feature_scale * 0.5 * np.sin(j))
                points.append((x, y))
            draw.line(points, fill=mane_color, width=int(feature_scale * 0.8))


def draw_simple_cloud_outline(img: Image.Image) -> Image.Image:
    """
    Draw a simple outline around the cloud with an ice cream cone at the bottom.
    Used for IceCream clouds.
    """
    try:
        # Create a copy to draw on
        img_with_outline = img.copy()
        draw = ImageDraw.Draw(img_with_outline, 'RGBA')
        
        # Convert to grayscale for edge detection
        gray = img.convert('L')
        
        # Enhance contrast
        enhancer = ImageEnhance.Contrast(gray)
        gray = enhancer.enhance(2.5)
        
        # Get numpy array
        img_array = np.array(gray)
        height, width = img_array.shape
        
        # Find bright regions (clouds)
        threshold = np.mean(img_array) + np.std(img_array) * 0.3
        cloud_mask = img_array > threshold
        
        # Apply morphological operations
        from scipy import ndimage
        cloud_mask = ndimage.binary_fill_holes(cloud_mask)
        cloud_mask = ndimage.binary_erosion(cloud_mask, iterations=2)
        cloud_mask = ndimage.binary_dilation(cloud_mask, iterations=2)
        
        # Find the largest connected component
        labeled, num_features = ndimage.label(cloud_mask)
        if num_features > 0:
            sizes = ndimage.sum(cloud_mask, labeled, range(num_features + 1))
            main_cloud_label = np.argmax(sizes)
            cloud_mask = labeled == main_cloud_label
        
        # Get cloud bounds for positioning cone
        cloud_points = np.argwhere(cloud_mask)
        if len(cloud_points) > 0:
            min_y, min_x = cloud_points.min(axis=0)
            max_y, max_x = cloud_points.max(axis=0)
            center_x = (min_x + max_x) // 2
            cloud_bottom_y = max_y
        else:
            center_x = width // 2
            cloud_bottom_y = height // 2
        
        # Find contour points
        edges = np.zeros_like(cloud_mask, dtype=bool)
        padded = np.pad(cloud_mask, 1, mode='constant', constant_values=False)
        
        for i in range(1, height + 1):
            for j in range(1, width + 1):
                if padded[i, j]:
                    if not (padded[i-1, j-1] and padded[i-1, j] and padded[i-1, j+1] and
                           padded[i, j-1] and padded[i, j+1] and
                           padded[i+1, j-1] and padded[i+1, j] and padded[i+1, j+1]):
                        edges[i-1, j-1] = True
        
        # Get edge points
        edge_points = np.argwhere(edges)
        
        # Use white/light blue outline for ice cream clouds
        outline_color = (135, 206, 250, 255)  # Sky blue
        
        # Draw thicker outline
        thickness = 6
        for point in edge_points:
            y, x = point
            draw.ellipse([x-thickness, y-thickness, x+thickness, y+thickness], 
                        fill=outline_color, outline=outline_color)
        
        # Draw ICE CREAM CONE at the bottom of the cloud!
        cone_width = min(width, height) // 4  # Scale based on image size
        cone_height = int(cone_width * 1.5)
        
        # Cone position - centered below the cloud
        cone_top_y = cloud_bottom_y + 10
        cone_bottom_y = cone_top_y + cone_height
        cone_left_x = center_x - cone_width // 2
        cone_right_x = center_x + cone_width // 2
        
        # Draw waffle cone pattern
        cone_color = (222, 184, 135, 255)  # Burlywood/tan
        cone_dark = (184, 134, 11, 255)  # Dark goldenrod for pattern
        
        # Main cone triangle
        cone_points = [
            (center_x, cone_bottom_y),  # Bottom point
            (cone_left_x, cone_top_y),  # Top left
            (cone_right_x, cone_top_y)  # Top right
        ]
        draw.polygon(cone_points, fill=cone_color, outline=cone_dark, width=3)
        
        # Draw waffle/grid pattern on cone
        grid_spacing = cone_width // 5
        # Diagonal lines from left to right (with proper clipping)
        for i in range(-2, 3):
            offset = i * grid_spacing
            
            # Calculate line endpoints within cone bounds
            # Lines go from left edge to right edge at different heights
            for segment in range(4):
                segment_ratio = segment / 4.0
                next_ratio = (segment + 1) / 4.0
                
                # Calculate x positions at different heights
                y1 = cone_top_y + (cone_bottom_y - cone_top_y) * segment_ratio
                y2 = cone_top_y + (cone_bottom_y - cone_top_y) * next_ratio
                
                # Width of cone at this height
                width_at_y1 = cone_width * (1 - segment_ratio)
                width_at_y2 = cone_width * (1 - next_ratio)
                
                x1_left = center_x - width_at_y1 / 2
                x1_right = center_x + width_at_y1 / 2
                x2_left = center_x - width_at_y2 / 2
                x2_right = center_x + width_at_y2 / 2
                
                # Draw diagonal line segment
                if i % 2 == 0:  # Left to right diagonals
                    x1 = x1_left + offset
                    x2 = x2_right + offset
                    if x1_left <= x1 <= x1_right and x2_left <= x2 <= x2_right:
                        draw.line([(x1, y1), (x2, y2)], fill=cone_dark, width=2)
        
        # Diagonal lines from right to left (with proper clipping)
        for i in range(-2, 3):
            offset = i * grid_spacing
            
            for segment in range(4):
                segment_ratio = segment / 4.0
                next_ratio = (segment + 1) / 4.0
                
                y1 = cone_top_y + (cone_bottom_y - cone_top_y) * segment_ratio
                y2 = cone_top_y + (cone_bottom_y - cone_top_y) * next_ratio
                
                width_at_y1 = cone_width * (1 - segment_ratio)
                width_at_y2 = cone_width * (1 - next_ratio)
                
                x1_left = center_x - width_at_y1 / 2
                x1_right = center_x + width_at_y1 / 2
                x2_left = center_x - width_at_y2 / 2
                x2_right = center_x + width_at_y2 / 2
                
                # Draw diagonal line segment (opposite direction)
                if i % 2 == 0:  # Right to left diagonals
                    x1 = x1_right - offset
                    x2 = x2_left - offset
                    if x1_left <= x1 <= x1_right and x2_left <= x2 <= x2_right:
                        draw.line([(x1, y1), (x2, y2)], fill=cone_dark, width=2)
        
        # Add label
        font_size = max(30, min(width, height) // 15)
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("Arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
        
        label_text = "🍦 Ice Cream Cloud"
        
        bbox = draw.textbbox((0, 0), label_text, font=font)
        label_width = bbox[2] - bbox[0]
        label_height = bbox[3] - bbox[1]
        
        padding = 15
        label_x = padding
        label_y = padding
        
        # Draw rounded rectangle background
        bg_color = (0, 0, 0, 200)
        draw.rounded_rectangle(
            [label_x - padding, label_y - padding, 
             label_x + label_width + padding, label_y + label_height + padding],
            radius=10,
            fill=bg_color
        )
        
        # Draw text
        draw.text((label_x, label_y), label_text, fill=outline_color, font=font)
        
        # Convert back to RGB
        img_with_outline = img_with_outline.convert('RGB')
        
        print(f"✅ Drew ice cream cloud with cone ({len(edge_points)} edge points)")
        return img_with_outline
        
    except Exception as e:
        print(f"⚠️  Failed to draw ice cream outline: {e}")
        import traceback
        traceback.print_exc()
        return img


def draw_outline_on_image(img: Image.Image, shape_name: str) -> Image.Image:
    """
    Draw an outline around the detected cloud shape.
    Uses edge detection and contour finding to highlight the main cloud.
    """
    try:
        # Create a copy to draw on
        img_with_outline = img.copy()
        draw = ImageDraw.Draw(img_with_outline, 'RGBA')
        
        # Convert to grayscale for edge detection
        gray = img.convert('L')
        
        # Enhance contrast
        enhancer = ImageEnhance.Contrast(gray)
        gray = enhancer.enhance(2.5)
        
        # Get numpy array
        img_array = np.array(gray)
        height, width = img_array.shape
        
        # Find bright regions (clouds) - more aggressive threshold
        threshold = np.mean(img_array) + np.std(img_array) * 0.3
        cloud_mask = img_array > threshold
        
        # Apply morphological operations to clean up the mask
        from scipy import ndimage
        cloud_mask = ndimage.binary_fill_holes(cloud_mask)
        cloud_mask = ndimage.binary_erosion(cloud_mask, iterations=2)
        cloud_mask = ndimage.binary_dilation(cloud_mask, iterations=2)
        
        # Find the largest connected component (main cloud)
        labeled, num_features = ndimage.label(cloud_mask)
        if num_features > 0:
            sizes = ndimage.sum(cloud_mask, labeled, range(num_features + 1))
            main_cloud_label = np.argmax(sizes)
            cloud_mask = labeled == main_cloud_label
        
        # Find contour points using edge detection
        edges = np.zeros_like(cloud_mask, dtype=bool)
        padded = np.pad(cloud_mask, 1, mode='constant', constant_values=False)
        
        for i in range(1, height + 1):
            for j in range(1, width + 1):
                if padded[i, j]:
                    # Check 8 neighbors
                    if not (padded[i-1, j-1] and padded[i-1, j] and padded[i-1, j+1] and
                           padded[i, j-1] and padded[i, j+1] and
                           padded[i+1, j-1] and padded[i+1, j] and padded[i+1, j+1]):
                        edges[i-1, j-1] = True
        
        # Get edge points
        edge_points = np.argwhere(edges)
        
        # Shape-specific colors
        shape_colors = {
            "Lion": (255, 215, 0, 255),      # Gold
            "Dog": (255, 99, 71, 255),       # Tomato
            "Bear": (139, 69, 19, 255),      # SaddleBrown
            "Dragon": (255, 69, 0, 255),     # OrangeRed
            "Horse": (222, 184, 135, 255),   # BurlyWood
            "Cat": (147, 112, 219, 255),     # MediumPurple
            "Rabbit": (255, 182, 193, 255),  # LightPink
            "Elephant": (112, 128, 144, 255),# SlateGray
            "Whale": (65, 105, 225, 255),    # RoyalBlue
            "Bird": (135, 206, 235, 255),    # SkyBlue
            "Butterfly": (255, 105, 180, 255),# HotPink
            "Dinosaur": (85, 107, 47, 255)   # DarkOliveGreen
        }
        
        outline_color = shape_colors.get(shape_name, (0, 255, 0, 255))
        
        # Draw thicker outline using circles at each edge point
        thickness = 6
        for point in edge_points:
            y, x = point
            # Draw a circle for each edge point for smoother outline
            draw.ellipse([x-thickness, y-thickness, x+thickness, y+thickness], 
                        fill=outline_color, outline=outline_color)
        
        # Add a semi-transparent overlay on the cloud itself
        overlay = Image.new('RGBA', img_with_outline.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        
        # Fill the cloud area with semi-transparent color
        cloud_points = np.argwhere(cloud_mask)
        tint_color = outline_color[:3] + (30,)  # Very transparent tint
        for point in cloud_points[::5]:  # Sample every 5th point for performance
            y, x = point
            overlay_draw.point((x, y), fill=tint_color)
        
        img_with_outline = Image.alpha_composite(img_with_outline.convert('RGBA'), overlay)
        
        # Draw shape features (eyes, ears, etc.) on the main image
        main_draw = ImageDraw.Draw(img_with_outline, 'RGBA')
        draw_shape_features(main_draw, cloud_mask, shape_name, width, height)
        
        # Add label with shape name
        font_size = max(30, min(width, height) // 15)
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("Arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
        
        label_text = f"✓ {shape_name}"
        
        # Get text size using textbbox
        bbox = draw.textbbox((0, 0), label_text, font=font)
        label_width = bbox[2] - bbox[0]
        label_height = bbox[3] - bbox[1]
        
        padding = 15
        label_x = padding
        label_y = padding
        
        # Draw rounded rectangle background
        bg_color = (0, 0, 0, 200)
        draw.rounded_rectangle(
            [label_x - padding, label_y - padding, 
             label_x + label_width + padding, label_y + label_height + padding],
            radius=10,
            fill=bg_color
        )
        
        # Draw text
        draw.text((label_x, label_y), label_text, fill=outline_color, font=font)
        
        # Convert back to RGB
        img_with_outline = img_with_outline.convert('RGB')
        
        print(f"✅ Drew outline for {shape_name} ({len(edge_points)} edge points)")
        return img_with_outline
        
    except Exception as e:
        print(f"⚠️  Failed to draw outline: {e}")
        import traceback
        traceback.print_exc()
        return img  # Return original if drawing fails


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


def analyze_cloud_image(image_bytes: bytes, force_shape: str = None) -> dict:
    """
    Analyze cloud image using CLIP vision model for zero-shot classification.
    Falls back to custom algorithm if CLIP fails.
    Returns multiple identified shapes with confidence scores.
    
    If force_shape is provided, it will draw that shape's features instead of detecting.
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
    
    # If user is hunting for a specific shape, use that instead of detecting
    if force_shape:
        print("=" * 80)
        print(f"🎯 FORCED SHAPE MODE: Drawing {force_shape} on cloud!")
        print("=" * 80)
        
        # Set shape variables
        top_guess = force_shape
        confidence_score = 100  # User wanted this shape!
        runner_up_guess = force_shape
        runner_up_score = 95
        
        identified_shapes = [{
            'shape': force_shape,
            'confidence': 100,
            'region': 'requested by user'
        }]
        
        # For IceCream, draw cone. For animals, draw their features
        if force_shape == 'IceCream':
            print(f"🎨 Drawing ice cream cone on cloud...")
            try:
                outlined_img = draw_simple_cloud_outline(img)
                print(f"✅ Ice cream cloud outline complete")
            except Exception as e:
                print(f"⚠️ Ice cream drawing failed: {e}")
                outlined_img = img.copy()
        else:
            print(f"🎨 Drawing {force_shape} features on cloud...")
            outlined_img = draw_outline_on_image(img, force_shape)
            print(f"✅ Successfully drew {force_shape} outline")
        
    else:
        # Normal detection flow
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
        
        # Generate outlined image showing the detected shape
        outlined_img = draw_outline_on_image(img, top_guess)
    
    # Get personality data for the detected/forced shape
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
        "emoji": shape_data["emoji"],
        "outlined_image": outlined_img  # NEW: Image with outline drawn
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
