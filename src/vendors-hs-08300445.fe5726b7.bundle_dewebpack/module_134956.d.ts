/**
 * React Redux - Type definitions for Redux bindings for React
 * 
 * This module provides the main exports for react-redux library including:
 * - Provider component for providing Redux store to React components
 * - Hooks for accessing store, dispatch, and selecting state
 * - Higher-order components for connecting components to Redux store
 */

import type { Context, ComponentType } from 'react';
import type { Store, Action, AnyAction, Dispatch } from 'redux';

/**
 * Context object used by React Redux to pass the Redux store through the component tree
 */
export declare const ReactReduxContext: Context<ReactReduxContextValue | null>;

/**
 * The value shape of the React Redux context
 */
export interface ReactReduxContextValue<
  S = any,
  A extends Action = AnyAction
> {
  store: Store<S, A>;
  subscription: Subscription;
}

/**
 * Subscription management for Redux store updates
 */
export interface Subscription {
  addNestedSub: (listener: () => void) => () => void;
  notifyNestedSubs: () => void;
  handleChangeWrapper: () => void;
  isSubscribed: () => boolean;
  trySubscribe: () => void;
  tryUnsubscribe: () => void;
  getListeners: () => any;
}

/**
 * Props for the Provider component
 */
export interface ProviderProps<A extends Action = AnyAction, S = any> {
  /**
   * The Redux store instance to be made available to connected components
   */
  store: Store<S, A>;
  /**
   * Optional custom context to use instead of the default ReactReduxContext
   */
  context?: Context<ReactReduxContextValue<S, A>>;
  /**
   * Child components that will have access to the Redux store
   */
  children: React.ReactNode;
}

/**
 * Provider component that makes the Redux store available to nested components
 * wrapped in connect() or using Redux hooks
 */
export declare const Provider: ComponentType<ProviderProps>;

/**
 * Equality comparison function type
 */
export type EqualityFn<T = any> = (a: T, b: T) => boolean;

/**
 * Performs a shallow equality check between two objects
 * Returns true if all properties are strictly equal, false otherwise
 * 
 * @param objA - First object to compare
 * @param objB - Second object to compare
 * @returns True if objects are shallowly equal, false otherwise
 */
export declare function shallowEqual<T = any>(objA: T, objB: T): boolean;

/**
 * Selector function that extracts data from the Redux store state
 */
export type Selector<S = any, TProps = any, TOwnProps = any> = (
  state: S,
  ownProps: TOwnProps
) => TProps;

/**
 * Hook to access the Redux store instance
 * 
 * @returns The Redux store instance from context
 */
export declare function useStore<S = any, A extends Action = AnyAction>(): Store<S, A>;

/**
 * Hook to access the dispatch function from the Redux store
 * 
 * @returns The dispatch function from the Redux store
 */
export declare function useDispatch<TDispatch = Dispatch<any>>(): TDispatch;

/**
 * Hook to extract data from the Redux store state using a selector function
 * 
 * @param selector - Function that extracts the desired data from store state
 * @param equalityFn - Optional custom equality function for comparing selected values
 * @returns The selected value from the store state
 */
export declare function useSelector<TState = any, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: EqualityFn<TSelected>
): TSelected;

/**
 * Creates a custom useStore hook bound to a specific context
 * 
 * @param context - Custom React context to use instead of ReactReduxContext
 * @returns A useStore hook bound to the provided context
 */
export declare function createStoreHook<S = any, A extends Action = AnyAction>(
  context?: Context<ReactReduxContextValue<S, A>>
): () => Store<S, A>;

/**
 * Creates a custom useDispatch hook bound to a specific context
 * 
 * @param context - Custom React context to use instead of ReactReduxContext
 * @returns A useDispatch hook bound to the provided context
 */
export declare function createDispatchHook<TDispatch = Dispatch<any>, S = any, A extends Action = AnyAction>(
  context?: Context<ReactReduxContextValue<S, A>>
): () => TDispatch;

/**
 * Creates a custom useSelector hook bound to a specific context
 * 
 * @param context - Custom React context to use instead of ReactReduxContext
 * @returns A useSelector hook bound to the provided context
 */
export declare function createSelectorHook<S = any, A extends Action = AnyAction>(
  context?: Context<ReactReduxContextValue<S, A>>
): <TSelected = unknown>(
  selector: (state: S) => TSelected,
  equalityFn?: EqualityFn<TSelected>
) => TSelected;

/**
 * Options for the connect function
 */
export interface ConnectOptions {
  /**
   * Custom context to use instead of ReactReduxContext
   */
  context?: Context<ReactReduxContextValue>;
  /**
   * If true, the connected component will not trigger re-renders
   */
  pure?: boolean;
  /**
   * If true, implements shouldComponentUpdate and shallowly compares merged props
   */
  areStatesEqual?: (nextState: any, prevState: any) => boolean;
  /**
   * Custom equality check for own props
   */
  areOwnPropsEqual?: (nextOwnProps: any, prevOwnProps: any) => boolean;
  /**
   * Custom equality check for state props
   */
  areStatePropsEqual?: (nextStateProps: any, prevStateProps: any) => boolean;
  /**
   * Custom equality check for dispatch props
   */
  areMergedPropsEqual?: (nextMergedProps: any, prevMergedProps: any) => boolean;
  /**
   * If true, forwards ref to the wrapped component
   */
  forwardRef?: boolean;
}

/**
 * Map state to props function type
 */
export type MapStateToProps<TStateProps = {}, TOwnProps = {}, State = any> = (
  state: State,
  ownProps: TOwnProps
) => TStateProps;

/**
 * Map dispatch to props function type
 */
export type MapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> =
  | ((dispatch: Dispatch<any>, ownProps: TOwnProps) => TDispatchProps)
  | TDispatchProps;

/**
 * Merge props function type
 */
export type MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps
) => TMergedProps;

/**
 * Connects a React component to a Redux store
 * 
 * @param mapStateToProps - Maps store state to component props
 * @param mapDispatchToProps - Maps dispatch functions to component props
 * @param mergeProps - Merges state props, dispatch props, and own props
 * @param options - Additional configuration options
 * @returns A higher-order component that wraps the input component
 */
export declare function connect<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {},
  State = any
>(
  mapStateToProps?: MapStateToProps<TStateProps, TOwnProps, State> | null,
  mapDispatchToProps?: MapDispatchToProps<TDispatchProps, TOwnProps> | null,
  mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> | null,
  options?: ConnectOptions
): <TComponent extends ComponentType<any>>(
  component: TComponent
) => ComponentType<TOwnProps>;

/**
 * Options for connectAdvanced
 */
export interface ConnectAdvancedOptions extends ConnectOptions {
  /**
   * Computes the connector component's displayName
   */
  getDisplayName?: (name: string) => string;
  /**
   * Shown in error messages
   */
  methodName?: string;
  /**
   * If defined, a property with this name will be added to the props passed to the wrapped component
   */
  renderCountProp?: string;
  /**
   * Controls whether the wrappedComponent should be used in React's Profiler
   */
  shouldHandleStateChanges?: boolean;
}

/**
 * Selector factory function for connectAdvanced
 */
export type SelectorFactory<S, TProps, TOwnProps, TFactoryOptions> = (
  dispatch: Dispatch<any>,
  factoryOptions: TFactoryOptions
) => Selector<S, TProps, TOwnProps>;

/**
 * Advanced version of connect that provides more control over the connection behavior
 * 
 * @param selectorFactory - Factory function that creates a selector
 * @param connectOptions - Configuration options for the connection
 * @returns A higher-order component that connects the input component to Redux
 */
export declare function connectAdvanced<S, TProps, TOwnProps, TFactoryOptions>(
  selectorFactory: SelectorFactory<S, TProps, TOwnProps, TFactoryOptions>,
  connectOptions?: ConnectAdvancedOptions
): <TComponent extends ComponentType<any>>(
  component: TComponent
) => ComponentType<TOwnProps>;