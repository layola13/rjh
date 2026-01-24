/**
 * Icon component module
 * Exported React component with forwardRef support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props interface for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional arbitrary props that will be spread onto the root element
   */
  [key: string]: unknown;
}

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * @example
 *