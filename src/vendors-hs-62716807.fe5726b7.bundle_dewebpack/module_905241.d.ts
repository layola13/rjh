/**
 * Size context provider for managing component size state across React component tree.
 * Allows nested components to inherit or override size values from parent contexts.
 * @module SizeContext
 */

import { ReactNode, Context } from 'react';

/**
 * Supported size variants for components
 */
export type Size = 'small' | 'medium' | 'large' | 'default' | undefined;

/**
 * Props for the SizeContextProvider component
 */
export interface SizeContextProviderProps {
  /**
   * Child components that will have access to the size context
   */
  children: ReactNode;
  
  /**
   * Size value to provide to child components.
   * If undefined, will inherit from parent SizeContextProvider.
   */
  size?: Size;
}

/**
 * Context for sharing size values throughout the component tree.
 * Default value is undefined, allowing for optional size inheritance.
 */
declare const SizeContext: Context<Size>;

/**
 * Provider component that supplies size context to its descendants.
 * Supports nested providers where child providers can override parent values.
 * 
 * @param props - Component properties
 * @returns React element wrapping children with size context
 * 
 * @example
 *