/**
 * Icon component module
 * Provides a forward ref wrapper for an icon component
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component
 * A React component that renders an SVG icon with forwarded ref support
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;