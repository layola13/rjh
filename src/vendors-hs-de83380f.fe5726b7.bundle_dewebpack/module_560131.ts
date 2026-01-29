import React, { forwardRef, ForwardRefRenderFunction, RefObject } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<unknown, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;