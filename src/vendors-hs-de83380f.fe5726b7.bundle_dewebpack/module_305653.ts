import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import iconComponent from './iconComponent';
import type { IconProps } from './types';

interface IconWrapperProps extends IconProps {
  icon?: React.ComponentType;
}

const IconWrapper: ForwardRefExoticComponent<IconWrapperProps & RefAttributes<unknown>> = React.forwardRef<unknown, IconWrapperProps>(
  (props, ref) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: iconComponent
    });
  }
);

export default IconWrapper;