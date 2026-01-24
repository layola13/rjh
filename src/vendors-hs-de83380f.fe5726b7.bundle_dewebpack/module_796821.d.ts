/**
 * React component wrapper for an icon component.
 * This module creates a forwarded ref icon component using a base icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component.
 * Extends standard attributes that can be passed to icon elements.
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size in pixels or as string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes for SVG element */
  [key: string]: any;
}

/**
 * Ref type for the icon component.
 * Points to the underlying SVG element.
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps a base icon implementation and provides
 * ref forwarding capability for direct DOM access.
 * 
 * @example
 *