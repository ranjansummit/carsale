import {LoginApi} from './Api';

function getTransactionList() {
  const res = LoginApi.get('v1/transactions')
    .then(response => {
      console.log('response test', response.data);
      return response.data.data;
    })
    .catch(function(e) {
      // let error = "Network Failed";
      console.log('error', e);
      return e.response;
    });

  return res;
}

function deleteTransaction(id) {
  console.log('transaction id in service', id);

  const res = LoginApi.get('v1/transaction/delete?transaction_id=' + id)
    .then(response => {
      console.log('response test to delete transaction', response.data);
      return response.data;
    })
    .catch(function(e) {
      // let error = "Network Failed";
      console.log('error', e.response.data);
      return e.response.data;
    });

  return res;
}
export const TransactionService = {
  getTransactionList,
  deleteTransaction,
};
