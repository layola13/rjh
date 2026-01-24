/**
 * Notification container component for managing and displaying notification items
 * Supports adding, removing, and animating notifications with configurable transitions
 */

import type { CSSProperties, ReactNode, ComponentType } from 'react';
import type { Component } from 'react';

/**
 * Unique key for identifying notification instances
 */
type NoticeKey = string;

/**
 * Configuration for a single notification notice
 */
export interface NoticeConfig {
  /**
   * Unique identifier for the notice. Auto-generated if not provided.
   */
  key?: NoticeKey;
  
  /**
   * Content to display in the notification
   */
  content: ReactNode;
  
  /**
   * Duration in seconds before auto-closing. Set to 0 or null to disable auto-close.
   */
  duration?: number | null;
  
  /**
   * Callback fired when the notification is closed
   */
  onClose?: () => void;
  
  /**
   * Callback fired when the notification is clicked
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: CSSProperties;
  
  /**
   * Custom close icon element
   */
  closeIcon?: ReactNode;
  
  /**
   * Additional properties passed to the Notice component
   */
  props?: Record<string, unknown>;
  
  /**
   * Internal: User-provided key for tracking updates
   * @internal
   */
  userPassKey?: NoticeKey;
  
  /**
   * Internal: Mark for tracking notice updates
   * @internal
   */
  updateMark?: string;
}

/**
 * Internal notice state wrapper
 * @internal
 */
interface NoticeState {
  /**
   * The notice configuration
   */
  notice: NoticeConfig;
  
  /**
   * Callback invoked with the holder DOM element
   */
  holderCallback?: (element: HTMLDivElement, props: NoticePropsInternal) => void;
}

/**
 * Internal notice properties with computed fields
 * @internal
 */
interface NoticePropsInternal extends NoticeConfig {
  prefixCls: string;
  noticeKey: NoticeKey;
  updateMark?: string;
  visible?: boolean;
}

/**
 * Properties for the Notification container component
 */
export interface NotificationProps {
  /**
   * CSS class prefix for styling
   * @default 'rc-notification'
   */
  prefixCls?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles for the container
   * @default { top: 65, left: '50%' }
   */
  style?: CSSProperties;
  
  /**
   * Maximum number of notifications to display simultaneously
   * Older notifications are removed when limit is exceeded.
   */
  maxCount?: number;
  
  /**
   * Custom close icon for all notifications
   */
  closeIcon?: ReactNode;
  
  /**
   * Animation name for transitions (legacy)
   * @default 'fade'
   */
  animation?: string;
  
  /**
   * CSS transition class name for enter/exit animations
   * Overrides animation prop if provided.
   */
  transitionName?: string;
}

/**
 * Component state
 * @internal
 */
interface NotificationState {
  notices: NoticeState[];
}

/**
 * Notification instance API returned by newInstance
 */
export interface NotificationInstance {
  /**
   * Add a new notification
   * @param config - Notification configuration
   */
  notice: (config: NoticeConfig) => void;
  
  /**
   * Remove a notification by key
   * @param key - The notification key to remove
   */
  removeNotice: (key: NoticeKey) => void;
  
  /**
   * Reference to the underlying component instance
   */
  component: NotificationComponent;
  
  /**
   * Destroy the notification container and remove from DOM
   */
  destroy: () => void;
  
  /**
   * Hook-based API for managing notifications
   * @returns Tuple of [api, contextHolder]
   */
  useNotification: () => [NotificationHookAPI, ReactNode];
}

/**
 * Hook-based notification API
 */
export interface NotificationHookAPI {
  /**
   * Open a notification
   */
  open: (config: NoticeConfig) => void;
  
  /**
   * Close a notification by key
   */
  close: (key: NoticeKey) => void;
  
  /**
   * Destroy all notifications
   */
  destroy: () => void;
}

/**
 * Configuration for creating a new notification instance
 */
export interface NewInstanceConfig extends Omit<NotificationProps, 'ref'> {
  /**
   * Function returning the container element for mounting
   * If not provided, notifications mount to document.body
   */
  getContainer?: () => HTMLElement;
}

/**
 * Callback invoked when notification instance is ready
 */
export type NewInstanceCallback = (instance: NotificationInstance) => void;

/**
 * Notification container component class
 */
export interface NotificationComponent extends Component<NotificationProps, NotificationState> {
  /**
   * Add a notification to the container
   * @param notice - Notice configuration
   * @param holderCallback - Optional callback for holder element
   */
  add: (notice: NoticeConfig, holderCallback?: (element: HTMLDivElement, props: NoticePropsInternal) => void) => void;
  
  /**
   * Remove a notification by key
   * @param key - The notification key to remove
   */
  remove: (key: NoticeKey) => void;
  
  /**
   * Get the computed transition class name
   * @returns CSS transition name
   */
  getTransitionName: () => string | undefined;
}

/**
 * Notification container component
 * Manages a stack of notification notices with animations
 */
declare class Notification extends Component<NotificationProps, NotificationState> implements NotificationComponent {
  static defaultProps: Required<Pick<NotificationProps, 'prefixCls' | 'animation' | 'style'>>;
  
  /**
   * Create a new notification instance
   * @param config - Configuration options
   * @param callback - Callback invoked with the instance API
   */
  static newInstance(config: NewInstanceConfig | undefined, callback: NewInstanceCallback): void;
  
  state: NotificationState;
  
  /**
   * Map of holder refs for hook-based notices
   * @internal
   */
  hookRefs: Map<NoticeKey, HTMLDivElement>;
  
  /**
   * Map of notice properties for rendering
   * @internal
   */
  noticePropsMap: Record<NoticeKey, { props: NoticePropsInternal; holderCallback?: NoticeState['holderCallback'] }>;
  
  add: (notice: NoticeConfig, holderCallback?: (element: HTMLDivElement, props: NoticePropsInternal) => void) => void;
  remove: (key: NoticeKey) => void;
  getTransitionName: () => string | undefined;
  render(): ReactNode;
}

export default Notification;