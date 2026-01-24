/**
 * Icon component module
 * Provides a forwarded ref React component wrapping an SVG icon
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes with React-specific properties
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
}

/**
 * Forwarded ref icon component
 * Renders an SVG icon with support for ref forwarding
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;