import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const Icon = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(Icon);

export default ForwardedIcon;