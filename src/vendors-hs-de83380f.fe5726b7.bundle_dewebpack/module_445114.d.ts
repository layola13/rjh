/**
 * Module: module_445114
 * Original ID: 445114
 * 
 * React icon component that wraps a base icon with forwarded ref support.
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes for SVG elements.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Custom className for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional style object */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the SVG element
 * @returns React element representing the icon
 * 
 * @example
 *