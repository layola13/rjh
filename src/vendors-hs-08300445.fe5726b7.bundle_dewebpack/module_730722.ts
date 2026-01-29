/**
 * Keyboard key code constants and utility functions
 */

interface KeyboardEvent {
  keyCode: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

interface KeyCodes {
  readonly MAC_ENTER: 3;
  readonly BACKSPACE: 8;
  readonly TAB: 9;
  readonly NUM_CENTER: 12;
  readonly ENTER: 13;
  readonly SHIFT: 16;
  readonly CTRL: 17;
  readonly ALT: 18;
  readonly PAUSE: 19;
  readonly CAPS_LOCK: 20;
  readonly ESC: 27;
  readonly SPACE: 32;
  readonly PAGE_UP: 33;
  readonly PAGE_DOWN: 34;
  readonly END: 35;
  readonly HOME: 36;
  readonly LEFT: 37;
  readonly UP: 38;
  readonly RIGHT: 39;
  readonly DOWN: 40;
  readonly PRINT_SCREEN: 44;
  readonly INSERT: 45;
  readonly DELETE: 46;
  readonly ZERO: 48;
  readonly ONE: 49;
  readonly TWO: 50;
  readonly THREE: 51;
  readonly FOUR: 52;
  readonly FIVE: 53;
  readonly SIX: 54;
  readonly SEVEN: 55;
  readonly EIGHT: 56;
  readonly NINE: 57;
  readonly QUESTION_MARK: 63;
  readonly A: 65;
  readonly B: 66;
  readonly C: 67;
  readonly D: 68;
  readonly E: 69;
  readonly F: 70;
  readonly G: 71;
  readonly H: 72;
  readonly I: 73;
  readonly J: 74;
  readonly K: 75;
  readonly L: 76;
  readonly M: 77;
  readonly N: 78;
  readonly O: 79;
  readonly P: 80;
  readonly Q: 81;
  readonly R: 82;
  readonly S: 83;
  readonly T: 84;
  readonly U: 85;
  readonly V: 86;
  readonly W: 87;
  readonly X: 88;
  readonly Y: 89;
  readonly Z: 90;
  readonly META: 91;
  readonly WIN_KEY_RIGHT: 92;
  readonly CONTEXT_MENU: 93;
  readonly NUM_ZERO: 96;
  readonly NUM_ONE: 97;
  readonly NUM_TWO: 98;
  readonly NUM_THREE: 99;
  readonly NUM_FOUR: 100;
  readonly NUM_FIVE: 101;
  readonly NUM_SIX: 102;
  readonly NUM_SEVEN: 103;
  readonly NUM_EIGHT: 104;
  readonly NUM_NINE: 105;
  readonly NUM_MULTIPLY: 106;
  readonly NUM_PLUS: 107;
  readonly NUM_MINUS: 109;
  readonly NUM_PERIOD: 110;
  readonly NUM_DIVISION: 111;
  readonly F1: 112;
  readonly F2: 113;
  readonly F3: 114;
  readonly F4: 115;
  readonly F5: 116;
  readonly F6: 117;
  readonly F7: 118;
  readonly F8: 119;
  readonly F9: 120;
  readonly F10: 121;
  readonly F11: 122;
  readonly F12: 123;
  readonly NUMLOCK: 144;
  readonly SEMICOLON: 186;
  readonly DASH: 189;
  readonly EQUALS: 187;
  readonly COMMA: 188;
  readonly PERIOD: 190;
  readonly SLASH: 191;
  readonly APOSTROPHE: 192;
  readonly SINGLE_QUOTE: 222;
  readonly OPEN_SQUARE_BRACKET: 219;
  readonly BACKSLASH: 220;
  readonly CLOSE_SQUARE_BRACKET: 221;
  readonly WIN_KEY: 224;
  readonly MAC_FF_META: 224;
  readonly WIN_IME: 229;
  isTextModifyingKeyEvent(event: KeyboardEvent): boolean;
  isCharacterKey(keyCode: number): boolean;
}

const KeyCodes: KeyCodes = {
  MAC_ENTER: 3,
  BACKSPACE: 8,
  TAB: 9,
  NUM_CENTER: 12,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PRINT_SCREEN: 44,
  INSERT: 45,
  DELETE: 46,
  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,
  QUESTION_MARK: 63,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  META: 91,
  WIN_KEY_RIGHT: 92,
  CONTEXT_MENU: 93,
  NUM_ZERO: 96,
  NUM_ONE: 97,
  NUM_TWO: 98,
  NUM_THREE: 99,
  NUM_FOUR: 100,
  NUM_FIVE: 101,
  NUM_SIX: 102,
  NUM_SEVEN: 103,
  NUM_EIGHT: 104,
  NUM_NINE: 105,
  NUM_MULTIPLY: 106,
  NUM_PLUS: 107,
  NUM_MINUS: 109,
  NUM_PERIOD: 110,
  NUM_DIVISION: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUMLOCK: 144,
  SEMICOLON: 186,
  DASH: 189,
  EQUALS: 187,
  COMMA: 188,
  PERIOD: 190,
  SLASH: 191,
  APOSTROPHE: 192,
  SINGLE_QUOTE: 222,
  OPEN_SQUARE_BRACKET: 219,
  BACKSLASH: 220,
  CLOSE_SQUARE_BRACKET: 221,
  WIN_KEY: 224,
  MAC_FF_META: 224,
  WIN_IME: 229,

  /**
   * Determines if a keyboard event modifies text content
   */
  isTextModifyingKeyEvent(event: KeyboardEvent): boolean {
    const keyCode = event.keyCode;

    if ((event.altKey && !event.ctrlKey) || event.metaKey || (keyCode >= KeyCodes.F1 && keyCode <= KeyCodes.F12)) {
      return false;
    }

    switch (keyCode) {
      case KeyCodes.ALT:
      case KeyCodes.CAPS_LOCK:
      case KeyCodes.CONTEXT_MENU:
      case KeyCodes.CTRL:
      case KeyCodes.DOWN:
      case KeyCodes.END:
      case KeyCodes.ESC:
      case KeyCodes.HOME:
      case KeyCodes.INSERT:
      case KeyCodes.LEFT:
      case KeyCodes.MAC_FF_META:
      case KeyCodes.META:
      case KeyCodes.NUMLOCK:
      case KeyCodes.NUM_CENTER:
      case KeyCodes.PAGE_DOWN:
      case KeyCodes.PAGE_UP:
      case KeyCodes.PAUSE:
      case KeyCodes.PRINT_SCREEN:
      case KeyCodes.RIGHT:
      case KeyCodes.SHIFT:
      case KeyCodes.UP:
      case KeyCodes.WIN_KEY:
      case KeyCodes.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },

  /**
   * Determines if a key code represents a character key
   */
  isCharacterKey(keyCode: number): boolean {
    if (keyCode >= KeyCodes.ZERO && keyCode <= KeyCodes.NINE) {
      return true;
    }

    if (keyCode >= KeyCodes.NUM_ZERO && keyCode <= KeyCodes.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= KeyCodes.A && keyCode <= KeyCodes.Z) {
      return true;
    }

    if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
      return true;
    }

    switch (keyCode) {
      case KeyCodes.SPACE:
      case KeyCodes.QUESTION_MARK:
      case KeyCodes.NUM_PLUS:
      case KeyCodes.NUM_MINUS:
      case KeyCodes.NUM_PERIOD:
      case KeyCodes.NUM_DIVISION:
      case KeyCodes.SEMICOLON:
      case KeyCodes.DASH:
      case KeyCodes.EQUALS:
      case KeyCodes.COMMA:
      case KeyCodes.PERIOD:
      case KeyCodes.SLASH:
      case KeyCodes.APOSTROPHE:
      case KeyCodes.SINGLE_QUOTE:
      case KeyCodes.OPEN_SQUARE_BRACKET:
      case KeyCodes.BACKSLASH:
      case KeyCodes.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  }
};

export default KeyCodes;