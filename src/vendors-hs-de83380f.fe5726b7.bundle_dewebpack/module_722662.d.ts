/**
 * React component module for an icon wrapper.
 * This module provides a forwarded ref icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard HTML element props with icon-specific attributes.
 */
interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Size of the icon (width and height in pixels)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional SVG properties
   */
  [key: string]: unknown;
}

/**
 * Icon definition type containing SVG path data and metadata
 */
interface IconDefinition {
  /**
   * SVG path data or element tree
   */
  icon: unknown;
  
  /**
   * Icon name/identifier
   */
  iconName?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
  
  /**
   * Additional icon metadata
   */
  [key: string]: unknown;
}

/**
 * Forwarded ref icon component.
 * Wraps an icon definition with React forwardRef for ref forwarding capability.
 * 
 * @example
 *