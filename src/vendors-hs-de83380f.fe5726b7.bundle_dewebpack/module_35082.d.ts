/**
 * Module: module_35082
 * Original ID: 35082
 * 
 * Icon component wrapper module that creates a forwarded ref React component
 * using a default icon configuration.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React element attributes and includes icon-specific properties.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional props passed to the underlying icon component */
  [key: string]: unknown;
}

/**
 * Icon component configuration object containing icon path data and metadata
 */
export interface IconConfig {
  /** SVG path data or icon identifier */
  path?: string | string[];
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
  /** Additional icon metadata */
  [key: string]: unknown;
}

/**
 * Base icon component that accepts icon configuration and renders SVG
 */
export type BaseIconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & {
    /** Icon configuration object */
    icon: IconConfig;
    /** Forwarded ref to the underlying element */
    ref?: React.Ref<HTMLElement>;
  }
>;

/**
 * Forward ref icon component type
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * Default exported icon component with forwarded ref support.
 * Wraps the base icon component with a specific icon configuration.
 * 
 * @example
 *