/**
 * Module: ReactReduxContext
 * 
 * Provides the React context used by React-Redux to pass the Redux store
 * through the component tree without explicit prop drilling.
 */

import type { Context } from 'react';

/**
 * The shape of the Redux store context value.
 * Contains the Redux store instance and optional subscription management.
 */
export interface ReactReduxContextValue<State = any, Action extends { type: string } = { type: string }> {
  /**
   * The Redux store instance
   */
  store: {
    getState: () => State;
    dispatch: (action: Action) => Action;
    subscribe: (listener: () => void) => () => void;
    replaceReducer: (nextReducer: (state: State, action: Action) => State) => void;
  };
  
  /**
   * Subscription instance for managing component updates
   */
  subscription?: {
    addNestedSub: (listener: () => void) => () => void;
    notifyNestedSubs: () => void;
    handleChangeWrapper: () => void;
    isSubscribed: () => boolean;
    trySubscribe: () => void;
    tryUnsubscribe: () => void;
    getListeners: () => any;
  };
}

/**
 * The React context instance used by React-Redux.
 * 
 * This context is created with a default value of `null` and is used internally
 * by the `<Provider>` component to pass the Redux store down to connected components.
 * 
 * @remarks
 * Typically, you should not need to use this context directly. Instead, use the
 * `useSelector` and `useDispatch` hooks, or the `connect` HOC.
 * 
 * @example
 *