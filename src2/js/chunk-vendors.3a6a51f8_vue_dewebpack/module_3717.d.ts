/**
 * Vue.js keyboard shortcut plugin type definitions
 * Provides a v-shortkey directive for handling keyboard shortcuts
 */

/**
 * Keyboard modifier keys
 */
type ModifierKey = 'shift' | 'ctrl' | 'meta' | 'alt';

/**
 * Special key names supported by the plugin
 */
type SpecialKey = 
  | 'arrowup' | 'arrowleft' | 'arrowright' | 'arrowdown'
  | 'altgraph' | 'esc' | 'enter' | 'tab' | 'space'
  | 'pageup' | 'pagedown' | 'home' | 'end'
  | 'del' | 'backspace' | 'insert'
  | 'numlock' | 'capslock' | 'pause'
  | 'contextmenu' | 'scrolllock'
  | 'browserhome' | 'mediaselect';

/**
 * Any valid key that can be used in shortcuts
 */
type ShortcutKey = ModifierKey | SpecialKey | string;

/**
 * Shortcut definition - array of keys or object mapping names to key combinations
 */
type ShortcutDefinition = ShortcutKey[] | Record<string, ShortcutKey[]>;

/**
 * Plugin installation options
 */
interface ShortKeyOptions {
  /**
   * CSS selectors for elements where shortcuts should be prevented
   * @example ['input', 'textarea', '.no-shortcuts']
   */
  prevent?: string[];
}

/**
 * Directive modifiers for v-shortkey
 */
interface ShortKeyModifiers {
  /**
   * Fire event on key press (not release)
   */
  push?: boolean;
  
  /**
   * Fire event only once per key press
   */
  once?: boolean;
  
  /**
   * Don't automatically focus the element
   */
  focus?: boolean;
  
  /**
   * Avoid registering shortcut when this element is focused
   */
  avoid?: boolean;
}

/**
 * Vue directive binding for v-shortkey
 */
interface ShortKeyBinding {
  value: ShortcutDefinition | string;
  modifiers: ShortKeyModifiers;
}

/**
 * Custom event dispatched when shortcut is triggered
 */
interface ShortKeyEvent extends CustomEvent {
  /**
   * The named key from the shortcut definition (if using object syntax)
   */
  srcKey?: string;
}

/**
 * Internal shortcut registration data
 */
interface ShortcutRegistration {
  /**
   * Fire on key press (not release)
   */
  push: boolean;
  
  /**
   * Fire only once per press
   */
  once: boolean;
  
  /**
   * Auto-focus element
   */
  focus: boolean;
  
  /**
   * Named key from definition
   */
  key?: string;
  
  /**
   * Elements registered with this shortcut
   */
  el: HTMLElement[];
}

/**
 * Main plugin object
 */
interface VueShortKey {
  /**
   * Install the plugin into Vue
   * @param Vue - Vue constructor
   * @param options - Plugin configuration options
   */
  install(Vue: any, options?: ShortKeyOptions): void;
  
  /**
   * Decode a KeyboardEvent into a normalized key string
   * @param event - Keyboard event to decode
   * @returns Normalized key string (e.g., "ctrlshifta")
   */
  decodeKey(event: KeyboardEvent): string;
  
  /**
   * Encode a key combination array into a normalized key string
   * @param keys - Array of key names
   * @returns Normalized key string
   */
  encodeKey(keys: ShortcutKey[]): string;
  
  /**
   * Trigger the keydown handler for a registered shortcut
   * @param encodedKey - Encoded key string
   * @internal
   */
  keyDown(encodedKey: string): void;
}

/**
 * Vue.js keyboard shortcut plugin
 * 
 * @example
 *