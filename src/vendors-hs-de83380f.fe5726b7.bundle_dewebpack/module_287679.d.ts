/**
 * React component for rendering an icon using a forwardRef pattern.
 * This module exports a forwarded ref icon component.
 * 
 * @module IconComponent
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element attributes.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Optional style object
   */
  style?: React.CSSProperties;
  
  /**
   * Optional size for the icon
   */
  size?: number | string;
  
  /**
   * Optional color for the icon
   */
  color?: string;
  
  /**
   * Any additional props to pass to the underlying component
   */
  [key: string]: any;
}

/**
 * Icon component data structure from the imported icon definition
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * Icon theme (outlined, filled, etc.)
   */
  theme?: string;
  
  /**
   * SVG path data or icon configuration
   */
  icon: any;
}

/**
 * Forwarded ref icon component type.
 * Allows ref forwarding to the underlying SVG element.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * @remarks
 * This component wraps an icon definition and allows ref forwarding
 * to the underlying SVG element for direct DOM manipulation.
 * 
 * @example
 *