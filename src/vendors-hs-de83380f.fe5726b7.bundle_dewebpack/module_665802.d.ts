import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This is a React forward ref component that wraps an SVG icon definition
 * 
 * @example
 *