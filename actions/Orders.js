import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
} from '../Types/Orders';

export const fetchOrdersRequest = () => ({
  type: FETCH_ORDERS_REQUEST,
});

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const updateOrder = (_id, updatedOrderData) => ({
  type: UPDATE_ORDER,
  payload: { _id, updatedOrderData },
});

export const deleteOrder = (_id) => ({
  type: DELETE_ORDER,
  payload: _id,
});