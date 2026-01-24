/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Additional aria label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component props combining base props with standard SVG attributes
 */
export interface IconProps extends IconBaseProps, React.SVGAttributes<SVGElement> {}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon definition with React.forwardRef for ref forwarding
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;