# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.applications.vgg16 import preprocess_input
# import numpy as np
# import os

# def load_and_preprocess_image(img_path):
#     img = image.load_img(img_path, target_size=(299, 299))
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array /= 255.0  # Normalize the image
#     return img_array

# def evaluate_accuracy(model, class_labels, test_path):
#     correct = 0
#     total = 0

#     for label in class_labels:
#         for i in range(1, 10):
#             img_path = os.path.join(test_path, label, f"0{i}.jpg")
#             img_array = load_and_preprocess_image(img_path)

#             # Make predictions
#             predictions = model.predict(img_array)

#             # Interpret the predictions
#             predicted_class_index = np.argmax(predictions[0])
#             predicted_class = class_labels[predicted_class_index]
#             total += 1

#             if predicted_class == label:
#                 correct += 1

#             # Print the predicted class
#             print("Predicted class:", predicted_class)

#     accuracy = correct / total
#     print("Accuracy:", accuracy)
#     return accuracy

# # Load the saved model
# model = load_model("dog_breed_inception_model(3).h5")

# class_labels = ['Afghan', 'Border Collie', 'Corgi', 'Coyote', 'Doberman', 'German Sheperd', 'Labradoodle',
#                 'Maltese', 'Pomeranian', 'Pug', 'Rottweiler', 'Saint Bernard', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky']

# test_path = "archive/test"  # Adjust this path based on your directory structure

# # Evaluate accuracy
# accuracy = evaluate_accuracy(model, class_labels, test_path)


# import pandas as pd
# import os

# # Existing CSV file path
# csv_path = 'archive\dogs.csv'

# # Additional breed to add
# new_breed = 'Labrador Retriever'

# # Directory path for the new breed
# new_breed_dir = f'archive/test/{new_breed}'

# # List all files in the new breed directory
# new_breed_filepaths = [f'test/{new_breed}/{filename}' for filename in os.listdir(new_breed_dir)]

# # Create data frame entries for the new breed
# new_breed_entries = pd.DataFrame({'filepaths': new_breed_filepaths, 'labels': new_breed, 'data set': 'test'})

# # Load the existing CSV file
# df = pd.read_csv(csv_path)

# # Append the new entries to the existing data frame
# df = pd.concat([df, new_breed_entries], ignore_index=True)

# # Save the updated data frame to the CSV file
# df.to_csv(csv_path, index=False)




import pandas as pd
from transformers import ViTFeatureExtractor, ViTForImageClassification
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms
import torch
from sklearn.preprocessing import LabelEncoder

# Load CSV file
csv_path = 'archive/dogs.csv'
df = pd.read_csv(csv_path)

# Select breeds and filter dataframes
selected_breeds = ['Afghan', 'Basset', 'Beagle', 'Border Collie', 'Boxer', 'Bulldog', 'Corgi', 'Coyote', 'Doberman',
                   'French Bulldog', 'German Sheperd', 'Labradoodle', 'Labrador Retriever', 'Maltese', 'Newfoundland',
                   'Pit Bull', 'Pomeranian', 'Poodle', 'Pug', 'Rottweiler', 'Saint Bernard', 'Shiba Inu', 'Shih-Tzu',
                   'Siberian Husky', 'Yorkie']

train_df = df[df['data set'] == 'train']
valid_df = df[df['data set'] == 'valid']
test_df = df[df['data set'] == 'test']

train_df = train_df[train_df['labels'].isin(selected_breeds)]
valid_df = valid_df[valid_df['labels'].isin(selected_breeds)]
test_df = test_df[test_df['labels'].isin(selected_breeds)]

# Define custom dataset class
class DogDataset(Dataset):
    def __init__(self, dataframe, feature_extractor, transforms=None):
        self.dataframe = dataframe
        self.feature_extractor = feature_extractor
        self.transforms = transforms

    def __len__(self):
        return len(self.dataframe)

    def __getitem__(self, idx):
        img_path = self.dataframe.iloc[idx]['filepaths']
        label = self.dataframe.iloc[idx]['labels']

        image = self.feature_extractor(images=img_path, return_tensors='pt')['pixel_values'].squeeze(0)

        if self.transforms:
            image = self.transforms(image)

        return {'input_ids': image, 'labels': label}

# Initialize the ViT feature extractor
model_name = "google/vit-base-patch16-224"
feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)

# Create datasets and dataloaders
train_dataset = DogDataset(train_df, feature_extractor)
valid_dataset = DogDataset(valid_df, feature_extractor)
test_dataset = DogDataset(test_df, feature_extractor)

train_loader = DataLoader(train_dataset, batch_size=4, shuffle=True)
valid_loader = DataLoader(valid_dataset, batch_size=4, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=4, shuffle=False)

# Initialize the ViT model
model = ViTForImageClassification.from_pretrained(model_name, num_labels=len(selected_breeds))

# Modify the classifier to match the number of classes
model.classifier = torch.nn.Linear(in_features=model.config.hidden_size, out_features=len(selected_breeds))

# Fine-tuning the ViT model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# Define training parameters and optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
epochs = 3

# Training loop
for epoch in range(epochs):
    model.train()
    for batch in train_loader:
        inputs = batch['input_ids'].to(device)
        labels = LabelEncoder().fit(selected_breeds).transform(batch['labels']).to(device)

        outputs = model(input_ids=inputs, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

    # Validation loop (optional)
    model.eval()
    with torch.no_grad():
        for batch in valid_loader:
            inputs = batch['input_ids'].to(device)
            labels = LabelEncoder().fit(selected_breeds).transform(batch['labels']).to(device)

            outputs = model(input_ids=inputs, labels=labels)
            val_loss = outputs.loss

    print(f"Epoch {epoch + 1}/{epochs}, Training Loss: {loss.item()}, Validation Loss: {val_loss.item()}")

# Save the fine-tuned model
model.save_pretrained("fine_tuned_vit_model")
