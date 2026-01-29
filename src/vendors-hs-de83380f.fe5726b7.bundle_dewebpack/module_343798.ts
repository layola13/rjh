import React from 'react';
import iconComponent from './445959';
import iconData from './124711';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconForwardRefComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: iconData,
    });
  }
);

IconForwardRefComponent.displayName = 'IconForwardRefComponent';

export default IconForwardRefComponent;