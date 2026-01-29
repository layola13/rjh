import React, { forwardRef, Ref, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconComponentProps } from './types';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

const IconComponent = (
  props: IconComponentProps,
  ref: Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent: ForwardRefExoticComponent<IconComponentProps & RefAttributes<HTMLElement>> = forwardRef(IconComponent);

export default ForwardedIconComponent;