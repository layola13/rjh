import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon component that wraps the base icon with additional props
 * @param props - Icon properties
 * @param ref - Forwarded ref to the icon element
 * @returns React element representing the icon
 */
const Icon = (props: IconProps, ref: ForwardedRef<HTMLElement>): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(Icon);

export default ForwardedIcon;