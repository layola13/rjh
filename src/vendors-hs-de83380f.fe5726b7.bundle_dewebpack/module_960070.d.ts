/**
 * Module: module_960070
 * Original ID: 960070
 * 
 * Icon component wrapper that creates a forwarded ref component
 * using a default icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon title for tooltips */
  title?: string;
}

/**
 * Props for the forwarded icon component including ref support
 */
export interface ForwardedIconComponentProps extends IconComponentProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type definition
 * 
 * This component wraps an icon with React's forwardRef to allow
 * parent components to access the underlying DOM element.
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;