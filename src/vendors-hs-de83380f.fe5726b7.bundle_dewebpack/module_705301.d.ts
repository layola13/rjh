/**
 * React icon component wrapper
 * Wraps an icon definition with React.forwardRef for ref forwarding support
 */

import type React from 'react';

/**
 * Props for the icon component
 * Extends all standard SVG attributes and React ref forwarding
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Icon component type with ref forwarding support
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward-ref wrapped React component that renders an SVG icon
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;