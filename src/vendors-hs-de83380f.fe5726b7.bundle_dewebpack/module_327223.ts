import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import type { IconComponentProps } from './types';
import IconWrapper from './IconWrapper';
import iconDefinition from './iconDefinition';

interface IconProps extends IconComponentProps {
  ref?: React.Ref<HTMLElement>;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconComponentProps> = (
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;