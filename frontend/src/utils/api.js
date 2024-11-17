import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use 3005 as fallback
});

console.log(process.env);
console.log("Axios baseURL:", process.env.REACT_APP_API_BASE_URL);

// Add the Authorization token and default headers to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  req.headers["Content-Type"] =
    req.headers["Content-Type"] || "application/json"; // Default Content-Type
  return req;
});

// Global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

// CRUD operations for products
export const fetchProducts = async (page) => {
  try {
    const response = await API.get(`/products?page=${page}`);
    console.log("API Response:", response.data); // Debug API response
    return response;
  } catch (error) {
    console.error("Error in fetchProducts API call:", error);
    throw error;
  }
};

export const fetchProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) =>
  API.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" }, // Override default for multipart
  });
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }, // Override default for multipart
  });
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// User authentication
export const login = (data) => API.post("/users/login", data);
export const signUp = (data) => API.post("/users/signup", data);
