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
 * Icon component wrapper that renders an icon with the specified properties
 * @param props - Icon properties
 * @param ref - Forwarded ref to the icon element
 * @returns React element representing the icon
 */
const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef<HTMLSpanElement, IconProps>(IconWrapper);

export default ForwardedIcon;