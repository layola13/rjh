import React, { forwardRef, ForwardedRef, ComponentPropsWithoutRef } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconProps extends ComponentPropsWithoutRef<typeof IconWrapper> {
  icon?: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<unknown>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;