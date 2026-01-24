/**
 * Clipboard utility for copying text to system clipboard
 * @module ClipboardUtil
 */

/**
 * Utility class for clipboard operations
 */
export declare class ClipboardUtil {
  /**
   * Private constructor to prevent instantiation
   * This is a utility class with only static methods
   */
  private constructor();

  /**
   * Copies the provided text to the system clipboard
   * 
   * Creates a temporary textarea element, selects its content,
   * and executes the browser's copy command. The textarea is
   * positioned off-screen to avoid visual disruption.
   * 
   * @param text - The text content to copy to clipboard
   * @returns True if the copy operation was successful, false otherwise
   * 
   * @example
   *