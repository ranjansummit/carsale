import {ProfileActionTypes} from '../actionTypes';

export function getProfile() {
  console.log('get profile');
  return {
    type: ProfileActionTypes.GET_PROFILE_REQUEST,
  };
}

export function registerUser(
  name,
  email,
  mobile_number,
  password,
  confirm_password,
) {
  return {
    type: ProfileActionTypes.REGISTER_USER_REQUEST,
    name,
    email,
    mobile_number,
    password,
    confirm_password,
  };
}

export function verification(code, email, mobile) {
  console.log('mobile number', mobile);
  return {
    type: ProfileActionTypes.VERIFY_USER_REQUEST,
    code,
    email,
    mobile,
  };
}

export function resend_verification(email, mobile) {
  return {
    type: ProfileActionTypes.RESEND_VERIFICATION_REQUEST,
    email,
    mobile,
  };
}

export function saveMobile(email, mobile) {
  console.log('mobile number', mobile);
  return {
    type: ProfileActionTypes.SAVE_MOBILE_NUMBER,
    email,
    mobile,
  };
}

export function changePassword(name, password, confirm_password) {
  return {
    type: ProfileActionTypes.CHANGE_PASSWORD_REQUEST,
    name,
    password,
    confirm_password,
  };
}
export function resetChangePassword() {
  return {
    type: ProfileActionTypes.RESET_CHANGE_PASSWORD,
  };
}
export function resetError() {
  console.log('RESET REGISTRATION MESSAGE');
  return {
    type: ProfileActionTypes.RESET_ERROR_MESSAGE,
  };
}

export function sendFeedback(name, email, content) {
  return {
    type: ProfileActionTypes.SEND_FEEDBACK_REQUEST,
    name,
    email,
    content,
  };
}

export function resetFeedback() {
  return {
    type: ProfileActionTypes.RESET_FEEDBACK,
  };
}

export function forgotPw(email, mobile) {
  console.log('email', email);
  console.log('mobile', mobile);
  return {
    type: ProfileActionTypes.FORGOT_PASSWORD_REQUEST,
    email,
    mobile,
  };
}

export function resetForgotPw() {
  return {
    type: ProfileActionTypes.RESET_FORGOT_PASSWORD,
  };
}
// to save email for forgot  pw
export function textSave(text) {
  return {
    type: ProfileActionTypes.SAVE_TEXT,
    text,
  };
}
//reset password incase of forgot password in login section
export function resetPassword(email, mobile, code, password, confirm_password) {
  return {
    type: ProfileActionTypes.RESET_PASSWORD_REQUEST,
    email,
    mobile,
    code,
    password,
    confirm_password,
  };
}

export function resetPasswordReset() {
  return {
    type: ProfileActionTypes.RESET_PASSWORD_MESSAGE,
  };
}
//save profile image
export function saveUserImage(image_source) {
  return {
    type: ProfileActionTypes.SAVE_USER_IMAGE,
    image_source,
  };
}

export function resetUserProfile() {
  return {
    type: ProfileActionTypes.RESET_SAVE_USER_IMAGE,
  };
}

export function resetProfile() {
  return {
    type: ProfileActionTypes.RESET_PROFILE,
  };
}
