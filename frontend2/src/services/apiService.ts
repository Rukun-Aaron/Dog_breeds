import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/';  // Update with your actual API endpoint

const getPredictions = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}classify`, formData);

    if (response.status === 200) {
      return response.data.predictions || [];
    } else {
      console.error('Error in getPredictions request:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error in getPredictions request:', error);
    return [];
  }
};

export default {
  getPredictions,
};
