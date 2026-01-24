/**
 * Keyboard key code constants and utility functions for detecting key event types.
 * This module provides a comprehensive mapping of keyboard key codes and helper functions
 * to determine if a key event modifies text or represents a character input.
 */

/**
 * Interface defining all keyboard key codes and utility methods
 */
interface KeyCodes {
  /** Mac Enter key code (alternative Enter) */
  readonly MAC_ENTER: 3;
  /** Backspace key code */
  readonly BACKSPACE: 8;
  /** Tab key code */
  readonly TAB: 9;
  /** Numeric keypad center key (5 with NumLock off) */
  readonly NUM_CENTER: 12;
  /** Enter/Return key code */
  readonly ENTER: 13;
  /** Shift key code */
  readonly SHIFT: 16;
  /** Control key code */
  readonly CTRL: 17;
  /** Alt key code */
  readonly ALT: 18;
  /** Pause/Break key code */
  readonly PAUSE: 19;
  /** Caps Lock key code */
  readonly CAPS_LOCK: 20;
  /** Escape key code */
  readonly ESC: 27;
  /** Space bar key code */
  readonly SPACE: 32;
  /** Page Up key code */
  readonly PAGE_UP: 33;
  /** Page Down key code */
  readonly PAGE_DOWN: 34;
  /** End key code */
  readonly END: 35;
  /** Home key code */
  readonly HOME: 36;
  /** Left arrow key code */
  readonly LEFT: 37;
  /** Up arrow key code */
  readonly UP: 38;
  /** Right arrow key code */
  readonly RIGHT: 39;
  /** Down arrow key code */
  readonly DOWN: 40;
  /** Print Screen key code */
  readonly PRINT_SCREEN: 44;
  /** Insert key code */
  readonly INSERT: 45;
  /** Delete key code */
  readonly DELETE: 46;
  /** Number 0 key code */
  readonly ZERO: 48;
  /** Number 1 key code */
  readonly ONE: 49;
  /** Number 2 key code */
  readonly TWO: 50;
  /** Number 3 key code */
  readonly THREE: 51;
  /** Number 4 key code */
  readonly FOUR: 52;
  /** Number 5 key code */
  readonly FIVE: 53;
  /** Number 6 key code */
  readonly SIX: 54;
  /** Number 7 key code */
  readonly SEVEN: 55;
  /** Number 8 key code */
  readonly EIGHT: 56;
  /** Number 9 key code */
  readonly NINE: 57;
  /** Question mark key code */
  readonly QUESTION_MARK: 63;
  /** Letter A key code */
  readonly A: 65;
  /** Letter B key code */
  readonly B: 66;
  /** Letter C key code */
  readonly C: 67;
  /** Letter D key code */
  readonly D: 68;
  /** Letter E key code */
  readonly E: 69;
  /** Letter F key code */
  readonly F: 70;
  /** Letter G key code */
  readonly G: 71;
  /** Letter H key code */
  readonly H: 72;
  /** Letter I key code */
  readonly I: 73;
  /** Letter J key code */
  readonly J: 74;
  /** Letter K key code */
  readonly K: 75;
  /** Letter L key code */
  readonly L: 76;
  /** Letter M key code */
  readonly M: 77;
  /** Letter N key code */
  readonly N: 78;
  /** Letter O key code */
  readonly O: 79;
  /** Letter P key code */
  readonly P: 80;
  /** Letter Q key code */
  readonly Q: 81;
  /** Letter R key code */
  readonly R: 82;
  /** Letter S key code */
  readonly S: 83;
  /** Letter T key code */
  readonly T: 84;
  /** Letter U key code */
  readonly U: 85;
  /** Letter V key code */
  readonly V: 86;
  /** Letter W key code */
  readonly W: 87;
  /** Letter X key code */
  readonly X: 88;
  /** Letter Y key code */
  readonly Y: 89;
  /** Letter Z key code */
  readonly Z: 90;
  /** Meta/Command key code (left) */
  readonly META: 91;
  /** Windows key code (right) */
  readonly WIN_KEY_RIGHT: 92;
  /** Context menu key code */
  readonly CONTEXT_MENU: 93;
  /** Numeric keypad 0 key code */
  readonly NUM_ZERO: 96;
  /** Numeric keypad 1 key code */
  readonly NUM_ONE: 97;
  /** Numeric keypad 2 key code */
  readonly NUM_TWO: 98;
  /** Numeric keypad 3 key code */
  readonly NUM_THREE: 99;
  /** Numeric keypad 4 key code */
  readonly NUM_FOUR: 100;
  /** Numeric keypad 5 key code */
  readonly NUM_FIVE: 101;
  /** Numeric keypad 6 key code */
  readonly NUM_SIX: 102;
  /** Numeric keypad 7 key code */
  readonly NUM_SEVEN: 103;
  /** Numeric keypad 8 key code */
  readonly NUM_EIGHT: 104;
  /** Numeric keypad 9 key code */
  readonly NUM_NINE: 105;
  /** Numeric keypad multiply (*) key code */
  readonly NUM_MULTIPLY: 106;
  /** Numeric keypad plus (+) key code */
  readonly NUM_PLUS: 107;
  /** Numeric keypad minus (-) key code */
  readonly NUM_MINUS: 109;
  /** Numeric keypad period (.) key code */
  readonly NUM_PERIOD: 110;
  /** Numeric keypad division (/) key code */
  readonly NUM_DIVISION: 111;
  /** F1 function key code */
  readonly F1: 112;
  /** F2 function key code */
  readonly F2: 113;
  /** F3 function key code */
  readonly F3: 114;
  /** F4 function key code */
  readonly F4: 115;
  /** F5 function key code */
  readonly F5: 116;
  /** F6 function key code */
  readonly F6: 117;
  /** F7 function key code */
  readonly F7: 118;
  /** F8 function key code */
  readonly F8: 119;
  /** F9 function key code */
  readonly F9: 120;
  /** F10 function key code */
  readonly F10: 121;
  /** F11 function key code */
  readonly F11: 122;
  /** F12 function key code */
  readonly F12: 123;
  /** Num Lock key code */
  readonly NUMLOCK: 144;
  /** Semicolon (;) key code */
  readonly SEMICOLON: 186;
  /** Dash/Minus (-) key code */
  readonly DASH: 189;
  /** Equals (=) key code */
  readonly EQUALS: 187;
  /** Comma (,) key code */
  readonly COMMA: 188;
  /** Period (.) key code */
  readonly PERIOD: 190;
  /** Slash (/) key code */
  readonly SLASH: 191;
  /** Apostrophe/Backtick (`) key code */
  readonly APOSTROPHE: 192;
  /** Single quote (') key code */
  readonly SINGLE_QUOTE: 222;
  /** Open square bracket ([) key code */
  readonly OPEN_SQUARE_BRACKET: 219;
  /** Backslash (\) key code */
  readonly BACKSLASH: 220;
  /** Close square bracket (]) key code */
  readonly CLOSE_SQUARE_BRACKET: 221;
  /** Windows key code (left) */
  readonly WIN_KEY: 224;
  /** Mac Firefox Meta key code */
  readonly MAC_FF_META: 224;
  /** Windows IME key code */
  readonly WIN_IME: 229;

  /**
   * Determines if a keyboard event would modify text content.
   * Returns false for modifier keys, navigation keys, and function keys with Alt/Meta pressed.
   * 
   * @param event - The keyboard event to check
   * @returns true if the key event would modify text, false otherwise
   */
  isTextModifyingKeyEvent(event: KeyboardEvent): boolean;

  /**
   * Determines if a key code represents a character key (letters, numbers, punctuation).
   * 
   * @param keyCode - The numeric key code to check
   * @returns true if the key code represents a character key, false otherwise
   */
  isCharacterKey(keyCode: number): boolean;
}

/**
 * Default export containing all keyboard key codes and utility functions
 */
declare const KeyCodes: KeyCodes;

export default KeyCodes;