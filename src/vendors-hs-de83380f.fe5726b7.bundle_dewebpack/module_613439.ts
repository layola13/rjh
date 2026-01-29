import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<unknown, IconProps> = (
  props: IconProps,
  ref: Ref<unknown>
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconRenderFunction);

export default ForwardedIconComponent;