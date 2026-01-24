/**
 * React Icon Component Module
 * 
 * A forwarded ref icon component that wraps a base icon component with additional props.
 * This module exports a React component that renders an icon using a reusable icon wrapper.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *