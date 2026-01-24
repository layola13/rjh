/**
 * Module: InspirationSaveProcess
 * Manages the save process for inspiration data in the floor plan system
 */

import { HSApp } from './HSApp';

/**
 * Result of a save operation
 */
interface SaveResult<T> {
  /** Operation result code */
  code: 'Success' | 'Error';
  /** The saved value */
  value: T;
}

/**
 * Inspiration data structure from the floor plan extension
 */
interface InspirationData {
  // Define specific properties based on your inspiration data structure
  [key: string]: unknown;
}

/**
 * Base interface for save processes in the HSApp system
 */
interface ISaveProcess<T = unknown> {
  /**
   * Synchronously dumps the current state
   * @returns The current state data or undefined
   */
  dumpSync(): T | undefined;

  /**
   * Asynchronously processes the dumped data after synchronous dump
   * @param data - The data to process
   * @returns A promise resolving to the save result
   */
  postDumpAsync(data: T): Promise<SaveResult<T>>;
}

/**
 * Save process implementation for inspiration data
 * Handles synchronous data extraction and asynchronous processing
 * for inspiration-related floor plan content
 */
export declare class InspirationSaveProcess implements ISaveProcess<InspirationData> {
  /**
   * Synchronously extracts inspiration data from the current floor plan
   * @returns The inspiration data from the floor plan extension, or undefined if not available
   */
  dumpSync(): InspirationData | undefined;

  /**
   * Processes the dumped inspiration data asynchronously
   * @param data - The inspiration data to process
   * @returns A promise that resolves with a success result containing the processed data
   */
  postDumpAsync(data: InspirationData): Promise<SaveResult<InspirationData>>;
}