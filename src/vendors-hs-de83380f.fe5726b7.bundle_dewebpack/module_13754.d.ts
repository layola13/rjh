/**
 * Module: module_13754
 * Original ID: 13754
 * 
 * Icon component module that wraps a base icon component with forwarded refs.
 * Uses React.forwardRef to allow parent components to access the underlying DOM element.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and allows additional properties to be passed through.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (if supported by the underlying component)
   */
  size?: number | string;
  
  /**
   * Color of the icon (if supported by the underlying component)
   */
  color?: string;
  
  /**
   * Any additional props to pass through to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component that forwards refs to the underlying DOM element.
 * 
 * @param props - Component properties
 * @param ref - Forwarded ref to attach to the underlying element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;