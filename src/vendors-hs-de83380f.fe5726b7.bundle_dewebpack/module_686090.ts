import * as React from 'react';
import { forwardRef, createElement, ForwardRefRenderFunction, Ref } from 'react';
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

const IconRenderFunction: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: Ref<HTMLElement>
) => {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;