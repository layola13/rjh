import * as React from 'react';
import iconData from './289199';
import IconWrapper from './443320';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconComponent: React.ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = React.forwardRef(IconComponent);

export default ForwardedIcon;