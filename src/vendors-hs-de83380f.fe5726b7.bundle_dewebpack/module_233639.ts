import React, { forwardRef, ForwardedRef, ComponentPropsWithoutRef } from 'react';
import iconData from './iconData';
import IconComponent from './IconComponent';

interface IconProps extends ComponentPropsWithoutRef<typeof IconComponent> {
  icon?: any;
}

const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<any>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;