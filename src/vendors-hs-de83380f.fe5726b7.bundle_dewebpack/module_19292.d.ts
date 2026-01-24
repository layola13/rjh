/**
 * Module: module_19292
 * Original ID: 19292
 * 
 * Icon component wrapper that forwards refs and applies default icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extend this interface with specific icon properties as needed.
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style overrides */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Props for the wrapped icon component with ref support.
 */
export interface WrappedIconProps extends IconComponentProps {
  /** Default icon data/configuration */
  icon?: unknown;
}

/**
 * Ref type for the icon component (typically an SVG element).
 */
export type IconRef = SVGSVGElement;

/**
 * Forward ref icon component.
 * 
 * @remarks
 * This component wraps an icon implementation with ref forwarding support,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *