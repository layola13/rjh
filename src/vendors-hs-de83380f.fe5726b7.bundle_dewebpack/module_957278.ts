import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;