// src/config/api.js

import axios from 'axios';

// Define your base URL
const BASE_URL = 'https://contents.trinity-metals.com/wp-json/wp/v2/';  

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,  
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    
    if (response.status === 404) {
        // Explicitly throw an error if the status is 404
        throw new Error(`Resource not found for endpoint: ${endpoint}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Re-throw the error so the calling function can catch it
    throw error; 
  }
};

export default api;