/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component
 * Extends any additional props passed to the underlying icon element
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional attributes */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 * Typically refers to the underlying SVG element
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Forward ref icon component type
 * Combines the component props with ref attributes
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: A forwarded ref icon component
 * 
 * This component wraps an icon implementation with React.forwardRef,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *