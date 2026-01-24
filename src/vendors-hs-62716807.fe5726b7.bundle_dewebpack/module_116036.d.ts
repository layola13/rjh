/**
 * Empty component configuration module
 * Provides default empty state components for various Ant Design components
 */

import type { ReactElement } from 'react';

/**
 * Component types that support customizable empty states
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
 * Renders an appropriate empty state component based on the component type
 * 
 * @param componentType - The type of component requesting an empty state
 * @returns A React element representing the empty state
 * 
 * @example
 *