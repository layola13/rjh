/**
 * Icon component module
 * Wraps an icon with forwardRef support for ref passing
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * Forward ref icon component
 * Renders an SVG icon with configurable props and ref forwarding
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps>;

export default IconComponent;