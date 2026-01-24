/**
 * Module: module_538000
 * Original ID: 538000
 * 
 * This module exports a React component that wraps a base icon component
 * with a specific icon reference, utilizing React's forwardRef API.
 */

import type React from 'react';

/**
 * Props interface for the icon component
 * Extends standard React component props and supports ref forwarding
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
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
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Any additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support
 * 
 * @remarks
 * This is a forwarded ref component that renders an icon using a base icon component.
 * It merges provided props with a default icon configuration.
 * 
 * @param props - Component properties
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns A React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;