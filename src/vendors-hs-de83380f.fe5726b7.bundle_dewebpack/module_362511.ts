import * as React from 'react';
import { forwardRef, createElement, ForwardRefRenderFunction, Ref } from 'react';
import iconDefault from './icon-module';
import BaseIconComponent from './BaseIconComponent';

interface IconProps {
  [key: string]: unknown;
}

const renderIcon: ForwardRefRenderFunction<unknown, IconProps> = (
  props: IconProps,
  ref: Ref<unknown>
) => {
  return createElement(BaseIconComponent, {
    ...props,
    ref,
    icon: iconDefault,
  });
};

const ForwardedIcon = forwardRef(renderIcon);

export default ForwardedIcon;