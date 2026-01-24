/**
 * Module: module_409117
 * Original ID: 409117
 * 
 * Icon component with forwarded ref support
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
  /** Icon style */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref
 * 
 * @example
 *