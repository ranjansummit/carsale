/* eslint-disable no-unused-vars */
import {TransactionActionTypes} from '../actionTypes';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  loading: false,
  transaction_list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionActionTypes.TRANSACTION_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TransactionActionTypes.TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction_list: action.list,
      };
    case TransactionActionTypes.TRANSACTION_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case TransactionActionTypes.DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TransactionActionTypes.DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction_delete_success: action.data.error,
      };
    case TransactionActionTypes.DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        transaction_delete_error: action.error.error,
      };
    case TransactionActionTypes.RESET_DELETE_TRANSACTION:
      return {
        ...state,
        loading: false,
        transaction_delete_error: null,
        transaction_delete_success: null,
      };
    default:
      return state;
  }
};
