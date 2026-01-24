/**
 * Module: module_400731
 * Original ID: 400731
 * 
 * Icon component wrapper that forwards refs and applies default icon configuration.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends any additional properties passed to the underlying icon implementation.
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional props spread to the component */
  [key: string]: unknown;
}

/**
 * Forwarded ref type for the icon component.
 */
export type IconRef = React.Ref<HTMLElement>;

/**
 * Icon component that wraps a base icon implementation with ref forwarding.
 * 
 * @param props - Component props including icon configuration
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element representing the icon
 * 
 * @example
 *