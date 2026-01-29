/**
 * Paint service module
 * Provides painting and rendering functionality
 * @module PaintService
 */

/**
 * Main paint service class
 * Handles painting operations and canvas rendering
 */
export declare class PaintService {
  /**
   * Creates a new instance of PaintService
   */
  constructor();

  /**
   * Initializes the paint service
   * @returns Promise that resolves when initialization is complete
   */
  initialize?(): Promise<void>;

  /**
   * Paints content to the target
   * @param target - The target element or context to paint to
   * @param options - Optional painting configuration
   */
  paint?(target: unknown, options?: PaintOptions): void;

  /**
   * Clears the painted content
   */
  clear?(): void;

  /**
   * Disposes of resources used by the paint service
   */
  dispose?(): void;
}

/**
 * Configuration options for paint operations
 */
export interface PaintOptions {
  /**
   * Whether to force a repaint
   * @defaultValue false
   */
  force?: boolean;

  /**
   * Additional rendering options
   */
  [key: string]: unknown;
}

/**
 * Re-exported PaintService for convenience
 */
export { PaintService as default };