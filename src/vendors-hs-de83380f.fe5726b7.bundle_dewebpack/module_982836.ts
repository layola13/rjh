import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

/**
 * Renders an icon component with the predefined icon definition.
 * 
 * @param props - Icon properties
 * @param ref - Forwarded ref to the icon element
 * @returns Icon React element
 */
const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconWrapper);

export default ForwardedIcon;