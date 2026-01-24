/**
 * React component for rendering an icon with forwarded ref support.
 * This module exports a forward ref wrapper around a base icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component.
 * Extends any additional props that can be passed to the underlying icon component.
 */
export interface IconComponentProps {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon data interface representing the SVG icon definition.
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or icon configuration */
  icon: unknown;
  /** Additional icon metadata */
  [key: string]: unknown;
}

/**
 * Forward ref component that renders an icon with the ability to receive a ref.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element representing the icon
 * 
 * @example
 *