import axios from 'axios';

// Create a new customer
const createCustomer = async (customerData) => {
  try {
    const response = await axios.post('http://localhost:2001/customers', customerData); 
    return response.data; 
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error; 
  }
};

// Fetch all customers
const fetchCustomers = async () => {
  try {
    const response = await axios.get('http://localhost:2001/customers'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; 
  }
};

// Fetch a single customer by ID
const fetchCustomerById = async (customerId) => {
  try {
    const response = await axios.get(`http://localhost:2001/customers/${customerId}`); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    throw error; 
  }
};

// Update an existing customer by ID
const updateCustomer = async (customerId, updatedCustomerData) => {
  try {
    const response = await axios.put(`http://localhost:2001/customers/${customerId}`, updatedCustomerData); 
    return response.data; 
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error; 
  }
};

// Delete a customer by ID
const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`http://localhost:2001/customers/${customerId}`); 
    return response.data; 
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error; 
  }
};

export { createCustomer, fetchCustomers, fetchCustomerById, updateCustomer, deleteCustomer };
