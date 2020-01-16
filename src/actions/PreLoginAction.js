import {PreLoginActionTypes} from '../actionTypes';

export function preloginlist() {
  // console.log("hello");
  return {
    type: PreLoginActionTypes.PRE_LOGIN_LIST_REQUEST,
  };
}

export function prelogindetails(
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
  // seller_image
  preloginDetails,
) {
  console.log('action hit?');
  return {
    type: PreLoginActionTypes.PRE_LIST_DETAILS_REQUEST,
    // front_side_image: front_side_image,
    // back_side_image,
    // left_side_image,
    // right_side_image,
    // model_name,
    // engine_capacity,
    // rating: rating,
    // lot,
    // odometer,
    // mileage,
    // price,
    // wish_count,
    // seller_image
    preloginDetails,
  };
}

export function preloginsearch() {
  return {
    type: PreLoginActionTypes.PRE_LOGIN_SEARCH_REQUEST,
  };
}

export function modellist(models) {
  // console.log("action", models);
  return {
    type: PreLoginActionTypes.MODEL_LIST_REQUEST,
    models: models,
  };
}

export function engine(engines) {
  console.log('action', engines);
  return {
    type: PreLoginActionTypes.ENGINE_LIST_REQUEST,
    engines: engines,
  };
}
