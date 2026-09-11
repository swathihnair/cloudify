"""
Test script to verify cloud detection is working correctly.
Analyzes an uploaded image and shows all detected shapes.
"""
import sys
from analyzer import analyze_cloud_image

def test_image(image_path):
    print("\n" + "=" * 80)
    print(f"Testing cloud detection on: {image_path}")
    print("=" * 80 + "\n")
    
    try:
        with open(image_path, 'rb') as f:
            image_bytes = f.read()
        
        result = analyze_cloud_image(image_bytes)
        
        print("\n" + "=" * 80)
        print("FINAL RESULT:")
        print("=" * 80)
        print(f"Character Name: {result['character_name']}")
        print(f"Top Guess: {result['top_guess']} ({result['confidence_score']}%)")
        print(f"Runner Up: {result['runner_up_guess']} ({result['runner_up_score']}%)")
        print(f"\nAll Identified Shapes:")
        for i, shape in enumerate(result.get('identified_shapes', []), 1):
            print(f"  {i}. {shape['shape']} - {shape['confidence']}% ({shape['region']})")
        print(f"\nPersonality: {result['personality_type']}")
        print(f"Quote: {result['quote']}")
        
        # Save outlined image if available
        if 'outlined_image' in result:
            output_path = image_path.replace('.', '_outlined.')
            result['outlined_image'].save(output_path)
            print(f"\n✅ Outlined image saved to: {output_path}")
        
        print("=" * 80 + "\n")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_detection.py <image_path>")
        print("Example: python test_detection.py uploads/lion.jpg")
        sys.exit(1)
    
    test_image(sys.argv[1])
