/**
 * Module: module_972298
 * Original ID: 972298
 * 
 * React component wrapper for an icon component.
 * This module creates a forwarded ref component that renders an icon.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentBaseProps {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconComponentBaseProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding capability.
 * 
 * @example
 *