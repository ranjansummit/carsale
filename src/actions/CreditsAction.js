import {CreditsActionTypes} from '../actionTypes';

export function generateQr(credit) {
  console.log('credit for generate qr');
  return {
    type: CreditsActionTypes.GENERATE_QR_REQUEST,
    credit,
  };
}

export function confirmQR(qr_code, id) {
  console.log('action', qr_code);
  console.log('id', id);
  return {
    type: CreditsActionTypes.QR_CONFIRM_REQUEST,
    qr_code,
    id,
  };
}

export function submitCode(code) {
  console.log('action manual code type', code);
  return {
    type: CreditsActionTypes.CONFIRM_CODE_REQUEST,
    code,
  };
}

export function resetConfirmCode() {
  return {
    type: CreditsActionTypes.RESET_CONFIRM_CODE,
  };
}

export function esewaProceed(credit) {
  return {
    type: CreditsActionTypes.SAVE_CREDIT,
    credit,
  };
}

export function useCoupon(coupon_code) {
  return {
    type: CreditsActionTypes.USE_COUPON_REQUEST,
    coupon_code,
  };
}

export function resetUseCoupon() {
  return {
    type: CreditsActionTypes.RESET_COUPON_CODE,
  };
}

export function getShops(latitude, longitude) {
  return {
    type: CreditsActionTypes.GET_SHOPS_REQUEST,
    latitude,
    longitude,
  };
}

export function generateProductId(credit, rate) {
  return {
    type: CreditsActionTypes.GENERATE_PRODUCT_ID,
    credit,
    rate,
  };
}

export function resetGenProductId() {
  return {
    type: CreditsActionTypes.RESET_GENERATED_PRODUCTID,
  };
}
