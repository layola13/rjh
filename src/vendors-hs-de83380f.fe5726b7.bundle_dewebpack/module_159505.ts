import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconWrapper from './IconWrapper';
import iconConfig from './iconConfig';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: Ref<HTMLElement>
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconConfig
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;