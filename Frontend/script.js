// script.js
async function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const predictionContainer = document.getElementById('prediction');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8000/classify', {
            method: 'POST',
            body: formData,
        });

        const jsonData = await response.json();

const predictions = jsonData.predictions;

if (predictions && predictions.length > 0) {
    const firstPrediction = predictions[0];
    
    const label = firstPrediction.label;
    const score = firstPrediction.score;

    // Update the HTML element with the prediction
    const predictionContainer = document.getElementById('prediction');
    predictionContainer.innerText = `Prediction: ${label} (Score: ${score})`;
} else {
    console.error('No predictions found');
}
    } catch (error) {
        console.error('Error uploading image:', error);
        predictionContainer.innerText = 'Error uploading image.';
    }
}
