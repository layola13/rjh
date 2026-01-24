/**
 * Module: module_649533
 * Original ID: 649533
 * 
 * React icon component wrapper module that creates a forwarded ref icon component.
 */

import * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and allows for custom icon configuration.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Icon definition object containing icon metadata and path data.
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or icon component */
  icon: React.ReactNode | string;
  /** Icon theme (outlined, filled, etc.) */
  theme?: string;
  /** ViewBox dimensions */
  viewBox?: string;
}

/**
 * Forwarded ref type for the icon component.
 */
export type IconComponentRef = HTMLSpanElement | HTMLElement;

/**
 * Forward ref icon component that wraps an icon with ref support.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<IconComponentRef>
>;

export default IconComponent;