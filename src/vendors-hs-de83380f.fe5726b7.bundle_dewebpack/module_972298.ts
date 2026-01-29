import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: React.ComponentType | React.ReactElement;
  [key: string]: unknown;
}

const IconWithRef = (props: IconProps, ref: React.Ref<unknown>): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = React.forwardRef(IconWithRef);

export default ForwardedIcon;