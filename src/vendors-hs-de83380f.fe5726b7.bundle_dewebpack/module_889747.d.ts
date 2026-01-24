/**
 * Icon component module
 * Provides a forward-ref enabled icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Spin animation */
  spin?: boolean;
  /** Custom click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component with ref support
 * 
 * @example
 *