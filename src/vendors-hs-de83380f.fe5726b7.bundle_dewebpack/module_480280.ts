import React, { forwardRef, ForwardedRef, ComponentPropsWithoutRef } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends ComponentPropsWithoutRef<typeof IconComponent> {
  icon?: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<unknown>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;