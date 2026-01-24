/**
 * Icon component module
 * 
 * This module exports a React icon component that wraps a base icon
 * with forwarded ref support for use in React applications.
 * 
 * @module IconComponent
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard React component props with icon-specific properties
 */
export interface IconProps extends Record<string, unknown> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Base icon configuration interface
 * Defines the structure of the imported icon data
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG path data or icon content
   */
  icon: string | ComponentType<IconProps>;
  
  /**
   * Optional icon metadata
   */
  metadata?: {
    width?: number;
    height?: number;
    viewBox?: string;
  };
}

/**
 * Icon component with forwarded ref
 * 
 * This component renders an icon with the ability to forward refs
 * to the underlying DOM element, enabling parent components to 
 * access the icon's DOM node directly.
 * 
 * @example
 *