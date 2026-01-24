/**
 * React icon component module
 * Wraps an icon component with forwardRef for ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Reference to the underlying DOM element */
  ref?: Ref<SVGSVGElement>;
  /** Icon definition object containing SVG path data */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  /** SVG path data */
  path: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Forwarded ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  IconWrapperProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an icon definition with React.forwardRef to allow
 * parent components to access the underlying SVG element via ref.
 * 
 * @example
 *