/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component
 * Extends base icon properties with custom configurations
 */
export interface IconComponentProps {
  /** Icon identifier or configuration */
  icon?: any;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional props spread to the underlying component */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *