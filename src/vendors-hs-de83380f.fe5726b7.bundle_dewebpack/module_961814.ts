import React, { forwardRef, Ref, ReactElement } from 'react';
import defaultIcon from './defaultIcon';
import IconWrapper from './IconWrapper';

interface IconProps {
  [key: string]: unknown;
}

function IconComponent(props: IconProps, ref: Ref<unknown>): ReactElement {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
}

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;