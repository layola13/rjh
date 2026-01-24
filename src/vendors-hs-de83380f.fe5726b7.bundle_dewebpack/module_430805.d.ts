/**
 * React Icon Component Module
 * 
 * This module exports a forward ref icon component that wraps an icon
 * with configurable properties.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for the icon component
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
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
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props with ref support
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component that renders an SVG icon
 * 
 * @example
 *