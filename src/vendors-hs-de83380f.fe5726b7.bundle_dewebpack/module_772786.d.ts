/**
 * Icon component module
 * Provides a forwardRef wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Base properties for the icon component
 */
export interface IconComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon spin animation */
  spin?: boolean;
  /** Icon rotation angle */
  rotate?: number;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *