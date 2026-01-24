/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import React from 'react';

/**
 * Props for the icon component
 * Extends standard React component props and allows for custom icon configuration
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon name or identifier */
  icon?: string | React.ComponentType;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @param props - Component properties
 * @param ref - Forwarded React ref
 * @returns React element representing the icon
 * 
 * @example
 *