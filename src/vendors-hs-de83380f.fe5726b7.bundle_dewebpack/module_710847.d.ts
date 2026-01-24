/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style override
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Forwarded ref to the SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon data structure containing SVG path data
 */
export interface IconDefinition {
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path?: string | React.ReactNode;
  
  /**
   * Icon name identifier
   */
  name?: string;
}

/**
 * Forwarded ref icon component type
 * Wraps an icon definition with React.forwardRef for ref forwarding
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an icon definition and forwards refs to the underlying SVG element.
 * It merges user-provided props with the icon data from the imported icon definition.
 * 
 * @example
 *