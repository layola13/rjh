/**
 * Module: module_385671
 * Original ID: 385671
 * 
 * Icon component module that wraps a base icon component with forwarded refs.
 * This module creates a React component that combines icon data with configurable props.
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props with icon-specific configuration.
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon data structure containing SVG path data and metadata.
 */
export interface IconData {
  /** SVG path data or icon identifier */
  path?: string;
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
  [key: string]: unknown;
}

/**
 * Props for the base icon wrapper component.
 */
export interface BaseIconProps extends IconComponentProps {
  /** Icon data object containing SVG information */
  icon: IconData;
  /** Forwarded ref to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Creates an icon component with forwarded ref support.
 * 
 * This component merges user-provided props with icon data and forwards
 * the ref to the underlying icon implementation.
 * 
 * @param props - Component props
 * @param forwardedRef - Ref to be forwarded to the icon element
 * @returns React element representing the icon
 */
declare function IconComponent(
  props: IconComponentProps,
  forwardedRef: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * Icon component with forwarded ref support.
 * 
 * Usage:
 *