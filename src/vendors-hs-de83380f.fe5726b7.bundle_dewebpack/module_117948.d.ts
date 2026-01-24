/**
 * React icon component with forwarded ref support
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconProps {
  /** Icon size in pixels or as a CSS value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding
 * Renders an SVG icon element with customizable props
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Created using React.forwardRef for ref forwarding support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;