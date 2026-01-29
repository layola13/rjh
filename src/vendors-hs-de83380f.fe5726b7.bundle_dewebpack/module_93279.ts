import React from 'react';
import iconComponent from './iconComponent';
import Icon from './Icon';

interface IconProps {
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref: React.Ref<unknown>) => {
    return React.createElement(Icon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

export default ForwardedIconComponent;