/**
 * Error reporting and handling module
 * Processes and logs JavaScript errors with filtering and encoding capabilities
 */

/**
 * Configuration for error reporting
 */
interface ErrorConfig {
  /** Errors matching these patterns will be ignored */
  ignoreErrors?: RegExp[];
}

/**
 * Error input can be a string message or an Error-like object
 */
interface ErrorInput {
  /** Error name/category */
  name?: string;
  /** Error message */
  message?: string;
  /** Error stack trace */
  stack?: string;
  /** Raw error message (alternative to message) */
  msg?: string;
  /** Nested error object */
  error?: ErrorInput;
}

/**
 * Additional context and metadata for error reporting
 */
interface ErrorOptions {
  /** Source filename where error occurred */
  filename?: string;
  /** Line number where error occurred */
  lineno?: number;
  /** Column number where error occurred */
  colno?: number;
  /** Custom tag for categorization */
  tag?: string;
  /** Custom field 1 */
  c1?: string;
  /** Custom field 2 */
  c2?: string;
  /** Custom field 3 */
  c3?: string;
}

/**
 * Internal error log data structure sent to logging system
 */
interface ErrorLogData {
  /** Timestamp when error occurred */
  begin: number;
  /** Error category/type */
  cate: string;
  /** Error message (truncated to 1000 chars) */
  msg: string;
  /** Stack trace (truncated to 1000 chars) */
  stack: string;
  /** Source file URL (with query params removed) */
  file: string;
  /** Line number */
  line: number | string;
  /** Column number */
  col: number | string;
  /** Encoded error details */
  err: {
    /** Encoded raw error message */
    msg_raw: string;
    /** Encoded raw stack trace */
    stack_raw: string;
  };
  /** Document location URL (truncated to 500 chars) */
  dl: string;
  /** Optional custom tag */
  tag?: string;
  /** Optional custom field 1 */
  c1?: string;
  /** Optional custom field 2 */
  c2?: string;
  /** Optional custom field 3 */
  c3?: string;
}

/**
 * SDK-specific error log data for internal SDK errors
 */
interface SDKErrorLogData {
  /** SDK error identifier key */
  msg: string;
  /** Encoded error details */
  err: {
    /** Encoded raw error message */
    msg_raw: string;
  };
}

/**
 * RetCode utility namespace (assumed to exist in global scope)
 */
declare namespace r {
  /** Logs warning messages */
  function warn(message: string): void;
  
  /** Checks if error is from SDK itself */
  function checkSDKError(message: string, filename?: string): boolean;
  
  /** Checks if value matches any ignore rule pattern */
  function ignoreByRule(value: string, rules?: RegExp | RegExp[]): boolean;
  
  /** Decodes encoded error message */
  function decode(value: string): string;
  
  /** Encodes error message for transmission */
  function encode(value: string): string;
  
  /** Key identifier for self/SDK errors */
  const selfErrKey: string;
  
  /** Removes query string from URL */
  function removeUrlSearch(url: string): string;
}

/**
 * RetCode client instance interface
 */
interface RetCodeClient {
  /** Hook called before sending error data */
  beforeSend?: (type: "error", data: ErrorLogData) => void;
  
  /** Gets configuration value by key */
  getConfig(key: "ignore"): ErrorConfig | undefined;
  getConfig(key: string): unknown;
  
  /** Internal method for logging SDK errors */
  _self(type: "error", data: SDKErrorLogData, priority: number): this;
  
  /** Internal method for logging general errors */
  _lg(type: "error", data: ErrorLogData, priority: number): this;
}

/**
 * Reports and logs JavaScript errors with filtering and encoding
 * 
 * @param errorInput - Error object or error message string
 * @param options - Additional error context and metadata
 * @returns The RetCode client instance for chaining
 * 
 * @example
 *