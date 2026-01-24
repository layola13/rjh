/**
 * Icon component module
 * Exports a forwardRef-wrapped React component that renders an icon
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element props
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Props for the icon component including ref
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 * A forwardRef component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default export: Icon component with ref forwarding support
 * 
 * @example
 *