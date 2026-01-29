import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './IconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  [key: string]: unknown;
}

function IconRenderer(
  props: IconProps,
  ref: ForwardedRef<unknown>
): ReactElement {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: defaultIcon
  });
}

const ForwardedIcon = forwardRef(IconRenderer);

export default ForwardedIcon;