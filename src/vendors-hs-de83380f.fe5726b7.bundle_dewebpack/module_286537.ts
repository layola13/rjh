import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent
    });
  }
);

export default ForwardedIconComponent;