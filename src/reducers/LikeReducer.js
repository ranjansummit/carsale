import {LikeActionTypes} from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  removefromlike: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LikeActionTypes.REMOVE_FROM_LIKE:
      return {
        ...state,
        loading: false,
        removefromlike: action.val,
      };
    default:
      return state;
  }
};
