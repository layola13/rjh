import React from 'react';
import IconComponent from './IconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: unknown;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: React.Ref<unknown>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: defaultIcon,
  });
};

const ForwardedIconWrapper = React.forwardRef(IconWrapper);

export default ForwardedIconWrapper;