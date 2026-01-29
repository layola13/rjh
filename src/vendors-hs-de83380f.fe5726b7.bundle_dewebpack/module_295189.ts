import React from 'react';
import iconComponent from './icon-component';
import baseIcon from './base-icon';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: unknown;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: React.Ref<unknown>
): React.ReactElement => {
  return React.createElement(baseIcon, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = React.forwardRef(IconWrapper);

export default ForwardedIcon;