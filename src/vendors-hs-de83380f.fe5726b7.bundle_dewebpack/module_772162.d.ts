/**
 * React icon component module
 * Exports a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS size value */
  size?: number | string;
  /** Icon color (CSS color value) */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Title for tooltip/accessibility */
  title?: string;
  /** onClick event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Internal icon definition interface
 * Contains SVG path data and viewBox configuration
 */
export interface IconDefinition {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or children elements */
  path?: string | ReactElement | ReactElement[];
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Props for the generic icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon definition containing SVG data */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type
 * Combines icon props with ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *