import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/';  // Update with your actual API endpoint

export const getPredictions = async (formData) => {
  const classifyResponse = await fetch('http://127.0.0.1:8000/classify', {
          method: 'POST',
          body: formData,
        });
  return classifyResponse;
};

export const getBreedInfo = async(label)=>{
  const getDogInfoResponse   =await fetch(`http://127.0.0.1:8000/get_dog_info?breed=${label}`, {
    method: 'GET', // or 'GET' depending on your API
  });
  return getDogInfoResponse;
  
}
