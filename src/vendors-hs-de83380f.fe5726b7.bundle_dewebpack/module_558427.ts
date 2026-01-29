import React from 'react';
import iconComponent from './iconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  [key: string]: unknown;
}

const IconWrapper = React.forwardRef<unknown, IconProps>((props, ref) => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: defaultIcon
  });
});

export default IconWrapper;