import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const renderIcon: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = forwardRef(renderIcon);

export default ForwardedIcon;