/**
 * React-Redux store hook factory and default store hook.
 * Creates custom hooks for accessing the Redux store from React components.
 * @module StoreHook
 */

import { Context, useContext } from 'react';
import { ReactReduxContextValue } from 'react-redux';
import { Store } from 'redux';

/**
 * React context interface for Redux store
 */
export interface ReduxContext<S = any, A extends Action = AnyAction> extends Context<ReactReduxContextValue<S, A>> {}

/**
 * Hook function that returns the Redux store instance
 * @template S - State type
 * @template A - Action type
 * @returns The Redux store instance
 */
export type UseStoreHook<S = any, A extends Action = AnyAction> = () => Store<S, A>;

/**
 * Creates a custom hook for accessing the Redux store with a specific context.
 * 
 * @template S - The type of the Redux state
 * @template A - The type of Redux actions
 * @param context - The React context to use for accessing the store. Defaults to ReactReduxContext.
 * @returns A hook function that returns the Redux store instance
 * 
 * @example
 *