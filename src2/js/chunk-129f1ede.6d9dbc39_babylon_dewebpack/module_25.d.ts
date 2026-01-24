/**
 * Configuration object for RxJS-style error handling behavior.
 * Controls whether synchronous error throwing is enabled (deprecated pattern).
 */
interface Config {
  /**
   * Custom Promise implementation to use.
   * Can be set to override the default Promise constructor.
   */
  Promise: PromiseConstructorLike | undefined;

  /**
   * Sets whether to use the deprecated synchronous error handling mode.
   * When enabled, errors are thrown synchronously instead of being emitted to error callbacks.
   * 
   * @deprecated This synchronous error handling pattern is deprecated.
   * @param value - True to enable synchronous error throwing, false to use async error handling
   */
  useDeprecatedSynchronousErrorHandling: boolean;
}

/**
 * Global configuration object for observable error handling.
 * Exported as the default configuration for the module.
 */
export declare const config: Config;