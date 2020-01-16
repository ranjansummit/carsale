import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas/rootSaga';

// import PreLoginReducer from "../reducers/PreLoginReducer";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  let store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
  // let store = createStore(
  //   rootReducer,
  //   compose(applyMiddleware(sagaMiddleware))
  // );

  sagaMiddleware.run(sagas);

  return store;
}
