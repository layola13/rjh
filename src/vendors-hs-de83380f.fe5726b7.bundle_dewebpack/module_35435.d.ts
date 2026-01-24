/**
 * Module: module_35435
 * Original ID: 35435
 * 
 * React icon component wrapper that forwards refs and applies default icon configuration.
 */

import type * as React from 'react';

/**
 * Props interface for the icon component.
 * Extends standard React component props and allows for icon-specific customization.
 */
export interface IconComponentProps {
  /** Optional CSS class name for styling */
  className?: string;
  /** Icon size in pixels or as a string (e.g., "24px", "1em") */
  size?: number | string;
  /** Icon color, accepts any valid CSS color value */
  color?: string;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Forward ref type for the icon component.
 * Allows parent components to access the underlying DOM element.
 */
export type IconComponentRef = React.Ref<SVGSVGElement | HTMLElement>;

/**
 * Icon component that wraps a base icon with forwarded ref support.
 * 
 * @param props - Component props including icon configuration
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns Rendered icon component
 * 
 * @example
 *