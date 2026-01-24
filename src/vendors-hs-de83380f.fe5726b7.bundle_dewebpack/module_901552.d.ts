/**
 * Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * It uses a base icon component and applies additional props.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or CSS units
   * @default 24
   */
  size?: number | string;

  /**
   * Icon color (CSS color value)
   */
  color?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;

  /**
   * Icon rotation angle in degrees
   */
  rotate?: number;

  /**
   * Whether the icon should be mirrored horizontally
   */
  flip?: boolean;
}

/**
 * Icon component with ref forwarding support
 * 
 * A flexible icon component that renders SVG icons with customizable
 * properties including size, color, rotation, and more.
 * 
 * @example
 *