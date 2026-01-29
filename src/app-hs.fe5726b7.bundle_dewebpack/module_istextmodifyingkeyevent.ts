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
  PHANTOM = 255,
  PRINT_SCREEN = 44,
  RIGHT = 39,
  SCROLL_LOCK = 145,
  SHIFT = 16,
  UP = 38,
  VK_NONAME = 252,
  WIN_KEY = 91,
  WIN_KEY_RIGHT = 92,
  WIN_KEY_FF_LINUX = 0,
  FIRST_MEDIA_KEY = 166,
  LAST_MEDIA_KEY = 183
}

interface KeyboardEventLike {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  keyCode: number;
}

interface BrowserDetector {
  isGECKO(): boolean;
}

declare const browserDetector: BrowserDetector;

/**
 * Determines if a keyboard event modifies text content.
 * Returns false for navigation keys, function keys, modifier keys, and media keys.
 * 
 * @param event - The keyboard event to check
 * @returns true if the key event modifies text, false otherwise
 */
function isTextModifyingKeyEvent(event: KeyboardEventLike): boolean {
  // Alt without Ctrl, Meta key, or F1-F12 keys don't modify text
  if ((event.altKey && !event.ctrlKey) || event.metaKey || 
      (event.keyCode >= KeyCode.F1 && event.keyCode <= KeyCode.F12)) {
    return false;
  }

  switch (event.keyCode) {
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
    case KeyCode.PHANTOM:
    case KeyCode.PRINT_SCREEN:
    case KeyCode.RIGHT:
    case KeyCode.SCROLL_LOCK:
    case KeyCode.SHIFT:
    case KeyCode.UP:
    case KeyCode.VK_NONAME:
    case KeyCode.WIN_KEY:
    case KeyCode.WIN_KEY_RIGHT:
      return false;
    
    case KeyCode.WIN_KEY_FF_LINUX:
      return !browserDetector.isGECKO();
    
    default:
      return event.keyCode < KeyCode.FIRST_MEDIA_KEY || 
             event.keyCode > KeyCode.LAST_MEDIA_KEY;
  }
}