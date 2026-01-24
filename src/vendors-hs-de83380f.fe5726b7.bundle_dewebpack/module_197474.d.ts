/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Spin animation */
  spin?: boolean;
  /** Rotation angle */
  rotate?: number;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon role */
  role?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A React component that renders an SVG icon with forwarded ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Wraps an icon definition with React.forwardRef for ref forwarding capability
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;