import {ImageActionTypes} from '../actionTypes';

// SAVING GALLERY IMAGES
export function deviceImg1(image) {
  console.log('save device image');
  return {
    type: ImageActionTypes.SAVE_DEVICE_IMAGE1,
    image,
  };
}

export function deviceImg2(image) {
  console.log('save image 2', image);
  return {
    type: ImageActionTypes.SAVE_DEVICE_IMAGE2,
    image,
  };
}

export function deviceImg3(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.SAVE_DEVICE_IMAGE3,
    image,
  };
}

export function deviceImg4(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.SAVE_DEVICE_IMAGE4,
    image,
  };
}

// editing for device image
export function deviceImgEdit1(image) {
  console.log('edit image', image);
  return {
    type: ImageActionTypes.EDIT_DEVICE_IMAGE1,
    image,
  };
}
export function deviceImgEdit2(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.EDIT_DEVICE_IMAGE2,
    image,
  };
}
export function deviceImgEdit3(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.EDIT_DEVICE_IMAGE3,
    image,
  };
}
export function deviceImgEdit4(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.EDIT_DEVICE_IMAGE4,
    image,
  };
}
//saving camera captured images
export function saveImage1(imageData) {
  // console.log("save image");
  return {
    type: ImageActionTypes.SAVE_IMAGE1,
    imageData,
  };
}

export function saveImage2(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.SAVE_IMAGE2,
    image,
  };
}

export function saveImage3(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.SAVE_IMAGE3,
    image,
  };
}

export function saveImage4(image) {
  // console.log("save image");
  return {
    type: ImageActionTypes.SAVE_IMAGE4,
    image,
  };
}

export function setImagesNull() {
  console.log('set mages to null');
  return {
    type: ImageActionTypes.RESET_IMAGES,
  };
}
