/* eslint-disable no-unused-vars */
import {LoginApi, PreloginApi} from './Api';
import {Alert} from 'react-native';
import Storage from '../components/storage/Storage';
import {Actions} from 'react-native-router-flux';
// function loginList(offset, limit) {
//   console.log("service offset", offset);
//   const res = LoginApi.get("v1/vehicles/filter/buy", {
//     params: {
//       offset: offset,
//       limit: limit
//     }
//   })
//     .then(response => {
//       // console.log("login data", response.data.data);
//       return response.data;
//       // return response.data.data;
//     })
//     .catch(function(e) {
//       let error = "Network Failed";
//       return error;
//     });
//   return res;
// }
function userLogin(formdata) {
  const res = PreloginApi.post('v1/users/token', formdata)
    .then(response => {
      console.log('login req', response.data);
      var strr = response.data.data;
      Storage.settokenType(strr.token_type);
      Storage.savebearer(strr.access_token);
      Storage.setLogedin('1');
      Storage.setCredit(strr.available_credit);
      Storage.setemail(strr.email);
      Storage.setfacebook(strr.facebook);
      Storage.setImage(strr.image);
      Storage.setMobile(strr.mobile);
      Storage.setname(strr.name);
      Storage.setMode(strr.promotion_mode);
      Storage.setLatitude(strr.latitude);
      Storage.setLongitude(strr.longitude);
      Storage.setLogedin('1');

      Promise.resolve(Storage.getLoggedin()).then(function(value) {
        console.log('rantest valuesss', value);
        if (value === '1') {
          return Actions.loggedinBuy();
        }
      });
      return response.data;
    })
    .catch(function(e) {
      console.log('error while login', e.response);
      return e.response.data;
    });
  return res;
}

function loginList() {
  const res = LoginApi.get('v1/vehicles/filter/buy', {
    params: {
      offset: 0,
      limit: 200,
    },
  })
    .then(response => {
      // console.log("login data", response.data.data);
      return response.data;
      // return response.data.data;
    })
    .catch(function(e) {
      let error = 'Network Failed';
      return error;
    });
  return res;
}
function notifySeller(vehicle_id) {
  let formdata = new FormData();
  formdata.append('vehicle_id', vehicle_id);
  // console.log("payload", formdata);
  const res = LoginApi.post('v1/notify-seller', formdata)
    .then(response => {
      console.log('response test', response.data.message);
      Alert.alert(
        'Seller will be notified of your interest to purchase this bike.',
      );
      return response.data.error;
    })
    .catch(function(e) {
      let error_msg = e.response.data.message;
      // Alert.alert(error_msg);
      return e.response.data.error;
    });

  return res;
}

function addWish(id) {
  const res = LoginApi.get('v1/wishlist/add/' + id)
    .then(response => {
      console.log('response test', response.data);

      return response.data.error;
    })
    .catch(function(e) {
      // let error_msg = e.response.data;
      return e.response;
    });

  return res;
}

function removeWish(id) {
  const res = LoginApi.get('v1/wishlist/remove/' + id)
    .then(response => {
      console.log('response test remove', response.data);
      // return response.data.error;
      return response.data;
    })
    .catch(function(e) {
      // let error_msg = e.response.data;
      return e.response;
    });

  return res;
}
function sellList() {
  const res = LoginApi.get('v1/vehicles/filter/sell', {
    params: {
      offset: 0,
      limit: 200,
    },
  })
    .then(response => {
      // console.log("sell data", response.data.data);
      return response.data.data;
    })
    .catch(function(e) {
      let error = 'Network Failed';
      return error;
    });
  return res;
}
function getWish() {
  const res = LoginApi.get('v1/vehicles/filter/wishlist', {
    params: {
      offset: 0,
      limit: 50,
    },
  })
    .then(response => {
      console.log('wish data', response.data);
      return response.data.data;
    })
    .catch(function(e) {
      // let error = "Network Failed";
      console.log('error', e);
      return e;
    });
  return res;
}

// function publishvehicle(id) {
//   let formdata = new FormData();
//   formdata.append("vehicle_id", id);
//   // console.log("payload", formdata);
//   const res = LoginApi.post("v1/publish", formdata)
//     .then(response => {
//       console.log("response test", response.data.message);
//       return response.data.error;
//     })
//     .catch(function(e) {
//       let error_msg = e.response.data.message;
//       // Alert.alert(error_msg);
//       return e.response.data.error;
//     });

//   return res;
// }

function sellerInfo(id) {
  const res = LoginApi.get('v1/notification/seller-info/' + id)
    .then(response => {
      console.log('response test seller info', response.data.data);
      return response.data.data;
    })
    .catch(function(e) {
      // let error_msg = e.response.data;
      return e.response;
    });

  return res;
}

function getAppSettings() {
  const res = LoginApi.get('v1/app/setting')
    .then(response => {
      // console.log("login data", response.data.data);
      return response.data;
      // return response.data.data;
    })
    .catch(function(e) {
      console.log('error', e.response.data);
      return error;
    });
  return res;
}
export const LoginService = {
  userLogin,
  loginList,
  notifySeller,
  addWish,
  removeWish,
  sellList,
  getWish,
  // publishvehicle,
  sellerInfo,
  getAppSettings,
};
