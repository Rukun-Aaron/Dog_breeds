import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Dog Image for Classification</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Select image:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify'}
        </button>
      </form>
      {prediction && (
        <p>
          Predicted breed: <strong>{prediction.label}</strong>
          {prediction.score && ` with confidence: ${prediction.score * 100}%`}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
