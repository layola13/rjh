/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref React component that wraps an icon.
 * The component accepts standard props and forwards refs to the underlying icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props interface for the icon component
 * Extends common HTML attributes and allows custom props
 */
export interface IconComponentProps {
  /** Additional CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional custom props */
  [key: string]: any;
}

/**
 * Icon component reference type
 * Typically refers to an SVG or HTML element
 */
export type IconComponentRef = SVGSVGElement | HTMLElement;

/**
 * Complete icon component type with forwarded ref support
 * 
 * @example
 *