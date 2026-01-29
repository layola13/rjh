import React from 'react';
import iconComponent from './iconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref: React.Ref<unknown>) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: defaultIcon,
    });
  }
);

export default ForwardedIconComponent;