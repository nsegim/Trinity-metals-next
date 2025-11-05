// src/config/api.js

import axios from 'axios';

// Define your base URL
const BASE_URL = 'https://contents.trinity-metals.com/wp-json/wp/v2/';  // Replace with your actual API base URL

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,  // Use your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also create API-specific functions here, for example:
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);  // Replace '/endpoint' with your actual endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default api;