/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with forwarded ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying element */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A React component that forwards refs and accepts icon-specific props
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * @remarks
 * This component wraps an icon definition with ref forwarding capabilities,
 * merging user-provided props with the base icon configuration.
 * 
 * @example
 *