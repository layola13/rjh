/**
 * React component module that wraps an icon component with forwarded ref support.
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard HTML element props with custom icon configuration.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color, supports CSS color values */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon rotation angle in degrees */
  rotate?: number;
  /** Whether to flip the icon horizontally */
  flip?: boolean;
  /** Custom icon data or configuration */
  icon?: unknown;
}

/**
 * Icon component with ref forwarding support.
 * Wraps the base icon implementation with additional props and ref handling.
 * 
 * @example
 *