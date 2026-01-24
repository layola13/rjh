/**
 * React icon component module
 * Wraps an icon with forwardRef support for ref forwarding
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Custom className for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon title for accessibility */
  title?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: any;
}

/**
 * Props for the forwarded icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /** React ref for the SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type with ref forwarding support
 * Renders an SVG icon with customizable props
 */
declare const IconComponent: ForwardRefExoticComponent<
  ComponentPropsWithoutRef<'svg'> & IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;