/**
 * Ant Design Message Component Type Definitions
 * 
 * A globally displayed message notification component that appears at the top of the screen
 * for user feedback on operations.
 * 
 * @module MessageAPI
 */

/**
 * Configuration options for message display
 */
export interface MessageConfig {
  /**
   * CSS class name prefix for styling
   * @default "ant-message"
   */
  prefixCls?: string;

  /**
   * Distance from top of viewport in pixels
   */
  top?: number;

  /**
   * Default duration in seconds before message auto-closes
   * @default 3
   */
  duration?: number;

  /**
   * Function returning the container element where message will be mounted
   */
  getContainer?: () => HTMLElement;

  /**
   * CSS transition name for show/hide animation
   * @default "move-up"
   */
  transitionName?: string;

  /**
   * Maximum number of messages shown simultaneously
   */
  maxCount?: number;

  /**
   * Enable right-to-left layout
   * @default false
   */
  rtl?: boolean;
}

/**
 * Content options for individual message
 */
export interface MessageContentOptions {
  /**
   * Unique identifier for this message
   */
  key?: string | number;

  /**
   * Message type determines icon and color
   */
  type?: MessageType;

  /**
   * Text or ReactNode content to display
   */
  content: React.ReactNode;

  /**
   * Duration in seconds before auto-close (0 = no auto-close)
   */
  duration?: number;

  /**
   * Custom icon to display instead of default type icon
   */
  icon?: React.ReactNode;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;

  /**
   * Callback when message is closed
   */
  onClose?: () => void;

  /**
   * Callback when message is clicked
   */
  onClick?: () => void;
}

/**
 * Message types with corresponding icons
 */
export type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading';

/**
 * Return type for message display methods
 * Can be called to close the message, or used as a Promise
 */
export interface MessagePromise {
  /**
   * Close this message immediately
   */
  (): void;

  /**
   * Promise that resolves when message is closed
   */
  promise: Promise<boolean>;

  /**
   * Attach handlers to message close promise
   */
  then<TResult1 = boolean, TResult2 = never>(
    onfulfilled?: ((value: boolean) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2>;
}

/**
 * Hook return value containing message API and context holder
 */
export type UseMessageReturnType = [MessageInstance, React.ReactElement];

/**
 * Message API instance
 */
export interface MessageInstance {
  /**
   * Display a message with full configuration options
   * 
   * @param config - Configuration object
   * @returns Function to close the message
   * 
   * @example
   *