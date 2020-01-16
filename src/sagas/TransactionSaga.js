import {TransactionActionTypes} from '../actionTypes';
import {TransactionService} from '../services/TransactionService';
import {take, call, put} from 'redux-saga/effects';

export function* watchTransactionlist() {
  while (true) {
    yield take(TransactionActionTypes.TRANSACTION_HISTORY_REQUEST);
    const list = yield call(TransactionService.getTransactionList);
    if (list) {
      yield put({
        type: TransactionActionTypes.TRANSACTION_HISTORY_SUCCESS,
        list: list,
        loading: false,
      });
    }
    // else {
    //   yield put({
    //     type: TransactionActionTypes.TRANSACTION_HISTORY_FAILURE,
    //     error: error,
    //     loading: false,
    //   });
    // }
  }
}

export function* watchDeleteTransaction() {
  while (true) {
    const {id} = yield take(TransactionActionTypes.DELETE_TRANSACTION_REQUEST);
    const data = yield call(TransactionService.deleteTransaction, id);
    console.log('response in saga', data);
    if (data.error === true) {
      yield put({
        type: TransactionActionTypes.DELETE_TRANSACTION_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: TransactionActionTypes.DELETE_TRANSACTION_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}
