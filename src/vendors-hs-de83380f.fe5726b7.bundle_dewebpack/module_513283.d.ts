import * as React from 'react';

/**
 * Icon component properties
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or CSS string value
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
   * Icon style object
   */
  style?: React.CSSProperties;
}

/**
 * Forwarded ref icon component
 * A React component that renders an icon with forwarded ref support
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded React ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;