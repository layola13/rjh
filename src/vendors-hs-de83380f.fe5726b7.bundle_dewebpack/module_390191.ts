import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import type { IconComponentProps } from './types';
import IconComponent from './IconComponent';
import iconData from './iconData';

type IconProps = IconComponentProps & RefAttributes<HTMLElement>;

const IconRenderFunction: ForwardRefRenderFunction<HTMLElement, IconComponentProps> = (
  props: IconComponentProps,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;