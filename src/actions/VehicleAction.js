import {VehicleActionTypes} from '../actionTypes';

export function publishVehicle(id) {
  console.log('publish vehicle');
  return {
    type: VehicleActionTypes.PUBLISH_VEHICLE_REQUEST,
    id,
  };
}

export function removeDraft(id) {
  console.log('remove vehicle ');
  return {
    type: VehicleActionTypes.REMOVE_VEHICLE_REQUEST,
    id,
  };
}

export function editButtonClicked(val) {
  console.log('edit clicked ', val);
  return {
    type: VehicleActionTypes.EDIT_CLICKED,
    val,
  };
}

export function addButtonClicked(val) {
  console.log('add clicked ');
  return {
    type: VehicleActionTypes.ADD_CLICKED,
    val,
  };
}

export function saveVehicles(
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
) {
  console.log('publish value action', publish);
  return {
    type: VehicleActionTypes.SAVE_VEHICLES_REQUEST,
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
  };
}

export function saveCamVehicles(
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
) {
  console.log('publish value action camera', publish);
  return {
    type: VehicleActionTypes.SAVE_CAM_VEHICLES_REQUEST,
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
  };
}

export function editVehicles(
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
) {
  console.log('publish value action', publish);
  console.log('id value action', id);

  return {
    type: VehicleActionTypes.EDIT_VEHICLES_REQUEST,
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
  };
}

export function editCamVehicles(
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
) {
  console.log('publish value action camera', publish);
  console.log('id value action camera', id);

  return {
    type: VehicleActionTypes.EDIT_CAM_VEHICLES_REQUEST,
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
  };
}

export function editPrice(id, price) {
  console.log('price', price);
  console.log('id', id);
  return {
    type: VehicleActionTypes.EDIT_VEHICLE_PRICE,
    id,
    price,
  };
}

export function searchVehicle(brand, model, price, rating, order) {
  console.log('rating action', rating);
  return {
    type: VehicleActionTypes.SEARCH_VEHICLE_REQUEST,
    brand,
    model,
    price,
    rating,
    order,
  };
}

export function preSearchVehicle(brand, model, price, rating, order) {
  console.log('pre rating action', rating);
  return {
    type: VehicleActionTypes.PRE_SEARCH_VEHICLE_REQUEST,
    brand,
    model,
    price,
    rating,
    order,
  };
}
export function searchOwnVehicle(brand, model, price, rating, order) {
  console.log('rating action', rating);
  return {
    type: VehicleActionTypes.SEARCH_OWN_VEHICLE_REQUEST,
    brand,
    model,
    price,
    rating,
    order,
  };
}
export function markAsSold(id) {
  console.log('mark as sold', id);
  return {
    type: VehicleActionTypes.MARK_AS_SOLD,
    id,
  };
}

export function resetRemoveVehicle() {
  return {
    type: VehicleActionTypes.RESET_DELETE_VEHICLE,
  };
}
export function resetSavedMsg() {
  return {
    type: VehicleActionTypes.RESET_SAVED_MESSAGE,
  };
}
export function resetEditMsg() {
  return {
    type: VehicleActionTypes.RESET_EDITED_MESSAGE,
  };
}
export function resetEditPriceMsg() {
  return {
    type: VehicleActionTypes.RESET_PRICE_MESSAGE,
  };
}

export function resetSearchList() {
  console.log('RESET ');
  return {
    type: VehicleActionTypes.RESET_SEARCH_LIST,
  };
}

export function resetEditClicked() {
  return {
    type: VehicleActionTypes.RESET_EDIT_CLICKED,
  };
}

export function resetAddClicked() {
  return {
    type: VehicleActionTypes.RESET_ADD_CLICKED,
  };
}

export function resetPublish() {
  return {
    type: VehicleActionTypes.RESET_PUBLISH_MESSAGE,
  };
}
