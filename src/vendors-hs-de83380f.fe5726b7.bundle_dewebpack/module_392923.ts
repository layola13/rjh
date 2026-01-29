import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconBase from './IconBase';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  rotate?: number;
  spin?: boolean;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
) => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconComponent);

export default ForwardedIcon;