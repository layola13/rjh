/**
 * React icon component wrapper
 * Forwards ref to underlying icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color, accepts any valid CSS color value */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconProps extends IconBaseProps {
  /** Reference to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A forwarded ref component that renders an SVG icon
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with ref forwarding
 * 
 * @example
 *