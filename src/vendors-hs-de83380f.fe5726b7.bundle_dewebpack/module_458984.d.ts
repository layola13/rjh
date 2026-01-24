/**
 * React Icon Component Module
 * 
 * A forwardRef-wrapped icon component that combines props with a default icon.
 * Commonly used in icon libraries like @ant-design/icons or similar packages.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon class name */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon rotation angle */
  rotate?: number;
  /** Icon spin animation */
  spin?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps, RefAttributes<IconComponentRef> {}

/**
 * Default exported icon component
 * 
 * A React forward ref component that renders an SVG icon.
 * Accepts all standard SVG attributes and forwards refs to the underlying SVG element.
 * 
 * @example
 *