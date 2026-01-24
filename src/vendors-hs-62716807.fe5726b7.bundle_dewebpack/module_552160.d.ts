/**
 * Size context for managing component size variants
 * @module SizeContext
 */

import React from 'react';

/**
 * Supported size variants for components
 */
export type Size = 'small' | 'medium' | 'large' | 'default';

/**
 * Context value type for size management
 */
export type SizeContextValue = Size | undefined;

/**
 * Props for the SizeContextProvider component
 */
export interface SizeContextProviderProps {
  /**
   * Child components to be wrapped by the provider
   */
  children: React.ReactNode;
  
  /**
   * Size value to be provided to descendants
   * If not specified, inherits from parent context
   */
  size?: Size;
}

/**
 * React context for managing component size throughout the component tree
 */
declare const SizeContext: React.Context<SizeContextValue>;

/**
 * Provider component for size context
 * Allows child components to access and inherit size configuration
 * 
 * @param props - Component props
 * @returns React element that provides size context to children
 * 
 * @example
 *