/**
 * React icon component that wraps a base icon with forwarded ref support.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component (excluding ref).
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /** Optional size of the icon */
  size?: number | string;
  /** Optional color/fill of the icon */
  color?: string;
  /** Optional className for styling */
  className?: string;
  /** Additional props passed to the underlying SVG element */
  [key: string]: unknown;
}

/**
 * Props for the wrapped icon component including ref.
 */
export interface IconComponentProps extends IconProps {
  /** Forwarded ref to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type.
 * Combines icon props with ref attributes for SVG elements.
 */
type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forwarded ref icon component.
 * This component wraps an icon definition with React's forwardRef
 * to allow parent components to access the underlying SVG element.
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;