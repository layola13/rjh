/**
 * Module: module_253941
 * Original ID: 253941
 * 
 * React icon component wrapper that forwards refs to a default icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size in pixels or as a string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *