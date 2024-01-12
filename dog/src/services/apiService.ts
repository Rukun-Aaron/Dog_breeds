import axios from 'axios';
import { Prediction } from '../model/Prediction';

let apiUrl = 'http://127.0.0.1:8000/';

export const getPredictions = (formData: FormData) => axios.post<Prediction[]>(`${apiUrl}classify2`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
    },
  });