import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // Replace with your own API
});

export default api;
