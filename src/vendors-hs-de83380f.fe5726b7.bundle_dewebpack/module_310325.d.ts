/**
 * Icon component module
 * Wraps an icon with forwardRef support for ref forwarding
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** Custom className for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon role for accessibility */
  role?: string;
}

/**
 * Icon component with ref forwarding capability
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying element
 * @returns React element rendering the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;