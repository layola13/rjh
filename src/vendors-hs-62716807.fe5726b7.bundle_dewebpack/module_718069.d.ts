/**
 * Redux/Rematch Model Hooks and HOCs Plugin
 * 
 * This plugin provides a comprehensive set of hooks and higher-order components
 * for accessing Redux store state, dispatchers, and effects metadata in React applications.
 */

import { ComponentType, ReactElement } from 'react';

/**
 * Redux store instance with extended dispatch and selector capabilities
 */
interface Store<TState = any, TDispatch = any> {
  /** Get current store state */
  getState(): TState;
  /** Extended dispatch object with model-specific dispatchers */
  dispatch: TDispatch;
  /** React hook to select state from store */
  useSelector<TSelected>(selector: (state: TState) => TSelected): TSelected;
  /** React hook to get dispatch object */
  useDispatch(): TDispatch;
}

/**
 * Effect execution state (loading/error status)
 */
interface EffectState {
  /** Whether the effect is currently executing */
  isLoading: boolean | undefined;
  /** Error object if the effect failed, null otherwise */
  error: Error | null;
}

/**
 * Map of effect names to their execution states
 */
type EffectsStateMap = Record<string, EffectState>;

/**
 * Map of effect names to their error states
 */
type EffectsErrorMap = Record<string, { error: Error } | undefined>;

/**
 * Map of effect names to their loading states
 */
type EffectsLoadingMap = Record<string, boolean | undefined>;

/**
 * Global error state structure in Redux store
 */
interface GlobalErrorState {
  effects: Record<string, EffectsErrorMap>;
}

/**
 * Global loading state structure in Redux store
 */
interface GlobalLoadingState {
  effects: Record<string, EffectsLoadingMap>;
}

/**
 * Props mapper function type
 */
type PropsMapper<TValue, TProps = any> = (value: TValue) => TProps;

/**
 * Higher-order component type
 */
type HOC<TProps = any> = (
  Component: ComponentType<TProps>
) => ComponentType<Omit<TProps, keyof TProps>>;

/**
 * API methods for interacting with a specific model
 */
interface ModelAPIs<TState = any, TDispatchers = any> {
  /** Hook: Get both state and dispatchers as tuple [state, dispatchers] */
  useValue(): [TState, TDispatchers];
  
  /** Hook: Get model state */
  useState(): TState;
  
  /** Hook: Get model dispatchers */
  useDispatchers(): TDispatchers;
  
  /** Hook: Get effects state (loading/error status for all effects) */
  useEffectsState(): EffectsStateMap;
  
  /** Hook: Get effects error states */
  useEffectsError(): EffectsErrorMap;
  
  /** Hook: Get effects loading states */
  useEffectsLoading(): EffectsLoadingMap;
  
  /** Non-hook: Get both state and dispatchers as tuple [state, dispatchers] */
  getValue(): [TState, TDispatchers];
  
  /** Non-hook: Get model state */
  getState(): TState;
  
  /** Non-hook: Get model dispatchers */
  getDispatchers(): TDispatchers;
  
  /** HOC: Inject state and dispatchers into component */
  withValue(propsMapper?: PropsMapper<[TState, TDispatchers]>): HOC;
  
  /** HOC: Inject dispatchers into component */
  withDispatchers(propsMapper?: PropsMapper<TDispatchers>): HOC;
  
  /** HOC: Inject effects state into component */
  withEffectsState(propsMapper?: PropsMapper<EffectsStateMap>): HOC;
  
  /** HOC: Inject effects error states into component */
  withEffectsError(propsMapper?: PropsMapper<EffectsErrorMap>): HOC;
  
  /** HOC: Inject effects loading states into component */
  withEffectsLoading(propsMapper?: PropsMapper<EffectsLoadingMap>): HOC;
}

/**
 * Plugin result containing all model interaction utilities
 */
interface PluginResult<TState = any, TDispatch = any> {
  /**
   * Get all API methods for a specific model namespace
   * @param namespace - Model namespace identifier
   */
  getModelAPIs<TModelState = any, TModelDispatchers = any>(
    namespace: string
  ): ModelAPIs<TModelState, TModelDispatchers>;

  /**
   * Hook: Get both state and dispatchers for a model
   * @param namespace - Model namespace identifier
   * @returns Tuple of [state, dispatchers]
   */
  useModel<TModelState = any, TModelDispatchers = any>(
    namespace: string
  ): [TModelState, TModelDispatchers];

  /**
   * Hook: Get state for a specific model
   * @param namespace - Model namespace identifier
   * @throws Error if model namespace not found
   */
  useModelState<TModelState = any>(namespace: string): TModelState;

  /**
   * Hook: Get dispatchers for a specific model
   * @param namespace - Model namespace identifier
   * @throws Error if model namespace not found
   */
  useModelDispatchers<TModelDispatchers = any>(namespace: string): TModelDispatchers;

  /**
   * Hook: Get effects execution state for a model
   * @param namespace - Model namespace identifier
   */
  useModelEffectsState(namespace: string): EffectsStateMap;

  /**
   * Hook: Get effects error states for a model
   * @param namespace - Model namespace identifier
   */
  useModelEffectsError(namespace: string): EffectsErrorMap;

  /**
   * Hook: Get effects loading states for a model
   * @param namespace - Model namespace identifier
   */
  useModelEffectsLoading(namespace: string): EffectsLoadingMap;

  /**
   * Non-hook: Get both state and dispatchers for a model
   * @param namespace - Model namespace identifier
   * @returns Tuple of [state, dispatchers]
   */
  getModel<TModelState = any, TModelDispatchers = any>(
    namespace: string
  ): [TModelState, TModelDispatchers];

  /**
   * Non-hook: Get state for a specific model
   * @param namespace - Model namespace identifier
   */
  getModelState<TModelState = any>(namespace: string): TModelState;

  /**
   * Non-hook: Get dispatchers for a specific model
   * @param namespace - Model namespace identifier
   */
  getModelDispatchers<TModelDispatchers = any>(namespace: string): TModelDispatchers;

  /**
   * HOC: Inject model state and dispatchers into component
   * @param namespace - Model namespace identifier
   * @param propsMapper - Optional function to map [state, dispatchers] to component props
   */
  withModel(namespace: string, propsMapper?: PropsMapper<[any, any]>): HOC;

  /**
   * HOC: Inject model dispatchers into component
   * @param namespace - Model namespace identifier
   * @param propsMapper - Optional function to map dispatchers to component props
   */
  withModelDispatchers(namespace: string, propsMapper?: PropsMapper<any>): HOC;

  /**
   * HOC: Inject model effects state into component
   * @param namespace - Model namespace identifier
   * @param propsMapper - Optional function to map effects state to component props
   */
  withModelEffectsState(namespace: string, propsMapper?: PropsMapper<EffectsStateMap>): HOC;

  /**
   * HOC: Inject model effects error states into component
   * @param namespace - Model namespace identifier
   * @param propsMapper - Optional function to map error states to component props
   */
  withModelEffectsError(namespace: string, propsMapper?: PropsMapper<EffectsErrorMap>): HOC;

  /**
   * HOC: Inject model effects loading states into component
   * @param namespace - Model namespace identifier
   * @param propsMapper - Optional function to map loading states to component props
   */
  withModelEffectsLoading(namespace: string, propsMapper?: PropsMapper<EffectsLoadingMap>): HOC;
}

/**
 * Plugin configuration
 */
interface PluginConfig {
  /**
   * Called when the store is created
   * @param store - Redux store instance
   * @returns Plugin utilities object
   */
  onStoreCreated<TState = any, TDispatch = any>(
    store: Store<TState, TDispatch>
  ): PluginResult<TState, TDispatch>;
}

/**
 * Create the Redux model hooks and HOCs plugin
 * 
 * This plugin extends Redux/Rematch stores with a comprehensive set of hooks
 * and higher-order components for accessing model state, dispatchers, and
 * effects metadata (loading/error states) in React components.
 * 
 * @returns Plugin configuration object
 */
export default function createPlugin(): PluginConfig;