/**
 * Module: module_130052
 * Original ID: 130052
 * 
 * React icon component wrapper that forwards refs to the underlying icon element.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components.
 * Extend this interface to add specific icon props based on your implementation.
 */
export interface IconComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): ReactElement;

/**
 * Forwarded ref icon component.
 * Allows parent components to access the underlying DOM element via ref.
 */
declare const ForwardedIconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default ForwardedIconComponent;