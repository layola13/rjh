/**
 * React icon component wrapper module
 * Provides a forwarded ref icon component using a default icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props extending base icon props
 */
export interface IconComponentProps extends IconBaseProps {
  /** Icon-specific configuration or data */
  icon?: unknown;
  /** Component ref */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type
 * Wraps an icon with React.forwardRef for ref propagation
 */
export type ForwardedIconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *