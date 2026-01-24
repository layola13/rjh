/**
 * React Icon Component Module
 * 
 * A forwarded ref icon component that wraps a base icon component with specific icon data.
 * This module provides a reusable icon component with full TypeScript support.
 */

import * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG attributes and React component props.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** Icon size in pixels or CSS string */
  size?: number | string;
  
  /** Icon color, defaults to currentColor */
  color?: string;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Custom style object */
  style?: React.CSSProperties;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Additional props passed to the underlying component */
  [key: string]: unknown;
}

/**
 * Icon data structure containing SVG path and metadata
 */
export interface IconData {
  /** SVG viewBox attribute */
  viewBox?: string;
  
  /** SVG path data */
  path: string | string[];
  
  /** Icon width */
  width?: number;
  
  /** Icon height */
  height?: number;
  
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Base icon component props that accepts icon data
 */
export interface BaseIconComponentProps extends IconComponentProps {
  /** Icon configuration data */
  icon: IconData;
  
  /** Forwarded ref */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Component props including icon configuration
 * @param ref - Forwarded ref to the SVG element
 * @returns React element representing the icon
 * 
 * @example
 *