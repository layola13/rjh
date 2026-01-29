import * as React from 'react';
import iconComponent from './iconComponent';
import iconData from './iconData';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: any;
  [key: string]: any;
}

const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: iconData
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;