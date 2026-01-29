import * as React from 'react';
import iconDefault from './icon-module-150620';
import IconWrapper from './IconWrapper-445959';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: React.ComponentType | React.ReactElement;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconDefault
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;