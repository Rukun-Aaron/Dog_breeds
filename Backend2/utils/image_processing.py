from tensorflow.keras.preprocessing import image
import numpy as np
import os
img_path = 'imgs'
def load_and_preprocess_image(img_path_input):
    img = image.load_img(img_path_input, target_size=(299, 299))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image
    return img_array

def cleanup_images():
    # Delete all images from the images folder
    for filename in os.listdir(img_path):
        file_path = os.path.join(img_path, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Error deleting {filename}: {e}")