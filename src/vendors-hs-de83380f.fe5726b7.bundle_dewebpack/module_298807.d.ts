/**
 * Module: module_298807
 * Original ID: 298807
 * 
 * React component that wraps an icon component with forwarded ref support.
 * This module creates a reusable icon component by combining base icon properties
 * with a specific icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base properties for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit string */
  size?: number | string;
  /** Icon color, accepts any valid CSS color value */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon rotation in degrees */
  rotate?: number;
  /** Whether the icon should spin */
  spin?: boolean;
  /** Custom onClick handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: any;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component configuration from imported icon definition
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or element tree */
  icon: string | React.ReactNode;
  /** Default viewBox for the SVG */
  viewBox?: string;
  /** Icon prefix/category */
  prefix?: string;
}

/**
 * Default exported icon component with ref forwarding support.
 * 
 * @remarks
 * This component merges provided props with a predefined icon definition
 * and forwards refs to enable direct DOM access.
 * 
 * @example
 *