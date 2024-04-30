import axios from 'axios';

// Create a new category
const createCategory = async (categoryData) => {
  try {
    const response = await axios.post('http://localhost:2001/categories', categoryData); 
    return response.data; 
  } catch (error) {
    console.error('Error creating category:', error);
    throw error; 
  }
};

// Fetch all categories
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:2001/categories'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; 
  }
};

// Fetch a single category by ID
const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`http://localhost:2001/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};

// Update an existing category by ID
const updateCategory = async (categoryId, updatedCategoryData) => {
  try {
    const response = await axios.put(`http://localhost:2001/categories/${categoryId}`, updatedCategoryData); 
    return response.data; 
  } catch (error) {
    console.error('Error updating category:', error);
    throw error; 
  }
};

// Delete a category by ID
const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`http://localhost:2001/categories/${categoryId}`); 
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error; 
  }
};

export { createCategory, fetchCategories, updateCategory, deleteCategory, fetchCategoryById };
