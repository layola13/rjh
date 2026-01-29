import React from 'react';
import iconComponent from './iconComponent';
import baseIcon from './baseIcon';

interface IconProps {
  [key: string]: unknown;
}

const ForwardedIcon = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(baseIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

export default ForwardedIcon;