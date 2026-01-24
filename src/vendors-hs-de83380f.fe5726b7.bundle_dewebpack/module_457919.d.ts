/**
 * Module: module_457919
 * Original ID: 457919
 * 
 * Icon component wrapper that forwards refs to an underlying icon implementation.
 * This module creates a React component that wraps a base icon component with additional props.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends any additional properties that can be passed to the underlying icon component.
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional props passed to the underlying component */
  [key: string]: unknown;
}

/**
 * Base icon data interface representing the icon definition
 */
export interface IconDefinition {
  /** Icon name or identifier */
  name: string;
  /** Icon theme (outlined, filled, etc.) */
  theme?: string;
  /** Icon SVG path data or content */
  icon: string | React.ReactNode;
  /** Additional icon metadata */
  [key: string]: unknown;
}

/**
 * Forward ref type for the icon component
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * @example
 *