import React, { forwardRef, ForwardedRef, SVGProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconComponentProps extends SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
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