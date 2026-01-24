/**
 * Icon component module with forwarded ref support
 * 
 * This module exports a React component that wraps a base icon component
 * with forwarded ref functionality for better component composition.
 */

import React from 'react';

/**
 * Props interface for the icon component
 * Extends standard HTML attributes and React component props
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  
  /** Icon color, supports CSS color values */
  color?: string;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Custom icon data or configuration */
  icon?: unknown;
  
  /** Additional props passed to the underlying component */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref
 * 
 * A React component that renders an icon with support for ref forwarding,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *