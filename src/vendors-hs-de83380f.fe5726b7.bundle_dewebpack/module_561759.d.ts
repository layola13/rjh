/**
 * Icon component module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * It combines properties from the parent component with an icon prop.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon wrapper component
 */
export interface IconWrapperProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Size of the icon
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Any additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component type with forwarded ref
 */
export type IconComponent = ForwardRefExoticComponent<
  IconWrapperProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: A React forwardRef component that renders an icon
 * 
 * @example
 *