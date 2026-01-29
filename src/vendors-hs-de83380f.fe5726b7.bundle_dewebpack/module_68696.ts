import React from 'react';
import iconDefinition from './icon-definition';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;