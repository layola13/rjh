/**
 * React context module for managing shared state across components.
 * Provides a context provider component and context instance.
 * @module Context
 */

import { ReactNode, ReactElement, Context as ReactContext, createContext } from 'react';

/**
 * Props for the Context Provider component.
 * @template T - The type of the context value
 */
export interface ContextProviderProps<T = Record<string, unknown>> {
  /** Child components to be wrapped by the provider */
  children: ReactNode;
  /** Additional props that will be passed as context value */
  [key: string]: unknown;
}

/**
 * The default context value type.
 * Can be extended to include specific properties needed by the application.
 */
export type ContextValue = Record<string, unknown>;

/**
 * React Context instance for sharing state across the component tree.
 * Initialized with an empty object as the default value.
 */
export const Context: ReactContext<ContextValue> = createContext<ContextValue>({});

/**
 * Context Provider component that wraps children and provides context value.
 * All props except 'children' are passed as the context value.
 * 
 * @example
 *