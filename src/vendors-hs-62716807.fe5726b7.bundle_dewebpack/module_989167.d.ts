/**
 * Redux Context Hooks Factory Module
 * 
 * This module provides a factory function that creates custom Redux hooks
 * (useSelector and useDispatch) bound to a specific React context.
 * Useful for scenarios where multiple Redux stores need to coexist in the same app.
 * 
 * @module ReduxContextHooksFactory
 */

import type { Context } from 'react';
import type { ReactReduxContextValue, TypedUseSelectorHook } from 'react-redux';

/**
 * Configuration options for creating context-specific Redux hooks
 */
export interface ReduxHooksFactoryConfig<TState = unknown> {
  /**
   * The React context instance that holds the Redux store
   * This context should be created with React.createContext<ReactReduxContextValue>()
   */
  context: Context<ReactReduxContextValue<TState>>;
}

/**
 * The return value of onStoreCreated lifecycle hook
 * Contains the custom hooks bound to the provided context
 */
export interface ReduxHooksResult<TState = unknown> {
  /**
   * Custom useSelector hook bound to the specific Redux context
   * Allows components to extract data from the Redux store state
   * 
   * @example
   * const todos = useSelector(state => state.todos);
   */
  useSelector: TypedUseSelectorHook<TState>;

  /**
   * Custom useDispatch hook bound to the specific Redux context
   * Returns the dispatch function for the specific store
   * 
   * @example
   * const dispatch = useDispatch();
   * dispatch({ type: 'INCREMENT' });
   */
  useDispatch: () => Dispatch;
}

/**
 * Redux store plugin interface
 * Provides lifecycle hooks for store initialization
 */
export interface ReduxStorePlugin<TState = unknown> {
  /**
   * Lifecycle hook called when the Redux store is created
   * Returns the context-specific hooks for useSelector and useDispatch
   * 
   * @returns An object containing the custom useSelector and useDispatch hooks
   */
  onStoreCreated(): ReduxHooksResult<TState>;
}

/**
 * Factory function that creates a Redux store plugin with context-specific hooks
 * 
 * This function is useful when you need to have multiple Redux stores in your application
 * and want to create custom hooks for each store that are bound to specific React contexts.
 * 
 * @template TState - The type of the Redux store state
 * @param config - Configuration object containing the React context
 * @returns A Redux store plugin with custom hooks bound to the provided context
 * 
 * @example
 *