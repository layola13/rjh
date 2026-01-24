/**
 * React Icon Component Module
 * 
 * This module exports a forwardRef-wrapped icon component that combines
 * props with a predefined icon definition.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element attributes and supports custom styling
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Icon component with ref forwarding support
 * 
 * A React component that renders an SVG icon with customizable properties.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *