import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Icon component props interface
 * Extends standard component props without ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom class name */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
}

/**
 * Icon data structure containing SVG path and metadata
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or element */
  icon: React.ReactNode | string;
  /** ViewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Forward ref component for rendering icons
 * 
 * @example
 *