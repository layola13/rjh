import { forwardRef, createElement, ForwardRefRenderFunction, RefObject } from 'react';
import iconDefault from './icon';
import ComponentWrapper from './ComponentWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconProps> = (props, ref) => {
  return createElement(ComponentWrapper, {
    ...props,
    ref: ref as RefObject<HTMLElement>,
    icon: iconDefault
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;