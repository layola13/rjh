import React, { forwardRef, Ref, SVGProps } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconWrapper);

export default ForwardedIcon;