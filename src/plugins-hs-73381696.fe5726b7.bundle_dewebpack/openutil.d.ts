/**
 * Module: OpenUtil
 * Utilities for tracking and measuring design opening performance metrics
 */

/**
 * Types of design opening operations
 */
export enum OpenType {
  /** Loading a design from scratch */
  LoadDesign = "load_design",
  /** Loading an empty design */
  LoadEmpty = "load_empty",
  /** Opening an existing design */
  OpenDesign = "open_design"
}

/**
 * Stages of application loading
 */
export enum LoadingStage {
  /** Application is loading */
  LoadingApp = "LoadingApp",
  /** Design is being opened */
  OpenDesign = "OpenDesign"
}

/**
 * Design opening lifecycle states
 */
export enum OpenState {
  /** Design opening has started */
  Opening = "opening",
  /** Design has been opened */
  Opend = "opend",
  /** Loading screen has been hidden */
  HideLoading = "hide_loading"
}

/**
 * Resource performance entry data
 */
interface ResourceEntry {
  name: string;
  startTime: number;
  duration: number;
  transferSize: number;
  responseEnd: number;
}

/**
 * Resource buffer organized by loading stage
 */
interface ResourceBuffer {
  [LoadingStage.LoadingApp]?: ResourceEntry[];
  [LoadingStage.OpenDesign]?: ResourceEntry[];
  timeData?: OpenTimeData;
}

/**
 * Information about a specific opening event
 */
interface OpeningInfo {
  isEmpty: boolean;
  time: number;
}

/**
 * Complete opening timeline information
 */
interface OpenTimeInfo {
  newOpening?: OpeningInfo;
  newOpend?: OpeningInfo;
  opening?: OpeningInfo;
  hideLoading?: OpeningInfo;
}

/**
 * Calculated opening information for reporting
 */
interface CalcOpenInfo {
  type: OpenType;
  opening: number;
  opend: number;
}

/**
 * Complete performance timing data for design opening
 */
interface OpenTimeData {
  type: OpenType;
  startTime: number;
  loadEventEnd: number;
  appReady: number;
  designOpening: number;
  designOpend: number;
  resourcesEnd: number;
  publishVersion?: string;
  publishVersionByType?: Record<string, string>;
}

/**
 * Resource time range grouping
 */
interface ResourceTimeRange {
  names: string[];
  start: number;
  end: number;
}

/**
 * Document opening event data
 */
interface DocumentEventData {
  isNewDocument?: boolean;
}

/**
 * Signal event wrapper
 */
interface SignalEvent<T = unknown> {
  data?: T;
}

/**
 * Loading feedback event data
 */
interface LoadingFeedbackData {
  type?: string;
}

/**
 * Transaction manager interface
 */
interface TransManager {
  signalCreated?: unknown;
}

/**
 * Document manager interface with signals
 */
interface DocumentManager {
  signalDocumentOpening: {
    listen(callback: (event: SignalEvent<DocumentEventData>) => void, context: unknown): void;
  };
  signalDocumentOpened: {
    listen(callback: (event: SignalEvent<DocumentEventData>) => void, context: unknown): void;
  };
  transManager?: TransManager;
}

/**
 * Utility class for tracking design opening performance metrics
 */
export declare class OpenUtil {
  /** Regular expression to match T3D resource files */
  static readonly RESOURCE_REG: RegExp;

  /** Buffer storing resource entries by loading stage */
  private static _resBuff: ResourceBuffer;

  /** Performance observer instance */
  private static _perfObserver?: PerformanceObserver;

  /** Cached timestamp when app was ready */
  private static _tempTagReady: number;

  /** Current opening timeline information */
  private static _openTimeInfo: OpenTimeInfo;

  /** Timer for delayed reporting */
  private static _timer?: number;

  /** Default delay before reporting (90 seconds) */
  private static readonly _defaultResDelay: number;

  /** Flag indicating if document was initialized for the first time */
  private static _docFirstInitialized: boolean;

  /** Signal hook for managing event listeners */
  private static _signalHook: unknown;

  /** Callback for PerformanceObserver */
  private static _startPerformanceObserver(entries: PerformanceObserverEntryList): void;

  /** Handler for signal created event */
  private static _signalCreatedHandler(): void;

  /**
   * Log resource list to internal buffer
   * @param entries - Array of performance resource entries
   */
  private static _logResourceList(entries: PerformanceEntry[]): void;

  /**
   * Get or create the performance observer instance
   * @returns The PerformanceObserver instance
   */
  private static _getPerfObserver(): PerformanceObserver;

  /**
   * Activate performance tracking for a document manager
   * @param documentManager - The document manager to track
   */
  static active(documentManager: DocumentManager): void;

  /**
   * Clear all tracking data and timers
   */
  static clear(): void;

  /**
   * Start observing performance entries
   */
  private static _observe(): void;

  /**
   * Stop observing performance entries
   */
  private static _disconnect(): void;

  /**
   * Get the navigation timing entry
   * @returns The navigation performance entry if available
   */
  private static _getNavigation(): PerformanceNavigationTiming | undefined;

  /**
   * Calculate the end time of all relevant resources
   * @param endTime - Optional end time threshold
   * @returns The calculated resource end time
   */
  private static _getResourcesEnd(endTime?: number): number | undefined;

  /**
   * Get comprehensive open time data for reporting
   * @param calcInfo - Calculated opening information
   * @returns Complete timing data structure
   */
  private static _getOpenTimeData(calcInfo: CalcOpenInfo): OpenTimeData;

  /**
   * Get the asset ID from current URL query string
   * @returns The asset ID if present
   */
  private static _getCurrentUrlAssetId(): string | undefined;

  /**
   * Check if current design is a history version
   * @returns True if viewing a historical version
   */
  private static _isHistoryVersionDesign(): boolean;

  /**
   * Record a timing event for the opening process
   * @param state - The opening state to record
   * @param eventData - Optional event data
   */
  private static _setOpenTime(state: OpenState, eventData?: DocumentEventData): void;

  /**
   * Calculate opening information from recorded timeline
   * @returns Calculated opening info or undefined if incomplete
   */
  private static _calcOpenInfo(): CalcOpenInfo | undefined;

  /**
   * Reset all internal state
   */
  private static _reset(): void;

  /**
   * Handle reporting of collected metrics
   */
  private static _reportHandler(): void;

  /**
   * Attempt to report metrics after a delay
   */
  private static _tryReport(): void;
}