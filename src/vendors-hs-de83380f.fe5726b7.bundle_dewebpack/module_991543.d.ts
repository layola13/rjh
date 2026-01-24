/**
 * Icon component module
 * 
 * This module exports a forwarded ref icon component wrapper.
 * The component wraps an icon element with additional props.
 */

import * as React from 'react';

/**
 * Props for the Icon component
 * Extends standard React component props and accepts any additional attributes
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
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
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Any additional props to pass to the underlying component
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * This is a React component that renders an icon using the forwardRef pattern,
 * allowing parent components to access the underlying DOM element.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the icon element
 * 
 * @example
 *