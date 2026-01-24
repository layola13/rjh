import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Icon size in pixels or CSS unit string
   * @default undefined
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles for the icon
   */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component type
 * Combines the component props with ref attributes for SVGSVGElement
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward ref component that renders an SVG icon with customizable props
 * 
 * @example
 *