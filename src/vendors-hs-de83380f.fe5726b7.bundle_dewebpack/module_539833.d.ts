/**
 * React component icon wrapper module
 * Wraps an icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
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
 * Icon data structure containing SVG path or element information
 */
export interface IconDefinition {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  path?: string | ReactElement | ReactElement[];
  /** Icon name identifier */
  name?: string;
  /** Icon theme or variant */
  theme?: string;
}

/**
 * Forwarded ref icon component type
 * A React component that renders an icon with forwarded ref support
 */
type IconComponent = ForwardRefExoticComponent<IconBaseProps & RefAttributes<SVGSVGElement>>;

/**
 * Default export: Icon component with forwarded ref
 * Wraps the icon definition with proper ref forwarding and prop merging
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;