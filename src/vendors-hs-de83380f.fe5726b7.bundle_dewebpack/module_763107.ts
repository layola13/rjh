import * as React from 'react';
import { forwardRef, createElement, Ref, ForwardRefRenderFunction } from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  rotate?: number;
  spin?: boolean;
  [key: string]: unknown;
}

const IconRenderer: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: Ref<HTMLElement>
) => {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = forwardRef(IconRenderer);

export default ForwardedIcon;