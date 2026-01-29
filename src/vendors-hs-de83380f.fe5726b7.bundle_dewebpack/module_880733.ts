import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconWrapper from './IconWrapper';
import iconDefinition from './iconDefinition';

interface IconComponentProps {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLSpanElement, IconComponentProps> = (
  props,
  ref
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;