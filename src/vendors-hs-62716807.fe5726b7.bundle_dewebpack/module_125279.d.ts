/**
 * Performance timing keys enumeration
 * Maps to the PerformanceTiming API properties for measuring page load metrics
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming
 */
export declare const TIMING_KEYS: readonly [
  /** Index 0: Reserved/unused */
  "",
  /** Index 1: Time when the browser starts fetching the resource */
  "fetchStart",
  /** Index 2: Time when domain lookup begins */
  "domainLookupStart",
  /** Index 3: Time when domain lookup ends */
  "domainLookupEnd",
  /** Index 4: Time when the browser starts establishing connection */
  "connectStart",
  /** Index 5: Time when the browser finishes establishing connection */
  "connectEnd",
  /** Index 6: Time when the browser starts requesting the resource */
  "requestStart",
  /** Index 7: Time when the browser starts receiving response */
  "responseStart",
  /** Index 8: Time when the browser finishes receiving response */
  "responseEnd",
  /** Index 9: Reserved/unused */
  "",
  /** Index 10: Time when the document becomes interactive */
  "domInteractive",
  /** Index 11: Reserved/unused */
  "",
  /** Index 12: Time when DOMContentLoaded event completes */
  "domContentLoadedEventEnd",
  /** Index 13: Reserved/unused */
  "",
  /** Index 14: Time when the load event starts */
  "loadEventStart",
  /** Index 15: Reserved/unused */
  "",
  /** Index 16: IE-specific first paint time */
  "msFirstPaint",
  /** Index 17: Time when secure connection starts (for HTTPS) */
  "secureConnectionStart"
];

/**
 * Type representing valid timing key strings
 */
export type TimingKey = typeof TIMING_KEYS[number];

/**
 * Type representing valid timing key strings (excluding empty strings)
 */
export type ValidTimingKey = Exclude<TimingKey, "">;