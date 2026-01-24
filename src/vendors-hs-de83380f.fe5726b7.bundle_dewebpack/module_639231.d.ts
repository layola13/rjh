/**
 * Module: module_639231
 * Original ID: 639231
 * 
 * Icon component wrapper that creates a forwarded ref component
 * using a base icon component with specific icon data.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** CSS class name for the icon */
  className?: string;
  /** Inline styles for the icon */
  style?: React.CSSProperties;
  /** Size of the icon in pixels or as a string */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Accessible title for the icon */
  title?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** onClick event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon component props combining base props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * This component wraps a base icon implementation with specific icon data,
 * allowing users to pass a ref to access the underlying SVG element.
 * 
 * @example
 *