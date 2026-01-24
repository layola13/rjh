/**
 * Module: module_461300
 * Original ID: 461300
 * 
 * React icon component with forwarded ref support.
 * This module creates a reusable icon component by wrapping a base icon implementation
 * with React's forwardRef for ref forwarding capabilities.
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props with icon-specific configuration.
 */
export interface IconComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color (CSS color value) */
  color?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Custom attributes for the icon element */
  [key: string]: unknown;
}

/**
 * Base icon configuration object.
 * Contains SVG path data and metadata for rendering the icon.
 */
export interface IconDefinition {
  /** SVG path data or element */
  icon: React.ReactNode | string;
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Props for the base icon wrapper component.
 */
export interface BaseIconProps extends IconComponentProps {
  /** Icon definition containing SVG data */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Component props including icon configuration
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element representing the icon
 * 
 * @example
 *