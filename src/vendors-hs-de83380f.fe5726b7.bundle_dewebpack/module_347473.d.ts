/**
 * React component that renders an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped icon component.
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props with icon-specific properties.
 */
export interface IconComponentProps {
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
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Icon data configuration object
 */
export interface IconDefinition {
  /**
   * Icon name or identifier
   */
  name: string;
  
  /**
   * SVG path data or icon content
   */
  content: string | React.ReactNode;
  
  /**
   * ViewBox dimensions for SVG
   */
  viewBox?: string;
  
  /**
   * Additional icon metadata
   */
  [key: string]: any;
}

/**
 * ForwardRef component type that renders an icon element.
 * Accepts props and forwards ref to the underlying DOM element.
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the icon element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;