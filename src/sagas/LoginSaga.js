import {LoginActionTypes} from '../actionTypes';
import {LoginService} from '../services/LoginService';
import {take, call, put} from 'redux-saga/effects';

// export function* watchLoginList() {
//   while (true) {
//     const { offset, limit } = yield take(LoginActionTypes.LOGIN_LIST_REQUEST);
//     console.log("saga limit", limit);
//     // const params = {
//     //   offset: offset,
//     //   limit: limit
//     // };
//     const list = yield call(LoginService.loginList, offset, limit);
//     // console.log("after login", list);
//     if (list) {
//       yield put({
//         type: LoginActionTypes.LOGIN_LIST_SUCCESS,
//         login_list: list.data,
//         list: list,
//         loading: false
//       });
//     } else {
//       yield put({
//         type: LoginActionTypes.LOGIN_LIST_FAILURE,
//         error: error,
//         loading: false
//       });
//     }
//   }
// }

export function* watchUserLogin() {
  while (true) {
    const {formdata} = yield take(LoginActionTypes.LOGIN_REQUEST);
    console.log('formdata', formdata);
    const data = yield call(LoginService.userLogin, formdata);
    if (data.error === true) {
      yield put({
        type: LoginActionTypes.LOGIN_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: LoginActionTypes.LOGIN_SUCCESS,
        data: data,
        loading: false,
        // isRefreshing: false
      });
    }
    // if (data) {
    //   yield put({
    //     type: LoginActionTypes.LOGIN_SUCCESS,
    //     data: data,
    //     loading: false,
    //     // isRefreshing: false
    //   });
    // } else {
    //   yield put({
    //     type: LoginActionTypes.LOGIN_FAILURE,
    //     error: data,
    //     loading: false,
    //     // isRefreshing: false
    //   });
    // }
  }
}

export function* watchGetAppSettings() {
  while (true) {
    yield take(LoginActionTypes.GET_APP_SETTINGS);

    const list = yield call(LoginService.getAppSettings);
    if (list.error === true) {
      yield put({
        type: LoginActionTypes.APP_SETTINGS_FAILURE,
        error: list.data,
        loading: false,
      });
    } else {
      yield put({
        type: LoginActionTypes.APP_SETTINGS_SUCCESS,
        data: list.data,
        loading: false,
      });
    }
  }
}

export function* watchLoginList() {
  while (true) {
    yield take(LoginActionTypes.LOGIN_LIST_REQUEST);

    const list = yield call(LoginService.loginList);
    if (list) {
      yield put({
        type: LoginActionTypes.LOGIN_LIST_SUCCESS,
        login_list: list.data,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: LoginActionTypes.LOGIN_LIST_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchLoginDetails() {
  while (true) {
    const {detailList} = yield take(LoginActionTypes.LIST_DETAILS_REQUEST);
    yield put({
      type: LoginActionTypes.LIST_DETAILS_SUCCESS,
      list: detailList,
      loading: false,
    });
  }
}

export function* watchSellDetails() {
  while (true) {
    const {detailList} = yield take(LoginActionTypes.SELL_DETAILS_REQUEST);
    console.log('sell details', detailList);
    yield put({
      type: LoginActionTypes.SELL_DETAILS_SUCCESS,
      list: detailList,
      loading: false,
    });
  }
}
export function* watchNotifySeller() {
  while (true) {
    const {vehicle_id} = yield take(LoginActionTypes.NOTIFY_SELLER_REQUEST);
    // console.log("sagaid", vehicle_id);
    // const payload = {
    //   vehicle_id
    // };
    const message = yield call(LoginService.notifySeller, vehicle_id);
    // console.log("data", message);
    if (message) {
      yield put({
        type: LoginActionTypes.NOTIFY_SELLER_SUCCESS,
        data: message,
        loading: false,
        // isRefreshing: false
      });
    } else {
      yield put({
        type: LoginActionTypes.NOTIFY_SELLER_FAILURE,
        error: message,
        loading: false,
        // isRefreshing: false
      });
    }
  }
}

export function* watchAddWish() {
  while (true) {
    const {id} = yield take(LoginActionTypes.ON_LIKE_REQUEST);
    const message = yield call(LoginService.addWish, id);
    // console.log("data", message);
    yield put({
      type: LoginActionTypes.ON_LIKE_SUCCESS,
      data: message,
      loading: false,
    });
  }
}
export function* watchRemoveWish() {
  while (true) {
    const {id} = yield take(LoginActionTypes.ON_DISLIKE_REQUEST);
    // console.log("sagaid", vehicle_id);
    // const payload = {
    //   vehicle_id
    // };
    const message = yield call(LoginService.removeWish, id);
    console.log('data', message);
    yield put({
      type: LoginActionTypes.ON_DISLIKE_SUCCESS,
      data: message,
      loading: false,
    });
  }
}
export function* watchSellList() {
  while (true) {
    yield take(LoginActionTypes.SELL_LIST_REQUEST);
    const list = yield call(LoginService.sellList);
    // console.log("wish saga", list);
    if (list) {
      yield put({
        type: LoginActionTypes.SELL_LIST_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: LoginActionTypes.SELL_LIST_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchGetWish() {
  while (true) {
    yield take(LoginActionTypes.GET_WISH_REQUEST);
    const list = yield call(LoginService.getWish);
    // console.log("after login", list);
    if (list) {
      yield put({
        type: LoginActionTypes.GET_WISH_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: LoginActionTypes.GET_WISH_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchAddFirst() {
  while (true) {
    const {
      brandid,
      brandname,
      modelid,
      modelname,
      engineid,
      capacity,
      mileage,
    } = yield take(LoginActionTypes.FIRST_ADD_REQUEST);
    console.log('1ST ADD', brandid);
    yield put({
      type: LoginActionTypes.FIRST_ADD_SUCCESS,
      brandid: brandid,
      brandname: brandname,
      modelid: modelid,
      modelname: modelname,
      engineid: engineid,
      capacity: capacity,
      mileage: mileage,
      loading: false,
    });
  }
}

export function* watchAddSecond() {
  while (true) {
    const {lot, odometer, price, rating} = yield take(
      LoginActionTypes.SECOND_ADD_REQUEST,
    );
    // console.log("2ND ADD", lot);
    yield put({
      type: LoginActionTypes.SECOND_ADD_SUCCESS,
      lot: lot,
      odometer: odometer,
      price: price,
      rating: rating,
      loading: false,
    });
  }
}

//take photo buttons
export function* watchFirstImage() {
  while (true) {
    const {value, camStatus} = yield take(LoginActionTypes.FOR_FIRST_IMAGE);
    console.log('Save button value', camStatus);
    yield put({
      type: LoginActionTypes.FOR_FIRST_IMAGE,
      data: value,
      status: camStatus,
      loading: false,
    });
  }
}

export function* watchSecondImage() {
  while (true) {
    const {value, camStatus} = yield take(LoginActionTypes.FOR_SECOND_IMAGE);
    console.log('Save image saga', value);
    yield put({
      type: LoginActionTypes.FOR_SECOND_IMAGE,
      data: value,
      status: camStatus,
      loading: false,
    });
  }
}

export function* watchThirdImage() {
  while (true) {
    const {value, camStatus} = yield take(LoginActionTypes.FOR_THIRD_IMAGE);
    console.log('Save image saga', value);
    yield put({
      type: LoginActionTypes.FOR_THIRD_IMAGE,
      data: value,
      status: camStatus,
      loading: false,
    });
  }
}

export function* watchFourthImage() {
  while (true) {
    const {value, camStatus} = yield take(LoginActionTypes.FOR_FOURTH_IMAGE);
    console.log('Save image saga', value);
    yield put({
      type: LoginActionTypes.FOR_FOURTH_IMAGE,
      data: value,
      status: camStatus,
      loading: false,
    });
  }
}

export function* watchSellerInfo() {
  while (true) {
    const {id} = yield take(LoginActionTypes.SELLER_INFO_REQUEST);
    const list = yield call(LoginService.sellerInfo, id);
    if (list) {
      yield put({
        type: LoginActionTypes.SELLER_INFO_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: LoginActionTypes.SELLER_INFO_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchEditFirst() {
  console.log('reached?');
  while (true) {
    let {
      brandid,
      brandname,
      modelid,
      modelname,
      engineid,
      capacity,
      mileage,
    } = yield take(LoginActionTypes.FIRST_EDIT_REQUEST);
    console.log('1ST EDIT', brandid);
    yield put({
      type: LoginActionTypes.FIRST_EDIT_SUCCESS,
      brand_id: brandid,
      brand_name: brandname,
      model_id: modelid,
      model_name: modelname,
      engine_id: engineid,
      engine_capacity: capacity,
      mileage_val: mileage,
      loading: false,
    });
  }
}

export function* watchEditSecond() {
  while (true) {
    let {lot, odometer, price, rating} = yield take(
      LoginActionTypes.SECOND_EDIT_REQUEST,
    );
    console.log('2ND EDIT', lot);
    yield put({
      type: LoginActionTypes.SECOND_EDIT_SUCCESS,
      lot: lot,
      odometer: odometer,
      price: price,
      rating: rating,
      loading: false,
    });
  }
}
