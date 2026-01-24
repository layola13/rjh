/**
 * Notification hook factory module
 * Creates a notification system with multiple severity levels
 */

/**
 * Configuration options for a notification
 */
export interface NotificationConfig {
  /** CSS class prefix for styling */
  prefixCls?: string;
  /** Type of notification */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Notification message content */
  message?: React.ReactNode;
  /** Additional description */
  description?: React.ReactNode;
  /** Duration in seconds before auto-close (0 = no auto-close) */
  duration?: number;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Placement of notification */
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /** Click handler */
  onClick?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Unique key for the notification */
  key?: string;
}

/**
 * Internal notification instance
 */
export interface NotificationInstance {
  /** The notification component instance */
  component: {
    /** Add a notification to the component */
    add: (config: NotificationConfig, holderCallback: HolderCallback) => void;
  };
}

/**
 * Callback function for notification holder rendering
 */
export type HolderCallback = (config: NotificationConfig) => void;

/**
 * Notification API with type-specific methods
 */
export interface NotificationAPI {
  /** Open a notification with custom config */
  open: (config: NotificationConfig) => void;
  /** Show a success notification */
  success: (config: Omit<NotificationConfig, 'type'>) => void;
  /** Show an info notification */
  info: (config: Omit<NotificationConfig, 'type'>) => void;
  /** Show a warning notification */
  warning: (config: Omit<NotificationConfig, 'type'>) => void;
  /** Show an error notification */
  error: (config: Omit<NotificationConfig, 'type'>) => void;
  /** Add notification to internal holder */
  add: (config: NotificationConfig, callback: HolderCallback) => void;
}

/**
 * Config consumer props from Ant Design
 */
export interface ConfigConsumerProps {
  /** Function to get prefixed CSS class name */
  getPrefixCls: (suffix: string, customPrefix?: string) => string;
}

/**
 * Factory function type that creates notification instances
 */
export type NotificationFactory = (
  config: NotificationConfig,
  callback: (result: { prefixCls: string; instance: NotificationInstance }) => void
) => void;

/**
 * Render function for notification holder
 */
export type NotificationRenderFunction = (
  config: NotificationConfig,
  prefixCls: string
) => React.ReactElement;

/**
 * Hook return type: [API object, React element holder]
 */
export type UseNotificationReturn = [NotificationAPI, React.ReactElement];

/**
 * Creates a notification hook with custom factory and render functions
 * 
 * @param notificationFactory - Factory function to create notification instances
 * @param renderFunction - Function to render notification holder component
 * @returns A hook that returns [notification API, holder element]
 * 
 * @example
 *