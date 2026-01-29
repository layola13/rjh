import React from 'react';
import iconDefault from './iconModule';
import ComponentWrapper from './ComponentWrapper';

interface IconProps {
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<unknown, IconProps>(
  (props: IconProps, ref) => {
    return React.createElement(ComponentWrapper, {
      ...props,
      ref,
      icon: iconDefault,
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;