import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
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
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Icon title for tooltips
   */
  title?: string;
}

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * This component:
 * - Accepts all standard SVG props
 * - Supports ref forwarding to the underlying SVG element
 * - Renders a specific icon from the icon library
 * 
 * @example
 *