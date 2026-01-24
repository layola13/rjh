/**
 * Module: module_559558
 * Original ID: 559558
 * 
 * Icon component wrapper that forwards refs to an underlying icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends all standard component props without ref.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<any> {
  /** Additional CSS class name */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @remarks
 * This component wraps an icon definition and provides ref forwarding capability.
 * It merges passed props with the default icon configuration.
 * 
 * @example
 *