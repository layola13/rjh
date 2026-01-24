/**
 * React icon component module
 * Wraps an icon definition with React.forwardRef for ref forwarding
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /** Icon name */
  name: string;
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  path: string | ReactElement | ReactElement[];
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Props passed to the internal icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon definition containing SVG metadata */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Forward ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Creates a React icon component with ref forwarding support
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element wrapping the icon
 */
declare function createIconComponent(
  props: IconBaseProps,
  ref: Ref<SVGSVGElement>
): ReactElement;

/**
 * Default exported icon component with forwardRef
 * Combines icon definition with base props and forwards refs to SVG element
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;