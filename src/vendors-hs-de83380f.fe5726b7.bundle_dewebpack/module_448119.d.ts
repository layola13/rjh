/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML/SVG element attributes
 */
export interface IconComponentProps {
  /** Custom className for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Aria label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * Wraps an icon definition with configurable props
 * 
 * @example
 *