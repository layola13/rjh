/**
 * React icon component that wraps a base icon with forwarded ref support.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base icon data structure containing SVG path information and metadata.
 */
export interface IconData {
  /** SVG path data or icon definition */
  path?: string | string[];
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Additional icon metadata */
  [key: string]: unknown;
}

/**
 * Props for the base icon component.
 */
export interface BaseIconProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon data containing SVG information */
  icon: IconData;
  /** Icon size */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Custom class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for the forwarded icon component.
 * Extends base icon props but excludes the icon data (provided internally).
 */
export type IconComponentProps = Omit<BaseIconProps, 'icon'>;

/**
 * Forwarded ref type for the icon component.
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps a base icon component and automatically injects
 * the icon data, while forwarding the ref to the underlying SVG element.
 * 
 * @example
 *