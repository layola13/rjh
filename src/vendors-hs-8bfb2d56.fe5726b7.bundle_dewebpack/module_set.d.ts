/**
 * Performance log level flags (bitwise flags)
 */
export enum PerformanceLogLevel {
  /** Enable User Mark API for performance tracking */
  PerformanceUserMarkLogLevel = 1 << 0,
  /** Enable console-based performance tracking */
  PerformanceConsoleLogLevel = 1 << 1,
}

/**
 * Performance counter interface
 */
export interface PerformanceCounterFunctions {
  /** Start a performance counter with the given label */
  StartPerformanceCounter: (label: string) => void;
  /** End a performance counter with the given label */
  EndPerformanceCounter: (label: string) => void;
}

/**
 * Internal performance tracking methods
 */
export interface InternalPerformanceMethods {
  /** Start performance tracking using User Timing API */
  _StartUserMark: (label: string) => void;
  /** End performance tracking using User Timing API */
  _EndUserMark: (label: string) => void;
  /** Start performance tracking using console */
  _StartPerformanceConsole: (label: string) => void;
  /** End performance tracking using console */
  _EndPerformanceConsole: (label: string) => void;
  /** Disabled performance counter (no-op) */
  _StartPerformanceCounterDisabled: (label: string) => void;
  /** Disabled performance counter (no-op) */
  _EndPerformanceCounterDisabled: (label: string) => void;
}

/**
 * Global performance module interface
 */
export interface PerformanceModule extends PerformanceCounterFunctions, InternalPerformanceMethods {}

/**
 * Configure performance logging level
 * 
 * @param logLevel - Bitwise flags indicating which performance tracking method to use
 * 
 * @remarks
 * This function configures the global performance counter implementation based on the log level:
 * - If `PerformanceUserMarkLogLevel` flag is set, uses User Timing API (performance.mark)
 * - If `PerformanceConsoleLogLevel` flag is set, uses console-based tracking
 * - Otherwise, disables performance tracking (uses no-op functions)
 * 
 * @example
 *