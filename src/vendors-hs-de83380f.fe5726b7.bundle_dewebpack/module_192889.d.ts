/**
 * React component module for an icon component with forwarded ref support.
 * 
 * This module exports a forwarded ref icon component that wraps a base icon component
 * with a specific icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the base icon component.
 * Extends common HTML attributes and allows custom icon configuration.
 */
export interface IconComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional props passed to the underlying SVG element */
  [key: string]: unknown;
}

/**
 * Icon data configuration object containing SVG path data and metadata.
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or element structure */
  icon: unknown;
  /** Icon theme (outlined, filled, two-tone) */
  theme?: string;
  /** ViewBox dimensions */
  viewBox?: string;
}

/**
 * Combined props type including ref attributes for the forwarded component.
 */
export type IconComponentPropsWithRef = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component.
 * 
 * This component renders an icon with support for ref forwarding to the underlying SVG element.
 * It merges user-provided props with a predefined icon definition.
 * 
 * @example
 *