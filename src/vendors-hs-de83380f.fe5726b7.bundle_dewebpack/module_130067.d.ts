/**
 * Icon component module
 * Wraps an icon with forwarded ref support
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard React component props
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon style properties
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
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the icon wrapper
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;