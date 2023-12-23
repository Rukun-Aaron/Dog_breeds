// src/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // Reset previous prediction and confidence
    setPrediction('');
    setConfidence('');
    setImageURL('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/classify', formData);
      const { predictions } = response.data;

      if (predictions && predictions.length > 0) {
        const firstPrediction = predictions[0];
        setPrediction(firstPrediction.label);
        setConfidence(firstPrediction.score.toFixed(2)); // Assuming score is a float
        setImageURL(URL.createObjectURL(file)); // Create URL for the uploaded image
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {imageURL && (
        <div>
          <img src={imageURL} alt="Uploaded Dog" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Prediction: {prediction}</p>
          <p>Confidence: {confidence}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
