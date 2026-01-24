/**
 * Commission Bar Component
 * 
 * A React component that displays commission information and provides
 * functionality for verification and commission download.
 */

import React, { Component, ReactNode } from 'react';
import { Modal, Popover, IconfontView } from 'path/to/ui-components';
import { HSCore } from 'path/to/core';
import HSApp from 'path/to/app';
import HSFPConstants from 'path/to/constants';
import ResourceManager from 'path/to/resource-manager';

/**
 * Commission information state structure
 */
interface CommissionInfo {
  /** Number of commission items */
  count: number;
  /** Commission amount as a string (e.g., "0.00") */
  amount: string;
  /** Current tooltip status indicator (0-5) */
  tooltipStatus: TooltipStatus;
  /** Whether to show the commission bar */
  isShowCommission: boolean;
  /** Name of the store */
  storeName: string;
  /** Name of the bound store */
  bindStoreName: string;
}

/**
 * Tooltip status enumeration
 * 0: First time adding model
 * 1: Show verification prompt
 * 2: Show download commission prompt
 * 3: Already joined TPZZ
 * 4: Related to TPZZ
 * 5: Same store scenario
 */
type TooltipStatus = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Component state interface
 */
interface CommissionBarState {
  commissionInfo: CommissionInfo;
}

/**
 * Component props interface
 */
interface CommissionBarProps {
  // Props can be extended as needed
}

/**
 * Update commission signal data structure
 */
interface UpdateCommissionSignalData {
  isShowCommission: boolean;
  amount: string;
  count: number;
  tooltipStatus: TooltipStatus;
  storeName?: string;
  bindStoreName?: string;
}

/**
 * Signal event interface
 */
interface SignalEvent {
  data: UpdateCommissionSignalData;
}

/**
 * Commission plugin interface
 */
interface CommissionPlugin {
  getUpdateCommissionSignal(): unknown;
  getCommissionId(): string[];
}

/**
 * Commission Bar Component
 * 
 * Displays commission information and provides interaction capabilities
 * for users to verify their accounts and download commission reports.
 */
declare class CommissionBar extends Component<CommissionBarProps, CommissionBarState> {
  /**
   * Signal hook for managing component subscriptions
   */
  private signalHook: HSCore.Util.SignalHook;

  /**
   * Commission plugin instance
   */
  private commissionPlugin: CommissionPlugin;

  /**
   * Component state
   */
  state: CommissionBarState;

  /**
   * Constructor
   * @param props - Component properties
   */
  constructor(props: CommissionBarProps);

  /**
   * Lifecycle: Component mounted
   * Sets up signal listener for commission updates
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Component will unmount
   * Cleans up all signal listeners
   */
  componentWillUnmount(): void;

  /**
   * Handle commission update signal
   * Updates the component state with new commission data
   * @param event - Signal event containing commission data
   */
  private _onUpdateCommissionSignal(event: SignalEvent): void;

  /**
   * Open verification page
   * Tracks the event and opens the verification URL in a new window
   */
  openVerification(): void;

  /**
   * Download commission report
   * Shows a modal dialog for downloading commission-related product images
   */
  downloadCommission(): void;

  /**
   * Show tooltip
   * Tracks tooltip display events based on the current tooltip status
   */
  showToolTip(): void;

  /**
   * Render the component
   * @returns React element or null
   */
  render(): ReactNode;
}

export default CommissionBar;