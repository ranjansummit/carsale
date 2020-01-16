import {CreditsActionTypes} from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  //save credit after 1st proceed in esewa
  save_credit: '',
  generated_QR: '',
  confrim_QR_result: '',
  confirm_QR_data: '',
  confirm_qr_error: '',
  //when manual code is entered
  confirm_code: '',
  confirm_code_result: '',
  confirm_code_error: '',
  //use coupon
  coupon_code_success: '',
  coupon_code_success_msg: '',
  coupon_code_error: '',
  coupon_code_error_msg: '',
  //shops for buying credits
  shop_data: [],
  product_id: '',
  generate_product_id_msg: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CreditsActionTypes.SAVE_CREDIT:
      return {
        ...state,
        save_credit: action.credit,
        loading: false,
      };
    case CreditsActionTypes.GENERATE_QR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CreditsActionTypes.GENERATE_QR_SUCCESS:
      return {
        ...state,
        loading: false,
        generated_QR: action.data,
      };
    case CreditsActionTypes.GENERATE_QR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CreditsActionTypes.QR_CONFIRM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CreditsActionTypes.QR_CONFIRM_SUCCESS:
      return {
        ...state,
        loading: false,
        confrim_QR_result: action.data.error,
        confirm_QR_data: action.data.data,
      };
    case CreditsActionTypes.QR_CONFIRM_FAILURE:
      return {
        ...state,
        loading: false,
        confirm_qr_error: action.error.error,
      };
    case CreditsActionTypes.CONFIRM_CODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CreditsActionTypes.CONFIRM_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        confirm_code: action.data.data,
        confirm_code_result: action.data.error,
      };
    case CreditsActionTypes.CONFIRM_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        confirm_code_error: action.error,
      };

    case CreditsActionTypes.RESET_CONFIRM_CODE:
      return {
        ...state,
        loading: false,
        confirm_code_error: '',
        confirm_code: '',
        confirm_code_result: '',
        confrim_QR_result: '',
        confirm_QR_data: '',
        confirm_qr_error: '',
      };
    case CreditsActionTypes.USE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CreditsActionTypes.USE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupon_code_success: action.data.error,
        coupon_code_success_msg: action.data.message,
      };
    case CreditsActionTypes.USE_COUPON_FAILURE:
      return {
        ...state,
        loading: false,
        coupon_code_error: action.error.error,
        coupon_code_error_msg: action.error.message,
      };

    case CreditsActionTypes.RESET_COUPON_CODE:
      return {
        ...state,
        loading: false,
        coupon_code_success: '',
        coupon_code_success_msg: '',
        coupon_code_error: '',
        coupon_code_error_msg: '',
      };

    case CreditsActionTypes.GET_SHOPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CreditsActionTypes.GET_SHOPS_SUCCESS:
      return {
        ...state,
        loading: false,
        shop_data: action.data,
      };
    case CreditsActionTypes.GET_SHOPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CreditsActionTypes.GENERATE_PRODUCT_ID:
      return {
        ...state,
        loading: true,
      };
    case CreditsActionTypes.PRODUCT_ID_GENERATED:
      return {
        ...state,
        loading: false,
        generate_product_id_msg: action.data.error,
        product_id: action.data.data,
      };
    case CreditsActionTypes.PRODUCT_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CreditsActionTypes.RESET_GENERATED_PRODUCTID:
      return {
        ...state,
        generate_product_id_msg: '',
        product_id: '',
      };
    default:
      return state;
  }
};
