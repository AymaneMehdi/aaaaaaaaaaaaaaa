import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../Types/Products.js';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProduct = (_id, updatedProductData) => ({
  type: UPDATE_PRODUCT,
  payload: { _id, updatedProductData },
});

export const deleteProduct = (_id) => ({
  type: DELETE_PRODUCT,
  payload: _id,
});
