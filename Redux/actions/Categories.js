import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from '../Types/Categories';


export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const updateCategory = (_id, updatedCategoryData) => ({
  type: UPDATE_CATEGORY,
  payload: { _id, updatedCategoryData },
});

export const deleteCategory = (_id) => ({
  type: DELETE_CATEGORY,
  payload: _id,
});