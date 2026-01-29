import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconComponentProps extends SVGProps<SVGSVGElement> {
  icon?: any;
  [key: string]: any;
}

const IconComponent = (
  props: IconComponentProps,
  ref: ForwardedRef<SVGSVGElement>
): JSX.Element => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;