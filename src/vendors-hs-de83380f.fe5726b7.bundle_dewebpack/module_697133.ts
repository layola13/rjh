import React from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: unknown;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<unknown, IconProps>(
  (props, ref) => {
    return React.createElement(IconComponent, {
      ...props,
      ref,
      icon: iconData,
    });
  }
);

export default ForwardedIconComponent;