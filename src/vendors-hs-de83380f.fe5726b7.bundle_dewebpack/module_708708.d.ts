/**
 * React component that wraps an icon with forwarded ref support.
 * This module exports a forward ref component that renders an icon using a base component.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard HTML element properties and allows custom icon configuration.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional custom properties
   */
  [key: string]: unknown;
}

/**
 * The icon definition object containing path data and viewBox information
 */
export interface IconDefinition {
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path?: string | React.ReactNode;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Forward ref component type that renders an icon with the provided props.
 * Accepts a ref that will be forwarded to the underlying SVG element.
 * 
 * @example
 *