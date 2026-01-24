/**
 * React icon component wrapper
 * Wraps an icon definition with React forwardRef for ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

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
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: any;
}

/**
 * Icon definition object structure
 */
export interface IconDefinition {
  /** Icon name */
  name: string;
  /** SVG path data */
  path: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default size */
  size?: number;
  [key: string]: any;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon definition object */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Renders an icon component with the provided props and icon definition
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the SVG element
 * @returns React element representing the icon
 */
declare function IconComponent(
  props: IconBaseProps,
  ref: Ref<SVGSVGElement>
): ReactElement;

/**
 * Icon component with forwardRef support
 * Combines props with icon definition and renders through base icon component
 */
declare const ForwardedIconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default ForwardedIconComponent;