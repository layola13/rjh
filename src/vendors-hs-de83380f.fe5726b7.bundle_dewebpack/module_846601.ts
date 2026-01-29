import React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
});

export default Icon;