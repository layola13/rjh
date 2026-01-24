/**
 * Meta manager initialization module
 * Registers core application dependencies (HSConstants, log, NWTK) with the RegisterManager
 */

import { RegisterManager } from './register-manager';

// Re-export all exports from the RegisterManager module
export * from './register-manager';

/**
 * Initializes the meta manager by registering global dependencies
 * 
 * This function registers three core application components:
 * - HSConstants: Application constants
 * - log: Logging utility
 * - NWTK: Network toolkit
 * 
 * @remarks
 * Must be called before using any features that depend on these registered services
 * 
 * @example
 *