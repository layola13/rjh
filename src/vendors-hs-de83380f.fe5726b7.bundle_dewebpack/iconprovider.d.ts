/**
 * Icon provider module for managing icon configurations and context.
 * Provides IconProvider component and utility functions for icon font integration.
 */

import type { Context, Provider } from 'react';

/**
 * Configuration options for custom icon fonts from iconfont.cn
 */
export interface IconFontConfig {
  /**
   * Script URL pointing to the iconfont.cn generated JavaScript file
   */
  scriptUrl: string;
  
  /**
   * Optional extra props to be passed to the icon component
   */
  extraCommonProps?: Record<string, any>;
}

/**
 * Props for IconProvider component
 */
export interface IconProviderProps {
  /**
   * Icon configuration value to be provided to consumers
   */
  value?: IconContextValue;
  
  /**
   * Child components that will have access to the icon context
   */
  children?: React.ReactNode;
}

/**
 * Context value structure for icon configuration
 */
export interface IconContextValue {
  /**
   * Prefix for icon class names
   */
  prefixCls?: string;
  
  /**
   * Root class name for icon wrapper
   */
  rootClassName?: string;
  
  /**
   * Custom icon font script URL
   */
  scriptUrl?: string | string[];
  
  /**
   * Additional properties passed to all icon instances
   */
  extraCommonProps?: Record<string, any>;
}

/**
 * React Context Provider component for icon configuration.
 * Wraps child components to provide icon-related context values.
 */
export const IconProvider: Provider<IconContextValue>;

/**
 * Creates a custom Icon component that uses iconfont.cn resources.
 * 
 * @param config - Configuration object containing scriptUrl and optional extra props
 * @returns A React component that renders icons from the specified iconfont.cn script
 * 
 * @example
 *