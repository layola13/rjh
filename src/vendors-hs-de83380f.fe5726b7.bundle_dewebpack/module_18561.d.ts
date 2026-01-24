/**
 * React icon component with forwarded ref support
 * @module IconComponent
 */

import type { ForwardedRef, ReactElement, RefAttributes } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentBaseProps {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export type IconComponentProps = IconComponentBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type with forwarded ref
 */
export type IconComponent = (
  props: IconComponentProps
) => ReactElement | null;

/**
 * Forwarded ref icon component
 * Renders an SVG icon with customizable properties and ref forwarding support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;