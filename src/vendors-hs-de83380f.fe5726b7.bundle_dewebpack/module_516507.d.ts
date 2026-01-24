/**
 * Module: module_516507
 * Original ID: 516507
 * 
 * Icon component module that wraps a base icon component with forwarded ref support.
 * Provides a reusable icon element with customizable properties.
 */

import type React from 'react';

/**
 * Base properties for the icon component
 */
export interface IconBaseProps {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size in pixels or as a string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Optional title for accessibility */
  title?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Props for the forwarded ref icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /** Ref forwarded to the underlying element */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @example
 *