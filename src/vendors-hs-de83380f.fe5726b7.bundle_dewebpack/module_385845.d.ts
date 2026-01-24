/**
 * Icon Component Module
 * 
 * This module exports a React icon component that wraps a base icon component
 * with forwarded refs for direct DOM manipulation.
 * 
 * @module IconComponent
 * @packageDocumentation
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base properties that can be passed to the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;

  /**
   * Inline styles to apply to the icon element
   */
  style?: React.CSSProperties;

  /**
   * Size of the icon (e.g., '16px', '1.5em', '24')
   */
  size?: string | number;

  /**
   * Color of the icon (CSS color value)
   */
  color?: string;

  /**
   * onClick event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * Title for the icon (displayed on hover)
   */
  title?: string;

  /**
   * Any other HTML attributes for SVG element
   */
  [key: string]: unknown;
}

/**
 * Type definition for the ref that can be forwarded to the underlying SVG element
 */
export type IconRef = SVGSVGElement;

/**
 * The icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an SVG icon and forwards refs to allow parent components
 * to directly access the underlying DOM element.
 * 
 * @example
 *