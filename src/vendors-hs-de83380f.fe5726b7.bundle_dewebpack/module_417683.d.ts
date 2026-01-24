/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props and ref handling capabilities.
 */

import * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element attributes and React ref forwarding.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Custom className for styling */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: string | number;
  /** Icon color, defaults to currentColor */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  /** Additional aria attributes for accessibility */
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  /** Custom role attribute */
  role?: string;
}

/**
 * Forwarded ref type for the icon component.
 * Allows parent components to access the underlying SVG element.
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * 
 * This component renders an SVG icon with customizable props and
 * forwards refs to the underlying SVG element for direct DOM access.
 * 
 * @example
 *