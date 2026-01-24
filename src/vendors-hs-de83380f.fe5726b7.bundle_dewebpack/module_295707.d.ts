/**
 * Module: module_295707
 * Original ID: 295707
 * 
 * Icon component wrapper that forwards refs and applies default icon configuration.
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extend this interface based on the actual props accepted by the icon component.
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Any additional props */
  [key: string]: unknown;
}

/**
 * Combined props type including ref support
 */
export type IconComponentWithRef = IconComponentProps & RefAttributes<HTMLElement>;

/**
 * Forward ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentWithRef>;

/**
 * Default export: A forward ref component that wraps an icon with default configuration.
 * 
 * @example
 *