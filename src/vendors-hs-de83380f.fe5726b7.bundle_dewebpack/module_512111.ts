import React from 'react';
import IconWrapper from './IconWrapper';
import iconDefinition from './iconDefinition';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  [key: string]: unknown;
}

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconDefinition
    });
  }
);

ForwardedIcon.displayName = 'ForwardedIcon';

export default ForwardedIcon;