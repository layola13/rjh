/**
 * Key code constants for keyboard events
 */
interface KeyCodes {
  /** Number key 0 */
  ZERO: number;
  /** Number key 9 */
  NINE: number;
  /** Numpad 0 */
  NUM_ZERO: number;
  /** Numpad multiply (*) */
  NUM_MULTIPLY: number;
  /** Letter A */
  A: number;
  /** Letter Z */
  Z: number;
  /** Space bar */
  SPACE: number;
  /** Question mark (?) */
  QUESTION_MARK: number;
  /** Numpad plus (+) */
  NUM_PLUS: number;
  /** Numpad minus (-) */
  NUM_MINUS: number;
  /** Numpad period (.) */
  NUM_PERIOD: number;
  /** Numpad division (/) */
  NUM_DIVISION: number;
  /** Semicolon (;) */
  SEMICOLON: number;
  /** Dash/hyphen (-) */
  DASH: number;
  /** Equals (=) */
  EQUALS: number;
  /** Comma (,) */
  COMMA: number;
  /** Period (.) */
  PERIOD: number;
  /** Slash (/) */
  SLASH: number;
  /** Apostrophe (') */
  APOSTROPHE: number;
  /** Single quote (') */
  SINGLE_QUOTE: number;
  /** Open square bracket ([) */
  OPEN_SQUARE_BRACKET: number;
  /** Backslash (\) */
  BACKSLASH: number;
  /** Close square bracket (]) */
  CLOSE_SQUARE_BRACKET: number;
}

/**
 * Determines if the given key code represents a character input key.
 * 
 * Checks if the key code corresponds to:
 * - Standard number keys (0-9)
 * - Numpad keys (0-9, *, +, -, ., /)
 * - Letter keys (A-Z)
 * - Punctuation and special characters
 * - WebKit-specific zero key code edge case
 * 
 * @param keyCode - The keyboard event key code to check
 * @returns True if the key represents a character input, false otherwise
 * 
 * @example
 *