/**
 * Icon Component Module
 * 
 * A React icon component that wraps a base icon with forwarded ref support.
 * This module provides a forwardRef-wrapped icon component for use in React applications.
 */

import * as React from 'react';

/**
 * Properties for the icon component.
 * Extends standard SVG attributes and allows custom props to be passed through.
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
   * Icon color (fill/stroke)
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Any other SVG or HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support.
 * 
 * This component renders an SVG icon and forwards refs to the underlying element,
 * enabling direct DOM access and imperative operations.
 * 
 * @example
 *