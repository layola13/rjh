import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import IconWrapper from './IconWrapper';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLSpanElement, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;