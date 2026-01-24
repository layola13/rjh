/**
 * React component for an icon with forwarded ref support.
 * 
 * This module exports a React functional component that wraps an icon component
 * with ref forwarding capability, allowing parent components to access the
 * underlying DOM element.
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and allows custom attributes.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (if supported by the underlying icon component)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional custom props
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding.
 * 
 * This component wraps a base icon component and forwards refs to allow
 * direct access to the underlying DOM element from parent components.
 * 
 * @example
 *