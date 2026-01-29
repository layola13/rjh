import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: React.ComponentType;
  [key: string]: unknown;
}

const IconForwardRefComponent = (
  props: IconProps,
  ref: React.Ref<unknown>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = React.forwardRef(IconForwardRefComponent);

export default ForwardedIcon;