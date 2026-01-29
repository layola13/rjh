import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconWrapper from './IconWrapper';
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

const IconComponent: ForwardRefRenderFunction<HTMLSpanElement, IconProps> = (
  props,
  ref: Ref<HTMLSpanElement>
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;