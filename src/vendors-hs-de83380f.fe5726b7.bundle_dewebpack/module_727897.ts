import React from 'react';
import iconComponent from './iconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  [key: string]: unknown;
}

const IconWrapper = React.forwardRef<unknown, IconProps>((props, ref) => {
  return React.createElement(defaultIcon, {
    ...props,
    ref,
    icon: iconComponent
  });
});

export default IconWrapper;