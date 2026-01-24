/**
 * React Redux Provider component that makes the Redux store available to nested components
 * @module ReactReduxProvider
 */

import { ReactNode, ReactElement, Context } from 'react';
import { Store, AnyAction } from 'redux';

/**
 * Subscription object for managing Redux store updates
 */
export interface Subscription {
  /**
   * Add a nested subscriber
   */
  addNestedSub: (listener: () => void) => () => void;
  
  /**
   * Notify all nested subscribers of state changes
   */
  notifyNestedSubs: () => void;
  
  /**
   * Callback invoked when store state changes
   */
  onStateChange: (() => void) | null;
  
  /**
   * Subscribe to the parent subscription or store
   */
  trySubscribe: () => void;
  
  /**
   * Unsubscribe from the parent subscription or store
   */
  tryUnsubscribe: () => void;
}

/**
 * Context value provided by React Redux Provider
 */
export interface ReactReduxContextValue<S = unknown, A extends AnyAction = AnyAction> {
  /**
   * The Redux store instance
   */
  store: Store<S, A>;
  
  /**
   * Subscription manager for this Provider level
   */
  subscription: Subscription;
}

/**
 * Props for the React Redux Provider component
 */
export interface ProviderProps<S = unknown, A extends AnyAction = AnyAction> {
  /**
   * The Redux store to be provided to child components
   */
  store: Store<S, A>;
  
  /**
   * Optional custom React context (defaults to ReactReduxContext)
   */
  context?: Context<ReactReduxContextValue<S, A> | null>;
  
  /**
   * Child components that will have access to the Redux store
   */
  children: ReactNode;
}

/**
 * Provider component that makes Redux store available to connected components
 * 
 * @param props - Provider configuration
 * @returns React element wrapping children with Redux context
 * 
 * @example
 *