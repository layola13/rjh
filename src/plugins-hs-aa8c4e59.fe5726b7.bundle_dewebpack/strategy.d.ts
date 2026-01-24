/**
 * Strategy base class for entity processing
 * @module Strategy
 */

/**
 * Result type for getFlatEntityIdsAndCategory method
 */
export interface FlatEntityResult {
  /** Array of flattened entity identifiers */
  flatEntityIds: string[];
  /** Optional category information */
  category?: unknown;
}

/**
 * Base strategy class for entity ID flattening and categorization
 * Provides abstraction for different entity processing strategies
 */
export declare class Strategy {
  /**
   * Creates a new Strategy instance
   */
  constructor();

  /**
   * Extracts and flattens entity IDs with optional category information
   * @param entity - The entity object to process
   * @returns Object containing flattened entity IDs and optional category
   */
  getFlatEntityIdsAndCategory(entity: unknown): FlatEntityResult;
}

export default Strategy;