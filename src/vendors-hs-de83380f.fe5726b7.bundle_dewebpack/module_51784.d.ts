/**
 * React icon component wrapper
 * Wraps an icon definition with React.forwardRef for ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * SVG tag name (typically 'svg')
   */
  tag: string;
  
  /**
   * SVG attributes (viewBox, fill, etc.)
   */
  attr: Record<string, unknown>;
  
  /**
   * Child elements of the icon
   */
  child: Array<{
    tag: string;
    attr: Record<string, unknown>;
    child?: unknown[];
  }>;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /**
   * Icon definition object
   */
  icon: IconDefinition;
  
  /**
   * Forwarded ref to the SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type with forwardRef support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward-ref enabled icon component
 * Renders an SVG icon with support for ref forwarding and customizable props
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;