/**
 * Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * The component extends a base icon component with additional props and ref forwarding.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props interface for the icon component
 * Extends from the base component props with icon-specific properties
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon element
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (width and height)
   * @default undefined - uses default icon size
   */
  size?: number | string;
  
  /**
   * Color of the icon
   * @default undefined - inherits from parent
   */
  color?: string;
  
  /**
   * Accessibility label for the icon
   */
  'aria-label'?: string;
  
  /**
   * Custom attributes to pass through to the underlying element
   */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component
 * Points to the underlying SVG or HTML element
 */
export type IconComponentRef = SVGSVGElement | HTMLElement;

/**
 * Icon Component with ForwardRef
 * 
 * A React component that renders an icon with support for ref forwarding.
 * This component wraps a base icon implementation and forwards refs to the
 * underlying DOM element for direct manipulation.
 * 
 * @example
 *