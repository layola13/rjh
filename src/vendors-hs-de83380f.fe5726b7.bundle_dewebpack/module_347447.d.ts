/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional accessibility attributes */
  'aria-label'?: string;
  /** Role attribute for accessibility */
  role?: string;
}

/**
 * Icon component props including ref support
 */
export type IconComponentProps = ComponentPropsWithoutRef<'svg'> & IconComponentBaseProps;

/**
 * Icon component ref type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Forwarded ref icon component type
 * A React component that wraps an icon with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default exported icon component with forwarded ref
 * Combines the base icon implementation with custom props and ref forwarding
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;