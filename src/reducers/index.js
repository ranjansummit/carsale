import {combineReducers} from 'redux';
import PreLoginReducer from './PreLoginReducer';
import LoginReducer from './LoginReducer';
import ImageReducer from './ImageReducer';
import VehicleReducer from './VehicleReducer';
import LikeReducer from './LikeReducer';
import TransactionReducer from './TransactionReducer';
import ProfileReducer from './ProfileReducer';
import CreditsReducer from './CreditsReducer';

const appReducer = combineReducers({
  prelogin: PreLoginReducer,
  login: LoginReducer,
  image: ImageReducer,
  vehicle: VehicleReducer,
  like: LikeReducer,
  transaction: TransactionReducer,
  profile: ProfileReducer,
  credit: CreditsReducer,
});

function index(state, action) {
  return appReducer(state, action);
}
export default index;
