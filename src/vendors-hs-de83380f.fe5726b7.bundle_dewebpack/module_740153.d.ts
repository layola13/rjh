/**
 * Module: module_740153
 * Original ID: 740153
 * 
 * Icon component wrapper that forwards refs to an underlying icon implementation.
 * This module creates a React component that combines custom props with a default icon.
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props that can be passed to the icon component.
 * Extend this interface to add specific icon properties.
 */
export interface IconComponentProps {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Props for the forwarded icon component, including ref support.
 */
export type ForwardedIconProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Default exported icon component with ref forwarding capability.
 * 
 * This component wraps an icon implementation and allows parent components
 * to access the underlying SVG element via React refs.
 * 
 * @example
 *