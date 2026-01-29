/**
 * Handles dimension value corrections and transformations.
 * Provides a mechanism to amend dimension input values through a configurable strategy.
 * 
 * @module DimensionHandler
 */

/**
 * Configuration interface for DimensionHandler.
 * Defines optional amendment function for dimension inputs.
 */
export interface DimensionHandlerConfig {
  /**
   * Optional function to amend/transform dimension input values.
   * @param value - The original dimension value to be amended
   * @returns The amended dimension value
   */
  amendDimensionInput?: (value: unknown) => unknown;
}

/**
 * Handles dimension value processing with optional amendment logic.
 * Encapsulates dimension correction behavior based on provided configuration.
 */
export class DimensionHandler {
  private readonly _config: DimensionHandlerConfig;

  /**
   * Creates a new DimensionHandler instance.
   * @param config - Configuration object containing amendment logic
   */
  constructor(config: DimensionHandlerConfig) {
    this._config = config;
  }

  /**
   * Corrects/amends a dimension value using the configured amendment function.
   * If no amendment function is configured, returns the value unchanged.
   * 
   * @param value - The dimension value to correct
   * @returns The corrected dimension value, or the original value if no amendment is configured
   */
  correctValue(value: unknown): unknown {
    return this._config?.amendDimensionInput?.(value) ?? value;
  }
}