/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props merging functionality.
 */

import React from 'react';

/**
 * Props interface for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Optional className for styling */
  className?: string;
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Additional style object */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns A React element representing the icon
 * 
 * @example
 *