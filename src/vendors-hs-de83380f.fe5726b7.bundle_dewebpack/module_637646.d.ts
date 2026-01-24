/**
 * Icon component module
 * Provides a React component wrapper for a specific icon
 */

import React from 'react';

/**
 * Props interface for the icon component
 * Extends standard SVG element properties
 */
interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Optional class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * Icon component reference type
 */
type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default icon data object containing SVG paths and properties
 */
interface IconDefinition {
  name: string;
  theme: string;
  icon: {
    tag: string;
    attrs: Record<string, unknown>;
    children: Array<{ tag: string; attrs: Record<string, unknown> }>;
  };
}

/**
 * Icon wrapper component that renders an SVG icon with forwarded ref
 * @param props - Icon properties including ref
 * @returns Rendered icon component
 */
const IconComponentFactory = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIconDefinition,
  });
};

/**
 * Forwarded ref icon component
 * Allows parent components to access the underlying SVG element
 */
const ForwardedIconComponent: IconComponent = React.forwardRef(IconComponentFactory);

ForwardedIconComponent.displayName = 'IconComponent';

export default ForwardedIconComponent;

// Internal imports (these would be defined in separate modules)
declare const IconWrapper: React.ComponentType<IconProps & { icon: IconDefinition }>;
declare const defaultIconDefinition: IconDefinition;