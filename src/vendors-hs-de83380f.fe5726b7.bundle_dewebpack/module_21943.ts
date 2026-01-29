import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import type { IconProps } from './types';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface ComponentProps extends IconProps {
  ref?: ForwardedRef<HTMLElement>;
}

const IconWrapper = (
  props: ComponentProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconWrapper);

export default ForwardedIconComponent;