/**
 * Icon component module
 * Wraps an icon component with React.forwardRef for ref forwarding
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Additional CSS class name */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Custom style overrides */
  style?: React.CSSProperties;
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *