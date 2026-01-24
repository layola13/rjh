/**
 * React component module for an icon wrapper
 * Provides a forwarded ref icon component using default icon configuration
 */

import type { Ref, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 * Extend this interface based on the actual icon component requirements
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props type for the forwarded ref icon component
 */
export type ForwardedIconProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps a base icon implementation and forwards refs to the underlying SVG element.
 * It merges user-provided props with default icon configuration.
 * 
 * @example
 *