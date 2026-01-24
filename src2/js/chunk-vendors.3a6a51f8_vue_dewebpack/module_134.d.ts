/**
 * Clipboard.js TypeScript Type Definitions
 * A modern approach to copy text to clipboard
 */

/**
 * Supported clipboard actions
 */
type ClipboardAction = 'copy' | 'cut';

/**
 * Event types emitted by Clipboard
 */
type ClipboardEventType = 'success' | 'error';

/**
 * Options for initializing ClipboardAction
 */
interface ClipboardActionOptions {
  /** The clipboard action to perform */
  action?: ClipboardAction;
  /** The container element */
  container?: HTMLElement;
  /** Event emitter instance */
  emitter?: ClipboardEventEmitter;
  /** The target element to copy from */
  target?: HTMLElement;
  /** The text content to copy */
  text?: string;
  /** The trigger element that initiated the action */
  trigger?: HTMLElement;
}

/**
 * Event data passed to clipboard event handlers
 */
interface ClipboardEvent {
  /** The action that was performed */
  action: ClipboardAction;
  /** The text that was selected/copied */
  text: string;
  /** The trigger element */
  trigger: HTMLElement;
  /** Function to clear the current selection */
  clearSelection: () => void;
}

/**
 * Event handler function signature
 */
type ClipboardEventHandler = (event: ClipboardEvent) => void;

/**
 * Event emitter interface for clipboard events
 */
interface ClipboardEventEmitter {
  /**
   * Emit a clipboard event
   * @param eventType - Type of event ('success' or 'error')
   * @param data - Event data
   */
  emit(eventType: ClipboardEventType, data: ClipboardEvent): void;
  
  /**
   * Register an event listener
   * @param eventType - Type of event to listen for
   * @param handler - Event handler function
   */
  on?(eventType: ClipboardEventType, handler: ClipboardEventHandler): void;
  
  /**
   * Remove an event listener
   * @param eventType - Type of event
   * @param handler - Event handler to remove
   */
  off?(eventType: ClipboardEventType, handler: ClipboardEventHandler): void;
}

/**
 * Options for initializing the main Clipboard instance
 */
interface ClipboardOptions {
  /**
   * Action to perform (or function returning action)
   * @param trigger - The element that triggered the action
   */
  action?: ClipboardAction | ((trigger: HTMLElement) => ClipboardAction);
  
  /**
   * Target element to copy from (or function returning target)
   * @param trigger - The element that triggered the action
   */
  target?: HTMLElement | ((trigger: HTMLElement) => HTMLElement | null);
  
  /**
   * Text to copy (or function returning text)
   * @param trigger - The element that triggered the action
   */
  text?: string | ((trigger: HTMLElement) => string | undefined);
  
  /**
   * Container element for the fake element
   */
  container?: HTMLElement;
}

/**
 * Listener object with destroy method
 */
interface EventListener {
  /** Remove the event listener */
  destroy(): void;
}

/**
 * Internal class that handles the actual clipboard operations
 */
declare class ClipboardAction {
  private _action: ClipboardAction;
  private _target?: HTMLElement;
  private fakeElem?: HTMLTextAreaElement;
  private fakeHandler?: boolean;
  private fakeHandlerCallback?: () => void;
  private container?: HTMLElement;
  private emitter: ClipboardEventEmitter;
  private trigger?: HTMLElement;
  private text?: string;
  private selectedText: string;

  /**
   * Creates a new ClipboardAction instance
   * @param options - Configuration options
   */
  constructor(options: ClipboardActionOptions);

  /**
   * Resolve and set options from constructor
   * @param options - Configuration options
   */
  private resolveOptions(options?: ClipboardActionOptions): void;

  /**
   * Initialize the selection process
   */
  private initSelection(): void;

  /**
   * Create a fake textarea element for copying text
   * @returns The created textarea element
   */
  private createFakeElement(): HTMLTextAreaElement;

  /**
   * Select text from a fake element
   */
  private selectFake(): void;

  /**
   * Remove the fake element and clean up
   */
  private removeFake(): void;

  /**
   * Select text from the target element
   */
  private selectTarget(): void;

  /**
   * Execute the copy command
   */
  private copyText(): void;

  /**
   * Handle the result of the copy operation
   * @param success - Whether the operation succeeded
   */
  private handleResult(success: boolean): void;

  /**
   * Clear the current text selection
   */
  clearSelection(): void;

  /**
   * Clean up resources
   */
  destroy(): void;

  /** Getter/setter for the clipboard action */
  get action(): ClipboardAction;
  set action(value: ClipboardAction);

  /** Getter/setter for the target element */
  get target(): HTMLElement | undefined;
  set target(value: HTMLElement | undefined);
}

/**
 * Main Clipboard class
 * Provides a simple API for clipboard operations
 */
export default class Clipboard extends ClipboardEventEmitter {
  private action: ClipboardAction | ((trigger: HTMLElement) => ClipboardAction);
  private target?: HTMLElement | ((trigger: HTMLElement) => HTMLElement | null);
  private text?: string | ((trigger: HTMLElement) => string | undefined);
  private container: HTMLElement;
  private listener?: EventListener;
  private clipboardAction?: ClipboardAction;

  /**
   * Creates a new Clipboard instance
   * @param trigger - CSS selector, HTMLElement, or NodeList of trigger elements
   * @param options - Configuration options
   */
  constructor(trigger: string | HTMLElement | NodeListOf<HTMLElement>, options?: ClipboardOptions);

  /**
   * Check if clipboard operations are supported
   * @param actions - Action(s) to check support for
   * @returns Whether the specified actions are supported
   */
  static isSupported(actions?: ClipboardAction | ClipboardAction[]): boolean;

  /**
   * Resolve and set options
   * @param options - Configuration options
   */
  private resolveOptions(options?: ClipboardOptions): void;

  /**
   * Set up click event listener on trigger elements
   * @param trigger - Trigger element(s)
   */
  private listenClick(trigger: string | HTMLElement | NodeListOf<HTMLElement>): void;

  /**
   * Handle click events on trigger elements
   * @param event - The click event
   */
  private onClick(event: Event & { delegateTarget?: HTMLElement; currentTarget?: HTMLElement }): void;

  /**
   * Default action resolver - reads from data-clipboard-action attribute
   * @param trigger - The trigger element
   * @returns The clipboard action
   */
  private defaultAction(trigger: HTMLElement): ClipboardAction;

  /**
   * Default target resolver - reads from data-clipboard-target attribute
   * @param trigger - The trigger element
   * @returns The target element or null
   */
  private defaultTarget(trigger: HTMLElement): HTMLElement | null;

  /**
   * Default text resolver - reads from data-clipboard-text attribute
   * @param trigger - The trigger element
   * @returns The text to copy or undefined
   */
  private defaultText(trigger: HTMLElement): string | undefined;

  /**
   * Clean up event listeners and resources
   */
  destroy(): void;

  /**
   * Register a success event handler
   * @param handler - Event handler function
   */
  on(eventType: 'success', handler: ClipboardEventHandler): this;
  
  /**
   * Register an error event handler
   * @param handler - Event handler function
   */
  on(eventType: 'error', handler: ClipboardEventHandler): this;
  
  /**
   * Register an event handler
   * @param eventType - Type of event
   * @param handler - Event handler function
   */
  on(eventType: ClipboardEventType, handler: ClipboardEventHandler): this;
}