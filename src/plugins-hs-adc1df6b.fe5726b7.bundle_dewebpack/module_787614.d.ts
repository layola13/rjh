/**
 * Inbox notification module for displaying unread messages and hints
 * Handles notification badge, popover hints, and message center integration
 */

declare module 'notification-inbox' {
  import * as React from 'react';

  /**
   * Frequency configuration for inbox hint display
   */
  export interface InboxHintFrequency {
    /** Frequency code (e.g., "perMinute") */
    code: string;
    /** Frequency value in minutes */
    value: number;
  }

  /**
   * Inbox hint notification data structure
   */
  export interface InboxHint {
    /** Start time timestamp for hint validity */
    startTime?: number;
    /** End time timestamp for hint validity */
    endTime?: number;
    /** Localization key for hint title */
    titleMdsKey?: string;
    /** Source page identifier for tracking */
    sourcePage?: string;
    /** Display frequency configuration */
    frequency?: InboxHintFrequency[];
    /** Hint creation timestamp */
    createTime?: number;
    /** Validity duration in seconds */
    validityTime?: number;
    /** Lead time for alert reminder in seconds */
    ltTimeAlterRemind?: number;
  }

  /**
   * Component state for NotificationInbox
   */
  export interface NotificationInboxState {
    /** User login status */
    isLogin: boolean;
    /** Number of unread notifications */
    unreadNum: number;
    /** Currently displayed inbox hint */
    inboxHint?: InboxHint;
    /** List of available inbox hints */
    inboxHints: InboxHint[];
    /** Alert time counter (1 = first alert, 2 = second alert) */
    alertTime: number;
    /** Whether to show the popover hint */
    showPopover: boolean;
  }

  /**
   * Props for NotificationInbox component
   */
  export interface NotificationInboxProps {
    /** Initial login status */
    isLogin: boolean;
    /** Signal for status change notifications */
    signalChanged?: HSCore.Util.Signal<{ data: Partial<NotificationInboxState> }>;
  }

  /**
   * React component for displaying inbox notifications
   * Shows unread count badge and periodic hint popovers
   */
  export class NotificationInbox extends React.Component<
    NotificationInboxProps,
    NotificationInboxState
  > {
    /**
     * Find and display the next eligible inbox hint
     * Triggers exposure tracking event if hint is shown
     */
    findInboxHint(): void;

    /**
     * Fetch unread notification count from server
     * Updates state with unread count and available hints
     */
    getUnreadNum(): Promise<void>;

    /**
     * Check if an inbox hint should be displayed
     * Validates time range, validity period, and display frequency
     * @param hint - The inbox hint to validate
     * @returns True if hint should be shown
     */
    checkShowPopover(hint: InboxHint): boolean;

    /**
     * Handle notification icon click
     * Opens message center in new tab and tracks click event
     */
    handleClick(): void;

    /**
     * Hide current popover hint
     * Records display timestamp to localStorage
     */
    hidePopover(): void;
  }

  /**
   * Plugin constructor options
   */
  export interface NotificationPluginOptions {
    /** Plugin registration order (default: 950) */
    order?: number;
  }

  /**
   * Plugin class for integrating notification inbox into toolbar
   */
  export class NotificationPlugin {
    /** Plugin execution order in toolbar */
    order: number;

    /** Signal emitted when notification state changes */
    signalChanged: HSCore.Util.Signal<{ isLogin: boolean }>;

    /** Reference to signin plugin */
    private _signinPlugin: unknown;

    /** Signal hook for listening to signin events */
    private _signalHook: HSCore.Util.SignalHook;

    /**
     * Create notification plugin instance
     * @param context - Plugin context
     * @param dependencies - Plugin dependency map
     */
    constructor(context: unknown, dependencies: Record<string, unknown>);

    /**
     * Notify listeners of signin status change
     * @param event - Signin event data
     */
    notifyStatusChanged(event: unknown): void;

    /**
     * Get React element to render in toolbar
     * @returns Notification inbox component
     */
    getRenderItem(): React.ReactElement<NotificationInboxProps>;
  }

  /**
   * Default export factory function
   * @returns NotificationPlugin class constructor
   */
  export default function createNotificationPlugin(): typeof NotificationPlugin;
}

/**
 * Global namespace extensions
 */
declare global {
  namespace HSApp {
    namespace Util {
      /** Event tracking utility */
      class EventTrack {
        static instance(): EventTrack;
        track(group: EventGroupEnum, event: string, data?: Record<string, unknown>): void;
      }

      /** Event group enumeration */
      enum EventGroupEnum {
        Pageheader = 'Pageheader',
      }

      /** URL utility */
      namespace Url {
        function getQueryStrings(): Record<string, string>;
      }
    }

    /** Partner configuration */
    namespace PartnerConfig {
      const MESSAGECENTER_URL: string;
    }
  }

  namespace HSCore {
    namespace Util {
      /**
       * Signal class for event dispatching
       */
      class Signal<T = unknown> {
        constructor(owner: unknown);
        listen(callback: (data: T) => void): void;
        dispatch(data: T): void;
      }

      /**
       * Signal hook for managing signal subscriptions
       */
      class SignalHook {
        constructor(owner: unknown);
        listen(signal: Signal, callback: (event: unknown) => void): void;
      }
    }
  }

  namespace NWTK {
    namespace mtop {
      namespace News {
        interface NewsUnreadResponse {
          ret: string[];
          data: {
            data: {
              event?: number;
              inboxHints?: InboxHint[];
            };
          };
        }

        interface NewCommentResponse {
          data: {
            totalCount?: number;
          };
        }

        function getNewsUnreadnum(options: {
          data: { channel: string };
        }): Promise<NewsUnreadResponse>;

        function getNewComment(options: {
          data: {
            category: string;
            clientInfo: string;
          };
        }): Promise<NewCommentResponse>;
      }
    }
  }

  /** Global user object */
  const adskUser: {
    /** Current user member ID */
    memberId: string;
    /** Check if user is logged in */
    isLogin(): boolean;
  };

  /** Global resource manager */
  const ResourceManager: {
    /** Get localized string by key */
    getString(key: string): string;
  };
}

export {};