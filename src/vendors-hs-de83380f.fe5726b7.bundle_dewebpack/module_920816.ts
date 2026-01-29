import React, { forwardRef, ForwardedRef, ComponentProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends Omit<ComponentProps<typeof IconWrapper>, 'icon'> {
  // Additional icon-specific props can be defined here
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