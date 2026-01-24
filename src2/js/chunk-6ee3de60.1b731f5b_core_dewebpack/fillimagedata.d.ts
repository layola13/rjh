/**
 * FillImageData module - Provides default avatar image data
 * @module FillImageData
 */

/**
 * Singleton class that manages default avatar image data
 * Provides base64-encoded PNG images for male and female avatars
 */
export declare class FillImageData {
  /**
   * Private static instance for singleton pattern
   */
  private static instance: FillImageData | undefined;

  /**
   * Gets the singleton instance of FillImageData
   * Creates a new instance if one doesn't exist
   * @returns The singleton instance
   */
  static get Instance(): FillImageData;

  /**
   * Private constructor to prevent direct instantiation
   * Use FillImageData.Instance to access the singleton
   */
  private constructor();

  /**
   * Gets the base64-encoded data URI for the male avatar image
   * Returns a PNG image in data URI format (data:image/png;base64,...)
   * Image dimensions: 610x425 pixels
   * @returns Base64-encoded PNG image data URI string
   */
  getManData(): string;

  /**
   * Gets the base64-encoded data URI for the female avatar image
   * Returns a PNG image in data URI format (data:image/png;base64,...)
   * Image dimensions: 605x425 pixels
   * @returns Base64-encoded PNG image data URI string
   */
  getWomanData(): string;
}

/**
 * Default export of the FillImageData class
 */
export default FillImageData;