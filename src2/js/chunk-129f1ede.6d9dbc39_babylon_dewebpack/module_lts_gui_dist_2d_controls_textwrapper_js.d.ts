/**
 * Text wrapper utility for handling text content with character-level operations.
 * Provides methods for text manipulation, substring extraction, and character access.
 * Supports both string-based and character array-based representations for better Unicode handling.
 */
export declare class TextWrapper {
  /**
   * Internal text storage as a string.
   * @private
   */
  private _text: string;

  /**
   * Internal text storage as an array of characters.
   * Used for better handling of Unicode characters and grapheme clusters.
   * @private
   */
  private _characters: string[] | undefined;

  /**
   * Creates a new instance of TextWrapper.
   */
  constructor();

  /**
   * Gets or sets the text content.
   * When setting, automatically converts the text to a character array if Array.from is available.
   */
  get text(): string;
  set text(value: string);

  /**
   * Gets the length of the text.
   * Returns the length based on the character array if available, otherwise the string length.
   */
  get length(): number;

  /**
   * Removes a portion of text from the specified range and optionally replaces it with new content.
   * 
   * @param startIndex - The starting index of the range to remove (inclusive)
   * @param endIndex - The ending index of the range to remove (exclusive)
   * @param replacement - Optional replacement text to insert at the removed position
   */
  removePart(startIndex: number, endIndex: number, replacement?: string): void;

  /**
   * Returns the character at the specified index.
   * 
   * @param index - The zero-based index of the character to retrieve
   * @returns The character at the specified position
   */
  charAt(index: number): string;

  /**
   * Extracts a substring beginning at a specified position and having a specified length.
   * 
   * @param startIndex - The starting position (0-based). Negative values count from the end
   * @param length - Optional number of characters to extract. If omitted, extracts to the end
   * @returns The extracted substring
   */
  substr(startIndex: number, length?: number): string;

  /**
   * Returns the substring between two indices.
   * 
   * @param startIndex - The starting index (inclusive). Values are clamped to valid range
   * @param endIndex - Optional ending index (exclusive). If omitted, extracts to the end
   * @returns The extracted substring
   */
  substring(startIndex: number, endIndex?: number): string;

  /**
   * Checks if the character at the specified index is a word character (alphanumeric or underscore).
   * 
   * @param index - The zero-based index of the character to check
   * @returns True if the character matches the word pattern /\w/, false otherwise
   */
  isWord(index: number): boolean;
}