import * as React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: any;
  ref?: React.Ref<SVGSVGElement>;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;