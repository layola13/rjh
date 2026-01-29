import React, { forwardRef, Ref, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from './types';
import iconDefinition from './iconDefinition';
import IconComponent from './IconComponent';

interface IconComponentProps extends IconProps {
  icon: typeof iconDefinition;
}

const IconWrapper = (
  props: IconProps,
  ref: Ref<HTMLSpanElement>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon: ForwardRefExoticComponent<IconProps & RefAttributes<HTMLSpanElement>> = forwardRef(IconWrapper);

export default ForwardedIcon;