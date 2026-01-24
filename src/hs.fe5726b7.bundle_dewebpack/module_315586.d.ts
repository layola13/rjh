/**
 * HSFPConstants - High-Security Fingerprint Constants Module
 * 
 * This module exports constants used for fingerprinting and security operations.
 * Originally from module 315586, re-exports constants from the core HSFP module.
 */

/**
 * HSFP Constants namespace containing all fingerprinting-related constant values
 */
export declare const HSFPConstants: HSFPConstantsType;

/**
 * Type definition for HSFP Constants
 * Contains configuration values, identifiers, and flags used throughout the HSFP system
 */
export interface HSFPConstantsType {
  /** Version identifier for the HSFP protocol */
  readonly VERSION?: string;
  
  /** Timeout duration in milliseconds */
  readonly TIMEOUT?: number;
  
  /** Maximum retry attempts */
  readonly MAX_RETRIES?: number;
  
  /** Feature flags or configuration options */
  readonly FLAGS?: Record<string, boolean | number | string>;
  
  /** Error codes mapping */
  readonly ERROR_CODES?: Record<string, number>;
  
  /** API endpoints or resource identifiers */
  readonly ENDPOINTS?: Record<string, string>;
  
  [key: string]: unknown;
}

/**
 * Global augmentation to add HSFPConstants to the global namespace
 */
declare global {
  interface Window {
    HSFPConstants: HSFPConstantsType;
  }
  
  namespace NodeJS {
    interface Global {
      HSFPConstants: HSFPConstantsType;
    }
  }
}

export default HSFPConstants;