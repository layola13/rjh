/**
 * React icon component module
 * 
 * This module exports a forward-ref enabled icon component that wraps
 * a base icon component with additional props.
 */

import React from 'react';

/**
 * Props for the icon component
 * Extends standard React component props and ref forwarding
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Custom className for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Aria label for accessibility */
  'aria-label'?: string;
}

/**
 * Forward-ref enabled icon component
 * 
 * @example
 *