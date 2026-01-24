/**
 * Toekick generation module for cabinet systems
 */

import { CabinetStyle } from './CabinetStyle';
import { TransactionManager } from './TransactionManager';

/**
 * Toekick configuration object loaded from external source
 */
export interface ToekickConfig {
  /** Toekick height in millimeters */
  height?: number;
  /** Toekick depth in millimeters */
  depth?: number;
  /** Material identifier */
  materialId?: string;
  /** Additional configuration properties */
  [key: string]: unknown;
}

/**
 * Wrap toekick specific configuration
 */
export interface WrapToekickConfig extends ToekickConfig {
  /** Wrap style identifier */
  wrapStyleId?: string;
  /** Corner treatment type */
  cornerType?: string;
}

/**
 * Transaction request object for creating cabinet components
 */
export interface TransactionRequest {
  /** Request type identifier */
  type: string;
  /** Request payload data */
  payload: Record<string, unknown>;
  /** Optional transaction metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Loads toekick configuration data
 * @param style - Cabinet style to load toekick for
 * @returns Promise resolving to toekick configuration
 */
export declare function loadToeKick(style: CabinetStyle): Promise<ToekickConfig>;

/**
 * Loads wrap toekick configuration data
 * @param style - Cabinet style to load wrap toekick for
 * @returns Promise resolving to wrap toekick configuration
 */
export declare function loadWrapToekick(style: CabinetStyle): Promise<WrapToekickConfig>;

/**
 * Generates transaction requests for creating a standard toekick
 * @param transManager - Transaction manager to process requests
 * @param config - Toekick configuration object
 * @param style - Cabinet style to apply
 * @param options - Additional generation options
 * @returns Array of transaction requests
 */
export declare function generateCreateToekickRequests(
  transManager: TransactionManager,
  config: ToekickConfig,
  style: CabinetStyle,
  options: unknown
): TransactionRequest[];

/**
 * Generates transaction requests for creating a wrap toekick
 * @param transManager - Transaction manager to process requests
 * @param config - Wrap toekick configuration object
 * @param style - Cabinet style to apply
 * @param wrapOptions - Wrap-specific options
 * @param additionalOptions - Additional generation options
 * @returns Array of transaction requests
 */
export declare function generateCreateWrapToekickRequests(
  transManager: TransactionManager,
  config: WrapToekickConfig,
  style: CabinetStyle,
  wrapOptions: unknown,
  additionalOptions: unknown
): TransactionRequest[];

/**
 * Generates and commits a standard toekick to the transaction manager
 * @param style - Optional cabinet style, defaults to current style if not provided
 * @param options - Generation options for toekick creation
 * @returns Promise that resolves when toekick is created and committed
 */
export declare function generateToekick(
  style: CabinetStyle | undefined,
  options: unknown
): Promise<void>;

/**
 * Generates and commits a wrap toekick to the transaction manager
 * @param style - Optional cabinet style, defaults to current style if not provided
 * @param wrapOptions - Wrap-specific configuration options
 * @param additionalOptions - Additional generation options
 * @returns Promise that resolves when wrap toekick is created and committed
 */
export declare function generateWrapToekick(
  style: CabinetStyle | undefined,
  wrapOptions: unknown,
  additionalOptions: unknown
): Promise<void>;