/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export interface IconRef extends HTMLElement {}

/**
 * Icon component props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * Forward ref icon component type
 * Wraps an icon definition with React.forwardRef for ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default export: Icon component with forwarded ref
 * Renders an icon element with customizable props and ref support
 * 
 * @example
 *