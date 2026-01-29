import React from 'react';
import iconComponent from './iconComponent';
import iconDefault from './iconDefault';

interface IconProps {
  [key: string]: unknown;
}

const ForwardedIcon = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: iconDefault,
    });
  }
);

export default ForwardedIcon;