import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './icon-data';
import IconComponent from './IconComponent';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const IconForwardComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): JSX.Element => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconForwardComponent);

export default ForwardedIcon;