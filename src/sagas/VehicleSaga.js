/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {VehicleActionTypes} from '../actionTypes';
import {VehicleService} from '../services/VehicleService';
import {take, call, put} from 'redux-saga/effects';

export function* watchPublishVehicle() {
  while (true) {
    const {id} = yield take(VehicleActionTypes.PUBLISH_VEHICLE_REQUEST);
    console.log('publish vehicle saga', id);
    const data = yield call(VehicleService.publishvehicle, id);
    // console.log("after login", list);
    if (data.error === true) {
      yield put({
        type: VehicleActionTypes.PUBLISH_VEHICLE_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.PUBLISH_VEHICLE_SUCCESS,
        message: data,
        loading: false,
      });
    }
  }
}

export function* watchRemoveVehicle() {
  while (true) {
    const {id} = yield take(VehicleActionTypes.REMOVE_VEHICLE_REQUEST);
    console.log('remove vehicle saga', id);
    const data = yield call(VehicleService.removevehicle, id);
    // console.log("after login", list);
    if (data) {
      yield put({
        type: VehicleActionTypes.REMOVE_VEHICLE_SUCCESS,
        message: data,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.REMOVE_VEHICLE_FAILURE,
        error: data,
        loading: false,
      });
    }
  }
}

export function* watchEditClicked() {
  while (true) {
    const {val} = yield take(VehicleActionTypes.EDIT_CLICKED);
    console.log('edit clicked saga', val);
    yield put({
      type: VehicleActionTypes.EDIT_CLICKED,
      val: val,
      loading: false,
    });
  }
}

export function* watchSaveVehicles() {
  while (true) {
    const {
      brandid,
      modelid,
      engineid,
      mileage,
      lot,
      odometer,
      price,
      rating,
      publish,
      imguri1,
      imgtype1,
      imgname1,
      imguri2,
      imgtype2,
      imgname2,
      imguri3,
      imgtype3,
      imgname3,
      imguri4,
      imgtype4,
      imgname4,
    } = yield take(VehicleActionTypes.SAVE_VEHICLES_REQUEST);
    console.log('save vehicle saga', publish);
    let formData = new FormData();
    formData.append('brand_id', brandid);
    formData.append('model_id', modelid);
    formData.append('engine_id', engineid);
    formData.append('mileage', mileage);
    formData.append('lot', lot);
    formData.append('odometer', odometer);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('publish', publish);
    formData.append('front_side_image', {
      type: imgtype1,
      name: imgname1,
      uri: imguri1,
    });
    formData.append('left_side_image', {
      type: imgtype2,
      name: imgname2,
      uri: imguri2,
    });

    formData.append('right_side_image', {
      type: imgtype3,
      name: imgname3,
      uri: imguri3,
    });

    formData.append('back_side_image', {
      type: imgtype4,
      name: imgname4,
      uri: imguri4,
    });
    console.log('formdata in saga', formData);
    const data = yield call(VehicleService.saveVehicles, formData);
    console.log('saga data with gallery ', data);
    if (data.error === true) {
      yield put({
        type: VehicleActionTypes.SAVE_VEHICLES_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.SAVE_VEHICLES_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

export function* watchSaveCamVehicles() {
  while (true) {
    const {
      brandid,
      modelid,
      engineid,
      mileage,
      lot,
      odometer,
      price,
      rating,
      publish,
      camuri1,
      camdata1,
      camuri2,
      camdata2,
      camuri3,
      camdata3,
      camuri4,
      camdata4,
    } = yield take(VehicleActionTypes.SAVE_CAM_VEHICLES_REQUEST);
    console.log('save vehicle saga', publish);
    let formData = new FormData();
    formData.append('brand_id', brandid);
    formData.append('model_id', modelid);
    formData.append('engine_id', engineid);
    formData.append('mileage', mileage);
    formData.append('lot', lot);
    formData.append('odometer', odometer);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('publish', publish);
    formData.append('front_side_image', {
      uri: camuri1,
      type: 'image/jpg',
      name: 'front_side_image.jpg',
    });
    formData.append('left_side_image', {
      uri: camuri2,
      type: 'image/jpg',
      name: 'left_side_image.jpg',
    });

    formData.append('right_side_image', {
      uri: camuri3,
      type: 'image/jpg',
      name: 'right_side_image.jpg',
    });

    formData.append('back_side_image', {
      uri: camuri4,
      type: 'image/jpg',
      name: 'back_side_image.jpg',
    });
    console.log('formdata in saga', formData);
    const data = yield call(VehicleService.saveVehicles, formData);
    console.log('saga data with cam image', data);
    if (data.error === true) {
      yield put({
        type: VehicleActionTypes.SAVE_CAM_VEHICLES_FAILURE,
        error: data.message,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.SAVE_CAM_VEHICLES_SUCCESS,
        data: data,
        loading: false,
      });
    }
  }
}

//edits

export function* watchEditVehicles() {
  while (true) {
    const {
      brandid,
      modelid,
      engineid,
      mileage,
      lot,
      odometer,
      price,
      rating,
      publish,
      imguri1,
      imgtype1,
      imgname1,
      imguri2,
      imgtype2,
      imgname2,
      imguri3,
      imgtype3,
      imgname3,
      imguri4,
      imgtype4,
      imgname4,
      id,
    } = yield take(VehicleActionTypes.EDIT_VEHICLES_REQUEST);
    console.log('save vehicle saga', publish);
    let formData = new FormData();
    formData.append('brand_id', brandid);
    formData.append('model_id', modelid);
    formData.append('engine_id', engineid);
    formData.append('mileage', mileage);
    formData.append('lot', lot);
    formData.append('odometer', odometer);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('publish', publish);
    formData.append('front_side_image', {
      type: imgtype1,
      name: imgname1,
      uri: imguri1,
    });
    formData.append('left_side_image', {
      type: imgtype2,
      name: imgname2,
      uri: imguri2,
    });

    formData.append('right_side_image', {
      type: imgtype3,
      name: imgname3,
      uri: imguri3,
    });

    formData.append('back_side_image', {
      type: imgtype4,
      name: imgname4,
      uri: imguri4,
    });
    formData.append('id', id);
    console.log('formdata in saga', formData);
    const data = yield call(VehicleService.saveVehicles, formData);
    console.log('saga data edit response', data);
    if (data) {
      yield put({
        type: VehicleActionTypes.EDIT_VEHICLES_SUCCESS,
        data: data,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.EDIT_VEHICLES_FAILURE,
        error: data,
        loading: false,
      });
    }
  }
}

export function* watchEditCamVehicles() {
  while (true) {
    const {
      brandid,
      modelid,
      engineid,
      mileage,
      lot,
      odometer,
      price,
      rating,
      publish,
      camuri1,
      camdata1,
      camuri2,
      camdata2,
      camuri3,
      camdata3,
      camuri4,
      camdata4,
      id,
    } = yield take(VehicleActionTypes.EDIT_CAM_VEHICLES_REQUEST);
    console.log('save vehicle saga', publish);
    let formData = new FormData();
    formData.append('brand_id', brandid);
    formData.append('model_id', modelid);
    formData.append('engine_id', engineid);
    formData.append('mileage', mileage);
    formData.append('lot', lot);
    formData.append('odometer', odometer);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('publish', publish);
    formData.append('front_side_image', {
      uri: camuri1,
      type: 'image/jpg',
      name: 'front_side_image.jpg',
      // data: camdata1,
    });
    formData.append('left_side_image', {
      uri: camuri2,
      type: 'image/jpg',
      name: 'left_side_image.jpg',

      // data: camdata2
    });

    formData.append('right_side_image', {
      uri: camuri3,
      type: 'image/jpg',
      // data: camdata3
      name: 'right_side_image.jpg',
    });

    formData.append('back_side_image', {
      uri: camuri4,
      type: 'image/jpg',
      name: 'back_side_image.jpg',

      // data: camdata4
    });
    formData.append('id', id);

    console.log('formdata in saga', formData);
    const data = yield call(VehicleService.saveVehicles, formData);
    console.log('saga data camera edit response', data);
    if (data) {
      yield put({
        type: VehicleActionTypes.EDIT_CAM_VEHICLES_SUCCESS,
        data: data,
        loading: false,
      });
    }
    //  else {
    //   yield put({
    //     type: VehicleActionTypes.EDIT_CAM_VEHICLES_FAILURE,
    //     // error: data,
    //     loading: false
    //   });
    // }
  }
}
export function* watchEditVehiclePrice() {
  while (true) {
    const {id, price} = yield take(VehicleActionTypes.EDIT_VEHICLE_PRICE);
    // console.log("edit vehicle price saga", id);
    let formData = new FormData();
    formData.append('id', id);
    formData.append('price', price);
    console.log('formdata', formData);
    const data = yield call(VehicleService.editVehiclePrice, formData);
    // console.log("after login", list);
    if (data) {
      yield put({
        type: VehicleActionTypes.EDIT_VEHICLE_PRICE_SUCCESS,
        data: data,
        loading: false,
      });
    }
    // else {
    //   yield put({
    //     type: VehicleActionTypes.EDIT_VEHICLE_PRICE_FAILURE,
    //     error: data,
    //     loading: false
    //   });
    // }
  }
}
export function* watchSearchVehicle() {
  while (true) {
    const {brand, model, price, rating, order} = yield take(
      VehicleActionTypes.SEARCH_VEHICLE_REQUEST,
    );
    // console.log("brand", brand);
    // console.log("model", model);
    // console.log("price", price);
    // console.log("rating", rating);
    // console.log("order", order);
    const list = yield call(
      VehicleService.searchVehicle,
      brand,
      model,
      price,
      rating,
      order,
    );
    console.log('list', list);
    if (list) {
      yield put({
        type: VehicleActionTypes.SEARCH_VEHICLE_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.SEARCH_VEHICLE_FAILURE,
        error: data,
        loading: false,
      });
    }
  }
}

export function* watchPreSearchVehicle() {
  while (true) {
    const {brand, model, price, rating, order} = yield take(
      VehicleActionTypes.PRE_SEARCH_VEHICLE_REQUEST,
    );
    // console.log("brand", brand);
    // console.log("model", model);
    // console.log("price", price);
    // console.log("rating", rating);
    // console.log("order", order);s
    const list = yield call(
      VehicleService.presearchVehicle,
      brand,
      model,
      price,
      rating,
      order,
    );
    console.log('pre search list', list);
    if (list.error === false) {
      yield put({
        type: VehicleActionTypes.PRE_SEARCH_VEHICLE_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.PRE_SEARCH_VEHICLE_FAILURE,
        error: list.error,
        loading: false,
      });
    }
  }
}
export function* watchSearchOwnVehicle() {
  while (true) {
    const {brand, model, price, rating, order} = yield take(
      VehicleActionTypes.SEARCH_OWN_VEHICLE_REQUEST,
    );
    // console.log("brand", brand);
    // console.log("model", model);
    // console.log("price", price);
    // console.log("rating", rating);
    // console.log("order", order);
    const list = yield call(
      VehicleService.searchOwnVehicle,
      brand,
      model,
      price,
      rating,
      order,
    );
    console.log('own searchlist ', list);
    if (list) {
      yield put({
        type: VehicleActionTypes.SEARCH_OWN_VEHICLE_SUCCESS,
        list: list,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.SEARCH_OWN_VEHICLE_REQUEST,
        error: data,
        loading: false,
      });
    }
  }
}
export function* watchMarkAsSold() {
  while (true) {
    const {id} = yield take(VehicleActionTypes.MARK_AS_SOLD);
    console.log('mark sold saga', id);
    const data = yield call(VehicleService.markedSoldService, id);
    // console.log("after login", list);
    if (data) {
      yield put({
        type: VehicleActionTypes.MARK_AS_SOLD_SUCCESS,
        message: data,
        loading: false,
      });
    } else {
      yield put({
        type: VehicleActionTypes.MARK_AS_SOLD_FAILURE,
        error: data,
        loading: false,
      });
    }
  }
}
