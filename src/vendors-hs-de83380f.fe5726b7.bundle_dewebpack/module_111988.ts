import React, { forwardRef, ForwardRefRenderFunction, ComponentProps } from 'react';
import IconWrapper from './IconWrapper';
import iconData from './iconData';

interface IconProps extends Omit<ComponentProps<typeof IconWrapper>, 'icon'> {}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconProps> = (props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;