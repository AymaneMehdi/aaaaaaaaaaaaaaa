import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from '../Types/Categories';

const initialStateCategories = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state = initialStateCategories, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id === action.payload._id
            ? { ...category, ...action.payload.updatedCategoryData }
            : category
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload),
      };
    default:
      return state;
  }
};

export default categoriesReducer;
