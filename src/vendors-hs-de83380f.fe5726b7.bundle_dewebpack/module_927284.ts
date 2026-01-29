import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import IconComponent from './IconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<unknown, IconProps> = (
  props,
  ref
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: defaultIcon,
  });
};

const ForwardedIconComponent = forwardRef(IconRenderFunction);

export default ForwardedIconComponent;