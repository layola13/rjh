/**
 * Icon Component Module
 * 
 * This module exports a React forwardRef component that wraps an icon element.
 * The component accepts standard React props and forwards refs to the underlying icon implementation.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Base properties for the icon component, extending standard HTML SVG element attributes
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
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
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Icon component type definition
 * 
 * A forwardRef component that renders an SVG icon with customizable properties.
 * Forwards refs to allow parent components to access the underlying SVG element.
 * 
 * @example
 *