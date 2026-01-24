/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Props for the icon component
 * Extends any additional props that can be passed to the underlying icon implementation
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional props spread to the underlying component */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *