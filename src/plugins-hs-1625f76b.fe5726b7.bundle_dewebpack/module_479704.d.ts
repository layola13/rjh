import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Signal utility for event handling
 */
interface Signal<T = any> {
  listen(callback: Function, context: any): void;
  unlisten(callback: Function, context: any): void;
  dispatch(...args: T[]): void;
}

/**
 * Tooltip helper utility
 */
interface TooltipHelper {
  create(container: Element, options: TooltipOptions): void;
}

/**
 * Tooltip configuration options
 */
interface TooltipOptions {
  /** Path to the tooltip icon image */
  src: string;
  /** Tooltip text content */
  tooltip?: string;
  /** Popover content */
  popover?: string;
}

/**
 * Props for the NewPopupWindow component
 */
export interface NewPopupWindowProps {
  /** Callback function invoked when the popup is submitted */
  submitcall?: () => void;
  /** Callback function invoked when the popup is canceled */
  cancelcall?: () => void;
  /** CSS class name for the popup window container */
  windowname?: string;
  /** Label text for the OK/Submit button */
  oklabel?: string;
  /** Label text for the Cancel button */
  cancellabel?: string;
  /** Title text displayed in the popup header */
  headername?: string;
  /** React element containing the main content of the popup */
  contents?: React.ReactElement;
  /** Width of the popup window in pixels */
  winwidth?: number;
  /** Height of the popup window in pixels */
  winheight?: number;
  /** Top position offset for the popup window in pixels */
  wintop?: number;
  /** Whether to show a help tooltip icon in the header */
  hasHelp?: boolean;
  /** Tooltip text content for the help icon */
  tooltip?: string;
  /** Popover content for the help icon */
  popover?: string;
}

/**
 * Internal state for the NewPopupWindow component
 */
interface NewPopupWindowState {
  /** Indicates whether the OK button is currently being hovered */
  isHovering: boolean;
}

/**
 * A reusable modal popup window component with customizable content,
 * buttons, and event handlers.
 * 
 * Features:
 * - Centered modal with optional custom dimensions
 * - Configurable OK and Cancel buttons
 * - Signal-based event handling for submit and cancel actions
 * - Optional help tooltip icon in header
 * - Click-outside-to-close overlay
 * - Hover effects on primary button
 */
export default class NewPopupWindow extends React.Component<
  NewPopupWindowProps,
  NewPopupWindowState
> {
  /** Signal dispatched when the popup is submitted via OK button */
  private signalPopupSubmitted: Signal;
  
  /** Signal dispatched when the popup is canceled */
  private signalPopupCanceled: Signal;
  
  /** Reference to the tooltip container element */
  private refs: {
    tooltipContainer: Element;
    popupwindow: HTMLDivElement;
  };

  constructor(props: NewPopupWindowProps);

  /**
   * Lifecycle: Sets up signal listeners and creates help tooltip if enabled
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Cleans up signal listeners to prevent memory leaks
   */
  componentWillUnmount(): void;

  /**
   * Handles mouse over event on the OK button
   */
  handleMouseOver(): void;

  /**
   * Handles mouse out event on the OK button
   */
  handleMouseOut(): void;

  /**
   * Handles cancel button click and overlay click events
   * @param event - The mouse event
   * @returns Always returns false to prevent default behavior
   */
  handleCancelClick(event?: React.MouseEvent): boolean;

  /**
   * Closes the popup by unmounting it from the DOM
   * @private
   */
  private _closePopup(): void;

  /**
   * Handles OK button click event
   * @param event - The mouse event
   * @returns Always returns false to prevent default behavior
   */
  handleOkClick(event: React.MouseEvent): boolean;

  /**
   * Renders the popup window with header, content, and footer buttons
   */
  render(): React.ReactElement;
}

/**
 * Iconfont view component for rendering icon fonts
 */
export interface IconfontViewProps {
  /** Icon type/name identifier */
  showType: string;
  /** Custom inline styles */
  customStyle?: React.CSSProperties;
  /** Color to apply when icon is clicked */
  clickColor?: string;
  /** Background color on hover */
  hoverBgColor?: string;
  /** Size extension for hover background area in pixels */
  bgExtendSize?: number;
}

export declare const IconfontView: React.ComponentType<IconfontViewProps>;