/**
 * React Icon Component Module
 * 
 * This module exports a forward-ref enabled React component that wraps
 * a base icon component with additional props merging capabilities.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props interface for the icon component
 * Extends standard SVG element props while allowing custom extensions
 */
interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
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
   * Internal icon data (typically not set by consumers)
   * @internal
   */
  icon?: unknown;
}

/**
 * Props type for the forwarded icon component
 */
type IconComponentProps = IconBaseProps;

/**
 * Ref type - accepts SVG element refs
 */
type IconComponentRef = SVGSVGElement;

/**
 * Forward-ref enabled icon component
 * 
 * @example
 *