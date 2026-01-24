/**
 * React Icon Component Module
 * 
 * This module exports a forwardRef-wrapped icon component that combines
 * an icon with customizable props through a wrapper component.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Base props that can be passed to the icon component.
 * Extends standard React component props and allows for custom attributes.
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
   * Icon size (if supported by the underlying component)
   */
  size?: number | string;
  
  /**
   * Icon color (if supported by the underlying component)
   */
  color?: string;
  
  /**
   * Any additional props to pass through to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component type with forwardRef support.
 * 
 * This component wraps an icon definition with a reusable wrapper component,
 * allowing for ref forwarding and prop spreading.
 * 
 * @example
 *