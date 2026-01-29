import React from 'react';
import iconComponent from './iconComponent';
import { IconProps } from './types';

interface ForwardedIconProps extends IconProps {
  ref?: React.Ref<unknown>;
}

const IconWrapper = (props: IconProps, ref: React.Ref<unknown>): React.ReactElement => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = React.forwardRef<unknown, IconProps>(IconWrapper);

export default ForwardedIcon;