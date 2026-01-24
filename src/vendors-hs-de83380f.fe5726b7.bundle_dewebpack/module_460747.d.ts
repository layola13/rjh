/**
 * Icon component module
 * Wraps a base icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for icon components
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color, accepts CSS color values
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for the icon
   */
  title?: string;
  
  /**
   * Accessibility description for the icon
   */
  desc?: string;
}

/**
 * Icon component properties with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * Accepts standard SVG props and forwards refs to the underlying SVG element
 * 
 * @example
 *