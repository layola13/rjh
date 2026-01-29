import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
}

const IconForwardRef = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

IconForwardRef.displayName = 'IconForwardRef';

export default IconForwardRef;