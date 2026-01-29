import React from 'react';
import iconComponent from './iconComponent';
import defaultIcon from './defaultIcon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: React.ComponentType;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(defaultIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;