import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import type { IconComponentProps } from './types';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconProps extends IconComponentProps {
  icon?: any;
}

const IconRenderFunction: ForwardRefRenderFunction<any, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIconComponent = forwardRef(IconRenderFunction);

export default ForwardedIconComponent;