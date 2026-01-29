import * as React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: any;
}

const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, ref: React.ForwardedRef<SVGSVGElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconData
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;