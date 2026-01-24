/**
 * React Icon Component Module
 * 
 * This module exports a forward-ref wrapped icon component that combines
 * a base icon implementation with additional props.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base properties that can be passed to the icon component
 */
interface IconBaseProps {
  /**
   * CSS class name for styling
   */
  className?: string;

  /**
   * Inline styles object
   */
  style?: React.CSSProperties;

  /**
   * Icon size (width and height)
   */
  size?: number | string;

  /**
   * Icon color
   */
  color?: string;

  /**
   * Accessibility label
   */
  'aria-label'?: string;

  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Properties specific to this icon component
 */
interface IconComponentProps extends IconBaseProps {
  /**
   * The icon data/configuration from the imported icon module
   */
  icon?: unknown;
}

/**
 * Ref type for the icon component (typically a DOM element)
 */
type IconComponentRef = SVGSVGElement | HTMLElement;

/**
 * Forward-ref icon component that wraps the base icon with additional functionality.
 * 
 * This component accepts all standard icon props and forwards refs to the underlying DOM element.
 * 
 * @example
 *