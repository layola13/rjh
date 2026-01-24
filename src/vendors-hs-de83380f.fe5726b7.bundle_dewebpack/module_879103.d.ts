/**
 * React component for rendering an icon with forwarded ref support.
 * This module exports a forward ref wrapper around a base icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component (from module 445959)
 */
interface BaseIconProps {
  /** The icon data/configuration to render */
  icon: IconData;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional props passed to the underlying element */
  [key: string]: any;
}

/**
 * Icon data structure (from module 860402)
 */
interface IconData {
  /** SVG path data or icon identifier */
  path?: string;
  /** Icon name/identifier */
  name?: string;
  /** View box dimensions */
  viewBox?: string;
  /** Additional icon metadata */
  [key: string]: any;
}

/**
 * Props accepted by the forwarded icon component.
 * Omits 'icon' since it's injected internally.
 */
type IconComponentProps = Omit<BaseIconProps, 'icon'>;

/**
 * Ref type that can be attached to the icon component
 */
type IconRef = HTMLElement | SVGSVGElement | null;

/**
 * Forward ref icon component that renders the default icon.
 * 
 * @example
 *