/**
 * React component module for an icon wrapper
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom className */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Props for the forwarded icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /** Icon data/configuration */
  icon?: unknown;
}

/**
 * Forwarded ref type for SVG element
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *