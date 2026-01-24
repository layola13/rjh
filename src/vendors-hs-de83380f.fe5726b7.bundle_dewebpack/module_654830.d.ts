/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconProps {
  /** Icon size in pixels or CSS size value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon rotation in degrees */
  rotate?: number;
  /** Spin animation */
  spin?: boolean;
  /** Any other HTML attributes */
  [key: string]: unknown;
}

/**
 * Internal icon configuration object
 */
export interface IconConfig {
  /** Icon name identifier */
  name: string;
  /** SVG path data or icon definition */
  data: string | object;
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Default icon size */
  defaultSize?: number;
}

/**
 * Props combined with ref for the forwarded component
 */
export type IconComponentProps = IconProps & RefAttributes<HTMLElement>;

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *