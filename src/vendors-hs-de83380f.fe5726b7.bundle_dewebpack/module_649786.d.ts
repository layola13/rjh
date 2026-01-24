/**
 * React component that renders an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped component that combines props with a default icon.
 * 
 * @module IconComponent
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extend this interface with specific props based on the actual component requirements.
 */
interface IconComponentProps {
  /** Additional className for styling */
  className?: string;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon data/configuration object from the icon registry.
 */
interface IconDefinition {
  /** Icon name or identifier */
  name?: string;
  /** SVG path data or icon content */
  data?: string | unknown;
  /** Icon dimensions */
  width?: number;
  height?: number;
  [key: string]: unknown;
}

/**
 * Internal render function that creates the icon element.
 * Merges provided props with the default icon configuration.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to be attached to the underlying element
 * @returns React element representing the icon
 */
declare function renderIcon(
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement;

/**
 * Default icon definition imported from the icon registry.
 */
export declare const defaultIcon: IconDefinition;

/**
 * Icon component with forwarded ref support.
 * Combines user-provided props with default icon configuration.
 * 
 * @example
 *