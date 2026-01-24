/**
 * React component that wraps an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped component that renders an icon element.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard element props with icon-specific properties.
 */
interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon definition object containing SVG path data and metadata
   */
  icon?: IconDefinition;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
}

/**
 * Icon definition structure containing SVG metadata
 */
interface IconDefinition {
  /**
   * Icon prefix (e.g., 'fas', 'far', 'fab')
   */
  prefix?: string;
  
  /**
   * Icon name
   */
  iconName?: string;
  
  /**
   * SVG viewBox dimensions [width, height, ...]
   */
  icon?: [number, number, unknown[], string, string | string[]];
}

/**
 * Ref type for the icon component (typically an SVGSVGElement)
 */
type IconRef = SVGSVGElement;

/**
 * Forward ref component that renders an icon with the provided props and ref.
 * 
 * @param props - Component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns Rendered icon component
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

export default IconComponent;

/**
 * Type alias for the exported component
 */
export type { IconComponentProps, IconDefinition, IconRef };