import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: any;
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

const ForwardedIconComponent = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIconComponent;