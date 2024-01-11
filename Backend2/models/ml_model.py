from tensorflow.keras.models import load_model
from utils.image_processing import load_and_preprocess_image

model = load_model('models\\dog_breed_inception_model_20(4).h5')  # Replace with your model file path

class_labels = ['Afghan', 'Basset', 'Beagle', 'Border Collie', 'Corgi', 'Coyote', 'Doberman', 'German Sheperd',
                'Labradoodle', 'Maltese', 'Newfoundland', 'Pit Bull', 'Pomeranian', 'Poodle', 'Pug', 'Rottweiler',
                'Saint Bernard', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky']
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