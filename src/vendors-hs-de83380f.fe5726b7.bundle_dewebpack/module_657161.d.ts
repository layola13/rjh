import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import IconWrapper from './IconWrapper';
import iconDefinition from './icon-definition';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Optional className for styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
  /** Optional size (width and height) */
  size?: number | string;
  /** Optional color/fill */
  color?: string;
  /** Additional props passed to the underlying SVG */
  [key: string]: unknown;
}

/**
 * Internal render function for the icon component
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the SVG element
 * @returns React element wrapping the icon
 */
const renderIconComponent = (
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

/**
 * Icon component with forwarded ref support
 * Wraps an icon definition in a standardized component interface
 */
const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
> = React.forwardRef(renderIconComponent);

export default IconComponent;