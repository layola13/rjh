import React from 'react';
import iconComponent from './iconComponent';
import iconData from './iconData';

interface IconProps {
  [key: string]: unknown;
}

const IconWrapper = React.forwardRef<unknown, IconProps>((props, ref) => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: iconData
  });
});

export default IconWrapper;