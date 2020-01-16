import {LikeActionTypes} from '../actionTypes';

export function removedFromLike(val) {
  console.log('remove like to reset data');
  return {
    type: LikeActionTypes.REMOVE_FROM_LIKE,
    val,
  };
}
