/**
 * Icon component module
 * 
 * This module exports a React icon component that wraps a base icon component
 * with forwarded ref support for better DOM integration.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Accessible title for screen readers
   */
  title?: string;
  
  /**
   * Custom styles to apply to the SVG element
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * A React component that renders an SVG icon with support for ref forwarding,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *