import {LoginActionTypes} from '../actionTypes';

// export function loginlist(offset, limit) {
//   console.log("offset", offset);
//   return {
//     type: LoginActionTypes.LOGIN_LIST_REQUEST,
//     offset,
//     limit
//   };
// }

export function userLogin(formdata) {
  return {
    type: LoginActionTypes.LOGIN_REQUEST,
    formdata,
  };
}

export function getAppSettings() {
  return {
    type: LoginActionTypes.GET_APP_SETTINGS,
  };
}
export function loginlist() {
  return {
    type: LoginActionTypes.LOGIN_LIST_REQUEST,
  };
}
export function logindetails(detailList) {
  console.log('actionn', detailList);
  return {
    type: LoginActionTypes.LIST_DETAILS_REQUEST,
    detailList,
  };
}
//only for sell details
export function selldetails(detailList) {
  // console.log("actionn", detailList);
  return {
    type: LoginActionTypes.SELL_DETAILS_REQUEST,
    detailList,
  };
}
export function notifySeller(vehicle_id) {
  // console.log("Action id", vehicle_id);
  return {
    type: LoginActionTypes.NOTIFY_SELLER_REQUEST,
    vehicle_id,
  };
}
export function addWish(id) {
  // console.log("Action add id", id);
  return {
    type: LoginActionTypes.ON_LIKE_REQUEST,
    id,
  };
}

export function removeWish(id) {
  // console.log("Action remove id", id);
  return {
    type: LoginActionTypes.ON_DISLIKE_REQUEST,
    id,
  };
}

export function sellList() {
  // console.log("sell List");
  return {
    type: LoginActionTypes.SELL_LIST_REQUEST,
  };
}

export function getwish() {
  // console.log("wish??");
  return {
    type: LoginActionTypes.GET_WISH_REQUEST,
  };
}

export function firstAdd(
  brandid,
  brandname,
  modelid,
  modelname,
  engineid,
  capacity,
  mileage,
) {
  // console.log("first add", modelid);
  return {
    type: LoginActionTypes.FIRST_ADD_REQUEST,
    brandid,
    brandname,
    modelid,
    modelname,
    engineid,
    capacity,
    mileage,
  };
}

export function secondAdd(lot, odometer, price, rating) {
  // console.log("second add");
  return {
    type: LoginActionTypes.SECOND_ADD_REQUEST,
    lot,
    odometer,
    price,
    rating,
  };
}

// FOR OPENNG CAMERA UNIQUELY
export function firstimage(value, camStatus) {
  // console.log("boolean1");
  return {
    type: LoginActionTypes.FOR_FIRST_IMAGE,
    value,
    camStatus,
  };
}

export function secondimage(value, camStatus) {
  // console.log("boolean2");
  return {
    type: LoginActionTypes.FOR_SECOND_IMAGE,
    value,
    camStatus,
  };
}

export function thirdimage(value, camStatus) {
  console.log('boolean3');
  return {
    type: LoginActionTypes.FOR_THIRD_IMAGE,
    value,
    camStatus,
  };
}

export function fourthimage(value, camStatus) {
  console.log('boolean4');
  return {
    type: LoginActionTypes.FOR_FOURTH_IMAGE,
    value,
    camStatus,
  };
}

export function getSellerInfo(id) {
  console.log('Action seller info  id', id);
  return {
    type: LoginActionTypes.SELLER_INFO_REQUEST,
    id,
  };
}

//edit functionalities

export function firstEdit(
  brandid,
  brandname,
  modelid,
  modelname,
  engineid,
  capacity,
  mileage,
) {
  console.log('brand id non edit', brandid);
  console.log('first edit', mileage);
  return {
    type: LoginActionTypes.FIRST_EDIT_REQUEST,
    brandid,
    brandname,
    modelid,
    modelname,
    engineid,
    capacity,
    mileage,
  };
}

export function secondEdit(lot, odometer, price, rating) {
  console.log('second edit', odometer);
  return {
    type: LoginActionTypes.SECOND_EDIT_REQUEST,
    lot,
    odometer,
    price,
    rating,
  };
}

export function resetData() {
  console.log('reset');
  return {
    type: LoginActionTypes.RESET_DATA,
  };
}

export function resetDetailList() {
  console.log('reset detail list');
  return {
    type: LoginActionTypes.RESET_DETAIL_LIST,
  };
}

// export function resetWishMsg() {
//   return {
//     type: LoginActionTypes.RESET_LIKE,
//   };
// }

export function resetWishMsg() {
  console.log('reset wish message');
  return {
    type: LoginActionTypes.RESET_WISH_MESSAGE,
  };
}
//reset wish message "Removed from wishlist"
export function resetWish() {
  console.log('reset wish message');
  return {
    type: LoginActionTypes.RESET_WISH,
  };
}
export function resetButtons() {
  return {
    type: LoginActionTypes.RESET_BUTTONS,
  };
}
// export function resetSellData() {
//   console.log("reset sell list");
//   return {
//     type: LoginActionTypes.RESET_SELL_LIST
//   };
// }

export function resetCamStatus() {
  console.log('CAM RESET');
  return {
    type: LoginActionTypes.RESET_CAM_STATUS,
  };
}

//reset login error msg
export function resetLoginInfo() {
  return {
    type: LoginActionTypes.RESET_LOGIN_INFO,
  };
}
