/**
 * Dropdown component type definitions
 * A flexible dropdown component built on top of Trigger component
 */

import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { TriggerProps, AlignType, BuildInPlacements, ActionType } from 'rc-trigger';

/**
 * Placement options for the dropdown
 */
export type DropdownPlacement =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'top'
  | 'bottom';

/**
 * Props for the Dropdown component
 */
export interface DropdownProps extends Omit<TriggerProps, 'popup' | 'popupVisible' | 'onPopupVisibleChange'> {
  /**
   * Whether to show arrow pointing to the trigger element
   * @default false
   */
  arrow?: boolean;

  /**
   * CSS class prefix for the dropdown
   * @default 'rc-dropdown'
   */
  prefixCls?: string;

  /**
   * CSS transition name for dropdown animation
   */
  transitionName?: string;

  /**
   * CSS animation configuration for dropdown
   */
  animation?: string | object;

  /**
   * Alignment configuration for the dropdown popup
   */
  align?: AlignType;

  /**
   * Placement of the dropdown relative to trigger
   * @default 'bottomLeft'
   */
  placement?: DropdownPlacement;

  /**
   * Built-in placement configurations
   */
  placements?: BuildInPlacements;

  /**
   * Container element for rendering the dropdown portal
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Actions that trigger showing the dropdown
   */
  showAction?: ActionType[];

  /**
   * Actions that trigger hiding the dropdown
   */
  hideAction?: ActionType[];

  /**
   * Additional CSS class name for the overlay
   */
  overlayClassName?: string;

  /**
   * Inline styles for the overlay
   */
  overlayStyle?: CSSProperties;

  /**
   * Whether the dropdown is visible (controlled mode)
   */
  visible?: boolean;

  /**
   * Actions that trigger the dropdown
   * @default ['hover']
   */
  trigger?: ActionType[];

  /**
   * Dropdown overlay content (can be a function returning ReactNode)
   */
  overlay: ReactNode | (() => ReactNode);

  /**
   * Callback when overlay is clicked
   */
  onOverlayClick?: (event: React.MouseEvent) => void;

  /**
   * Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * CSS class name to add to trigger when dropdown is open
   * @default '{prefixCls}-open'
   */
  openClassName?: string;

  /**
   * Whether to stretch dropdown width to match trigger width
   * @default true (false when alignPoint is true)
   */
  minOverlayWidthMatchTrigger?: boolean;

  /**
   * Whether to align dropdown to click point instead of trigger element
   * @default false
   */
  alignPoint?: boolean;

  /**
   * Trigger element (single React element)
   */
  children: ReactElement;
}

/**
 * Dropdown component reference type
 */
export interface DropdownRef {
  /**
   * Force update the dropdown position
   */
  forcePopupAlign: () => void;
  
  /**
   * Get the root DOM element
   */
  getRootDomNode: () => HTMLElement;
  
  /**
   * Get the popup DOM element
   */
  getPopupDomNode: () => HTMLElement;
}

/**
 * Dropdown component
 * Displays a floating overlay panel when trigger element is interacted with
 */
declare const Dropdown: React.ForwardRefExoticComponent<
  DropdownProps & React.RefAttributes<DropdownRef>
>;

export default Dropdown;