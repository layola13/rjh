/**
 * React component wrapper for an icon component
 * 
 * This module exports a forwarded ref icon component that combines
 * props with a predefined icon definition.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props combining base props with ref attributes
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component
 * 
 * A React component that renders an SVG icon with forwarded ref support.
 * The component merges user-provided props with a predefined icon definition
 * and passes them to the underlying icon renderer.
 * 
 * @example
 *