/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility title */
  title?: string;
  /** Spin animation */
  spin?: boolean;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Icon component with ref forwarding support
 * @example
 *