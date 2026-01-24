/**
 * Checkbox toolbar item component for menu/toolbar interfaces
 * Supports hover states, enable/disable, checked/unchecked states, and half-checked status
 */

import React from 'react';
import { SmartText } from './SmartText';

/**
 * Signal data structure for checkbox state changes
 */
export interface CheckboxSignalData {
  /** Whether the checkbox is currently checked */
  isChecked: boolean;
}

/**
 * Signal event structure containing checkbox state data
 */
export interface CheckboxSignalEvent {
  /** The signal data payload */
  data: CheckboxSignalData;
}

/**
 * Signal hook interface for listening to external state changes
 */
export interface SignalHook {
  /** Listen to a signal and execute callback when triggered */
  listen(signal: unknown, callback: (event: CheckboxSignalEvent) => void): void;
  /** Remove all signal listeners */
  unlistenAll(): void;
}

/**
 * Half-check status states
 */
export type HalfCheckStatus = 'all' | 'none' | 'half';

/**
 * Props for the ToolbarCheckboxItem component
 */
export interface ToolbarCheckboxItemProps {
  /** Whether the checkbox item is visible */
  visible: boolean;
  
  /** Whether the checkbox item is enabled (clickable) */
  enable: boolean;
  
  /** Display label text for the checkbox */
  label: string;
  
  /** Current checked state of the checkbox */
  isChecked: boolean;
  
  /** Tooltip text displayed on hover */
  tooltip: string;
  
  /** Click handler callback */
  onclick: () => void;
  
  /** Unique path identifier for the toolbar item */
  path: string;
  
  /** Optional signal object for external state synchronization */
  signalChanged?: unknown;
  
  /** Optional function to check half-checked status */
  checkHalfStatus?: () => HalfCheckStatus;
  
  /** Optional callback to update data without triggering UI re-render */
  changeDataOnly?: (data: CheckboxSignalData) => void;
  
  /** Optional keyboard shortcut configuration */
  hotkey?: unknown;
}

/**
 * Internal component state
 */
export interface ToolbarCheckboxItemState {
  /** Whether the mouse is currently hovering over the item */
  hover: boolean;
  
  /** Current checked state of the checkbox */
  isChecked: boolean;
}

/**
 * Toolbar checkbox item component
 * Renders a checkbox within a toolbar/menu with support for:
 * - Hover states
 * - Enabled/disabled states
 * - Checked/unchecked/half-checked states
 * - External signal-based state synchronization
 * - Keyboard shortcuts display
 */
export default class ToolbarCheckboxItem extends React.Component<
  ToolbarCheckboxItemProps,
  ToolbarCheckboxItemState
> {
  /** Signal hook instance for managing external state listeners */
  private readonly _signalHook: SignalHook;

  constructor(props: ToolbarCheckboxItemProps);

  /**
   * Check if the checkbox item is currently enabled
   * @returns True if the item is enabled and interactive
   */
  private _isEnabled(): boolean;

  /**
   * Mouse enter event handler - sets hover state to true
   */
  private _onMouseEnter(): void;

  /**
   * Mouse leave event handler - sets hover state to false
   */
  private _onMouseLeave(): void;

  /**
   * Click event handler - triggers onclick callback if enabled
   * @param event - The mouse click event
   */
  private _onClick(event: React.MouseEvent): void;

  /**
   * Cleanup method - removes all signal listeners before unmount
   */
  componentWillUnmount(): void;

  /**
   * Render the checkbox toolbar item
   * @returns React element representing the checkbox item
   */
  render(): React.ReactElement;
}