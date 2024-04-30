import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
} from '../Types/Orders';

const initialStateOrders = {
  orders: [],
  loading: false,
  error: null,
};

const ordersReducer = (state = initialStateOrders, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id
            ? { ...order, ...action.payload.updatedOrderData }
            : order
        ),
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload),
      };
    default:
      return state;
  }
};

export default ordersReducer;
