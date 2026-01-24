/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps
 * a base icon component with specific icon data.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component
 */
interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Icon size in pixels or as a CSS value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component renders an SVG icon with customizable properties.
 * It forwards refs to the underlying SVG element for direct DOM access.
 * 
 * @example
 *