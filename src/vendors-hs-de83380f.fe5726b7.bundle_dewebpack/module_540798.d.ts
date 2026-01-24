/**
 * React Icon Component Module
 * 
 * This module exports a React icon component that wraps a base icon component
 * with forwarded refs for DOM manipulation and styling.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props interface for the Icon component
 * Extends standard React element attributes and allows any additional props
 */
export interface IconProps extends Record<string, unknown> {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Optional size prop for icon dimensions */
  size?: number | string;
  /** Optional color prop for icon fill/stroke */
  color?: string;
  /** Any other props that can be passed to the underlying component */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support
 * Allows parent components to access the underlying DOM element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<HTMLElement>
>;

/**
 * Default exported icon component with ref forwarding capability
 * 
 * This component wraps the base icon implementation with React.forwardRef,
 * enabling parent components to obtain a ref to the underlying DOM element.
 * 
 * @example
 *