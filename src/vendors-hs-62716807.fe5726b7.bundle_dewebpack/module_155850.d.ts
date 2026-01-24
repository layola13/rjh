/**
 * Browser environment monitoring and error handling module
 * Provides performance tracking, error handling, and user session management
 */

/**
 * User session and device information
 */
interface CommonInfo {
  /** Screen resolution (e.g., "1920x1080") */
  sr: string;
  /** Viewport size (e.g., "1440x900") */
  vp: string;
  /** Connection type (e.g., "4g", "wifi") */
  ct: string;
  /** User identifier */
  uid: string | null;
  /** Session identifier */
  sid: string;
}

/**
 * Performance metrics data
 */
interface PerformanceData {
  /** Page load time in milliseconds */
  load: number;
  /** Current page identifier */
  page?: string;
  /** Auto-send flag */
  autoSend?: boolean;
  [key: string]: unknown;
}

/**
 * Resource loading metrics
 */
interface ResourceData {
  /** Resource load time in milliseconds */
  load: number;
  /** Current page identifier */
  page?: string;
  /** Document location URL */
  dl?: string;
  [key: string]: unknown;
}

/**
 * Page view tracking data
 */
interface PageViewData {
  /** User identifier */
  uid: string | null;
  /** Document title */
  dt: string;
  /** Document location */
  dl: string;
  /** Document referrer */
  dr: string;
  /** Device pixel ratio */
  dpr: string;
  /** Document encoding */
  de: string;
  /** User language */
  ul: string;
  /** Timestamp when tracking began */
  begin: number;
}

/**
 * Resource error details
 */
interface ResourceError {
  /** Source URL of the failed resource */
  src: string;
  /** HTML tag name (e.g., "img", "script") */
  node_name: string;
  /** XPath to the element */
  xpath: string;
}

/**
 * Error event with enhanced properties
 */
interface ErrorEvent extends Event {
  /** Error type */
  type: string;
  /** Error message */
  message?: string;
  /** Source file name */
  filename?: string;
  /** Line number where error occurred */
  lineno?: number;
  /** Column number where error occurred */
  colno?: number;
  /** Error object */
  error?: Error;
  /** Event target element */
  target?: HTMLElement | EventTarget | null;
  /** Source element (legacy property) */
  srcElement?: HTMLElement | null;
}

/**
 * Unhandled promise rejection event
 */
interface UnhandledRejectionEvent extends Event {
  /** Rejection reason */
  reason: unknown;
}

/**
 * History state change event
 */
interface HistoryStateChangeEvent extends CustomEvent {
  /** New state detail */
  detail: string;
}

/**
 * Network connection information
 */
interface NavigatorConnection {
  /** Effective connection type */
  effectiveType?: string;
  /** Connection type */
  type?: string;
}

/**
 * Extended Navigator interface
 */
interface ExtendedNavigator extends Navigator {
  /** Network connection information */
  connection?: NavigatorConnection;
}

/**
 * Configuration options for the monitoring instance
 */
interface MonitoringConfig {
  /** User identifier override */
  uid?: string;
  /** Enable Single Page Application tracking */
  enableSPA?: boolean;
  /** Sampling rate for general events */
  sample?: number;
  /** Sampling rate for page view events */
  pvSample?: number;
  /** Enable behavior tracking */
  behavior?: boolean;
  /** Hash parser function for SPA routing */
  parseHash: (hash: string) => string | null;
}

/**
 * Cookie storage cache
 */
interface CookieCache {
  [key: string]: string | undefined;
}

/**
 * Main monitoring class
 */
declare class MonitoringInstance {
  /** Configuration object */
  _conf: MonitoringConfig;
  
  /** Session identifier */
  session?: string;
  
  /** Indicates if handlers have been initialized */
  hasInitHandler?: boolean;
  
  /** Timestamp of last unload event */
  _lastUnload: number;
  
  /** Cached speed metrics */
  speedCache: unknown | null;
  
  /** Timer for speed metric reporting */
  speedTimmer?: ReturnType<typeof setTimeout>;
  
  /** Hash change event handler */
  hashChangeHandler?: ((preventLog: boolean) => void) | null;
  
  /** History state change event handler */
  stateChangeHandler?: ((event: HistoryStateChangeEvent) => void) | null;

  /**
   * Set this instance as the active error handler
   * @param force - Force activation even if another handler exists
   * @returns This instance for chaining
   */
  activeErrHandler(force?: boolean): this;

  /**
   * Handle error events (both script errors and resource errors)
   * @param event - Error or rejection event
   * @returns This instance for chaining
   */
  errorHandler(event: ErrorEvent | UnhandledRejectionEvent | null): this;

  /**
   * Handle resource loading errors (images, scripts, etc.)
   * @param event - Error event from failed resource
   * @returns This instance for chaining
   */
  resourceErrorHandler(event: ErrorEvent): this;

  /**
   * Extract source URL from an element
   * @param element - HTML element that failed to load
   * @returns Source URL or fallback string
   */
  getSrc(element: HTMLElement): string;

  /**
   * Generate XPath for an element
   * @param element - Target HTML element
   * @param depth - Maximum depth to traverse up the DOM tree
   * @returns XPath string representation
   */
  getXPath(element: HTMLElement, depth: number): string;

  /**
   * Send performance metrics
   * @param additionalData - Extra data to merge with performance metrics
   */
  sendPerformance(additionalData?: Partial<PerformanceData>): void;

  /**
   * Send resource loading metrics
   * @param additionalData - Extra data to merge with resource metrics
   */
  sendResources(additionalData?: Partial<ResourceData>): void;

  /**
   * Send page view event
   */
  sendPV(): void;

  /**
   * Get common information about the session and device
   * @returns Common tracking information
   */
  commonInfo(): CommonInfo;

  /**
   * Handle page unload event
   * @param code - Unload reason code
   * @returns This instance for chaining
   */
  handleUnload(code: number): this;

  /**
   * Bind or unbind hash change listeners for SPA tracking
   * @param enable - Whether to enable or disable listeners
   * @returns This instance for chaining
   */
  bindHashChange(enable: boolean): this;

  /**
   * Initialize all event handlers
   * @returns This instance for chaining
   */
  initHandler(): this;

  /**
   * Get current page identifier
   * @param useDefault - Whether to use default value if not set
   * @returns Page identifier
   */
  getPage(useDefault: boolean): string;

  /**
   * Set current page identifier
   * @param page - New page identifier
   * @param shouldLog - Whether to log the page change
   */
  setPage(page: string, shouldLog?: boolean): void;

  /**
   * Get configuration value
   * @param key - Configuration key
   * @returns Configuration value
   */
  getConfig<K extends keyof MonitoringConfig>(key: K): MonitoringConfig[K];

  /**
   * Execute callback when ready
   * @param callback - Function to execute
   */
  onReady(callback: () => void): void;

  /**
   * Log event data
   * @param type - Event type
   * @param data - Event data
   * @param sample - Sampling rate
   */
  _lg(type: string, data: unknown, sample?: number): void;

  /**
   * Send health check data
   * @param code - Health status code
   */
  sendHealth(code: number): void;

  /**
   * Clear cached data
   * @param force - Force clear all data
   */
  clear(force: boolean): void;

  /**
   * Report user behavior
   */
  reportBehavior?(): void;

  /**
   * Hack browser history state for SPA tracking
   */
  hackHistoryState(): void;

  /**
   * Report an error
   * @param error - Error object
   * @param event - Original event
   */
  error(error: Error | { message: string }, event?: ErrorEvent): void;

  /**
   * Report performance data
   * @param data - Performance metrics
   */
  performance(data: PerformanceData): void;
}

/**
 * Factory function to create monitoring instance
 * @param MonitoringClass - Constructor for monitoring instance
 * @param windowObject - Global window object
 * @param documentObject - Global document object
 * @returns Monitoring instance
 */
export default function createMonitoring(
  MonitoringClass: new () => MonitoringInstance,
  windowObject: Window & typeof globalThis,
  documentObject: Document
): typeof MonitoringInstance;