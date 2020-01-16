import { ImageActionTypes } from "../actionTypes";
import { take, call, put } from "redux-saga/effects";

//camera images
export function* watchSaveImage1() {
  while (true) {
    const { imageData } = yield take(ImageActionTypes.SAVE_IMAGE1);
    console.log("Save camera image saga", imageData);
    yield put({
      type: ImageActionTypes.SAVE_IMAGE1,
      imageData: imageData,
      loading: false
    });
  }
}

export function* watchSaveImage2() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_IMAGE2);
    console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.SAVE_IMAGE2,
      image: image,
      loading: false
    });
  }
}

export function* watchSaveImage3() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_IMAGE3);
    console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.SAVE_IMAGE3,
      image: image,
      loading: false
    });
  }
}

export function* watchSaveImage4() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_IMAGE4);
    console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.SAVE_IMAGE4,
      image: image,
      loading: false
    });
  }
}

export function* watchSaveDeviceImage1() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_DEVICE_IMAGE1);
    console.log("Save device image saga", image);

    yield put({
      type: ImageActionTypes.SAVE_DEVICE_IMAGE1,
      image: image,
      loading: false
    });
  }
}

export function* watchSaveDeviceImage2() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_DEVICE_IMAGE2);
    console.log("Save image saga 2", image);
    yield put({
      type: ImageActionTypes.SAVE_DEVICE_IMAGE2,
      image: image,
      loading: false
    });
  }
}

export function* watchSaveDeviceImage3() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_DEVICE_IMAGE3);
    // console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.SAVE_DEVICE_IMAGE3,
      image: image,
      loading: false
    });
  }
}

export function* watchSaveDeviceImage4() {
  while (true) {
    const { image } = yield take(ImageActionTypes.SAVE_DEVICE_IMAGE4);
    // console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.SAVE_DEVICE_IMAGE4,
      image: image,
      loading: false
    });
  }
}
//edit device images

export function* watchEditDeviceImage1() {
  while (true) {
    const { image } = yield take(ImageActionTypes.EDIT_DEVICE_IMAGE1);
    console.log("edit device image saga", image);
    yield put({
      type: ImageActionTypes.EDIT_DEVICE_IMAGE1,
      image: image,
      loading: false
    });
  }
}

export function* watchEditDeviceImage2() {
  while (true) {
    const { image } = yield take(ImageActionTypes.EDIT_DEVICE_IMAGE2);
    // console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.EDIT_DEVICE_IMAGE2,
      image: image,
      loading: false
    });
  }
}

export function* watchEditDeviceImage3() {
  while (true) {
    const { image } = yield take(ImageActionTypes.EDIT_DEVICE_IMAGE3);
    // console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.EDIT_DEVICE_IMAGE3,
      image: image,
      loading: false
    });
  }
}

export function* watchEditDeviceImage4() {
  while (true) {
    const { image } = yield take(ImageActionTypes.EDIT_DEVICE_IMAGE4);
    // console.log("Save image saga", image);
    yield put({
      type: ImageActionTypes.EDIT_DEVICE_IMAGE4,
      image: image,
      loading: false
    });
  }
}
