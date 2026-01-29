import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

const IconForwardRefComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent
    });
  }
);

IconForwardRefComponent.displayName = 'IconForwardRefComponent';

export default IconForwardRefComponent;