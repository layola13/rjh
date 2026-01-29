import { forwardRef, createElement, ForwardRefRenderFunction, RefObject } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const renderIcon: ForwardRefRenderFunction<HTMLElement, IconProps> = (props, ref) => {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(renderIcon);

export default ForwardedIcon;