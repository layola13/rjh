import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import defaultIcon from './defaultIcon';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: Ref<HTMLElement>
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;