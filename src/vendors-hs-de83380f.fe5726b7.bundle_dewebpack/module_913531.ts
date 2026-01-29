import React from 'react';
import iconDefault from './icon-module';
import ComponentWrapper from './ComponentWrapper';

interface IconProps {
  icon?: React.ReactNode;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(ComponentWrapper, {
      ...props,
      ref,
      icon: iconDefault,
    });
  }
);

export default IconComponent;