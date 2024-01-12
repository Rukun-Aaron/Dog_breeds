// script.js
async function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const predictionContainer = document.getElementById('prediction');
    const uploadedImage = document.getElementById('uploadedImage');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    // Display the uploaded image
    const reader = new FileReader();
    reader.onload = function (e) {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = 'block'; // Show the image element
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8000/classify', {
            method: 'POST',
            body: formData,
        });

        const jsonData = await response.json();
        const predictions = jsonData;
        // console.log(jsonData);
        if (predictions) {

            
            const label = predictions.label;
            const score = predictions.score;
            // console.log(predictions);
            // Update the HTML element with the prediction
            predictionContainer.innerText = `Prediction: ${label} (Score: ${score})`;
        } else {
            console.error('No predictions found');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        predictionContainer.innerText = 'Error uploading image.';
    }
}
