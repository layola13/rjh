/**
 * Rematch store provider plugin
 * Provides React context integration for Rematch store with initial state support
 */

import type { ReactNode } from 'react';
import type { RematchDispatch, RematchRootState, Models } from '@rematch/core';

/**
 * Plugin configuration options
 */
interface PluginConfig {
  /** React context object for the store provider */
  context?: React.Context<any>;
}

/**
 * Initial states mapping for models
 * Keys are model names, values are their initial state objects
 */
type InitialStates<M extends Models> = {
  [K in keyof M]?: RematchRootState<M>[K];
};

/**
 * Provider component props
 */
interface ProviderProps<M extends Models> {
  /** Child components to render within the provider */
  children: ReactNode;
  /** Optional initial states for store models */
  initialStates?: InitialStates<M>;
}

/**
 * Enhanced store with provider component
 */
interface EnhancedStore<M extends Models> {
  /** React provider component for the store */
  Provider: React.ComponentType<ProviderProps<M>>;
  /** React context used by the provider */
  context: React.Context<any>;
}

/**
 * Plugin hook result
 */
interface PluginHooks<M extends Models> {
  /**
   * Hook called after store creation
   * @param store - The created Rematch store
   * @returns Enhanced store with Provider component and context
   */
  onStoreCreated(store: {
    dispatch: RematchDispatch<M>;
    [key: string]: any;
  }): EnhancedStore<M>;
}

/**
 * Creates a Rematch plugin that provides React context integration
 * 
 * @param config - Plugin configuration
 * @returns Plugin hooks object
 * 
 * @example
 *