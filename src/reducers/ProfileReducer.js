import {ProfileActionTypes} from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  profile_details: [],
  profile_image: '',
  profile_name: '',
  profile_email: '',
  profile_number: '',
  profile_purchase_credits: '',
  profile_credits: null,
  profile_listings: '',
  //register response catch
  registered_userData: '',
  register_msg: '',
  //end
  mobile: '',
  email: '',
  //verify user success
  verify_success_msg: '',
  verify_success_error: '',
  //verify user failure
  verify_error: '',
  verify_error_msg: '',
  //end
  resend_code_error: '',
  resend_code_msg: '',
  resend_fail: '',
  password_change: '',
  password_change_error: '',
  feedback_res: '',
  passwordReset: '',

  //change pw in case of forgot pw
  resetPassword: '',
  resetPassword_error: '',
  //save email or mobile for forgot pw
  text: '',
  profile_saved: '',
  profile_save_failed: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile_details: action.list.data,
        profile_image: action.list.data.image,
        profile_name: action.list.data.name,
        profile_email: action.list.data.email,
        profile_number: action.list.data.mobile,
        profile_purchase_credits: action.list.data.purchased_credit,
        profile_credits: action.list.data.available_credit,
        profile_listings: action.list.data.number_of_listings,
      };
    case ProfileActionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ProfileActionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        registered_userData: action.data.data,
        register_msg: action.data.error,
        loading: false,
      };
    case ProfileActionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ProfileActionTypes.VERIFY_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.VERIFY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        verify_success_msg: action.data.message,
        verify_success_error: action.data.error,
      };
    case ProfileActionTypes.VERIFY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        verify_error: action.error.error,
        verify_error_msg: action.error.message,
      };
    case ProfileActionTypes.RESEND_VERIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.RESEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        resend_code_msg: action.data.message,
        resend_code_error: action.data.error,
        loading: false,
      };
    case ProfileActionTypes.RESEND_VERIFICATION_FAILURE:
      return {
        ...state,
        resend_fail: action.error,
        loading: false,
      };
    case ProfileActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password_change: action.data,
        loading: false,
      };
    case ProfileActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        password_change_error: action.error,
        loading: false,
      };
    case ProfileActionTypes.RESET_CHANGE_PASSWORD:
      return {
        ...state,
        password_change: null,
        password_change_error: null,
        loading: false,
      };
    case ProfileActionTypes.SAVE_MOBILE_NUMBER:
      return {
        ...state,
        email: action.email,
        mobile: action.mobile,
      };
    case ProfileActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        error: null,

        register_msg: null,

        verify_success_msg: null,
        verify_success_error: null,
        verify_error: null,
        verify_error_msg: null,

        resend_code_error: null,
        resend_code_msg: null,
        resend_fail: null,
        loading: false,
      };
    case ProfileActionTypes.SEND_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.SEND_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedback_res: action.data,
      };
    case ProfileActionTypes.SEND_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ProfileActionTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordReset: action.data.error,
      };
    case ProfileActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ProfileActionTypes.RESET_FEEDBACK:
      return {
        ...state,
        feedback_res: null,
        error: null,
      };
    case ProfileActionTypes.RESET_FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        passwordReset: null,
      };

    case ProfileActionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPassword: action.data.error,
      };
    case ProfileActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        resetPassword_error: action.error,
      };
    case ProfileActionTypes.SAVE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ProfileActionTypes.RESET_PASSWORD_MESSAGE:
      return {
        ...state,
        resetPassword: null,
        resetPassword_error: null,
      };
    case ProfileActionTypes.SAVE_USER_IMAGE:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.SAVE_USER_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile_saved: action.data.error,
      };
    case ProfileActionTypes.SAVE_USER_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        profile_save_failed: action.error.error,
      };
    case ProfileActionTypes.RESET_SAVE_USER_IMAGE:
      return {
        ...state,
        loading: false,
        profile_save_failed: null,
        profile_saved: null,
      };
    case ProfileActionTypes.RESET_PROFILE:
      return {
        ...state,
        loading: false,
        profile_details: null,
        profile_image: null,
        profile_name: null,
        profile_email: null,
        profile_number: null,
        profile_purchase_credits: null,
        profile_credits: null,
        profile_listings: null,
      };
    default:
      return state;
  }
};
