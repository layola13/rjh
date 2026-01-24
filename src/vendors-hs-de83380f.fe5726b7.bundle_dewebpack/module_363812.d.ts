/**
 * React component that wraps an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped component that renders an icon using a default icon component.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard HTML element props while allowing custom icon configuration.
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * The icon data/definition to render
   */
  icon?: unknown;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Ref type that can be forwarded to the underlying icon element
 */
export type IconRef = SVGSVGElement | null;

/**
 * Forward ref component type for the icon wrapper.
 * Combines IconProps with ref attributes for proper TypeScript typing.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

/**
 * Default export: A forwardRef-wrapped icon component.
 * 
 * This component:
 * - Accepts all standard icon props
 * - Forwards refs to the underlying SVG element
 * - Merges user-provided props with default icon configuration
 * 
 * @example
 *