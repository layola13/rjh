/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Rotation angle in degrees
   */
  rotate?: number;
  
  /**
   * Spin animation enabled
   */
  spin?: boolean;
  
  /**
   * Additional props passed to the underlying element
   */
  [key: string]: unknown;
}

/**
 * Icon component props extending base props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon definition object containing SVG paths and metadata
   */
  icon?: {
    name: string;
    theme: string;
    icon: {
      tag: string;
      attrs: Record<string, unknown>;
      children: unknown[];
    };
  };
}

/**
 * Forwarded ref type for icon component
 */
export type IconRef = HTMLSpanElement | null;

/**
 * Icon component with forwarded ref support
 * Wraps the base icon implementation with proper TypeScript typing
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

export default IconComponent;