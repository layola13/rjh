import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconDefinition from './iconDefinition';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  ref?: ForwardedRef<SVGSVGElement>;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;