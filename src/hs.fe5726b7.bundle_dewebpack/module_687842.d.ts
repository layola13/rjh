/**
 * Browser compatibility checker and feature detector
 * Provides methods to check browser support and display compatibility warnings
 */

/**
 * Options for Message.notice method
 */
interface MessageNoticeOptions {
  /** CSS class name for the message container */
  className?: string;
  /** Whether to always show the message */
  always?: boolean;
  /** Whether the message can be closed */
  closable?: boolean;
}

/**
 * Message notification interface from external library
 */
interface MessageService {
  /**
   * Display a notice message
   * @param content - The content to display (React element or string)
   * @param options - Display options
   */
  notice(content: React.ReactElement | string, options?: MessageNoticeOptions): void;
}

/**
 * Analytics tracking interface
 */
interface GrowingIO {
  /**
   * Track an event
   * @param action - The action type (e.g., "track")
   * @param eventName - The name of the event
   */
  (action: string, eventName: string): void;
}

/**
 * Goldlog queue item for analytics
 */
interface GoldlogQueueItem {
  /** The goldlog action to perform */
  action: string;
  /** Arguments for the action */
  arguments: [string, string, string];
}

/**
 * Extended Window interface with custom properties
 */
declare global {
  interface Window {
    /** Growing.io analytics instance */
    gio?: GrowingIO;
    /** Goldlog analytics queue */
    goldlog_queue?: GoldlogQueueItem[];
  }
}

/**
 * Tenant type for environment configuration
 */
type TenantType = 'fp' | 'default';

/**
 * Browser compatibility and feature detection utility class
 * Checks browser compatibility and WebP image format support
 */
export default class BrowserChecker {
  /**
   * Cached WebP support detection result
   * @private
   */
  private _isSupportWebP: boolean | undefined;

  /**
   * Tenant identifier for environment-specific behavior
   */
  readonly tenant: TenantType;

  /**
   * Creates a new BrowserChecker instance
   * @param tenant - The tenant identifier (e.g., 'fp' for global, 'default' for domestic)
   */
  constructor(tenant: TenantType);

  /**
   * Checks if the current browser is compatible with the application
   * Displays warnings for unsupported browsers on desktop
   * Shows mobile-specific notices on mobile devices
   * 
   * Detects:
   * - Chrome-based browsers
   * - Sogou MetaSR browser
   * - Safari
   * - Mobile/tablet devices
   * 
   * Triggers analytics events for incompatible browsers
   */
  checkBrowser(): void;

  /**
   * Detects if the browser supports WebP image format
   * Uses canvas API to test WebP encoding support
   * Result is cached after first call
   * 
   * @returns true if WebP format is supported, false otherwise
   */
  isSupportWebP(): boolean;
}