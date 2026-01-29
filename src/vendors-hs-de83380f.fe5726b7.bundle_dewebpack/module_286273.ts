import React, { forwardRef, ForwardedRef, ComponentProps } from 'react';
import iconData from './icon-data';
import IconComponent from './IconComponent';

interface IconProps extends Omit<ComponentProps<typeof IconComponent>, 'icon'> {
  // Additional props can be defined here if needed
}

const IconWrapper = (props: IconProps, ref: ForwardedRef<unknown>) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;