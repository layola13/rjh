/**
 * Notification hook factory type definitions
 * Creates a notification management system with imperative API
 */

/**
 * Notification type variants
 */
type NotificationType = 'success' | 'info' | 'warning' | 'error';

/**
 * Base notification configuration
 */
interface NotificationConfig {
  /** Custom class name prefix */
  prefixCls?: string;
  /** Notification type */
  type?: NotificationType;
  /** Notification message content */
  message?: React.ReactNode;
  /** Notification description */
  description?: React.ReactNode;
  /** Duration in seconds (0 means no auto close) */
  duration?: number;
  /** Click handler */
  onClick?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Unique key for the notification */
  key?: string;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Placement of the notification */
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  [key: string]: unknown;
}

/**
 * Notification instance with component management
 */
interface NotificationInstance {
  /** The notification component instance */
  component: {
    /** Add a notification to the container */
    add: (element: React.ReactElement, config: NotificationConfig) => void;
  };
}

/**
 * Callback invoked after notification instance is created
 */
interface NotificationCallback {
  (result: {
    /** The prefix class name */
    prefixCls: string;
    /** The notification instance */
    instance: NotificationInstance;
  }): void;
}

/**
 * Imperative notification API
 */
interface NotificationApi {
  /** Open a notification with custom config */
  open: (config: NotificationConfig) => void;
  /** Open a success notification */
  success: (config: NotificationConfig) => void;
  /** Open an info notification */
  info: (config: NotificationConfig) => void;
  /** Open a warning notification */
  warning: (config: NotificationConfig) => void;
  /** Open an error notification */
  error: (config: NotificationConfig) => void;
}

/**
 * Context value provided by ConfigConsumer
 */
interface ConfigContext {
  /** Get prefixed class name */
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

/**
 * Factory function that creates notification system
 * 
 * @param createNotification - Function to create notification instance
 * @param transformConfig - Function to transform notification config
 * @returns Hook that returns notification API and holder element
 */
declare function createNotificationHook(
  createNotification: (
    config: NotificationConfig,
    callback: NotificationCallback
  ) => void,
  transformConfig: (
    config: NotificationConfig,
    prefixCls: string
  ) => React.ReactElement
): () => [NotificationApi, React.ReactElement];

export default createNotificationHook;