
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Exemple : http://localhost:5000

// Artisans
export const getAllArtisans = () => axios.get(`${API_URL}/api/artisans`);
export const getArtisanById = (id) => axios.get(`${API_URL}/api/artisans/${id}`);
export const getTopArtisans = () => axios.get(`${API_URL}/api/artisans/top`);
export const getArtisansByCategory = (category) =>
  axios.get(`${API_URL}/api/artisans/category/${category}`);
export const searchArtisan = (name) =>
  axios.get(`${API_URL}/api/artisans/search?name=${name}`);
export const contactArtisan = (data) =>
  axios.post(`${API_URL}/api/artisans/contact`, data);

// Menu catégories
export const getMenuCategories = () => axios.get(`${API_URL}/api/menu`);
