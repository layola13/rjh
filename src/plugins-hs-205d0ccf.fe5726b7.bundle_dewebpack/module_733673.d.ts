/**
 * Toolbar component type definitions
 * Provides type-safe props for the main toolbar component and its children
 */

import React from 'react';

/**
 * Signal hook for tooltip display control
 */
export interface ToolTipSignalHook {
  dispatch: (data: unknown) => void;
}

/**
 * Signal for toolbar hover state
 */
export interface ToolbarHoverSignal {
  dispatch: (data: { isHover: boolean }) => void;
}

/**
 * Signal that can be changed
 */
export interface ChangedSignal {
  dispatch?: (data: unknown) => void;
}

/**
 * Toolbar item types enumeration
 */
export enum ToolbarItemType {
  Folder = 'folder',
  Button = 'button',
  Divider = 'divider'
}

/**
 * Line type for toolbar items
 */
export type LineType = 'first' | 'second';

/**
 * Group placement for toolbar items
 */
export type GroupType = 'group01' | 'left' | 'medium' | 'right';

/**
 * Data structure for toolbar item configuration
 */
export interface ToolbarItemData {
  /** Item visibility state */
  visible?: boolean;
  /** Item enabled/disabled state */
  enable?: boolean;
  /** Badge text/number to display */
  badge?: string | number;
  /** Count number for notifications */
  count?: number;
  /** Hover state */
  hover?: boolean;
  /** Checked state for folder items */
  isChecked?: boolean;
  /** First-level tooltip text */
  firstTooltip?: string;
  /** Whether icon is an image URL */
  isImg?: boolean;
  /** Background image URL */
  bgImg?: string;
  /** Show tooltip based on signal */
  showTipBySignal?: boolean;
  /** Delay time before tooltip disappears (ms) */
  delayDisappearTime?: number;
  /** Mouse enter event handler */
  onMouseEnter?: () => void;
  /** Mouse leave event handler */
  onMouseLeave?: () => void;
  /** Line type placement */
  lineType?: LineType;
  /** Hide the icon */
  hiddenIcon?: boolean;
  /** Icon identifier or URL */
  icon?: string;
  /** Icon identifier for hover state */
  iconhover?: string;
  /** Category identifier */
  catagory?: string;
  /** Display label text */
  label?: string;
  /** Label icon identifier */
  labelIcon?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Popover content */
  popover?: React.ReactNode;
  /** Width of the item */
  width?: number | string;
  /** Pressed/active state */
  isPressed?: boolean;
  /** Dynamic tooltip generator */
  dynamicTooltip?: () => string;
  /** Hotkey shortcut text */
  hotkey?: string;
  /** Custom tooltip component */
  customTip?: React.ReactNode;
  /** Show dot indicator */
  hasDot?: boolean;
  /** Button mouse enter handler */
  onButtonMouseEnter?: () => void;
  /** Button mouse leave handler */
  onButtonMouseLeave?: () => void;
  /** Lock state */
  lock?: boolean;
  /** Guide tip content */
  guidetip?: React.ReactNode;
  /** Custom style class name */
  styleName?: string;
  /** Info icon identifier */
  infoIcon?: string;
  /** Group placement */
  group?: GroupType;
  /** Callback when showing new content */
  showNewCallBack?: () => void;
}

/**
 * Toolbar item node structure
 */
export interface ToolbarItem {
  /** Item type */
  type: ToolbarItemType;
  /** Unique name/identifier */
  name: string;
  /** Item configuration data */
  data: ToolbarItemData;
  /** Child items for folders */
  childItems: ToolbarItem[];
  /** Click handler */
  click?: () => void;
  /** Signal changed event */
  signalChanged?: ChangedSignal;
  /** Whether any child is pressed */
  hasChildPressed?: boolean;
  /** Whether has badge dot indicator */
  hasBadgeDot?: boolean;
  /** Whether has warning state */
  hasWarning?: boolean;
  /** Get the item path */
  getPath: () => string;
}

/**
 * Toolbar root node interface
 */
export interface ToolbarRoot {
  /** All child items in the toolbar */
  childItems: ToolbarItem[];
}

/**
 * Toolbar manager interface
 */
export interface Toolbar {
  /**
   * Get the root toolbar node
   */
  getRoot: () => ToolbarRoot;
  
  /**
   * Check if toolbar is in default environment
   */
  isInDefaultEnv: () => boolean;
}

/**
 * Props for the main Toolbar component
 */
export interface ToolbarProps {
  /** Whether the toolbar is active/visible */
  isActive: boolean;
  /** Toolbar manager instance */
  toolbar: Toolbar;
  /** Whether to show second line toolbar */
  showSecondToolbar?: boolean;
  /** Signal for toolbar hover events */
  signalToolbarHover: ToolbarHoverSignal;
  /** Signal hook for tooltip control */
  toolTipSignalHook?: ToolTipSignalHook;
}

/**
 * Props for Folder toolbar items
 */
export interface FolderItemProps {
  /** Unique key */
  key: string;
  /** Whether this is a top-level item */
  isTopLevel: boolean;
  /** Visibility state */
  visible?: boolean;
  /** Enabled state */
  enable?: boolean;
  /** Badge content */
  badge?: string | number;
  /** Notification count */
  count?: number;
  /** Hover state */
  hover?: boolean;
  /** Checked state */
  isChecked?: boolean;
  /** Click handler */
  onclick?: () => void;
  /** Line type */
  lineType?: LineType;
  /** Hide icon */
  hiddenIcon?: boolean;
  /** Icon identifier */
  icon?: string;
  /** Icon for hover state */
  iconhover?: string;
  /** Category */
  catagory?: string;
  /** Label text */
  label?: string;
  /** Label icon */
  labelIcon?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Whether icon is image */
  isImg?: boolean;
  /** Background image */
  bgImg?: string;
  /** First tooltip */
  firstTooltip?: string;
  /** Child items */
  childItems: ToolbarItem[];
  /** Pressed state */
  isPressed?: boolean;
  /** Dynamic tooltip */
  dynamicTooltip?: () => string;
  /** Has child pressed */
  hasChildPressed?: boolean;
  /** Has dot indicator */
  hasDot?: boolean;
  /** Item path */
  path: string;
  /** Whether toolbar is active */
  isToolbarActive: boolean;
  /** Custom style name */
  styleName?: string;
  /** Has warning */
  hasWarning?: boolean;
  /** Delay before tooltip disappears */
  delayDisappearTime?: number;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Show new callback */
  showNewCallBack?: () => void;
  /** Tooltip signal hook */
  toolTipSignalHook?: ToolTipSignalHook;
  /** Show tip by signal */
  showTipBySignal?: boolean;
}

/**
 * Props for Button toolbar items
 */
export interface ButtonItemProps {
  /** Unique key */
  key: string;
  /** Whether this is a top-level item */
  isTopLevel: boolean;
  /** Visibility state */
  visible?: boolean;
  /** Enabled state */
  enable?: boolean;
  /** Badge content */
  badge?: string | number;
  /** Notification count */
  count?: number;
  /** Line type */
  lineType?: LineType;
  /** Hide icon */
  hiddenIcon?: boolean;
  /** Signal changed event */
  signalChanged?: ChangedSignal;
  /** Icon identifier */
  icon?: string;
  /** Icon for hover state */
  iconhover?: string;
  /** Label text */
  label?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Popover content */
  popover?: React.ReactNode;
  /** Click handler */
  onclick: () => void;
  /** Item width */
  width?: number | string;
  /** Pressed state */
  isPressed?: boolean;
  /** Item path */
  path: string;
  /** Hotkey shortcut */
  hotkey?: string;
  /** Custom tooltip */
  customTip?: React.ReactNode;
  /** Has dot indicator */
  hasDot?: boolean;
  /** Button mouse enter handler */
  onButtonMouseEnter?: () => void;
  /** Button mouse leave handler */
  onButtonMouseLeave?: () => void;
  /** Lock state */
  lock?: boolean;
  /** Guide tip */
  guidetip?: React.ReactNode;
  /** Custom style name */
  styleName?: string;
  /** Info icon */
  infoIcon?: string;
}

/**
 * Props for Divider toolbar items
 */
export interface DividerItemProps {
  /** Unique key */
  key: string;
  /** Whether this is a top-level item */
  isTopLevel: boolean;
}

/**
 * Main Toolbar component
 * Renders a customizable toolbar with folders, buttons, and dividers
 */
declare const Toolbar: React.FC<ToolbarProps>;

export default Toolbar;