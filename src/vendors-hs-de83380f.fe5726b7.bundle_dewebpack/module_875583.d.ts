/**
 * React component for rendering an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and custom icon properties.
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
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional props passed to the underlying icon component */
  [key: string]: unknown;
}

/**
 * Internal icon data structure.
 * Contains the SVG path data and metadata for the icon.
 */
export interface IconData {
  /** Icon name or identifier */
  name?: string;
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data */
  path?: string | string[];
  /** Icon category or theme */
  theme?: string;
  [key: string]: unknown;
}

/**
 * Ref type for the icon component.
 * Points to the underlying SVG element.
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with ref forwarding support.
 * Renders an icon based on the provided icon data and props.
 * 
 * @example
 *