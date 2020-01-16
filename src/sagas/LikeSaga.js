import {LikeActionTypes} from '../actionTypes';
import {take, call, put} from 'redux-saga/effects';

export function* watchRemoveLike() {
  while (true) {
    const {val} = yield take(LikeActionTypes.REMOVE_FROM_LIKE);

    yield put({
      type: LikeActionTypes.REMOVE_FROM_LIKE,
      val: val,
      loading: false,
    });
  }
}
