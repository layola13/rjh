/**
 * Meta Manager module for registering core dependencies
 * Provides initialization functions for HSConstants, logging, and NWTK integration
 */

/**
 * Global constants object containing application-wide configuration values
 */
declare const HSConstants: Record<string, unknown>;

/**
 * Global logging utility interface
 */
declare const log: {
  debug(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
  [key: string]: (...args: unknown[]) => void;
};

/**
 * Network Toolkit (NWTK) - Core networking and communication utilities
 */
declare const NWTK: Record<string, unknown>;

/**
 * Manager for registering and managing global dependencies
 */
export declare class RegisterManager {
  /**
   * Registers HSConstants to the global registry
   * @param constants - Application constants object
   */
  static registerHSConstants(constants: typeof HSConstants): void;

  /**
   * Registers logging utility to the global registry
   * @param logger - Logging interface implementation
   */
  static registerLog(logger: typeof log): void;

  /**
   * Registers NWTK (Network Toolkit) to the global registry
   * @param nwtk - Network toolkit instance
   */
  static registerNWTK(nwtk: typeof NWTK): void;
}

/**
 * Initializes the Meta Manager by registering all core dependencies
 * Must be called before using any meta-related functionality
 * 
 * @remarks
 * This function registers:
 * - HSConstants: Application-wide constants
 * - log: Logging utilities
 * - NWTK: Network toolkit
 * 
 * @example
 *