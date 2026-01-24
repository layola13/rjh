/**
 * Dropdown component type definitions
 * Provides a trigger-based dropdown menu with configurable placement and animations
 */

import type { CSSProperties, ReactElement, ReactNode, Ref } from 'react';
import type { AlignType, BuildInPlacements } from 'rc-trigger';

/**
 * Trigger action types for showing/hiding dropdown
 */
export type TriggerAction = 'click' | 'hover' | 'focus' | 'contextMenu';

/**
 * Placement positions for dropdown menu
 */
export type PlacementType =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'top'
  | 'bottom';

/**
 * Props for Dropdown component
 */
export interface DropdownProps {
  /**
   * Whether to show arrow pointing to trigger element
   * @default false
   */
  arrow?: boolean;

  /**
   * Prefix class name for styling
   * @default 'rc-dropdown'
   */
  prefixCls?: string;

  /**
   * CSS transition name for dropdown animation
   */
  transitionName?: string;

  /**
   * Animation configuration object
   */
  animation?: string | object;

  /**
   * Alignment configuration for dropdown positioning
   */
  align?: AlignType;

  /**
   * Placement of dropdown relative to trigger
   * @default 'bottomLeft'
   */
  placement?: PlacementType;

  /**
   * Custom placement configurations
   */
  placements?: BuildInPlacements;

  /**
   * Container element for rendering dropdown portal
   * @returns HTMLElement to mount dropdown
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Actions that trigger dropdown to show
   */
  showAction?: TriggerAction[];

  /**
   * Actions that trigger dropdown to hide
   */
  hideAction?: TriggerAction[];

  /**
   * Additional CSS class for overlay
   */
  overlayClassName?: string;

  /**
   * Inline styles for overlay
   */
  overlayStyle?: CSSProperties;

  /**
   * Whether dropdown is visible (controlled mode)
   */
  visible?: boolean;

  /**
   * Trigger actions for dropdown
   * @default ['hover']
   */
  trigger?: TriggerAction[];

  /**
   * Whether to auto focus dropdown when opened
   */
  autoFocus?: boolean;

  /**
   * Overlay content (menu component or render function)
   */
  overlay: ReactElement | (() => ReactElement);

  /**
   * Callback when overlay is clicked
   */
  onOverlayClick?: (event: MouseEvent) => void;

  /**
   * Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * Trigger element (single child component)
   */
  children: ReactElement;

  /**
   * CSS class applied to trigger when dropdown is open
   * @default '{prefixCls}-open'
   */
  openClassName?: string;

  /**
   * Whether overlay min-width matches trigger width
   * @default true when alignPoint is false
   */
  minOverlayWidthMatchTrigger?: boolean;

  /**
   * Whether to align dropdown to click point instead of trigger element
   * @default false
   */
  alignPoint?: boolean;
}

/**
 * Dropdown component with ref support
 * Wraps child element with dropdown menu functionality
 */
declare const Dropdown: React.ForwardRefExoticComponent<
  DropdownProps & React.RefAttributes<unknown>
>;

export default Dropdown;