/**
 * Configuration context consumer utilities for Ant Design components
 * Provides prefix class name management and empty state rendering
 */

import type { ComponentType, Context, Consumer } from 'react';

/**
 * Configuration context value interface
 */
export interface ConfigContextValue {
  /**
   * Get the prefixed class name for a component
   * @param componentName - The component name (e.g., 'button', 'input')
   * @param customPrefix - Custom prefix to override the default
   * @returns The fully prefixed class name (e.g., 'ant-button')
   */
  getPrefixCls: (componentName?: string, customPrefix?: string) => string;

  /**
   * Function to render empty state placeholder
   */
  renderEmpty: ComponentType<any>;
}

/**
 * Props for components wrapped with config consumer
 */
export interface WithConfigProps {
  /**
   * Custom prefix class name for the component
   */
  prefixCls?: string;
}

/**
 * Configuration for the HOC wrapper
 */
export interface ConfigConsumerConfig {
  /**
   * The default prefix class name for the component
   */
  prefixCls: string;
}

/**
 * React Context for Ant Design configuration
 * Provides global configuration values to all descendant components
 */
export declare const ConfigContext: Context<ConfigContextValue>;

/**
 * Consumer component for accessing configuration context
 * Use this to access config values in class components or render props patterns
 */
export declare const ConfigConsumer: Consumer<ConfigContextValue>;

/**
 * Higher-order component that injects configuration context into a component
 * Automatically handles prefix class name resolution
 * 
 * @param config - Configuration object containing default prefixCls
 * @returns A function that wraps a component with config consumer logic
 * 
 * @example
 *