/**
 * Icon component module with forwarded ref support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base icon component properties
 */
export interface IconComponentProps {
  /**
   * Additional CSS class name for styling
   */
  className?: string;

  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;

  /**
   * Icon color (supports CSS color values)
   */
  color?: string;

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * Custom styles to apply to the icon
   */
  style?: React.CSSProperties;

  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * Any additional SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component reference type (SVG element)
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref
 * 
 * This component wraps an icon definition and provides
 * standardized props and ref forwarding capabilities.
 * 
 * @example
 *