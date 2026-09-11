"""
Test script to verify Hugging Face model integration
"""
from analyzer import analyze_cloud_image, classifier
from PIL import Image
import io

def test_model():
    print("=" * 50)
    print("Cloudify AI Model Test")
    print("=" * 50)
    
    # Check if model is loaded
    if classifier:
        print("✅ Hugging Face model loaded successfully!")
        print(f"   Model: google/vit-base-patch16-224")
    else:
        print("⚠️  Model not loaded, using fallback mode")
    
    print("\nTo test with an actual image:")
    print("1. Place a cloud image in this directory (e.g., test_cloud.jpg)")
    print("2. Uncomment the test code below")
    print("3. Run: python test_model.py")
    
    # Uncomment to test with actual image:
    # try:
    #     with open("test_cloud.jpg", "rb") as f:
    #         image_bytes = f.read()
    #     
    #     result = analyze_cloud_image(image_bytes)
    #     
    #     print("\n" + "=" * 50)
    #     print("Analysis Result:")
    #     print("=" * 50)
    #     print(f"Character: {result['emoji']} {result['character_name']}")
    #     print(f"Shape: {result['top_guess']} ({result['confidence_score']}%)")
    #     print(f"Runner-up: {result['runner_up_guess']} ({result['runner_up_score']}%)")
    #     print(f"Personality: {result['personality_type']}")
    #     print(f"Quote: \"{result['quote']}\"")
    #     print(f"\nStats:")
    #     for stat, value in result['stats'].items():
    #         print(f"  {stat}: {value}%")
    # 
    # except FileNotFoundError:
    #     print("\n❌ test_cloud.jpg not found")
    # except Exception as e:
    #     print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    test_model()
