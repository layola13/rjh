import * as React from 'react';
import iconDefinition from './iconDefinition';
import IconBase from './IconBase';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconBase, {
      ...props,
      ref,
      icon: iconDefinition
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;