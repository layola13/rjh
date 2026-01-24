/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with default icon support
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component
 */
export interface IconComponentProps {
  /** Icon name or configuration */
  icon?: unknown;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Reference type for the icon component
 */
export interface IconRef extends HTMLElement {}

/**
 * Combined props type including ref attributes
 */
export type IconProps = ComponentPropsWithoutRef<'svg'> & IconComponentProps & RefAttributes<IconRef>;

/**
 * Forward ref icon component type
 * A React component that forwards refs and renders an icon with the default icon configuration
 */
export type IconComponent = ForwardRefExoticComponent<IconProps>;

/**
 * Default exported icon component with forwarded ref support
 * Merges provided props with default icon configuration
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;