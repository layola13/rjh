/**
 * Module: module_74489
 * Original ID: 74489
 * 
 * This module exports a React icon component with forwarded ref support.
 */

import type * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard icon component properties.
 */
export interface IconComponentProps {
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional props */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns A React icon component
 * 
 * @example
 *