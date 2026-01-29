import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './icon-data';
import IconComponent from './IconComponent';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: any;
  [key: string]: any;
}

const IconWrapper = (props: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;