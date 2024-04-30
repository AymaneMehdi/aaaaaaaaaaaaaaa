import { createStore, applyMiddleware, combineReducers } from 'redux'; // Import combineReducers correctly
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";
import ProductsReducer from './reducers/Products';
import CategoriesReducer from './reducers/Categories'; 
import OrdersReducer from './reducers/Orders';

const rootReducer = combineReducers({
  Products: ProductsReducer,
  Categories: CategoriesReducer,
  Orders: OrdersReducer, 
});

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
); 

export default store;