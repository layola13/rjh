/**
 * Icon Component Module
 * 
 * A React forwardRef component that wraps an icon with customizable properties.
 * This module provides a reusable icon component with ref forwarding support.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base icon SVG data interface
 * Represents the raw icon definition imported from the icon library
 */
export interface IconDefinition {
  /** Icon name identifier */
  name?: string;
  /** SVG path data or icon content */
  data?: string | unknown;
  /** Icon theme variant (outlined, filled, etc.) */
  theme?: string;
  [key: string]: unknown;
}

/**
 * Props for the base icon wrapper component
 */
export interface IconWrapperProps {
  /** The icon definition to render */
  icon: IconDefinition;
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size in pixels or CSS size value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Spin animation */
  spin?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the forwarded icon component
 * Combines icon wrapper props with ref attributes
 */
export type IconComponentProps = Omit<IconWrapperProps, 'icon'> & 
  ComponentPropsWithoutRef<'svg'>;

/**
 * Icon component with forwardRef support
 * 
 * This component renders an SVG icon with the ability to forward refs to the underlying SVG element.
 * It merges user-provided props with the default icon definition.
 * 
 * @example
 *