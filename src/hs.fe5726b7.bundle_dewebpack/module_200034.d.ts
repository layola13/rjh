/**
 * Popup Window Component
 * A reusable modal dialog component for displaying content with customizable actions
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IconfontView } from './icon-components';

/**
 * Configuration options for showing a popup window
 */
export interface PopupWindowOptions {
  /** Content to display in the popup body */
  contents: React.ReactElement;
  /** Title text displayed in the header */
  headerName: string;
  /** Additional CSS class name(s) for styling */
  className?: string;
  /** Callback function invoked when OK button is clicked */
  submitcall?: () => void;
  /** Callback function invoked when Cancel button or close is clicked */
  cancelcall?: () => void;
  /** Width of the popup window in pixels */
  winwidth?: number;
  /** Height of the popup window in pixels */
  winheight?: number;
  /** Label text for the OK/Submit button */
  oklabel?: string;
  /** Label text for the Cancel button */
  cancellabel?: string;
}

/**
 * Props for the PopupWindow component
 */
export interface PopupWindowProps {
  /** Callback function invoked when submitting the form */
  submitcall?: () => void;
  /** Callback function invoked when canceling the dialog */
  cancelcall?: () => void;
  /** CSS class name for custom styling */
  classname?: string;
  /** Text label for the OK button */
  oklabel?: string;
  /** Text label for the Cancel button */
  cancellabel?: string;
  /** Title text for the popup header */
  headername?: string;
  /** React element to render as popup content */
  contents?: React.ReactElement;
  /** Width of the popup window in pixels */
  winwidth?: number;
  /** Height of the popup window in pixels */
  winheight?: number;
}

/**
 * State for the PopupWindow component
 */
export interface PopupWindowState {
  /** Whether the OK button is currently being hovered */
  isHovering: boolean;
}

/**
 * Style properties for positioning the popup window
 */
export interface PopupWindowStyle {
  /** Width of the popup in pixels */
  width?: number;
  /** Left position offset in pixels */
  left?: number;
  /** Height of the popup in pixels */
  height?: number;
  /** Top position offset in pixels */
  top?: number;
}

/**
 * PopupWindow component class
 * Displays a modal dialog with customizable header, content, and action buttons
 */
export declare class PopupWindow extends React.Component<PopupWindowProps, PopupWindowState> {
  static propTypes: {
    submitcall: PropTypes.Requireable<(...args: any[]) => any>;
    cancelcall: PropTypes.Requireable<(...args: any[]) => any>;
    classname: PropTypes.Requireable<string>;
    oklabel: PropTypes.Requireable<string>;
    cancellabel: PropTypes.Requireable<string>;
    headername: PropTypes.Requireable<string>;
    contents: PropTypes.Requireable<React.ReactElement>;
    winwidth: PropTypes.Requireable<number>;
  };

  /**
   * Handles mouse hover event on the OK button
   */
  handleMouseOver(): void;

  /**
   * Handles mouse leave event on the OK button
   */
  handleMouseOut(): void;

  /**
   * Handles click event on the Cancel button or close icon
   * @param event - Mouse event object
   * @returns Always returns false to prevent default behavior
   */
  handleCancelClick(event?: React.MouseEvent): boolean;

  /**
   * Executes the submit callback if provided
   */
  submit(): void;

  /**
   * Executes the cancel callback if provided
   */
  cancel(): void;

  /**
   * Renders the popup window to the DOM
   * @deprecated Use showWindow static method instead
   */
  show(): void;

  /**
   * Unmounts and closes the popup window
   */
  close(): void;

  /**
   * Handles click event on the OK button
   * @param event - Mouse event object
   * @returns Always returns false to prevent default behavior
   */
  handleOkClick(event: React.MouseEvent): boolean;

  /**
   * Renders the popup window component
   */
  render(): React.ReactElement;
}

/**
 * Default export with utility methods for managing popup windows
 */
declare const PopupWindowManager: {
  /**
   * Shows a popup window with the specified configuration
   * @param options - Configuration options for the popup window
   * @returns The rendered React component instance
   */
  showWindow(options: PopupWindowOptions): React.Component;
};

export default PopupWindowManager;