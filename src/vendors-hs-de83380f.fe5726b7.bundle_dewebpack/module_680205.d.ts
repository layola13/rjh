/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Internal icon data structure
 */
export interface IconData {
  /** SVG tag name */
  tag: string;
  /** SVG attributes */
  attr: Record<string, unknown>;
  /** Child elements */
  child?: IconData[];
}

/**
 * Props combining base icon props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Render function signature for icon component
 * @param props - Icon component props
 * @param ref - Forwarded ref to the SVG element
 * @returns React element representing the icon
 */
declare function renderIcon(
  props: IconBaseProps,
  ref: Ref<SVGSVGElement>
): ReactElement;

/**
 * Icon component with forwarded ref support
 * Wraps icon data with a customizable SVG container
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps>;

export default IconComponent;