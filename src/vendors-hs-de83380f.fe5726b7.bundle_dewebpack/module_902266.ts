import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconComponentProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  ref?: ForwardedRef<SVGSVGElement>;
}

const IconComponent = (
  props: IconComponentProps,
  ref: ForwardedRef<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;