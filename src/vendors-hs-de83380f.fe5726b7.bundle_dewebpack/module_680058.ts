import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import iconComponent from './iconComponent';
import type { IconProps } from './types';

interface IconWrapperProps extends IconProps {
  ref?: React.Ref<unknown>;
}

const IconComponent: React.FC<IconWrapperProps> = (props, ref) => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIconComponent: ForwardRefExoticComponent<IconProps & RefAttributes<unknown>> = 
  React.forwardRef(IconComponent);

export default ForwardedIconComponent;