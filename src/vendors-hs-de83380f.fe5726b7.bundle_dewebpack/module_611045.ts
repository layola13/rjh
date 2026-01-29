import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const renderIcon: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props,
  ref
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIconComponent = forwardRef<HTMLElement, IconProps>(renderIcon);

export default ForwardedIconComponent;