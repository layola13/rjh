import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  ref?: ForwardedRef<SVGSVGElement>;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): JSX.Element => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;