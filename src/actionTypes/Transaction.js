/* eslint-disable no-undef */
export default TransactionActionTypes = {
  TRANSACTION_HISTORY_REQUEST: 'transaction_history_request',
  TRANSACTION_HISTORY_SUCCESS: 'transaction_history_success',
  TRANSACTION_HISTORY_FAILURE: 'transaction_history_failure',

  DELETE_TRANSACTION_REQUEST: 'delete_transaction_request',
  DELETE_TRANSACTION_SUCCESS: 'delete_transaction_success',
  DELETE_TRANSACTION_FAILURE: 'delete_transaction_failure',

  // reset delete transaction message for removing alert
  RESET_DELETE_TRANSACTION: 'reset_delete_transaction',
};
