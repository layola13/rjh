/**
 * Module: module_210040
 * Icon component wrapper with forwarded ref
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconComponentProps {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component combining base props with icon data
 */
export interface IconWrapperProps extends IconComponentProps {
  /**
   * Icon data/configuration from imported icon module
   */
  icon?: unknown;
}

/**
 * Forwarded ref type for icon components
 */
export type IconRef = HTMLElement | SVGSVGElement | null;

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps icon data with a ref-forwarding wrapper component.
 * It merges props from parent with icon-specific configuration.
 * 
 * @example
 *