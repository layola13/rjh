import React from 'react';
import iconData from './399734';
import IconWrapper from './445959';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: unknown;
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