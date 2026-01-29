import * as React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;