/**
 * Icon component module
 * Re-exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * Wraps the base icon implementation with React.forwardRef
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;