/**
 * Clipboard.js - Modern copy to clipboard library
 * Provides programmatic clipboard operations with fallback support
 */

/**
 * Supported clipboard actions
 */
type ClipboardAction = 'copy' | 'cut';

/**
 * Event types emitted by clipboard operations
 */
type ClipboardEventType = 'success' | 'error';

/**
 * Configuration options for ClipboardAction class
 */
interface ClipboardActionOptions {
  /** The clipboard action to perform */
  action?: ClipboardAction;
  /** The target element to copy/cut from */
  container?: HTMLElement;
  /** Event emitter instance */
  emitter?: TinyEmitter;
  /** Target element for copy/cut operation */
  target?: HTMLElement;
  /** Text content to copy */
  text?: string;
  /** Element that triggered the action */
  trigger?: HTMLElement;
}

/**
 * Event data passed to clipboard event handlers
 */
interface ClipboardEventData {
  /** The action that was performed */
  action: ClipboardAction;
  /** The text that was copied/cut */
  text: string;
  /** The element that triggered the action */
  trigger: HTMLElement | null;
  /** Function to clear the current selection */
  clearSelection: () => void;
}

/**
 * Configuration options for Clipboard class
 */
interface ClipboardOptions {
  /** Function or string defining the action to perform */
  action?: ClipboardAction | ((trigger: HTMLElement) => ClipboardAction);
  /** Container element for clipboard operations */
  container?: HTMLElement;
  /** Function or selector for target element */
  target?: ((trigger: HTMLElement) => HTMLElement | null) | string;
  /** Function or string for text to copy */
  text?: ((trigger: HTMLElement) => string) | string;
}

/**
 * Listener destruction interface
 */
interface EventListener {
  /** Removes the event listener */
  destroy: () => void;
}

/**
 * Type validation utilities
 */
interface TypeValidation {
  /** Check if value is an HTMLElement node */
  node: (value: unknown) => value is HTMLElement;
  /** Check if value is a NodeList or HTMLCollection */
  nodeList: (value: unknown) => value is NodeList | HTMLCollection;
  /** Check if value is a string */
  string: (value: unknown) => value is string;
  /** Check if value is a function */
  fn: (value: unknown) => value is Function;
}

/**
 * Minimal event emitter for clipboard events
 */
declare class TinyEmitter {
  private e?: Record<string, Array<{ fn: Function; ctx?: unknown }>>;

  /**
   * Subscribe to an event
   * @param event - Event name
   * @param callback - Event handler
   * @param context - Execution context for callback
   */
  on(event: string, callback: Function, context?: unknown): this;

  /**
   * Subscribe to an event once
   * @param event - Event name
   * @param callback - Event handler
   * @param context - Execution context for callback
   */
  once(event: string, callback: Function, context?: unknown): this;

  /**
   * Emit an event
   * @param event - Event name
   * @param args - Arguments to pass to handlers
   */
  emit(event: string, ...args: unknown[]): this;

  /**
   * Unsubscribe from an event
   * @param event - Event name
   * @param callback - Event handler to remove
   */
  off(event: string, callback?: Function): this;
}

/**
 * Core clipboard action handler
 * Manages the low-level copy/cut operations
 */
declare class ClipboardAction {
  private _action: ClipboardAction;
  private _target?: HTMLElement;
  private container?: HTMLElement;
  private emitter?: TinyEmitter;
  private text?: string;
  private trigger?: HTMLElement;
  private selectedText: string;
  private fakeElem?: HTMLTextAreaElement;
  private fakeHandler?: boolean;
  private fakeHandlerCallback?: () => void;

  /**
   * @param options - Configuration options
   */
  constructor(options: ClipboardActionOptions);

  /**
   * Parse and store configuration options
   * @param options - Configuration options
   */
  private resolveOptions(options?: ClipboardActionOptions): void;

  /**
   * Initialize text selection based on options
   */
  private initSelection(): void;

  /**
   * Create a fake textarea element for copying text
   * @returns The created textarea element
   */
  private createFakeElement(): HTMLTextAreaElement;

  /**
   * Select text using a temporary fake element
   */
  private selectFake(): void;

  /**
   * Remove the fake element and cleanup
   */
  private removeFake(): void;

  /**
   * Select text from the target element
   */
  private selectTarget(): void;

  /**
   * Execute the copy/cut command
   */
  private copyText(): void;

  /**
   * Handle the result of the clipboard operation
   * @param success - Whether the operation succeeded
   */
  private handleResult(success: boolean): void;

  /**
   * Clear the current text selection
   */
  clearSelection(): void;

  /**
   * Cleanup and destroy the action instance
   */
  destroy(): void;

  /** Get/set the clipboard action */
  get action(): ClipboardAction;
  set action(value: ClipboardAction);

  /** Get/set the target element */
  get target(): HTMLElement | undefined;
  set target(value: HTMLElement | undefined);
}

/**
 * Main Clipboard class
 * High-level API for clipboard operations with event delegation
 */
export default class Clipboard extends TinyEmitter {
  private action: (trigger: HTMLElement) => ClipboardAction;
  private target: (trigger: HTMLElement) => HTMLElement | null;
  private text: (trigger: HTMLElement) => string;
  private container: HTMLElement;
  private listener?: EventListener;
  private clipboardAction?: ClipboardAction;

  /**
   * @param trigger - CSS selector, HTMLElement, or NodeList to attach listeners
   * @param options - Configuration options
   */
  constructor(
    trigger: string | HTMLElement | NodeList | HTMLCollection,
    options?: ClipboardOptions
  );

  /**
   * Check if clipboard operations are supported
   * @param actions - Action(s) to check support for
   * @returns Whether all specified actions are supported
   */
  static isSupported(actions?: ClipboardAction | ClipboardAction[]): boolean;

  /**
   * Parse and store configuration options
   * @param options - Configuration options
   */
  private resolveOptions(options?: ClipboardOptions): void;

  /**
   * Attach click event listeners to trigger elements
   * @param trigger - Element(s) to attach listeners to
   */
  private listenClick(
    trigger: string | HTMLElement | NodeList | HTMLCollection
  ): void;

  /**
   * Handle click events on trigger elements
   * @param event - Click event
   */
  private onClick(event: MouseEvent): void;

  /**
   * Default action resolver from data attribute
   * @param trigger - Trigger element
   * @returns The action to perform
   */
  private defaultAction(trigger: HTMLElement): ClipboardAction;

  /**
   * Default target resolver from data attribute
   * @param trigger - Trigger element
   * @returns The target element
   */
  private defaultTarget(trigger: HTMLElement): HTMLElement | null;

  /**
   * Default text resolver from data attribute
   * @param trigger - Trigger element
   * @returns The text to copy
   */
  private defaultText(trigger: HTMLElement): string | undefined;

  /**
   * Remove event listeners and cleanup
   */
  destroy(): void;
}

/**
 * Select text content from an element
 * @param element - Element to select text from
 * @returns The selected text
 */
declare function select(element: HTMLElement): string;

/**
 * Add event listener with delegation support
 * @param element - Target element, selector, or NodeList
 * @param selector - Delegation selector (optional)
 * @param eventType - Event type
 * @param callback - Event handler
 * @param useCapture - Use capture phase
 * @returns Listener destruction interface
 */
declare function listen(
  element: string | HTMLElement | NodeList | Document,
  selector: string,
  eventType: string,
  callback: (event: Event) => void,
  useCapture?: boolean
): EventListener;

/**
 * Find closest ancestor matching selector
 * @param element - Starting element
 * @param selector - CSS selector
 * @returns Matching ancestor or null
 */
declare function closest(
  element: Element | null,
  selector: string
): Element | null;