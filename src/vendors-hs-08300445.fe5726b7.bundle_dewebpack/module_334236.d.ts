import { ReactElement, ReactNode } from 'react';

/**
 * Configuration for a notification/message item
 */
interface NotificationConfig {
  /** Unique identifier for the notification */
  key: string;
  /** Holder element where the notification will be rendered */
  holder?: HTMLElement;
  /** Additional properties passed to the notification component */
  [key: string]: unknown;
}

/**
 * Callback function invoked when a notification is added
 * @param holder - The DOM element that will hold the notification
 * @param config - Configuration object for the notification
 */
type NotificationCallback = (holder: HTMLElement | null, config: NotificationConfig) => void;

/**
 * API for managing notifications
 */
interface NotificationApi {
  /**
   * Add a new notification to the system
   * @param config - Configuration for the notification
   * @param callback - Callback invoked with the holder element and config
   */
  add(config: NotificationConfig, callback: NotificationCallback): void;
}

/**
 * Return type of the useNotification hook
 * @template TApi - Type of the notification API
 */
type UseNotificationResult = [
  /** Function to add a notification */
  (config: NotificationConfig) => void,
  /** React elements representing all active notifications */
  ReactElement
];

/**
 * Custom React hook for managing notifications with holder elements
 * 
 * This hook provides a mechanism to display notifications by:
 * - Managing a collection of notification elements keyed by unique identifiers
 * - Rendering notifications into designated holder elements
 * - Preventing duplicate notifications with the same key
 * - Automatically updating the notification list when items are added
 * 
 * @param api - Notification API instance that handles adding notifications
 * @returns A tuple containing:
 *   - A function to trigger notification addition
 *   - React Fragment containing all rendered notification elements
 * 
 * @example
 *