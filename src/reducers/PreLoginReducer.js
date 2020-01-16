import {PreLoginActionTypes} from '../actionTypes';

// import { ListView } from "react-native";

const INITIAL_STATE = {
  loading: false,

  error: '',
  //prelogin list in buy
  preloginList: [],
  //prelogin details
  // front_side_image: "",
  // back_side_image: "",
  // left_side_image: "",
  // right_side_image: "",
  // model_name: "",
  // engine_capacity: "",
  // rating: "",
  // lot: "",
  // odometer: "",
  // mileage: "",
  // price: "",
  // wish_count: "",
  // like: "",
  // seller_image: "",
  preloginDetails: [],
  //prelogin search
  brandList: [],
  modelList: [],
  engineList: [],
  //logins
  // loginList: []
  // ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //prelogin list in buy
    case PreLoginActionTypes.PRE_LOGIN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PreLoginActionTypes.PRE_LOGIN_LIST_SUCCESS:
      return {
        ...state,
        preloginList: action.list,
        loading: false,
      };
    case PreLoginActionTypes.PRE_LOGIN_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //prelogin buy details
    case PreLoginActionTypes.PRE_LIST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PreLoginActionTypes.PRE_LIST_DETAILS_SUCCESS:
      return {
        ...state,
        // front_side_image: action.front_side_image,
        // back_side_image: action.back_side_image,
        // left_side_image: action.left_side_image,
        // right_side_image: action.right_side_image,
        // model_name: action.model_name,
        // engine_capacity: action.engine_capacity,
        // rating: action.rating,
        // lot: action.lot,
        // odometer: action.odometer,
        // mileage: action.mileage,
        // price: action.price,
        // wish_count: action.wish_count,
        // seller_image: action.seller_image,
        preloginDetails: action.list,

        // id: state.id.concat({
        //   id: action.id
        //   // front_side_image: action.front_side_image
        // }),
        // front_side_image: action.front_side_image,
        loading: false,
      };
    case PreLoginActionTypes.PRE_LIST_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    //prelogin search
    case PreLoginActionTypes.PRE_LOGIN_SEARCH_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case PreLoginActionTypes.PRE_LOGIN_SEARCH_SUCCESS:
      return {
        ...state,
        brandList: action.list,
      };
    case PreLoginActionTypes.PRE_LOGIN_SEARCH_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case PreLoginActionTypes.MODEL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PreLoginActionTypes.MODEL_LIST_SUCCESS:
      return {
        ...state,
        modelList: action.models,
        loading: false,
      };
    case PreLoginActionTypes.MODEL_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case PreLoginActionTypes.ENGINE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PreLoginActionTypes.ENGINE_LIST_SUCCESS:
      return {
        ...state,
        engineList: action.engines,
        loading: false,
      };
    case PreLoginActionTypes.ENGINE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    //logins
    // case PreLoginActionTypes.LOGIN_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case PreLoginActionTypes.LOGIN_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loginList: action.list,
    //     loading: false
    //   };
    // case PreLoginActionTypes.LOGIN_LIST_FAILURE:
    //   return {
    //     ...state,
    //     error: action.error
    //   };

    case PreLoginActionTypes.LIKE:
      return {
        ...state,
        like: action.like,
      };

    default:
      return state;
  }
};
