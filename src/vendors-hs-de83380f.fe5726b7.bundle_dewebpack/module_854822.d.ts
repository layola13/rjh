import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Icon size in pixels or CSS unit
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component type
 * A React component that renders an SVG icon with forwarded ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This component wraps the base icon with additional props and ref forwarding capability
 * 
 * @example
 *