enum KeyCode {
  F1 = 112,
  F12 = 123,
  ALT = 18,
  CAPS_LOCK = 20,
  CONTEXT_MENU = 93,
  CTRL = 17,
  DOWN = 40,
  END = 35,
  ESC = 27,
  HOME = 36,
  INSERT = 45,
  LEFT = 37,
  MAC_FF_META = 224,
  META = 91,
  NUMLOCK = 144,
  NUM_CENTER = 12,
  PAGE_DOWN = 34,
  PAGE_UP = 33,
  PAUSE = 19,
  PRINT_SCREEN = 44,
  RIGHT = 39,
  SHIFT = 16,
  UP = 38,
  WIN_KEY = 91,
  WIN_KEY_RIGHT = 92
}

interface KeyboardEventLike {
  keyCode: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

/**
 * Determines if a keyboard event represents a text-modifying action.
 * Returns false for modifier keys, function keys, and navigation keys.
 * 
 * @param event - The keyboard event to check
 * @returns true if the key event modifies text, false otherwise
 */
function isTextModifyingKeyEvent(event: KeyboardEventLike): boolean {
  const keyCode = event.keyCode;

  if (event.altKey && !event.ctrlKey || event.metaKey || keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
    return false;
  }

  switch (keyCode) {
    case KeyCode.ALT:
    case KeyCode.CAPS_LOCK:
    case KeyCode.CONTEXT_MENU:
    case KeyCode.CTRL:
    case KeyCode.DOWN:
    case KeyCode.END:
    case KeyCode.ESC:
    case KeyCode.HOME:
    case KeyCode.INSERT:
    case KeyCode.LEFT:
    case KeyCode.MAC_FF_META:
    case KeyCode.META:
    case KeyCode.NUMLOCK:
    case KeyCode.NUM_CENTER:
    case KeyCode.PAGE_DOWN:
    case KeyCode.PAGE_UP:
    case KeyCode.PAUSE:
    case KeyCode.PRINT_SCREEN:
    case KeyCode.RIGHT:
    case KeyCode.SHIFT:
    case KeyCode.UP:
    case KeyCode.WIN_KEY:
    case KeyCode.WIN_KEY_RIGHT:
      return false;
    default:
      return true;
  }
}