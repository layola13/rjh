import React, { forwardRef, ForwardRefRenderFunction, RefObject } from 'react';
import IconBase from './IconBase';
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
  ref
) => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;