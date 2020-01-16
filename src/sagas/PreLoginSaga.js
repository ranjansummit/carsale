import {PreLoginActionTypes} from '../actionTypes';
import {PreLoginService} from '../services/PreLoginService';
import {take, call, put} from 'redux-saga/effects';

export function* watchPreLoginList() {
  while (true) {
    yield take(PreLoginActionTypes.PRE_LOGIN_LIST_REQUEST);
    const list = yield call(PreLoginService.preloginList);
    console.log('lis', list);
    if (list.error === false) {
      yield put({
        type: PreLoginActionTypes.PRE_LOGIN_LIST_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: PreLoginActionTypes.PRE_LOGIN_LIST_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchPreLoginDetails() {
  while (true) {
    const {
      // front_side_image,
      // back_side_image,
      // left_side_image,
      // right_side_image,
      // model_name,
      // engine_capacity,
      // rating,
      // lot,
      // odometer,
      // mileage,
      // price,
      // wish_count,
      // seller_image,
      // seller_name,
      // id,
      // is_request_sent
      preloginDetails,
    } = yield take(PreLoginActionTypes.PRE_LIST_DETAILS_REQUEST);
    console.log('pre details test', preloginDetails);
    yield put({
      type: PreLoginActionTypes.PRE_LIST_DETAILS_SUCCESS,
      // front_side_image: front_side_image,
      // back_side_image: back_side_image,
      // left_side_image: left_side_image,
      // right_side_image: right_side_image,
      // model_name: model_name,
      // engine_capacity: engine_capacity,
      // rating: rating,
      // lot: lot,
      // odometer: odometer,
      // mileage: mileage,
      // price: price,
      // wish_count: wish_count,
      // seller_image: seller_image,
      // seller_name: seller_name,
      // id: id,
      // is_request_sent: is_request_sent,
      list: preloginDetails,
      loading: false,
    });
  }
}

// export function* watchLoginList() {
//   while (true) {
//     yield take(PreLoginActionTypes.LOGIN_LIST_REQUEST);
//     const list = yield call(PreLoginService.loginList);
//     console.log("after login", list);
//     if (list) {
//       yield put({
//         type: PreLoginActionTypes.LOGIN_LIST_SUCCESS,
//         list: list,
//         loading: false
//       });
//     } else {
//       yield put({
//         type: PreLoginActionTypes.LOGIN_LIST_FAILURE,
//         error: error,
//         loading: false
//       });
//     }
//   }
// }

export function* watchPreLoginSearch() {
  while (true) {
    yield take(PreLoginActionTypes.PRE_LOGIN_SEARCH_REQUEST);
    const list = yield call(PreLoginService.preloginSearch);
    // console.log("lis", list);
    if (list) {
      yield put({
        type: PreLoginActionTypes.PRE_LOGIN_SEARCH_SUCCESS,
        list: list,
        loading: true,
      });
    } else {
      yield put({
        type: PreLoginActionTypes.PRE_LOGIN_SEARCH_FAILURE,
        error: list,
        loading: false,
      });
    }
  }
}

export function* watchModelList() {
  while (true) {
    const {models} = yield take(PreLoginActionTypes.MODEL_LIST_REQUEST);
    // console.log("MODEL NAME", models);
    yield put({
      type: PreLoginActionTypes.MODEL_LIST_SUCCESS,
      models: models,
      loading: false,
    });
  }
}

export function* watchEngineList() {
  while (true) {
    const {engines} = yield take(PreLoginActionTypes.ENGINE_LIST_REQUEST);
    console.log('Engine name', engines);
    yield put({
      type: PreLoginActionTypes.ENGINE_LIST_SUCCESS,
      engines: engines,
      loading: false,
    });
  }
}
