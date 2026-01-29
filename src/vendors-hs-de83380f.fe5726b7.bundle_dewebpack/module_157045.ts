import React from 'react';
import iconComponent from './iconComponent';
import iconDefinition from './iconDefinition';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: iconDefinition,
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;