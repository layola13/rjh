/**
 * Default empty state component factory
 * 
 * Creates appropriate empty state components based on the component type.
 * Used internally by Ant Design components to show empty states when no data is available.
 * 
 * @module DefaultRenderEmpty
 */

import type { ReactElement } from 'react';

/**
 * Component type that can display empty states
 */
export type EmptyComponentType = 
  | 'Table'
  | 'List'
  | 'Select'
  | 'TreeSelect'
  | 'Cascader'
  | 'Transfer'
  | 'Mentions';

/**
 * Configuration consumer props from ConfigProvider context
 */
interface ConfigConsumerProps {
  /**
   * Get prefixed CSS class name
   * @param suffix - The suffix to append to the prefix
   * @returns The complete prefixed class name
   */
  getPrefixCls: (suffix: string) => string;
}

/**
 * Render function type for empty state based on component type
 * 
 * @param componentType - The type of component requesting an empty state
 * @returns A React element representing the empty state
 * 
 * @example
 *