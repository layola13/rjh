/**
 * Toolbar item component type definitions
 * Represents a single interactive tool button in a toolbar with support for icons, tooltips, popovers, and badges
 */

import React from 'react';

/**
 * Badge configuration for toolbar item overlay
 */
export interface ToolbarItemBadge {
  /** Badge icon image URL */
  icon: string;
  /** Tooltip text displayed on badge hover */
  tooltip?: string;
  /** Click handler for badge interaction */
  onclick?: () => void;
}

/**
 * Tooltip configuration options
 */
export interface TooltipConfig {
  /** Tooltip display text */
  title: string;
  /** Trigger event type (e.g., 'hover', 'click') */
  trigger?: string;
  /** Total delay in milliseconds */
  delay?: number;
  /** Delay before showing tooltip (ms) */
  delayOpen?: number;
  /** Delay before hiding tooltip (ms) */
  delayClose?: number;
}

/**
 * Heavy popover configuration with rich content
 */
export interface PopoverConfig {
  /** Trigger event type */
  trigger?: string;
  /** Total delay in milliseconds */
  delay?: number;
  /** Delay before showing popover (ms) */
  delayOpen?: number;
  /** Delay before hiding popover (ms) */
  delayClose?: number;
  /** Preview image URL */
  imageUrl?: string;
  /** Preview video URL */
  videoUrl?: string;
  /** Description text content */
  text?: string;
  /** Whether to show action button */
  showBtn?: boolean;
  /** Action button click handler */
  onBtnClick?: () => void;
  /** Action button label text */
  btnText?: string;
  /** Link text for additional navigation */
  linkText?: string;
  /** Link URL for additional navigation */
  linkUrl?: string;
}

/**
 * Hotkey configuration - can be string shortcut or complex key combination
 */
export type HotkeyConfig = string | {
  key: string;
  modifiers?: string[];
};

/**
 * Signal event data for state synchronization
 */
export interface SignalData {
  /** Whether the toolbar item is enabled */
  enable: boolean;
  /** Whether the toolbar item is in pressed state */
  isPressed: boolean;
}

/**
 * Signal changed event handler interface
 */
export interface SignalChanged {
  /** Signal event data payload */
  data: SignalData;
}

/**
 * Toolbar item component props
 */
export interface ToolbarItemProps {
  /** Whether the toolbar item is visible */
  visible: boolean;
  /** Whether the toolbar item is enabled (interactive) */
  enable: boolean;
  /** Display label text */
  label?: string;
  /** Default icon image URL */
  icon: string;
  /** Hover state icon image URL (optional, falls back to default icon) */
  iconhover?: string;
  /** Tooltip text or configuration object */
  tooltip?: string | TooltipConfig;
  /** Click event handler */
  onclick: () => void;
  /** Mouse enter event handler */
  onMouseEnter: () => void;
  /** Mouse leave event handler */
  onMouseLeave: () => void;
  /** Unique path identifier for the toolbar item */
  path: string;
  /** Signal hook object for external state synchronization */
  signalChanged?: object;
  /** Whether the toolbar item is in pressed/active state */
  isPressed?: boolean;
  /** Badge overlay configuration */
  badge?: ToolbarItemBadge;
  /** Keyboard shortcut configuration */
  hotkey?: HotkeyConfig;
  /** Popover rich content configuration */
  popover?: PopoverConfig;
  /** Index position in toolbar (affects popover placement) */
  index: number;
}

/**
 * Toolbar item component state
 */
export interface ToolbarItemState {
  /** Whether mouse is hovering over the item */
  hover: boolean;
  /** Whether the item is enabled */
  enable: boolean;
  /** Whether the item is in pressed state */
  isPressed: boolean;
}

/**
 * Toolbar item component - Interactive button with icon, tooltip, and optional popover
 * 
 * Features:
 * - Icon with hover state support
 * - Tooltip or rich popover content
 * - Keyboard shortcut display
 * - Badge overlay support
 * - Enabled/disabled states
 * - Pressed/active state indication
 * - Signal-based state synchronization
 * 
 * @example
 *