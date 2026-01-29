import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: any;
  [key: string]: any;
}

const IconComponent = (props: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;