/* eslint-disable no-unused-vars */
import {LoginApi, RegistrationApi, PreloginApi} from './Api';
import axios from 'axios';

function generateQr(formData) {
  const res = LoginApi.post('v1/qr-codes', formData)
    .then(response => {
      console.log('generate qr response', response.data);
      return response.data.data;
    })
    .catch(function(e) {
      console.log('error from qr generator', e.response.data);
      return e.response.data;
    });
  return res;
}

function confirmQr(qr_code, id) {
  console.log('params code service', qr_code);
  console.log('params id', id);
  const code = qr_code.toString();

  const res = LoginApi.put('v1/qr-codes/' + code + '?id=' + id)
    .then(response => {
      console.log('confirm qr response', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error from confirm qr ', e.response.data);
      return e.response.data;
    });
  return res;
}

function confirmCode(formData) {
  console.log('formdata', formData);
  const res = LoginApi.post('v1/via-code', formData)
    .then(response => {
      console.log('confirm qr response', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error from confirm qr ', e.response.data);
      return e.response.data;
    });
  return res;
}

function useCoupon(formData) {
  console.log('formdata', formData);
  const res = LoginApi.post('v1/user/coupon', formData)
    .then(response => {
      console.log('confirm coupon response', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error from coupon ', e.response.data);
      return e.response.data;
    });
  return res;
}

function getShops(data) {
  // console.log('params', params);
  console.log('params', data.latitude);
  const res = LoginApi.get('v1/shops', {
    params: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
  })
    .then(response => {
      console.log('shops location', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('error from shops location ', e.response.data);
      return e.response.data;
    });
  return res;
}

function genProdId(data) {
  // console.log('params', params);
  console.log('params', data.credit);
  const res = LoginApi.get('v1/gen-productid', {
    params: {
      credit: data.credit,
      rate: data.rate,
    },
  })
    .then(response => {
      console.log('product id generating response', response.data);
      return response.data;
    })
    .catch(function(e) {
      console.log('product id generating failure ', e.response.data);
      return e.response.data;
    });
  return res;
}
export const CreditsService = {
  generateQr,
  confirmQr,
  confirmCode,
  useCoupon,
  getShops,
  genProdId,
};
