import {ProfileActionTypes} from '../actionTypes';
import {ProfileService} from '../services/ProfileService';
import {take, call, put} from 'redux-saga/effects';
import Constant from '../components/constant/Constant';

export function* watchProfileDetails() {
  while (true) {
    yield take(ProfileActionTypes.GET_PROFILE_REQUEST);
    const list = yield call(ProfileService.getprofile);
    console.log('profile detail in saga', list);
    if (list) {
      yield put({
        type: ProfileActionTypes.GET_PROFILE_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.GET_PROFILE_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchRegisterUser() {
  while (true) {
    const {name, email, mobile_number, password, confirm_password} = yield take(
      ProfileActionTypes.REGISTER_USER_REQUEST,
    );

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile_number);
    formData.append('password', password);
    formData.append('password_confirmation', confirm_password);
    formData.append('client_id', Constant.ClientID.toString());
    formData.append('client_secret', Constant.ClientSecret);
    console.log('form data for user registration', formData);
    const data = yield call(ProfileService.registerUser, formData);
    console.log('user registration', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.REGISTER_USER_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.REGISTER_USER_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchVerifyUser() {
  while (true) {
    const {code, email, mobile} = yield take(
      ProfileActionTypes.VERIFY_USER_REQUEST,
    );

    let formData = new FormData();
    formData.append('enable_code', code);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('client_id', Constant.ClientID.toString());
    formData.append('client_secret', Constant.ClientSecret);
    console.log('form data for user verification', formData);
    const data = yield call(ProfileService.verifyUser, formData);
    console.log('user verification', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.VERIFY_USER_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.VERIFY_USER_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchResendCode() {
  while (true) {
    const {email, mobile} = yield take(
      ProfileActionTypes.RESEND_VERIFICATION_REQUEST,
    );

    let formData = new FormData();
    formData.append('email', email);
    formData.append('mobile', mobile);

    console.log('form data for user verification', formData);
    const data = yield call(ProfileService.resendCode, formData);
    console.log('resend user verification code', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.RESEND_VERIFICATION_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.RESEND_VERIFICATION_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchPasswordChange() {
  while (true) {
    const {name, password, confirm_password} = yield take(
      ProfileActionTypes.CHANGE_PASSWORD_REQUEST,
    );

    let formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('password_confirmation', confirm_password);
    console.log('form data for change pw', formData);
    const data = yield call(ProfileService.changePassword, formData);
    console.log('change pw', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.CHANGE_PASSWORD_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.CHANGE_PASSWORD_SUCCESS,
        data: data.message,
        loading: false,
      });
    }
  }
}

export function* watchSaveMobile() {
  while (true) {
    const {email, mobile} = yield take(ProfileActionTypes.SAVE_MOBILE_NUMBER);
    console.log('mobile number in saga', mobile);
    yield put({
      type: ProfileActionTypes.SAVE_MOBILE_NUMBER,
      email: email,
      mobile: mobile,
    });
  }
}

export function* watchSendFeedback() {
  while (true) {
    const {name, email, content} = yield take(
      ProfileActionTypes.SEND_FEEDBACK_REQUEST,
    );

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('content', content);
    console.log('form data for change pw', formData);
    const data = yield call(ProfileService.sendFeedback, formData);
    console.log('feed response', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.SEND_FEEDBACK_FAILURE,
        error: data.error,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.SEND_FEEDBACK_SUCCESS,
        data: data.message,
        loading: false,
      });
    }
  }
}

export function* watchForgotPassword() {
  while (true) {
    const {email, mobile} = yield take(
      ProfileActionTypes.FORGOT_PASSWORD_REQUEST,
    );

    let formData = new FormData();

    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('client_id', Constant.ClientID.toString());
    formData.append('client_secret', Constant.ClientSecret);
    console.log('form data for change pw', formData);
    const data = yield call(ProfileService.forgotPassword, formData);
    console.log('forgot password response', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.FORGOT_PASSWORD_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.FORGOT_PASSWORD_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchResetPassword() {
  while (true) {
    const {email, mobile, code, password, confirm_password} = yield take(
      ProfileActionTypes.RESET_PASSWORD_REQUEST,
    );

    let formData = new FormData();

    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('reset_code', code);
    formData.append('password', password);
    formData.append('password_confirmation', confirm_password);
    formData.append('client_id', Constant.ClientID.toString());
    formData.append('client_secret', Constant.ClientSecret);
    console.log('form data for reset pw', formData);
    const data = yield call(ProfileService.resetPassword, formData);
    console.log('reset password response', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.RESET_PASSWORD_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.RESET_PASSWORD_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchSaveText() {
  while (true) {
    const {text} = yield take(ProfileActionTypes.SAVE_TEXT);
    yield put({
      type: ProfileActionTypes.SAVE_TEXT,
      text: text,
    });
  }
}

export function* watchSaveUserImage() {
  while (true) {
    const {image_source} = yield take(ProfileActionTypes.SAVE_USER_IMAGE);

    let formData = new FormData();
    formData.append('image', {
      type: image_source.type,
      name: image_source.name,
      uri: image_source.uri,
    });
    console.log('saving user image', formData);
    const data = yield call(ProfileService.saveUserImage, formData);
    console.log('response after saving user image', data);
    if (data.error === true) {
      yield put({
        type: ProfileActionTypes.SAVE_USER_IMAGE_FAILURE,
        error: data,
        loading: false,
      });
    } else {
      yield put({
        type: ProfileActionTypes.SAVE_USER_IMAGE_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}
