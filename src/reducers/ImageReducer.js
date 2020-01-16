import {ImageActionTypes} from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  // device image
  device_image1: '',
  device_image2: '',
  device_image3: '',
  device_image4: '',
  //edit device image
  edit_device_image1: '',
  edit_device_image2: '',
  edit_device_image3: '',
  edit_device_image4: '',

  //save camera image
  image1: '',
  image2: '',
  image3: '',
  image4: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //saving device images cases
    case ImageActionTypes.SAVE_DEVICE_IMAGE1:
      return {
        ...state,
        device_image1: action.image,
        loading: false,
      };
    case ImageActionTypes.SAVE_DEVICE_IMAGE2:
      return {
        ...state,
        device_image2: action.image,
        loading: false,
      };
    case ImageActionTypes.SAVE_DEVICE_IMAGE3:
      return {
        ...state,
        device_image3: action.image,
        loading: false,
      };
    case ImageActionTypes.SAVE_DEVICE_IMAGE4:
      return {
        ...state,
        device_image4: action.image,
        loading: false,
      };
    case ImageActionTypes.EDIT_DEVICE_IMAGE1:
      return {
        ...state,
        edit_device_image1: action.image,
        loading: false,
      };
    case ImageActionTypes.EDIT_DEVICE_IMAGE2:
      return {
        ...state,
        edit_device_image2: action.image,
        loading: false,
      };
    case ImageActionTypes.EDIT_DEVICE_IMAGE3:
      return {
        ...state,
        edit_device_image3: action.image,
        loading: false,
      };
    case ImageActionTypes.EDIT_DEVICE_IMAGE4:
      return {
        ...state,
        edit_device_image4: action.image,
        loading: false,
      };
    //saving camera images
    case ImageActionTypes.SAVE_IMAGE1:
      return {
        ...state,
        image1: action.imageData,
        loading: false,
      };
    case ImageActionTypes.SAVE_IMAGE2:
      return {
        ...state,
        image2: action.image,
        loading: false,
      };
    case ImageActionTypes.SAVE_IMAGE3:
      return {
        ...state,
        image3: action.image,
        loading: false,
      };
    case ImageActionTypes.SAVE_IMAGE4:
      return {
        ...state,
        image4: action.image,
        loading: false,
      };
    case ImageActionTypes.RESET_IMAGES:
      return {
        ...state,
        device_image1: '',
        device_image2: '',
        device_image3: '',
        device_image4: '',
        //edit device image
        edit_device_image1: '',
        edit_device_image2: '',
        edit_device_image3: '',
        edit_device_image4: '',

        //save camera image
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        error: null,
      };
    default:
      return state;
  }
};
