import React from 'react';
import iconDefault from './icon-module';
import WrapperComponent from './wrapper-component';

interface IconProps {
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(WrapperComponent, {
      ...props,
      ref,
      icon: iconDefault,
    });
  }
);

export default IconComponent;