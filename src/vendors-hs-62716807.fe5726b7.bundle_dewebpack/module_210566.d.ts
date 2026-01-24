/**
 * Progress utility functions for handling success percentage calculations
 * @module ProgressUtils
 */

/**
 * Configuration object for success progress
 */
export interface SuccessConfig {
  /**
   * @deprecated Use `percent` instead
   */
  progress?: number;
  
  /**
   * Success percentage value
   */
  percent?: number;
}

/**
 * Props interface for progress component
 */
export interface ProgressProps {
  /**
   * Success configuration object
   */
  success?: SuccessConfig;
  
  /**
   * Direct success percentage value
   */
  successPercent?: number;
}

/**
 * Extracts and returns the success percentage from progress props
 * Handles deprecated `success.progress` property and prioritizes `success.percent`
 * 
 * @param props - Progress component props
 * @returns The success percentage value, or undefined if not set
 * 
 * @example
 *