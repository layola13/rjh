import React from 'react';
import iconDefault from './iconDefault';
import DefaultComponent from './DefaultComponent';

interface IconProps {
  [key: string]: unknown;
}

const IconWrapper = React.forwardRef<unknown, IconProps>((props, ref) => {
  return React.createElement(DefaultComponent, {
    ...props,
    ref,
    icon: iconDefault
  });
});

export default IconWrapper;