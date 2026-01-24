/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with customizable properties
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component (excluding ref)
 */
export interface IconComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 * Represents the underlying DOM element that can be referenced
 */
export type IconComponentRef = SVGSVGElement | HTMLSpanElement;

/**
 * Complete icon component type with ref support
 * A forwardRef component that renders an icon with the specified properties
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: Icon component with ref forwarding support
 * 
 * @example
 *