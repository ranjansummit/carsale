/* eslint-disable no-unused-vars */
import {LoginApi, RegistrationApi, PreloginApi, SaveVehicleApi} from './Api';
import axios from 'axios';

function getprofile() {
  const res = LoginApi.get('v1/profile')
    .then(response => {
      console.log('response of profile details', response.data);
      return response.data;
    })
    .catch(function(e) {
      //   let error_msg = e.response.data.message;
      // Alert.alert(error_msg);
      //   return e.response.data;
      return e;
    });
  return res;
}

function registerUser(formData) {
  console.log('formdata in service', formData);
  const res = RegistrationApi.post('v1/users', formData)
    .then(response => {
      console.log('response of user registration', response.data);
      return response.data;
    })
    .catch(function(e) {
      //   return e.response.data;
      console.log('error', e.response.data);
      return e.response.data;
    });
  return res;
}

//remaining
function verifyUser(formData) {
  const res = RegistrationApi.post('v1/users/activate', formData)
    .then(response => {
      console.log('response of user verification', response.data);
      return response.data;
    })
    .catch(function(e) {
      //   return e.response.data;
      console.log('error while verification', e.response.data);
      return e.response.data;
    });

  return res;
}

function changePassword(formData) {
  console.log('formdata for change pw', formData);
  const res = LoginApi.post('v1/profile/edit', formData)
    .then(response => {
      console.log('response of change password', response.data);
      return response.data;
    })
    .catch(function(e) {
      //   return e.response.data;
      console.log('error while verification', e.response.data);
      return e.response.data;
    });
  return res;
}

function resendCode(formData) {
  const res = RegistrationApi.post('v1/resend/code', formData)
    .then(response => {
      console.log('response of resend verification code', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error while resend verification code', e.response.data);
      return e.response.data;
    });

  return res;
}
function sendFeedback(formData) {
  const res = LoginApi.post('v1/feedback', formData)
    .then(response => {
      console.log('response of sending feedback', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error while sending feedback', e.response.data);
      return e.response.data;
    });

  return res;
}
function forgotPassword(formData) {
  const res = RegistrationApi.post('v1/forget/password', formData)
    .then(response => {
      console.log('forgot password response', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error from forgot password call', e.response.data);
      return e.response.data;
    });

  return res;
}
function resetPassword(formData) {
  const res = RegistrationApi.post('v1/change/password', formData)
    .then(response => {
      console.log('reset password response', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error from reset password call', e.response.data);
      return e.response.data;
    });

  return res;
}

function saveUserImage(formData) {
  console.log('save user image in service', formData);
  const res = SaveVehicleApi.post('v1/user/image', formData)
    .then(response => {
      console.log('save user image response', response.data);
      // return response.data.error;
      return response.data;
    })
    .catch(function(e) {
      console.log('error save user image', e.response);
      return e.response.data;
    });
  return res;
}
export const ProfileService = {
  getprofile,
  registerUser,
  verifyUser,
  resendCode,
  changePassword,
  sendFeedback,
  forgotPassword,
  resetPassword,
  saveUserImage,
};
