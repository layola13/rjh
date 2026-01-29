enum KeyCode {
  ZERO = 48,
  NINE = 57,
  NUM_ZERO = 96,
  NUM_MULTIPLY = 106,
  A = 65,
  Z = 90,
  SPACE = 32,
  QUESTION_MARK = 191,
  NUM_PLUS = 107,
  NUM_MINUS = 109,
  NUM_PERIOD = 110,
  NUM_DIVISION = 111,
  SEMICOLON = 186,
  DASH = 189,
  EQUALS = 187,
  COMMA = 188,
  PERIOD = 190,
  SLASH = 191,
  APOSTROPHE = 192,
  SINGLE_QUOTE = 222,
  OPEN_SQUARE_BRACKET = 219,
  BACKSLASH = 220,
  CLOSE_SQUARE_BRACKET = 221
}

/**
 * Determines if the given key code represents a character key
 * @param keyCode - The key code to check
 * @returns True if the key code represents a character key, false otherwise
 */
function isCharacterKey(keyCode: number): boolean {
  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) return true;
  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) return true;
  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) return true;
  if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) return true;

  switch (keyCode) {
    case KeyCode.SPACE:
    case KeyCode.QUESTION_MARK:
    case KeyCode.NUM_PLUS:
    case KeyCode.NUM_MINUS:
    case KeyCode.NUM_PERIOD:
    case KeyCode.NUM_DIVISION:
    case KeyCode.SEMICOLON:
    case KeyCode.DASH:
    case KeyCode.EQUALS:
    case KeyCode.COMMA:
    case KeyCode.PERIOD:
    case KeyCode.SLASH:
    case KeyCode.APOSTROPHE:
    case KeyCode.SINGLE_QUOTE:
    case KeyCode.OPEN_SQUARE_BRACKET:
    case KeyCode.BACKSLASH:
    case KeyCode.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false;
  }
}

export { isCharacterKey, KeyCode };