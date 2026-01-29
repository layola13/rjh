import React, { forwardRef, Ref, ComponentProps } from 'react';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconProps extends ComponentProps<typeof IconComponent> {
  icon?: any;
}

const IconWrapper = (props: IconProps, ref: Ref<any>) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;