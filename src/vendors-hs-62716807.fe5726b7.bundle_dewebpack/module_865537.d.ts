/**
 * Size context provider for managing size state across React components.
 * Provides a context-based approach to propagate size information down the component tree.
 */

import type { Context, ReactNode, ReactElement } from 'react';

/**
 * Valid size values that can be used throughout the application.
 * "default" represents the standard/medium size.
 */
export type SizeValue = 'default' | 'small' | 'medium' | 'large';

/**
 * Props for the SizeContextProvider component.
 */
export interface SizeContextProviderProps {
  /**
   * Child components that will have access to the size context.
   */
  children: ReactNode;
  
  /**
   * The size value to be provided to descendants.
   * If undefined, inherits the size from parent context.
   */
  size?: SizeValue;
}

/**
 * Context provider component that manages and distributes size configuration
 * throughout the component tree. Supports nested providers with size inheritance.
 * 
 * @param props - Component props containing children and optional size value
 * @returns A React element wrapping children with size context
 * 
 * @example
 *