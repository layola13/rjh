/**
 * React Icon Component Module
 * 
 * This module exports a forwardRef-wrapped icon component that combines
 * a base icon with additional props and ref forwarding capabilities.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element attributes
 */
export interface IconComponentProps {
  /** Icon name or identifier */
  icon?: unknown;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional props passed to the underlying component */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component
 * Can be attached to the underlying DOM element or component instance
 */
export type IconComponentRef = HTMLElement | null;

/**
 * Icon Component Type
 * 
 * A forward ref component that renders an icon with the provided props.
 * Combines default icon configuration with user-provided props.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: Forward ref icon component
 * 
 * Usage:
 *