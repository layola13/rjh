import React from 'react';
import PropTypes from 'prop-types';

/**
 * Configuration options for showing a popup window
 */
export interface ShowPopupOptions {
  /** Callback function to be executed when popup is submitted */
  submitCallback?: () => void;
}

/**
 * Props for the PopupWindow component
 */
export interface PopupWindowProps {
  /** Callback function triggered when the popup is submitted */
  submitcall?: () => void;
  
  /** Unique identifier/class name for the popup window */
  windowname?: string;
  
  /** Label text for the OK/Submit button */
  oklabel?: string;
  
  /** Label text for the Cancel button */
  cancellable?: string;
  
  /** Title text displayed in the popup header */
  headername?: string;
  
  /** React element to render as popup content */
  contents?: React.ReactElement;
  
  /** Width of the popup window in pixels */
  winwidth?: number;
}

/**
 * Internal state for the PopupWindow component
 */
export interface PopupWindowState {
  /** Whether the mouse is currently hovering over the OK button */
  isHovering: boolean;
}

/**
 * Custom signal class for handling popup submission events
 * Follows HSCore.Util.Signal pattern
 */
export interface PopupSubmitSignal {
  /** Register a listener for the popup submitted event */
  listen(callback: () => void, context: any): void;
  
  /** Unregister a listener for the popup submitted event */
  unlisten(callback: () => void, context: any): void;
  
  /** Trigger all registered listeners */
  dispatch(): void;
}

/**
 * PopupWindow component interface
 * A modal dialog component for creating wish lists or other user interactions
 */
export interface PopupWindow extends React.Component<PopupWindowProps, PopupWindowState> {
  /** PropTypes validation schema */
  propTypes: {
    submitcall: PropTypes.Requireable<(...args: any[]) => any>;
    windowname: PropTypes.Requireable<string>;
    oklabel: PropTypes.Requireable<string>;
    cancellable: PropTypes.Requireable<string>;
    headername: PropTypes.Requireable<string>;
    contents: PropTypes.Requireable<React.ReactElement>;
    winwidth: PropTypes.Requireable<number>;
  };

  /** Signal instance for popup submission events */
  signalPopupSubmitted: PopupSubmitSignal;

  /**
   * Initialize component state
   * @returns Initial state object with isHovering set to false
   */
  getInitialState(): PopupWindowState;

  /**
   * Lifecycle: Component mounted
   * Registers the submit callback listener
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Component updated
   */
  componentDidUpdate(): void;

  /**
   * Lifecycle: Component will unmount
   * Unregisters the submit callback listener
   */
  componentWillUnmount(): void;

  /**
   * Mouse over event handler for OK button
   * Sets isHovering state to true
   */
  handleMouseOver(): void;

  /**
   * Mouse out event handler for OK button
   * Sets isHovering state to false
   */
  handleMouseOut(): void;

  /**
   * Click handler for cancel button
   * Closes the popup window
   * @returns Always returns false to prevent default behavior
   */
  handleCancelClick(): boolean;

  /**
   * Internal method to close and unmount the popup
   * Handles errors gracefully with logging
   */
  _closePopup(): void;

  /**
   * Click handler for OK/Submit button
   * Dispatches submit signal and closes popup
   * @param event - Click event object
   * @returns Always returns false to prevent default behavior
   */
  handleOkClick(event: React.MouseEvent<HTMLButtonElement>): boolean;

  /**
   * Render the popup window component
   * @returns React element tree for the modal dialog
   */
  render(): React.ReactElement;
}

/**
 * PopupWindow component constructor
 */
export const PopupWindow: React.ComponentClass<PopupWindowProps, PopupWindowState>;

/**
 * Show a popup window for creating a new wish list
 * Renders the PopupWindow component into the .popupcontainer element
 * 
 * @param submitCallback - Function to execute when the popup is submitted
 * 
 * @example
 *