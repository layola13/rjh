import React from 'react';
import iconDefault from './icon-module';
import WrapperComponent from './wrapper-component';

interface IconProps {
  ref?: React.Ref<unknown>;
  icon?: React.ComponentType | React.ReactElement;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<unknown>
): React.ReactElement => {
  return React.createElement(WrapperComponent, {
    ...props,
    ref,
    icon: iconDefault,
  });
};

const ForwardedIconComponent = React.forwardRef(IconComponent);

export default ForwardedIconComponent;