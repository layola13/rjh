/**
 * Icon component module
 * Wraps an icon with forwardRef support for React
 */

import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, createElement } from 'react';

/**
 * Base props for icon components
 */
interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Props for the wrapped icon component
 */
interface IconComponentProps extends IconBaseProps {
  /** Ref forwarded to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  path: React.ReactNode;
  /** Default icon size */
  size?: number;
}

/**
 * Base icon wrapper component that handles rendering
 */
declare const IconWrapper: React.ComponentType<IconBaseProps & { icon: IconDefinition }>;

/**
 * The specific icon definition imported from the icons module
 */
declare const iconDefinition: IconDefinition;

/**
 * Render function that creates the icon element with forwarded ref
 * @param props - Icon component properties
 * @param ref - Forwarded ref to attach to the SVG element
 * @returns React element representing the icon
 */
const renderIcon = (
  props: IconBaseProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

/**
 * Icon component with forwardRef support
 * Allows parent components to access the underlying SVG element via ref
 */
const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
> = forwardRef(renderIcon);

export default IconComponent;