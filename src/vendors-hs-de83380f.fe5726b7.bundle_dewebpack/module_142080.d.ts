/**
 * React Icon Component Module
 * 
 * A forwardRef-wrapped icon component that extends a base icon component
 * with custom icon data. This module provides a reusable icon component
 * that can be used throughout a React application.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Icon data structure containing the SVG path or icon definition
 * Imported from module 373871
 */
export interface IconData {
  /** SVG path data or icon definition */
  [key: string]: unknown;
}

/**
 * Base properties for the icon component
 */
export interface IconProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color, accepts CSS color values */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Additional ARIA attributes */
  [key: `aria-${string}`]: string | undefined;
  /** Additional data attributes */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This component wraps the base icon component with a specific icon definition,
 * allowing ref forwarding to the underlying SVG element.
 * 
 * @example
 *