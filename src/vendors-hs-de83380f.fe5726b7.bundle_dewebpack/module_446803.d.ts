/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
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
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying SVG element
   */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Forwarded ref to the underlying SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A React component that renders an SVG icon with forwarded ref support
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;