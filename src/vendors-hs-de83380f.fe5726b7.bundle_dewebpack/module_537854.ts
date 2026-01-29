import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconDefinition from './iconDefinition';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

function IconComponent(
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): React.ReactElement {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition
  });
}

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;