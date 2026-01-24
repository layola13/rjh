/**
 * Performance data collection and reporting module
 * Handles automatic and manual performance metric submission
 */

/**
 * Performance timing metrics interface
 * Supports timing points t1-t10, custom TTI, and custom FP
 */
interface PerformanceMetrics {
  /** Timing point 1-10 */
  t1?: number;
  t2?: number;
  t3?: number;
  t4?: number;
  t5?: number;
  t6?: number;
  t7?: number;
  t8?: number;
  t9?: number;
  t10?: number;
  
  /** Custom Time To Interactive */
  ctti?: number;
  
  /** Custom First Paint Time */
  cfpt?: number;
  
  /** Auto-send flag */
  autoSend?: boolean;
  
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Performance module context
 */
interface PerformanceContext {
  /** Cached performance data */
  perfData?: PerformanceMetrics;
  
  /** Flag indicating if performance data has been sent */
  hasSendPerf?: boolean;
  
  /**
   * Get configuration value
   * @param key - Configuration key
   * @returns Configuration value
   */
  getConfig(key: 'autoSendPerf'): boolean | undefined;
  getConfig(key: 'sample'): number | undefined;
  getConfig(key: string): unknown;
  
  /**
   * Internal logging method
   * @param type - Log type
   * @param data - Performance data to send
   * @param sample - Sample rate
   */
  _lg(type: 'perf', data: PerformanceMetrics, sample?: number): void;
}

/**
 * Utility module for object operations
 */
declare namespace r {
  /**
   * Extends target object with source properties (shallow merge)
   * @param target - Target object
   * @param source - Source object
   * @returns Merged object
   */
  function ext<T extends object, U extends object>(target: T, source: U): T & U;
}

/**
 * Sends performance metrics to analytics service
 * Handles both automatic and manual sending based on configuration
 * 
 * @param this - Performance context
 * @param performanceData - Performance metrics to send
 * 
 * @remarks
 * Behavior:
 * - If autoSend=true & autoSendPerf enabled: merges with cached data and sends immediately
 * - If autoSend=true & autoSendPerf disabled: caches data or sends if cache exists
 * - Otherwise: filters timing metrics (t1-t10, ctti, cfpt) and caches
 * - Ensures data is sent only once via hasSendPerf flag
 */
declare function sendPerformance(
  this: PerformanceContext,
  performanceData: PerformanceMetrics | null | undefined
): void;

export { PerformanceMetrics, PerformanceContext, sendPerformance };