import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import type { IconProps } from './types';
import IconComponent from './IconComponent';
import iconDefault from './iconDefault';

interface ComponentProps extends IconProps {
  ref?: ForwardedRef<unknown>;
}

function createIconElement(
  props: ComponentProps,
  ref: ForwardedRef<unknown>
): ReactElement {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefault
  });
}

const ForwardedIconComponent = forwardRef(createIconElement);

export default ForwardedIconComponent;