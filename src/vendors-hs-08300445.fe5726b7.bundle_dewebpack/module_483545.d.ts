/**
 * Hook for managing notification instances with dynamic rendering
 * @module NotificationHook
 */

import { ReactElement, ReactNode } from 'react';

/**
 * Notification configuration object
 */
interface NotificationConfig {
  /** Unique identifier for the notification */
  key: string;
  /** Notification content */
  content?: ReactNode;
  /** Duration in seconds (0 means no auto-close) */
  duration?: number;
  /** Callback when notification closes */
  onClose?: () => void;
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Notification manager interface with add method
 */
interface NotificationManager {
  /**
   * Add a new notification
   * @param config - Notification configuration
   * @param callback - Callback invoked with holder element and config
   */
  add(
    config: NotificationConfig,
    callback: (holder: HTMLElement | null, config: NotificationConfig) => void
  ): void;
}

/**
 * Return type of the useNotification hook
 * @returns Tuple containing the notify function and rendered notification elements
 */
type UseNotificationReturn = [
  /** Function to trigger a new notification */
  notify: (config: NotificationConfig) => void,
  /** React fragment containing all active notification elements */
  notificationElements: ReactElement
];

/**
 * Custom hook for managing notifications
 * 
 * @description
 * This hook provides a notification system that:
 * - Manages multiple notification instances by unique keys
 * - Dynamically renders notification components
 * - Prevents duplicate notifications with the same key
 * - Returns a notify function and rendered elements
 * 
 * @param manager - Notification manager instance that handles the notification lifecycle
 * @returns Tuple of [notifyFunction, notificationElements]
 * 
 * @example
 *