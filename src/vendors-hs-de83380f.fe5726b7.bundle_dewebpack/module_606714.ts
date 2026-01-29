import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconDefinition from './iconDefinition';
import IconComponent from './IconComponent';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const ForwardedIcon = (props: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const Icon = forwardRef(ForwardedIcon);

export default Icon;