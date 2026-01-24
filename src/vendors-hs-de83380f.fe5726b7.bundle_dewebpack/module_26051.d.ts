/**
 * React icon component module
 * Wraps an icon definition with forwardRef support
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon definition object structure
 */
export interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG attributes */
  attr: Record<string, unknown>;
  /** Child elements */
  child: Array<IconDefinition>;
}

/**
 * Forward-ref enabled icon component type
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward-ref wrapper around the base icon implementation
 */
declare const IconForwardRef: IconComponent;

export default IconForwardRef;