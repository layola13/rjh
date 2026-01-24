/**
 * React component wrapper for an icon component.
 * This module creates a forwarded ref icon component using a base icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element props to support icon customization.
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color, defaults to currentColor */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support.
 * Wraps the base icon implementation with React.forwardRef for ref forwarding.
 * 
 * @example
 *