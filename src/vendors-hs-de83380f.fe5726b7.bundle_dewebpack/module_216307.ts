import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import type { IconProps } from './types';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconComponentProps extends IconProps {
  icon?: unknown;
  ref?: Ref<unknown>;
}

const renderIcon: ForwardRefRenderFunction<unknown, IconProps> = (
  props: IconProps,
  ref: Ref<unknown>
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIconComponent = forwardRef(renderIcon);

export default ForwardedIconComponent;