/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Props for the icon component
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Custom data attributes */
  [key: `data-${string}`]: unknown;
}

/**
 * Icon component type with forwarded ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Renders an icon component with the provided props and ref
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare function renderIcon(
  props: IconComponentProps,
  ref: Ref<SVGSVGElement>
): ReactElement;

/**
 * Default exported icon component with forwarded ref support
 * Combines icon data with configurable props
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;