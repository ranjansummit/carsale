import {CreditsActionTypes} from '../actionTypes';
import {take, call, put} from 'redux-saga/effects';
import {CreditsService} from '../services/CreditsService';

export function* watchSaveCredit() {
  while (true) {
    const {credit} = yield take(CreditsActionTypes.SAVE_CREDIT);
    console.log('save credit value', credit);
    yield put({
      type: CreditsActionTypes.SAVE_CREDIT,
      credit: credit,
      loading: false,
    });
  }
}

export function* watchGenerateQR() {
  while (true) {
    const {credit} = yield take(CreditsActionTypes.GENERATE_QR_REQUEST);
    let formData = new FormData();
    formData.append('credit', credit.toString());
    console.log('Save camera image saga', formData);
    const data = yield call(CreditsService.generateQr, formData);
    console.log('response of request qr in saga', data);
    if (data.error === true) {
      yield put({
        type: CreditsActionTypes.GENERATE_QR_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: CreditsActionTypes.GENERATE_QR_SUCCESS,
        data: data,
        loading: false,
        // isRefreshing: false
      });
    }
  }
}

export function* watchConfirmQR() {
  while (true) {
    const {qr_code, id} = yield take(CreditsActionTypes.QR_CONFIRM_REQUEST);
    console.log('qr code in saga', qr_code);
    console.log('code in saga', id);

    const data = yield call(CreditsService.confirmQr, qr_code, id);
    console.log('response of request qr in saga', data);
    if (data.error === false) {
      yield put({
        type: CreditsActionTypes.QR_CONFIRM_SUCCESS,
        data: data,
        loading: false,
      });
    } else {
      yield put({
        type: CreditsActionTypes.QR_CONFIRM_FAILURE,
        error: data,
        loading: false,
        // isRefreshing: false
      });
    }
  }
}

export function* watchConfirmCode() {
  while (true) {
    const {code} = yield take(CreditsActionTypes.CONFIRM_CODE_REQUEST);
    console.log('4 digit code in saga', code);
    formData = new FormData();
    formData.append('via_code', code.toString());
    const data = yield call(CreditsService.confirmCode, formData);
    console.log('response of request qr code confirm in saga', data);
    if (data.error === true) {
      yield put({
        type: CreditsActionTypes.CONFIRM_CODE_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: CreditsActionTypes.CONFIRM_CODE_SUCCESS,
        data: data,
        loading: false,
        // isRefreshing: false
      });
    }
  }
}

export function* watchUseCoupon() {
  while (true) {
    const {coupon_code} = yield take(CreditsActionTypes.USE_COUPON_REQUEST);
    formData = new FormData();
    formData.append('coupon', coupon_code);
    const data = yield call(CreditsService.useCoupon, formData);
    console.log('response of request qr code confirm in saga', data);
    if (data.error === true) {
      yield put({
        type: CreditsActionTypes.USE_COUPON_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: CreditsActionTypes.USE_COUPON_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchGetShops() {
  while (true) {
    const {latitude, longitude} = yield take(
      CreditsActionTypes.GET_SHOPS_REQUEST,
    );
    // formData = new FormData();
    // formData.append('coupon', coupon_code);
    const params = {
      latitude,
      longitude,
    };
    const data = yield call(CreditsService.getShops, params);
    console.log('response of request qr code confirm in saga', data);
    if (data.error === true) {
      yield put({
        type: CreditsActionTypes.GET_SHOPS_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: CreditsActionTypes.GET_SHOPS_SUCCESS,
        data: data.data,
        loading: false,
      });
    }
  }
}

export function* watchGenerateProductId() {
  while (true) {
    const {credit, rate} = yield take(CreditsActionTypes.GENERATE_PRODUCT_ID);
    // formData = new FormData();
    // formData.append('coupon', coupon_code);
    const params = {
      credit,
      rate,
    };
    const data = yield call(CreditsService.genProdId, params);
    console.log('response of request qr code confirm in saga', data);
    if (data.error === true) {
      yield put({
        type: CreditsActionTypes.PRODUCT_ID_FAILED,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: CreditsActionTypes.PRODUCT_ID_GENERATED,
        data: data,
        loading: false,
      });
    }
  }
}
