import axios from 'axios';

// Add a new product
const createProduct = async (productData) => {
  try {
    const response = await axios.post('http://localhost:2001/products', productData); 
    return response.data; 
  } catch (error) {
    console.error('Error adding product:', error);
    throw error; 
  }
};

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:2001/products'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

// Fetch a single product by ID
const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:2001/products/${productId}`); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error; 
  }
};

// Update an existing product
const updateProduct = async (productId, updatedProductData) => {
  try {
    const response = await axios.put(`http://localhost:2001/products/${productId}`, updatedProductData); 
    return response.data; 
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; 
  }
};

// Delete a product by ID
const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`http://localhost:2001/products/${productId}`); 
    return response.data; 
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
};

export { createProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct };
