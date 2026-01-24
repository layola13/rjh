/**
 * React Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwardRef support.
 * The component accepts all standard props and forwards refs to the underlying element.
 */

import React from 'react';

/**
 * Props for the Icon component
 * Extends the base icon component props
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessibility title for the icon
   */
  title?: string;
  
  /**
   * Additional custom props
   */
  [key: string]: unknown;
}

/**
 * Forward ref icon component
 * 
 * A React component that renders an icon with ref forwarding capability.
 * This allows parent components to access the underlying DOM element.
 * 
 * @example
 *