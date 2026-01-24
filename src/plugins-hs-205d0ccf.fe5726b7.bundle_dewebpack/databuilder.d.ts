/**
 * Strategies configuration imported from module 948118
 */
interface Strategies {
  [key: string]: unknown;
}

/**
 * DataBuilder class implementing the Singleton pattern.
 * Manages data building strategies for the application.
 */
export declare class DataBuilder {
  /**
   * Singleton instance holder
   * @private
   */
  private static _instance: DataBuilder | undefined;

  /**
   * Collection of data building strategies
   * @private
   */
  private strategies: Strategies;

  /**
   * Private constructor to enforce singleton pattern
   * Initializes strategies from the strategies module
   */
  private constructor();

  /**
   * Retrieves all registered data building strategies
   * @returns The strategies object containing all available strategies
   */
  getStrategies(): Strategies;

  /**
   * Gets the singleton instance of DataBuilder
   * Creates a new instance if one doesn't exist
   * @returns The singleton DataBuilder instance
   */
  static getInstance(): DataBuilder;
}