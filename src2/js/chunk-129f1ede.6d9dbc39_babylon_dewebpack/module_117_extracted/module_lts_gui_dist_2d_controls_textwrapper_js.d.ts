/**
 * Text wrapper utility for handling text with support for both string and character array representations.
 * Provides methods for text manipulation with proper Unicode character handling.
 */
export class TextWrapper {
  /**
   * Internal text storage as a string.
   * @private
   */
  private _text: string = '';

  /**
   * Internal text storage as an array of characters for Unicode-safe operations.
   * @private
   */
  private _characters?: string[];

  /**
   * Gets the text content.
   * @returns The complete text as a string.
   */
  get text(): string {
    return this._characters ? this._characters.join('') : this._text;
  }

  /**
   * Sets the text content and creates a character array if Array.from is available.
   * @param value - The text to set.
   */
  set text(value: string) {
    this._text = value;
    this._characters = Array.from ? Array.from(value) : undefined;
  }

  /**
   * Gets the length of the text.
   * @returns The number of characters in the text.
   */
  get length(): number {
    return (this._characters || this._text).length;
  }

  /**
   * Removes a portion of text and optionally replaces it with new content.
   * @param start - The starting index of the portion to remove.
   * @param end - The ending index of the portion to remove.
   * @param replacement - Optional replacement text to insert at the start position.
   */
  removePart(start: number, end: number, replacement?: string): void {
    this._text = this._text.slice(0, start) + (replacement || '') + this._text.slice(end);
    
    if (this._characters) {
      const replacementChars: string[] = replacement ? Array.from(replacement) : [];
      this._characters.splice(start, end - start, ...replacementChars);
    }
  }

  /**
   * Returns the character at the specified index.
   * @param index - The zero-based index of the character.
   * @returns The character at the specified index.
   */
  charAt(index: number): string {
    return this._characters ? this._characters[index] : this._text.charAt(index);
  }

  /**
   * Extracts a substring starting at a specified position and continuing for a specified length.
   * @param start - The starting position (can be negative to count from end).
   * @param length - Optional number of characters to extract.
   * @returns The extracted substring.
   */
  substr(start: number, length?: number): string {
    if (this._characters) {
      const normalizedStart = isNaN(start) 
        ? 0 
        : start >= 0 
          ? Math.min(start, this._characters.length) 
          : this._characters.length + Math.max(start, -this._characters.length);
      
      let normalizedLength = length === undefined 
        ? this._characters.length - normalizedStart 
        : (isNaN(length) || length < 0) 
          ? 0 
          : length;
      
      const result: string[] = [];
      for (let i = normalizedLength - 1; i >= 0; i--) {
        result[i] = this._characters[normalizedStart + i];
      }
      return result.join('');
    }
    
    return this._text.substr(start, length);
  }

  /**
   * Extracts characters between two indices.
   * @param start - The starting index (inclusive).
   * @param end - The ending index (exclusive).
   * @returns The extracted substring.
   */
  substring(start: number, end?: number): string {
    if (this._characters) {
      let normalizedStart = isNaN(start) 
        ? 0 
        : start > this._characters.length 
          ? this._characters.length 
          : start < 0 
            ? 0 
            : start;
      
      let normalizedEnd = end === undefined 
        ? this._characters.length 
        : isNaN(end) 
          ? 0 
          : end > this._characters.length 
            ? this._characters.length 
            : end < 0 
              ? 0 
              : end;
      
      const result: string[] = [];
      let resultIndex = 0;
      while (normalizedStart < normalizedEnd) {
        result[resultIndex++] = this._characters[normalizedStart++];
      }
      return result.join('');
    }
    
    return this._text.substring(start, end);
  }

  /**
   * Checks if the character at the specified index is a word character (alphanumeric or underscore).
   * @param index - The index of the character to check.
   * @returns True if the character is a word character, false otherwise.
   */
  isWord(index: number): boolean {
    const wordPattern = /\w/g;
    return this._characters 
      ? this._characters[index].search(wordPattern) !== -1 
      : this._text.search(wordPattern) !== -1;
  }
}