/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
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
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional ARIA attributes for accessibility */
  'aria-label'?: string;
  /** Custom attributes */
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
 * Icon component type definition
 * A forward ref component that renders an SVG icon with customizable properties
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Uses forwardRef to allow parent components to access the underlying SVG element
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;