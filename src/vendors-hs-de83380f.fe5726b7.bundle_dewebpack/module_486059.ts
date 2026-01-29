import React from 'react';
import iconComponent from './iconComponent';
import BaseIcon from './BaseIcon';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: React.ComponentType;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: React.Ref<unknown>
): React.ReactElement => {
  return React.createElement(BaseIcon, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = React.forwardRef(IconWrapper);

export default ForwardedIcon;