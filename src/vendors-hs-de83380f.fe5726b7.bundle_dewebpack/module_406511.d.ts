/**
 * Module: module_406511
 * Original ID: 406511
 * 
 * Icon component with forwarded ref support.
 * This module exports a React component that wraps an icon with customizable properties.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Base properties for the icon component
 */
export interface IconComponentProps {
  /** Icon configuration or data */
  icon?: unknown;
  /** Additional className for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional props that can be passed to the component */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding capabilities
 * 
 * @example
 *