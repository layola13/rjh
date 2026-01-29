import React from 'react';
import iconComponent from './iconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: unknown;
  [key: string]: unknown;
}

const IconWrapper = (props: IconProps, ref: React.Ref<unknown>): React.ReactElement => {
  return React.createElement(defaultIcon, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = React.forwardRef(IconWrapper);

export default ForwardedIcon;