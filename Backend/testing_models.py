from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input
import numpy as np
import os

def load_and_preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(299, 299))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image
    return img_array

def evaluate_accuracy(model, class_labels, test_path):
    correct = 0
    total = 0

    for label in class_labels:
        for i in range(1, 10):
            img_path = os.path.join(test_path, label, f"0{i}.jpg")
            img_array = load_and_preprocess_image(img_path)

            # Make predictions
            predictions = model.predict(img_array)

            # Interpret the predictions
            predicted_class_index = np.argmax(predictions[0])
            predicted_class = class_labels[predicted_class_index]
            total += 1

            if predicted_class == label:
                correct += 1

            # Print the predicted class
            print("Predicted class:", predicted_class)

    accuracy = correct / total
    print("Accuracy:", accuracy)
    return accuracy

# Load the saved model
model = load_model("dog_breed_inception_model(3).h5")

class_labels = ['Afghan', 'Border Collie', 'Corgi', 'Coyote', 'Doberman', 'German Sheperd', 'Labradoodle',
                'Maltese', 'Pomeranian', 'Pug', 'Rottweiler', 'Saint Bernard', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky']

test_path = "archive/test"  # Adjust this path based on your directory structure

# Evaluate accuracy
accuracy = evaluate_accuracy(model, class_labels, test_path)
