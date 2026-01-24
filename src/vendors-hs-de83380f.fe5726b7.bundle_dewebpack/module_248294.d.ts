/**
 * Module: module_248294
 * Icon component with forward ref support
 * 
 * This module exports a React component that wraps an icon with ref forwarding capability.
 * It merges props with an icon component and supports all standard React ref patterns.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** Optional CSS class name for styling */
  className?: string;
  
  /** Optional inline styles */
  style?: React.CSSProperties;
  
  /** Icon size in pixels or CSS units */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props type for the forwarded icon component
 */
export type ForwardedIconProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component that merges props with the underlying icon implementation
 * 
 * @example
 *