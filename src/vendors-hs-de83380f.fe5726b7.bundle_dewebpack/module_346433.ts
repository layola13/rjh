import React from 'react';
import iconDefault from './icon-module';
import ComponentWrapper from './ComponentWrapper';

interface IconProps {
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<unknown, IconProps>((props, ref) => {
  return React.createElement(ComponentWrapper, {
    ...props,
    ref,
    icon: iconDefault
  });
});

export default IconComponent;