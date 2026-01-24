/**
 * React icon component module
 * Wraps an icon with forwardRef support
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Custom class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Accessible label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props combining base props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forward-ref wrapped icon component
 * Renders an SVG icon with customizable properties
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;