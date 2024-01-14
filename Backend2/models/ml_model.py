from tensorflow.keras.models import load_model
from utils.image_processing import load_and_preprocess_image
from PIL import Image
from transformers import ViTFeatureExtractor, ViTForImageClassification
import torch
import torch.nn.functional as F
model = load_model('models\\dog_breed_inception_model_20(4).h5')  # Replace with your model file path

class_labels = ['Afghan', 'Basset', 'Beagle', 'Bearded Collie', 'Bermaise', 'Bloodhound', 'Border Collie', 'Boston Terrier', 
                   'Boxer', 'Bulldog', 'Chihuahua', 'Chow', 'Corgi', 'Coyote', 'Doberman', 'French Bulldog', 'German Sheperd', 
                   'Golden Retriever', 'Great Dane', 'Great Perenees', 'Greyhound', 'Irish Spaniel', 'Japanese Spaniel', 'Komondor',
                   'Labradoodle', 'Labrador Retriever', 'Malinois', 'Maltese', 'Newfoundland', 'Pekinese', 'Pit Bull', 'Pomeranian',
                   'Poodle', 'Pug', 'Rottweiler', 'Saint Bernard', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky', 'Yorkie']

def get_prediction(file_path, new_path):
    img_array = load_and_preprocess_image(new_path)
    predictions = model.predict(img_array)

    # Decode predictions manually
    decoded_predictions = [(class_labels[i], predictions[0][i]) for i in range(len(class_labels))]

    # Sort predictions by score in descending order
    decoded_predictions.sort(key=lambda x: x[1], reverse=True)

    # Return the top prediction
    top_prediction = {'label': decoded_predictions[0][0], 'score': float(decoded_predictions[0][1])}
    return top_prediction

def get_predictions_VIT(file_path, new_path):

    model_path = 'models\\fine_tuned_vit_model_40'
    VIT_model = ViTForImageClassification.from_pretrained(model_path)
    VIT_model.eval()

    feature_extractor = ViTFeatureExtractor.from_pretrained('google/vit-base-patch16-224')
    new_image = Image.open(new_path)
    inputs = feature_extractor(images = new_image, return_tensors="pt")['pixel_values']

    with torch.no_grad():
        outputs = VIT_model(pixel_values=inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=1)

    predicted_label = torch.argmax(logits).item()
    predicted_probability = probabilities[0, predicted_label].item()

    return {'label': class_labels[predicted_label], 'score': float(predicted_probability)}
