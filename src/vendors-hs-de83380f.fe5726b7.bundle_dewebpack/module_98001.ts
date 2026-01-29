import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconComponent from './iconComponent';
import iconData from './iconData';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  ref?: ForwardedRef<SVGSVGElement>;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;