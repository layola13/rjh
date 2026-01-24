/**
 * Icon Component Module
 * 
 * A forwarded ref icon component that wraps a base icon with additional props.
 * This module provides a reusable icon component with React.forwardRef support.
 * 
 * @module IconComponent
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component
 * 
 * @template P - Additional props that can be passed to the component
 */
export interface IconComponentProps<P = Record<string, unknown>> extends RefAttributes<unknown> {
  /**
   * The icon data/configuration to be rendered
   */
  icon?: unknown;
  
  /**
   * Additional properties that will be spread onto the component
   */
  [key: string]: unknown;
}

/**
 * Base icon component type that receives props and renders an icon
 */
export type IconComponent = ComponentType<IconComponentProps>;

/**
 * Forward ref icon component
 * 
 * A React component that:
 * - Accepts a ref that will be forwarded to the underlying component
 * - Merges provided props with a default icon configuration
 * - Renders using a base icon component (imported from module 705764)
 * 
 * @example
 *