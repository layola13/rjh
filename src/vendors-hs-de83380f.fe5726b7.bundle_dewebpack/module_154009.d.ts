/**
 * Module: module_154009
 * Original ID: 154009
 * 
 * Icon component wrapper that forwards refs and merges props with a default icon.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extend this interface with specific icon properties as needed.
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component including ref support.
 */
export interface IconWrapperProps extends IconComponentProps {
  /** Reference to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Default icon configuration object.
 * Contains the SVG path data and metadata for the icon.
 */
export interface IconDefinition {
  /** Icon name identifier */
  name?: string;
  /** SVG viewBox dimensions */
  viewBox?: string;
  /** SVG path data */
  path?: string | ReactElement;
  /** Icon metadata */
  [key: string]: unknown;
}

/**
 * Forward ref icon component type.
 * Combines IconComponentProps with ref forwarding capabilities.
 */
export type ForwardRefIconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward ref icon component.
 * 
 * This component wraps a base icon component and forwards refs to the underlying SVG element.
 * It merges user-provided props with a default icon definition.
 * 
 * @example
 *