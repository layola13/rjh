/**
 * Type definitions for message notification module
 * This module provides a React hook for displaying message notifications
 * with support for different message types (success, info, warning, error, loading)
 */

/**
 * Message configuration options
 */
export interface MessageConfig {
  /** Custom prefix class name for styling */
  prefixCls?: string;
  /** Unique key for the message instance */
  key?: string | number;
  /** Callback function executed when message is closed */
  onClose?: () => void;
  /** Message content */
  content?: React.ReactNode;
  /** Duration in seconds before auto-close (0 = no auto-close) */
  duration?: number;
  /** Custom icon to display */
  icon?: React.ReactNode;
  /** Message type for styling */
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading';
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

/**
 * Message instance with promise support for async operations
 */
export interface MessageInstance {
  /** Stops the message and removes it from display */
  (): void;
  /** Promise that resolves when message is closed */
  then<T = void>(
    onfulfilled?: ((value: boolean) => T | PromiseLike<T>) | null,
    onrejected?: ((reason: unknown) => T | PromiseLike<T>) | null
  ): Promise<T>;
  /** The underlying promise */
  promise: Promise<boolean>;
}

/**
 * Message API methods
 */
export interface MessageApi {
  /** Opens a new message with custom configuration */
  open(config: MessageConfig): MessageInstance;
  /** Displays a success message */
  success(content: React.ReactNode, duration?: number, onClose?: () => void): MessageInstance;
  success(config: MessageConfig): MessageInstance;
  /** Displays an info message */
  info(content: React.ReactNode, duration?: number, onClose?: () => void): MessageInstance;
  info(config: MessageConfig): MessageInstance;
  /** Displays a warning message */
  warning(content: React.ReactNode, duration?: number, onClose?: () => void): MessageInstance;
  warning(config: MessageConfig): MessageInstance;
  /** Displays an error message */
  error(content: React.ReactNode, duration?: number, onClose?: () => void): MessageInstance;
  error(config: MessageConfig): MessageInstance;
  /** Displays a loading message */
  loading(content: React.ReactNode, duration?: number, onClose?: () => void): MessageInstance;
  loading(config: MessageConfig): MessageInstance;
}

/**
 * Internal notification component instance
 */
interface NotificationInstance {
  /** The notification component reference */
  component: {
    /** Adds a new notice to the notification container */
    add(notice: unknown, callback?: () => void): void;
  };
  /** Removes a notice by its key */
  removeNotice(key: string | number): void;
}

/**
 * Hook holder API
 */
interface HolderRef {
  /** Adds a notice to the holder */
  add(notice: unknown, callback?: () => void): void;
}

/**
 * Render function parameters
 */
interface RenderParams {
  /** Prefix class name for styling */
  prefixCls: string;
  /** The notification component instance */
  instance: NotificationInstance;
}

/**
 * Get prefix class name function from ConfigProvider
 */
type GetPrefixCls = (suffixCls: string, customizePrefixCls?: string) => string;

/**
 * Hook return type: [MessageApi, React.ReactElement]
 */
type UseMessageReturnType = [MessageApi, React.ReactElement];

/**
 * Creates a message notification hook factory
 * 
 * @param renderCallback - Callback function to initialize the notification system
 * @param renderContent - Function to render the actual message content
 * @returns A function that returns the message API and holder element
 * 
 * @example
 *