/**
 * Icon component wrapper module
 * Provides a forwarded ref wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconProps extends IconBaseProps {
  /** Icon definition object containing SVG paths and metadata */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  /** SVG viewBox dimensions */
  viewBox?: string;
  /** SVG path data */
  path?: string | string[];
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps a base icon component and forwards refs to the underlying SVG element.
 * It merges provided props with the default icon definition.
 * 
 * @example
 *