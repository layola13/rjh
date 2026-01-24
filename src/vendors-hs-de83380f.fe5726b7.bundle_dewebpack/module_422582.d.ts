/**
 * Module: module_422582
 * Original ID: 422582
 * 
 * React icon component wrapper module.
 * This module creates a forwarded ref component that wraps an icon with default props.
 */

import type { ComponentType, ReactElement, Ref, RefAttributes } from 'react';

/**
 * Base props for the icon component.
 * Extend this interface with specific icon properties as needed.
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the default icon wrapper component.
 * Includes all base icon props plus the icon definition.
 */
export interface IconWrapperProps extends IconComponentProps {
  /** Icon definition object */
  icon?: IconDefinition;
}

/**
 * Icon definition structure.
 */
export interface IconDefinition {
  /** Icon name or identifier */
  name: string;
  /** SVG path data or icon content */
  data: string | string[];
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * The forwarded ref icon component type.
 * Accepts IconWrapperProps and forwards refs to the underlying element.
 */
export type ForwardedIconComponent = ComponentType<IconWrapperProps & RefAttributes<unknown>>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * This component wraps an icon definition with configurable props and supports
 * React ref forwarding for direct DOM access.
 * 
 * @example
 *