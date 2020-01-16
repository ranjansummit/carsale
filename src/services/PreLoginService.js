/* eslint-disable no-unused-vars */
import {PreloginApi, LoginApi} from './Api';
import Constant from '../components/constant/Constant';

function preloginList() {
  const res = PreloginApi.get('v1/vehicle/prelogin', {
    params: {
      offset: 5,
      limit: 300,
      client_id: 1,
      client_secret: 'JzSUAyr1T6hy43x9X3InoEyMVrxnbryWlRKAP7CV',
    },
  })
    .then(response => {
      console.log('data', response.data);
      return response.data;
    })
    .catch(function(e) {
      // let error = "Network Failed";
      console.log('error', e.response);
      return e.response.data;
    });
  return res;
}

function preloginSearch() {
  const res = PreloginApi.get('v1/vehicles/properties')
    .then(response => {
      //console.log("response1", response.data.data.brands);
      return response.data.data.brands;
    })
    .catch(function(e) {
      let error = 'Network Failed';
      return error;
    });
  return res;
}
// function loginList() {
//   const res = LoginApi.get("v1/vehicles/filter/buy", {
//     params: {
//       offset: 5,
//       limit: 50
//     }
//   })
//     .then(response => {
//       // console.log("login data", response.data.data);
//       return response.data.data;
//     })
//     .catch(function(e) {
//       let error = "Network Failed";
//       return error;
//     });
//   return res;
// }
export const PreLoginService = {
  preloginList,
  // loginList,
  preloginSearch,
};
