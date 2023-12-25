from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

model = load_model('Model/dog_breed_inception_model_20(4).h5')  # Replace with your model file path


class_labels = ['Afghan', 'Basset', 'Beagle', 'Border Collie', 'Corgi', 'Coyote', 'Doberman', 'German Sheperd',
                'Labradoodle', 'Maltese', 'Newfoundland', 'Pit Bull', 'Pomeranian', 'Poodle', 'Pug', 'Rottweiler',
                'Saint Bernard', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky']

img_path = 'images/'
def load_and_preprocess_image(img_path_input):
    img = image.load_img(img_path_input, target_size=(299, 299))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image
    return img_array


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

def cleanup_images():
    # Delete all images from the images folder
    for filename in os.listdir(img_path):
        file_path = os.path.join(img_path, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Error deleting {filename}: {e}")


