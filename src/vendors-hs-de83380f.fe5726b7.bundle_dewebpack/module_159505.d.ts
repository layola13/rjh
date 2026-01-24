/**
 * React Icon Component Module
 * 
 * This module exports a forwardRef-wrapped React component that renders an icon.
 * It combines props with an icon configuration and passes them to a base component.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props interface for the icon component
 * Extends standard HTML element attributes with additional icon-specific properties
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles for the icon element
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (typically in pixels or as a string like "1em")
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Title attribute for accessibility
   */
  title?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Icon reference type - typically an SVG or HTML element
 */
export type IconRef = SVGSVGElement | HTMLElement;

/**
 * Main icon component type with forward ref support
 * 
 * This component accepts icon props and forwards refs to the underlying DOM element.
 * It automatically injects icon configuration from imported icon data.
 * 
 * @example
 *