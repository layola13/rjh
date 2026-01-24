import React, { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Icon component props interface
 */
interface IconComponentProps {
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Icon style */
  style?: React.CSSProperties;
  /** Custom attributes */
  [key: string]: unknown;
}

/**
 * Icon wrapper component props
 */
interface IconWrapperProps extends IconComponentProps {
  /** The icon configuration to render */
  icon: IconConfig;
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /** Icon name or identifier */
  name?: string;
  /** Icon SVG path or content */
  content?: string;
  /** Icon viewBox */
  viewBox?: string;
  [key: string]: unknown;
}

/**
 * Base icon wrapper component reference type
 */
type IconWrapperComponent = ForwardRefExoticComponent<
  IconWrapperProps & RefAttributes<HTMLElement>
>;

/**
 * Default icon configuration imported from external module
 */
const defaultIconConfig: IconConfig = {
  name: 'default-icon',
  viewBox: '0 0 24 24'
};

/**
 * Icon wrapper component that renders icons with forwarded refs
 * 
 * @param props - Component properties including icon configuration
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element rendering the icon
 */
const IconComponent = (
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapperComponent, {
    ...props,
    ref,
    icon: defaultIconConfig
  });
};

/**
 * Forwarded ref version of the icon component
 * Allows parent components to access the underlying DOM element
 */
const ForwardedIconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<HTMLElement>
> = React.forwardRef(IconComponent);

export default ForwardedIconComponent;
export type { IconComponentProps, IconConfig, IconWrapperProps };