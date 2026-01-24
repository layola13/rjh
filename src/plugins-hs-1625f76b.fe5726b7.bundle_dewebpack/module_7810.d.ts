/**
 * Redux store configuration module
 * Configures the application's Redux store with middleware and enhancers
 */

import { Store, AnyAction, Middleware, StoreEnhancer } from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';
import resetStateEnhancer from './resetStateEnhancer';
import thunkMiddleware from './thunkMiddleware';
import { RESET_STATE } from './actionTypes';

/**
 * Redux DevTools Extension interface
 */
interface ReduxDevToolsExtension {
  (): StoreEnhancer;
}

/**
 * Window interface extended with Redux DevTools
 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: ReduxDevToolsExtension;
  }
}

/**
 * HSApp global interface
 */
declare global {
  interface Window {
    HSApp?: {
      App: {
        getApp(): {
          appParams: {
            debug: boolean;
          };
        };
      };
    };
  }
}

/**
 * Array of store enhancers to apply to the Redux store
 */
const storeEnhancers: StoreEnhancer[] = [
  applyMiddleware(thunkMiddleware),
  resetStateEnhancer({
    type: RESET_STATE,
    data: 'payload'
  })
];

/**
 * Redux DevTools extension key
 */
const REDUX_DEVTOOLS_KEY = '__REDUX_DEVTOOLS_EXTENSION__';

/**
 * Add Redux DevTools extension if available and debug mode is enabled
 */
if (
  window[REDUX_DEVTOOLS_KEY] &&
  window.HSApp?.App.getApp().appParams.debug
) {
  storeEnhancers.push(window[REDUX_DEVTOOLS_KEY]());
}

/**
 * Compose all store enhancers
 */
const composedEnhancers: StoreEnhancer = compose(...storeEnhancers);

/**
 * Create and export the Redux store instance
 * Configured with root reducer, initial state, and composed enhancers
 */
const store: Store<unknown, AnyAction> = createStore(
  rootReducer,
  undefined,
  composedEnhancers
);

export default store;