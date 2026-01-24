/**
 * React component that wraps an icon with forwarded ref support.
 * This module provides a default exported component that renders an icon using a default icon configuration.
 * 
 * @module IconComponent
 */

import React from 'react';

/**
 * Props interface for the icon component.
 * Extends standard React component props and allows any additional properties to be passed through.
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
   * Icon size (if supported by the underlying icon implementation)
   */
  size?: number | string;
  
  /**
   * Icon color (if supported by the underlying icon implementation)
   */
  color?: string;
  
  /**
   * Any other props to be spread to the underlying component
   */
  [key: string]: any;
}

/**
 * Icon component type with forwarded ref support.
 * Accepts a ref that will be forwarded to the underlying DOM element or component.
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * Default exported icon component with ref forwarding.
 * 
 * This component merges provided props with a default icon configuration
 * and renders it using a base icon wrapper component.
 * 
 * @param props - Component props to be merged with default icon settings
 * @param ref - Forwarded ref to be attached to the rendered element
 * @returns A React element rendering the configured icon
 * 
 * @example
 *