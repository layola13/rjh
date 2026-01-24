/**
 * Configuration context and consumer utilities for component configuration management.
 * Provides prefix class name generation and empty state rendering.
 */

import type { ComponentType, Context, Consumer } from 'react';

/**
 * Configuration context value interface
 */
export interface ConfigContextValue {
  /**
   * Get the prefixed class name for a component
   * @param componentPrefix - Component-specific prefix (e.g., 'button', 'input')
   * @param customPrefix - Optional custom prefix to override default
   * @returns The fully prefixed class name (e.g., 'ant-button')
   */
  getPrefixCls: (componentPrefix?: string, customPrefix?: string) => string;

  /**
   * Render function for empty state content
   * @returns React element to display when content is empty
   */
  renderEmpty: () => React.ReactElement;
}

/**
 * Props injected by the withConfigConsumer HOC
 */
export interface ConfigConsumerProps {
  /**
   * The computed prefix class name for the component
   */
  prefixCls?: string;
}

/**
 * Options for the withConfigConsumer HOC
 */
export interface WithConfigConsumerOptions {
  /**
   * Default prefix class name for the component
   */
  prefixCls: string;
}

/**
 * React context for configuration management
 */
export const ConfigContext: Context<ConfigContextValue>;

/**
 * Consumer component for accessing configuration context
 */
export const ConfigConsumer: Consumer<ConfigContextValue>;

/**
 * Higher-order component that injects configuration context into a component
 * 
 * @param options - Configuration options including default prefixCls
 * @returns HOC function that wraps the target component
 * 
 * @example
 *