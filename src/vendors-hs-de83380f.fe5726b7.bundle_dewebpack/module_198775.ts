import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: React.ComponentType | React.ReactElement;
  [key: string]: unknown;
}

const IconWithRef = React.forwardRef<unknown, IconProps>((props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
});

export default IconWithRef;