/**
 * Message/Modal notification component module
 * Provides methods for displaying various types of notifications and dialogs
 */

/**
 * Configuration options for notification messages
 */
export interface MessageConfig {
  /** Message content to display */
  content?: React.ReactNode;
  /** Duration in seconds before auto-close (0 = no auto-close) */
  duration?: number;
  /** Callback function when message is closed */
  onClose?: () => void;
  /** Custom icon to display */
  icon?: React.ReactNode;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Unique key for the message */
  key?: string | number;
  /** Custom top offset */
  top?: number;
  /** z-index value */
  zIndex?: number;
}

/**
 * Configuration options for confirmation dialogs
 */
export interface ConfirmConfig {
  /** Dialog title */
  title?: React.ReactNode;
  /** Dialog content */
  content?: React.ReactNode;
  /** OK button text */
  okText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** OK button type */
  okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /** Callback when OK button is clicked */
  onOk?: () => void | Promise<void>;
  /** Callback when Cancel button is clicked */
  onCancel?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether to show cancel button */
  okCancel?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** z-index value */
  zIndex?: number;
}

/**
 * Global configuration for all messages
 */
export interface GlobalConfig {
  /** Default duration for messages */
  duration?: number;
  /** Default top offset */
  top?: number;
  /** Maximum count of messages displayed simultaneously */
  maxCount?: number;
  /** RTL mode */
  rtl?: boolean;
  /** Prefix for CSS classes */
  prefixCls?: string;
  /** Container for rendering messages */
  getContainer?: () => HTMLElement;
}

/**
 * Return type for message/modal methods
 * Provides a function to manually close the notification
 */
export type MessageInstance = () => void;

/**
 * Message notification API
 */
export interface MessageApi {
  /**
   * Display an informational message
   * @param config - Configuration options or message content string
   * @returns Function to manually close the message
   */
  info(config: MessageConfig | string): MessageInstance;

  /**
   * Display a success message
   * @param config - Configuration options or message content string
   * @returns Function to manually close the message
   */
  success(config: MessageConfig | string): MessageInstance;

  /**
   * Display an error message
   * @param config - Configuration options or message content string
   * @returns Function to manually close the message
   */
  error(config: MessageConfig | string): MessageInstance;

  /**
   * Display a warning message
   * @param config - Configuration options or message content string
   * @returns Function to manually close the message
   */
  warning(config: MessageConfig | string): MessageInstance;

  /**
   * Display a warning message (alias for warning)
   * @param config - Configuration options or message content string
   * @returns Function to manually close the message
   */
  warn(config: MessageConfig | string): MessageInstance;

  /**
   * Display a confirmation dialog
   * @param config - Configuration options for the confirmation dialog
   * @returns Function to manually close the dialog
   */
  confirm(config: ConfirmConfig): MessageInstance;

  /**
   * Destroy all active messages/dialogs immediately
   */
  destroyAll(): void;

  /**
   * Configure global settings for all messages
   * @param config - Global configuration options
   */
  config(config: GlobalConfig): void;

  /**
   * Default message method (displays as warning)
   * @param config - Configuration options or message content string
   * @returns Function to manually close the message
   */
  (config: MessageConfig | string): MessageInstance;
}

/**
 * Default export: Message notification component with utility methods
 * 
 * @example
 *