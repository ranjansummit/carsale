import {VehicleActionTypes} from '../actionTypes';

// import { ListView } from "react-native";

const INITIAL_STATE = {
  loading: false,
  // isRefreshing: false,

  //publish message
  publish: '',
  publish_msg: '',
  //remove vehicle
  removeVehicle: '',
  editVal: false,
  addVal: false,
  savedFromCam: '',
  savedFromDevice: '',
  editWithCam: '',
  editWithDevice: '',

  editprice: '',
  editpricemsg: '',
  searchList: [],
  search_result: null,
  own_search_result: null,
  error: null,

  //mark as sold
  sold: '',
  //pre search
  pre_searchList: [],
  pre_search_result: null,
  search_error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VehicleActionTypes.PUBLISH_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case VehicleActionTypes.PUBLISH_VEHICLE_SUCCESS:
      return {
        ...state,
        publish: action.message.error,
        publish_msg: action.message.message,
        loading: false,
        // isRefreshing: false
      };
    case VehicleActionTypes.PUBLISH_VEHICLE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case VehicleActionTypes.REMOVE_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case VehicleActionTypes.REMOVE_VEHICLE_SUCCESS:
      return {
        ...state,
        removeVehicle: action.message,
        loading: false,
        // isRefreshing: false
      };
    case VehicleActionTypes.REMOVE_VEHICLE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case VehicleActionTypes.EDIT_CLICKED:
      return {
        ...state,
        editVal: action.val,
        loading: false,
        // isRefreshing: false
      };

    case VehicleActionTypes.ADD_CLICKED:
      return {
        ...state,
        addVal: action.val,
        loading: false,
        // isRefreshing: false
      };
    case VehicleActionTypes.RESET_EDIT_CLICKED:
      return {
        ...state,
        editVal: null,
      };
    case VehicleActionTypes.RESET_ADD_CLICKED:
      return {
        ...state,

        addVal: null,
      };
    case VehicleActionTypes.SAVE_VEHICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.SAVE_VEHICLES_SUCCESS:
      return {
        ...state,

        savedFromDevice: action.data.error,
        loading: false,
      };
    case VehicleActionTypes.SAVE_VEHICLES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case VehicleActionTypes.SAVE_CAM_VEHICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.SAVE_CAM_VEHICLES_SUCCESS:
      return {
        ...state,

        savedFromCam: action.data.error,
        loading: false,
      };
    case VehicleActionTypes.SAVE_CAM_VEHICLES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    //editing
    case VehicleActionTypes.EDIT_VEHICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.EDIT_VEHICLES_SUCCESS:
      return {
        ...state,

        editWithDevice: action.data.error,

        loading: false,
      };
    case VehicleActionTypes.EDIT_VEHICLES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case VehicleActionTypes.EDIT_CAM_VEHICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.EDIT_CAM_VEHICLES_SUCCESS:
      return {
        ...state,

        editWithCam: action.data.error,
        loading: false,
      };
    case VehicleActionTypes.EDIT_CAM_VEHICLES_FAILURE:
      return {
        ...state,
        // error: action.error,
        loading: false,
      };
    case VehicleActionTypes.EDIT_VEHICLE_PRICE:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.EDIT_VEHICLE_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        editprice: action.data.data.price,
        editpricemsg: action.data.error,
      };
    case VehicleActionTypes.SEARCH_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.SEARCH_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchList: action.list.data,
        search_result: action.list.error,
        // error: action.list.error
      };
    case VehicleActionTypes.SEARCH_VEHICLE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case VehicleActionTypes.PRE_SEARCH_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.PRE_SEARCH_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        pre_searchList: action.list.data,
        pre_search_result: action.list.error,
        // error: action.list.error
      };
    case VehicleActionTypes.PRE_SEARCH_VEHICLE_FAILURE:
      return {
        ...state,
        loading: false,
        search_error: action.error,
      };
    case VehicleActionTypes.SEARCH_OWN_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.SEARCH_OWN_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchList: action.list.data,
        own_search_result: action.list.error,
        // error: action.list.error
      };
    case VehicleActionTypes.SEARCH_OWN_VEHICLE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case VehicleActionTypes.MARK_AS_SOLD:
      return {
        ...state,
        loading: true,
      };
    case VehicleActionTypes.MARK_AS_SOLD_SUCCESS:
      return {
        ...state,
        sold: action.message,
        loading: false,

        // error: action.list.error
      };
    case VehicleActionTypes.MARK_AS_SOLD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case VehicleActionTypes.RESET_DELETE_VEHICLE:
      return {
        ...state,
        removeVehicle: null,
      };
    case VehicleActionTypes.RESET_PRICE_MESSAGE:
      return {
        ...state,
        editpricemsg: null,
      };
    case VehicleActionTypes.RESET_SEARCH_LIST:
      return {
        ...state,
        searchList: [],
        search_result: null,
        own_search_result: null,
        pre_searchList: [],
        pre_search_result: null,
        search_error: null,
      };
    case VehicleActionTypes.RESET_SAVED_MESSAGE:
      return {
        ...state,
        savedFromDevice: null,
        savedFromCam: null,
        error: null,
      };
    case VehicleActionTypes.RESET_EDITED_MESSAGE:
      return {
        ...state,
        editWithDevice: null,
        editWithCam: null,
      };
    case VehicleActionTypes.RESET_PUBLISH_MESSAGE:
      return {
        ...state,
        publish: null,
        publish_msg: null,
        error: null,
      };
    default:
      return state;
  }
};
