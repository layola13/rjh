import React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Additional CSS class name */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Forward ref icon component
 * A React component that renders an SVG icon with forwarded ref support
 * 
 * @example
 *