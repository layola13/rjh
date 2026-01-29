import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconComponentProps extends SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
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