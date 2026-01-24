/**
 * Icon component module
 * Exports a forwarded ref React component that wraps an icon
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element props with custom icon properties
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon data/configuration object
   */
  icon?: unknown;
  
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Optional style object
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional props spread to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component is created using React.forwardRef to allow ref forwarding
 * to the underlying DOM element or component.
 * 
 * @example
 *