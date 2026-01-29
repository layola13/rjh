import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './IconComponent';
import { IconProps } from './types';

/**
 * Forwarded icon component wrapper
 * @param props - Icon component props
 * @param ref - Forwarded ref to the icon element
 * @returns React element with icon
 */
const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: IconComponent,
  });
};

const ForwardedIconComponent = forwardRef(IconWrapper);

export default ForwardedIconComponent;