/**
 * Icon component module
 * 
 * A React forwardRef component that wraps an icon with customizable props.
 * This module exports a forwarded ref icon component that accepts standard icon properties.
 */

import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props interface for the icon component
 * Extends standard SVG and icon attributes
 */
export interface IconProps {
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This component forwards refs to the underlying SVG element,
 * allowing parent components to access the DOM node directly.
 * 
 * @example
 *