import {TransactionActionTypes} from '../actionTypes';

export function getTransactionList() {
  console.log('transaction list');
  return {
    type: TransactionActionTypes.TRANSACTION_HISTORY_REQUEST,
  };
}

export function deleteTransaction(id) {
  console.log('transaction id action');
  return {
    type: TransactionActionTypes.DELETE_TRANSACTION_REQUEST,
    id,
  };
}

export function resetDeleteTransaction() {
  return {
    type: TransactionActionTypes.RESET_DELETE_TRANSACTION,
  };
}
