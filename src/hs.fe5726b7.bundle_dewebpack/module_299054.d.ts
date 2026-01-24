/**
 * Notification Popup Component and API
 * Provides a modal notification popup with customizable content and actions
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Configuration options for displaying a notification popup
 */
export interface ShowNotificationOptions {
  /** The main content text to display in the notification */
  content?: string;
  
  /** Text to display on the action button */
  btnText?: string;
  
  /** Callback function invoked when the button is clicked */
  onClick?: () => void;
  
  /** If true, hides the close button */
  noclose?: boolean;
  
  /** If true, hides the notification icon */
  noicon?: boolean;
  
  /** Additional CSS class names to apply to the notification wrapper */
  className?: string;
}

/**
 * Props for the NotificationPopup component
 */
export interface NotificationPopupProps {
  /** Additional CSS class names to apply to the notification wrapper */
  className?: string;
  
  /** The main content text to display in the notification */
  content?: string;
  
  /** Text to display on the action button */
  btnText?: string;
  
  /** If true, hides the close button */
  noclose?: boolean;
  
  /** If true, hides the notification icon */
  noicon?: boolean;
  
  /** Callback function invoked when the button is clicked */
  onClick?: () => void;
}

/**
 * Internal state for the NotificationPopup component
 */
export interface NotificationPopupState {
  /** Controls the visibility of the notification popup */
  show: boolean;
}

/**
 * Notification Popup React Component
 * Displays a modal overlay with customizable content and actions
 */
declare class NotificationPopup extends React.Component<NotificationPopupProps, NotificationPopupState> {
  static propTypes: {
    className: PropTypes.Requireable<string>;
    content: PropTypes.Requireable<string>;
    btnText: PropTypes.Requireable<string>;
    noclose: PropTypes.Requireable<boolean>;
    noicon: PropTypes.Requireable<boolean>;
    onClick: PropTypes.Requireable<(...args: any[]) => any>;
  };

  static defaultProps: {
    className: string;
    content: string;
    btnText: string;
    noclose: boolean;
    noicon: boolean;
  };

  state: NotificationPopupState;

  /**
   * Handles the "Got It" button click
   * Invokes the onClick callback if provided and closes the popup
   */
  gotIt(): void;

  /**
   * Closes the notification popup by setting show state to false
   */
  close(): void;

  /**
   * Legacy lifecycle method for handling prop updates
   * @deprecated Use componentDidUpdate instead
   */
  UNSAFE_componentWillReceiveProps(nextProps: NotificationPopupProps): void;

  render(): React.ReactElement;
}

/**
 * Notification API
 */
export interface NotificationAPI {
  /**
   * Displays a notification popup with the specified options
   * Creates or reuses a DOM node in #ui-container to render the notification
   * 
   * @param options - Configuration options for the notification
   * @returns The rendered React component instance
   * 
   * @example
   *