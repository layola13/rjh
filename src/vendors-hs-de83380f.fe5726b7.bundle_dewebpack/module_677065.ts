import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconDefinition from './iconDefinition';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  [key: string]: unknown;
}

/**
 * Icon component that wraps the icon definition with common props
 * @param props - Icon properties including style, className, etc.
 * @param ref - Forwarded ref to the underlying element
 * @returns React element with the icon
 */
const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef<HTMLSpanElement, IconProps>(IconComponent);

export default ForwardedIcon;