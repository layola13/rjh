/**
 * Key code constants for special keyboard keys
 */
interface KeyCodes {
  /** F1 function key */
  F1: number;
  /** F12 function key */
  F12: number;
  /** Alt key */
  ALT: number;
  /** Caps Lock key */
  CAPS_LOCK: number;
  /** Context Menu key */
  CONTEXT_MENU: number;
  /** Control key */
  CTRL: number;
  /** Down arrow key */
  DOWN: number;
  /** End key */
  END: number;
  /** Escape key */
  ESC: number;
  /** Home key */
  HOME: number;
  /** Insert key */
  INSERT: number;
  /** Left arrow key */
  LEFT: number;
  /** Firefox Meta key on Mac */
  MAC_FF_META: number;
  /** Meta/Command key */
  META: number;
  /** Num Lock key */
  NUMLOCK: number;
  /** Numpad center key (5 with Num Lock off) */
  NUM_CENTER: number;
  /** Page Down key */
  PAGE_DOWN: number;
  /** Page Up key */
  PAGE_UP: number;
  /** Pause/Break key */
  PAUSE: number;
  /** Print Screen key */
  PRINT_SCREEN: number;
  /** Right arrow key */
  RIGHT: number;
  /** Shift key */
  SHIFT: number;
  /** Up arrow key */
  UP: number;
  /** Left Windows/Command key */
  WIN_KEY: number;
  /** Right Windows/Command key */
  WIN_KEY_RIGHT: number;
}

/**
 * Keyboard event interface with key modifier properties
 */
interface KeyboardEventLike {
  /** The numeric code of the pressed key */
  keyCode: number;
  /** Whether the Alt key is pressed */
  altKey: boolean;
  /** Whether the Control key is pressed */
  ctrlKey: boolean;
  /** Whether the Meta/Command key is pressed */
  metaKey: boolean;
}

/**
 * Determines whether a keyboard event would modify text content.
 * 
 * Excludes navigation keys, modifier keys, function keys, and certain
 * key combinations (Alt without Ctrl, Meta key, F1-F12) from being
 * considered text-modifying.
 * 
 * @param event - The keyboard event to check
 * @returns `true` if the key event would modify text, `false` otherwise
 * 
 * @example
 *