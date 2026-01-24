/**
 * Dropdown trigger component with configurable placement and animation.
 * Wraps children with a dropdown overlay that can be positioned relative to the trigger element.
 */

import type { Component, ReactNode, ReactElement } from 'react';

/**
 * Alignment points for dropdown positioning.
 * Uses two-character codes: t=top, b=bottom, l=left, r=right
 */
type AlignPoint = 'tl' | 'tr' | 'bl' | 'br';

/**
 * Overflow adjustment configuration for dropdown positioning.
 */
interface OverflowConfig {
  /** Whether to adjust X axis position when overflow occurs (0=false, 1=true) */
  adjustX: 0 | 1;
  /** Whether to adjust Y axis position when overflow occurs (0=false, 1=true) */
  adjustY: 0 | 1;
}

/**
 * Alignment configuration for dropdown placement.
 */
interface AlignConfig {
  /** Alignment points: [target point, popup point] */
  points: [AlignPoint, AlignPoint];
  /** Offset in pixels: [x, y] */
  offset: [number, number];
  /** Overflow adjustment behavior */
  overflow: OverflowConfig;
}

/**
 * Built-in placement configurations for dropdown positioning.
 */
interface BuiltinPlacements {
  bottomRight: AlignConfig;
  bottomLeft: AlignConfig;
  topRight: AlignConfig;
  topLeft: AlignConfig;
}

/**
 * Direction for layout (LTR or RTL).
 */
type Direction = 'ltr' | 'rtl';

/**
 * Dropdown placement position.
 */
type Placement = 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 * Dropdown option configuration.
 */
interface DropdownOption {
  /** Option label */
  label: ReactNode;
  /** Option value */
  value: string | number;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Props for the Dropdown component.
 */
interface DropdownProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Child element that triggers the dropdown */
  children: ReactNode;
  /** Whether the dropdown is visible */
  visible: boolean;
  /** Dropdown placement position */
  placement?: 'top' | 'bottom';
  /** CSS transition name for show/hide animation */
  transitionName?: string;
  /** Text direction for internationalization */
  direction?: Direction;
  /** Container element getter for portal rendering */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** Dropdown menu options */
  options: DropdownOption[];
}

/**
 * Dropdown component that displays a floating menu relative to a trigger element.
 * Supports multiple placements, animations, and RTL layouts.
 */
export default class Dropdown extends Component<DropdownProps> {
  /**
   * Gets the CSS class prefix for dropdown elements.
   * @returns Prefixed class name for dropdown
   */
  getDropdownPrefix(): string;

  /**
   * Creates the dropdown menu element with options.
   * @returns React element for the dropdown menu
   */
  getDropdownElement(): ReactElement;

  /**
   * Calculates the final dropdown placement based on direction and placement prop.
   * Automatically adjusts for RTL layouts.
   * @returns Computed placement value
   */
  getDropDownPlacement(): Placement;

  render(): ReactElement;
}

/**
 * Built-in alignment configurations for all supported placements.
 * Defines how the dropdown should align with its trigger element.
 */
export declare const builtinPlacements: BuiltinPlacements;