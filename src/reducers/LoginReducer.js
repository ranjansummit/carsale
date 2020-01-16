import {LoginActionTypes} from '../actionTypes';

// import { ListView } from "react-native";

const INITIAL_STATE = {
  loading: false,
  // isRefreshing: false,
  error: '',
  login_info: '',
  login_data: '',
  detailList: [],
  sellDetails: [],
  //logins
  loginList: [],
  wishList_count: '',
  notify: '',
  addwish: '',
  removewish: '',
  removewish_msg: '',
  removeloader: false,
  wishList: [],
  sellList: [],
  //add bike 1st part
  brandid: '',
  brandname: '',
  modelid: '',
  modelname: '',
  engineid: '',
  capacity: '',
  mileage: '',

  //add bike 2nd part
  lot: '',
  odometer: '',
  price: '',
  rating: '',

  // //save camera image
  // image1: "",
  // image2: "",
  // image3: "",
  // image4: "",

  //publish message
  // publish: "",

  //take photo button select
  firstImage: '',
  camStatus1: '',
  secondImage: '',
  camStatus2: '',
  thirdImage: '',
  camStatus3: '',
  fourthImage: '',
  camStatus4: '',

  sellerInfo: '',
  //edit bike 1st part
  edit_brandid: '',
  edit_brandname: '',
  edit_modelid: '',
  edit_modelname: '',
  edit_engineid: '',
  edit_capacity: '',
  edit_mileage: '',
  //edit bike 2nd part
  edit_lot: '',
  edit_odometer: '',
  edit_price: '',
  edit_rating: '',

  //app settings
  settings: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //user login
    case LoginActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login_info: action.data.error,
        login_data: action.data,

        loading: false,
      };
    case LoginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    //logins
    case LoginActionTypes.GET_APP_SETTINGS:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.APP_SETTINGS_SUCCESS:
      // const { login_list = [] } = action;
      return {
        ...state,
        settings: action.data,
        loading: false,
      };
    case LoginActionTypes.APP_SETTINGS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case LoginActionTypes.LOGIN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.LOGIN_LIST_SUCCESS:
      // const { login_list = [] } = action;
      return {
        ...state,
        loginList: action.login_list,
        // loginList: [...state.loginList, ...login_list],

        wishList_count: action.list.wishlist_count,
        loading: false,
      };
    case LoginActionTypes.LOGIN_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case LoginActionTypes.LIST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.LIST_DETAILS_SUCCESS:
      return {
        ...state,
        detailList: action.list,

        // id: state.id.concat({
        //   id: action.id
        //   // front_side_image: action.front_side_image
        // }),
        // front_side_image: action.front_side_image,
        loading: false,
      };
    case LoginActionTypes.LIST_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //only for sell details
    case LoginActionTypes.SELL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.SELL_DETAILS_SUCCESS:
      return {
        ...state,
        sellDetails: action.list,
        loading: false,
      };
    case LoginActionTypes.SELL_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LoginActionTypes.NOTIFY_SELLER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.NOTIFY_SELLER_SUCCESS:
      return {
        ...state,
        notify: action.data,
        loading: false,
      };
    case LoginActionTypes.NOTIFY_SELLER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LoginActionTypes.ON_LIKE_REQUEST:
      return {
        ...state,

        loading: true,
      };
    case LoginActionTypes.ON_LIKE_SUCCESS:
      return {
        ...state,
        addwish: action.data,
        loading: false,
      };
    case LoginActionTypes.ON_LIKE_FAILURE:
      return {
        ...state,
        // addwish: action.data,
        loading: false,
      };
    case LoginActionTypes.ON_DISLIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.ON_DISLIKE_SUCCESS:
      return {
        ...state,
        removewish: action.data.error,
        removewish_msg: action.data.message,
        loading: false,
      };
    case LoginActionTypes.ON_DISLIKE_FAILURE:
      return {
        ...state,
        error: action.data.message,
        loading: false,
      };
    case LoginActionTypes.SELL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.SELL_LIST_SUCCESS:
      return {
        ...state,
        sellList: action.list,
        loading: false,
      };
    case LoginActionTypes.SELL_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case LoginActionTypes.GET_WISH_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case LoginActionTypes.GET_WISH_SUCCESS:
      return {
        ...state,
        wishList: action.list,
        loading: false,
        // isRefreshing: false
      };
    case LoginActionTypes.GET_WISH_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // add vehicle 1st
    case LoginActionTypes.FIRST_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case LoginActionTypes.FIRST_ADD_SUCCESS:
      return {
        ...state,
        brandid: action.brandid,
        brandname: action.brandname,
        modelid: action.modelid,
        modelname: action.modelname,
        engineid: action.engineid,
        capacity: action.capacity,
        mileage: action.mileage,
        loading: false,
        // isRefreshing: false
      };

    case LoginActionTypes.SECOND_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case LoginActionTypes.SECOND_ADD_SUCCESS:
      return {
        ...state,
        lot: action.lot,
        odometer: action.odometer,
        price: action.price,
        rating: action.rating,
        loading: false,
        // isRefreshing: false
      };

    // //saving camera images
    // case LoginActionTypes.SAVE_IMAGE1:
    //   return {
    //     ...state,
    //     image1: action.imageData,
    //     loading: false
    //   };
    // case LoginActionTypes.SAVE_IMAGE2:
    //   return {
    //     ...state,
    //     image2: action.image,
    //     loading: false
    //   };
    // case LoginActionTypes.SAVE_IMAGE3:
    //   return {
    //     ...state,
    //     image3: action.image,
    //     loading: false
    //   };
    // case LoginActionTypes.SAVE_IMAGE4:
    //   return {
    //     ...state,
    //     image4: action.image,
    //     loading: false
    //   };
    // buttons
    case LoginActionTypes.FOR_FIRST_IMAGE:
      return {
        ...state,
        firstImage: action.data,
        camStatus1: action.status,
        loading: false,
      };
    case LoginActionTypes.FOR_SECOND_IMAGE:
      return {
        ...state,
        secondImage: action.data,
        camStatus2: action.status,
        loading: false,
      };
    case LoginActionTypes.FOR_THIRD_IMAGE:
      return {
        ...state,
        thirdImage: action.data,
        camStatus3: action.status,
        loading: false,
      };
    case LoginActionTypes.FOR_FOURTH_IMAGE:
      return {
        ...state,
        fourthImage: action.data,
        camStatus4: action.status,
        loading: false,
      };
    case LoginActionTypes.SELLER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case LoginActionTypes.SELLER_INFO_SUCCESS:
      return {
        ...state,
        sellerInfo: action.list,
        loading: false,
        // isRefreshing: false
      };
    case LoginActionTypes.SELLER_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    // edit vehicle 1st
    case LoginActionTypes.FIRST_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case LoginActionTypes.FIRST_EDIT_SUCCESS:
      return {
        ...state,
        edit_brandid: action.brand_id,
        edit_brandname: action.brand_name,
        edit_modelid: action.model_id,
        edit_modelname: action.model_name,
        edit_engineid: action.engine_id,
        edit_capacity: action.engine_capacity,
        edit_mileage: action.mileage_val,
        loading: false,
        // isRefreshing: false
      };
    case LoginActionTypes.SECOND_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        // isRefreshing: true
      };
    case LoginActionTypes.SECOND_EDIT_SUCCESS:
      return {
        ...state,
        edit_lot: action.lot,
        edit_odometer: action.odometer,
        edit_price: action.price,
        edit_rating: action.rating,
        loading: false,
        // isRefreshing: false
      };
    case LoginActionTypes.RESET_DATA:
      return {
        ...state,
        wishList: null,
        loginList: null,
        wishList_count: null,
        sellList: null,
        error: null,
      };
    case LoginActionTypes.RESET_DETAIL_LIST:
      return {
        ...state,
        detailList: [],
        error: null,
      };

    case LoginActionTypes.RESET_WISH_MESSAGE:
      return {
        ...state,
        addwish: null,
        removewish: null,
      };
    case LoginActionTypes.RESET_WISH:
      return {
        ...state,
        removewish_msg: null,
      };
    case LoginActionTypes.RESET_BUTTONS:
      return {
        ...state,
        firstImage: null,
        secondImage: null,
        thirdImage: null,
        fourthImage: null,
      };
    // case LoginActionTypes.RESET_SELL_LIST:
    //   return {
    //     ...state,
    //     sellList: null,
    //     error: null
    //   };

    case LoginActionTypes.RESET_CAM_STATUS:
      return {
        ...state,
        camStatus1: '',
        camStatus2: '',
        camStatus3: '',
        camStatus4: '',
      };

    case LoginActionTypes.RESET_LOGIN_INFO:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
