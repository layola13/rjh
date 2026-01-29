import { applyMiddleware, createStore, compose, Store, StoreEnhancer } from 'redux';
import rootReducer from './reducers';
import resetEnhancer from './enhancers/reset';
import thunkMiddleware from './middleware/thunk';
import { RESET_STATE } from './constants/actionTypes';

interface AppParams {
  debug: boolean;
}

interface HSAppInstance {
  appParams: AppParams;
}

interface HSApp {
  App: {
    getApp(): HSAppInstance;
  };
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
    HSApp: HSApp;
  }
}

const REDUX_DEVTOOLS_KEY = '__REDUX_DEVTOOLS_EXTENSION__';

const enhancers: StoreEnhancer[] = [
  applyMiddleware(thunkMiddleware),
  resetEnhancer({
    type: RESET_STATE,
    data: 'payload'
  })
];

if (window[REDUX_DEVTOOLS_KEY] && window.HSApp?.App?.getApp()?.appParams?.debug) {
  enhancers.push(window[REDUX_DEVTOOLS_KEY]());
}

const composedEnhancers = compose(...enhancers);

const store: Store = createStore(rootReducer, undefined, composedEnhancers);

export default store;