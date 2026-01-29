import React, { forwardRef, Ref, ComponentPropsWithoutRef } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends ComponentPropsWithoutRef<typeof IconComponent> {
  icon?: any;
}

const IconWrapper = (props: IconProps, ref: Ref<any>) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;