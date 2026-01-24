/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Ref forwarded to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref support
 * 
 * @example
 *