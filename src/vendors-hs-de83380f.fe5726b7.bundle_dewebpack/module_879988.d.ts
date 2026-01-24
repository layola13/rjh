/**
 * React component for rendering an icon with forwarded ref support.
 * This module wraps an icon component with React.forwardRef for ref forwarding capabilities.
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and supports custom styling.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Size of the icon (width and height in pixels or as string) */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Icon rotation angle in degrees */
  rotate?: number;
  /** Whether the icon should spin/animate */
  spin?: boolean;
  /** Additional icon-specific properties */
  [key: string]: unknown;
}

/**
 * Ref type that can be forwarded to the underlying icon element.
 * Supports both SVG and HTML element refs.
 */
export type IconComponentRef = HTMLElement | SVGSVGElement | null;

/**
 * Icon component with ref forwarding support.
 * Renders an icon element with configurable properties and forwards refs to the underlying DOM node.
 * 
 * @param props - Component properties including className, style, size, color, etc.
 * @param ref - Forwarded ref to access the underlying DOM element
 * @returns React element representing the icon
 * 
 * @example
 *