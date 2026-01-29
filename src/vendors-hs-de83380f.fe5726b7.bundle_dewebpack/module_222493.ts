import React, { forwardRef, ForwardedRef, ComponentProps } from 'react';
import iconDefinition from './iconDefinition';
import IconComponent from './IconComponent';

interface IconProps extends Omit<ComponentProps<typeof IconComponent>, 'icon'> {
  // Additional props can be added here if needed
}

const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconWrapper);

export default ForwardedIcon;