/**
 * Icon component module
 * 
 * This module exports a forward-ref React component that wraps an icon implementation.
 * It merges props with a default icon configuration and forwards the ref to the underlying component.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component
 * Extends standard HTML element props and allows custom attributes
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon identifier or configuration
   */
  icon?: unknown;
  
  /**
   * Size of the icon (width/height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Whether the icon is decorative (hidden from screen readers)
   */
  'aria-hidden'?: boolean | 'true' | 'false';
  
  /**
   * Custom data attributes and other props
   */
  [key: string]: unknown;
}

/**
 * Forward ref component type for the icon
 * Accepts a ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward-ref React component that renders an icon
 * 
 * @example
 *