import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props extending standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
  
  /**
   * Rotation angle in degrees
   */
  rotate?: number;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component type
 * A React component that renders an SVG icon with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This component wraps an SVG icon definition with React.forwardRef
 * allowing parent components to access the underlying SVG element
 * 
 * @example
 *