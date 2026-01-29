import React from 'react';
import iconComponent from './iconComponent';
import baseIcon from './baseIcon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(baseIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;