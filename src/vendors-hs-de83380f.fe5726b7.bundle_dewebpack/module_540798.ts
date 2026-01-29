import React, { forwardRef, ForwardedRef, ComponentPropsWithoutRef } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconComponentProps extends ComponentPropsWithoutRef<typeof IconWrapper> {
  icon?: unknown;
}

const IconComponent = (
  props: IconComponentProps,
  ref: ForwardedRef<unknown>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;