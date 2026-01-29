import React from 'react';
import iconDefault from './445845';
import ComponentWrapper from './445959';

interface IconProps {
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(ComponentWrapper, {
      ...props,
      ref,
      icon: iconDefault
    });
  }
);

export default ForwardedIconComponent;