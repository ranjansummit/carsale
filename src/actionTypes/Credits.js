/* eslint-disable no-undef */
export default CreditsActionTypes = {
  GENERATE_QR_REQUEST: 'generate_qr_request',
  GENERATE_QR_SUCCESS: 'generate_qr_success',
  GENERATE_QR_FAILURE: 'generate_qr_failure',

  QR_CONFIRM_REQUEST: 'qr_confirm_request',
  QR_CONFIRM_SUCCESS: 'qr_confirm_success',
  QR_CONFIRM_FAILURE: 'qr_confirm_failure',

  CONFIRM_CODE_REQUEST: 'confirm_code_request',
  CONFIRM_CODE_SUCCESS: 'confirm_code_success',
  CONFIRM_CODE_FAILURE: 'confirm_code_failure',

  RESET_CONFIRM_CODE: 'reset_confirm_code',

  SAVE_CREDIT: 'save_credit',

  USE_COUPON_REQUEST: 'use_coupon_request',
  USE_COUPON_SUCCESS: 'use_coupon_success',
  USE_COUPON_FAILURE: 'use_coupon_failure',

  RESET_COUPON_CODE: 'reset_coupon_code',

  GET_SHOPS_REQUEST: 'get_shops_request',
  GET_SHOPS_SUCCESS: 'get_shops_success',
  GET_SHOPS_FAILURE: 'get_shops_failure',

  GENERATE_PRODUCT_ID: 'generate_product_id',
  PRODUCT_ID_GENERATED: 'product_id_generated',
  PRODUCT_ID_FAILED: 'product_id_failed',

  RESET_GENERATED_PRODUCTID: 'reset_generated_productid',
};
