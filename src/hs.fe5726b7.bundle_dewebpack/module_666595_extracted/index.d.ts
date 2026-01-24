/**
 * jQuery UI Widget Event Handlers and Utility Modules
 * Type definitions for modular event handling system
 */

/**
 * Keyboard event handler for keydown events
 */
export interface KeydownModule {
  /**
   * Handles keydown events
   * @param event - The keyboard event object
   */
  (event: KeyboardEvent): void | boolean;
}

/**
 * Direction/positioning module - Northeast
 */
export interface NortheastModule {
  /**
   * Calculates or applies northeast positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Mouse wheel event handler module
 */
export interface MousewheelModule {
  /**
   * Handles mousewheel/wheel events
   * @param event - The wheel event object
   */
  (event: WheelEvent): void | boolean;
}

/**
 * Generic callback invocation module
 */
export interface CallModule {
  /**
   * Invokes a callback function with specified context and arguments
   * @param callback - The function to call
   * @param context - The context (this) for the function
   * @param args - Arguments to pass to the function
   */
  <T, TArgs extends unknown[], TReturn>(
    callback: (this: T, ...args: TArgs) => TReturn,
    context: T,
    ...args: TArgs
  ): TReturn;
}

/**
 * Event handler for mouseenter on spinner buttons
 */
export interface MouseenterSpinnerButtonModule {
  /**
   * Handles mouseenter events on .ui-spinner-button elements
   * @param event - The mouse event object
   */
  (event: MouseEvent): void | boolean;
}

/**
 * Value setter module
 */
export interface SetModule {
  /**
   * Sets a value on an object or element
   * @param target - The target object or element
   * @param key - The property key or attribute name
   * @param value - The value to set
   */
  <T extends object, K extends keyof T>(target: T, key: K, value: T[K]): void;
  (target: HTMLElement, key: string, value: unknown): void;
}

/**
 * Positioning module - Top alignment
 */
export interface TopModule {
  /**
   * Calculates or applies top positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): number;
}

/**
 * Position calculation helper using specified algorithm
 */
export interface UsingModule {
  /**
   * Applies custom positioning logic
   * @param position - Calculated position object
   * @param feedback - Positioning feedback information
   */
  (position: Position, feedback: PositionFeedback): void;
}

/**
 * Generic event handler module
 */
export interface EventModule {
  /**
   * Generic event handler
   * @param event - The event object
   */
  (event: Event): void | boolean;
}

/**
 * Event handler for mousedown on spinner buttons
 */
export interface MousedownSpinnerButtonModule {
  /**
   * Handles mousedown events on .ui-spinner-button elements
   * @param event - The mouse event object
   */
  (event: MouseEvent): void | boolean;
}

/**
 * Positioning module - Left alignment
 */
export interface LeftModule {
  /**
   * Calculates or applies left positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): number;
}

/**
 * Direction/positioning module - West
 */
export interface WestModule {
  /**
   * Calculates or applies west positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Direction/positioning module - South
 */
export interface SouthModule {
  /**
   * Calculates or applies south positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Direction/positioning module - Southwest
 */
export interface SouthwestModule {
  /**
   * Calculates or applies southwest positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Focus event handler module
 */
export interface FocusModule {
  /**
   * Handles focus events
   * @param event - The focus event object
   */
  (event: FocusEvent): void | boolean;
}

/**
 * Event handler for mousedown on menu item anchors
 */
export interface MousedownMenuItemAnchorModule {
  /**
   * Handles mousedown events on .ui-menu-item > a elements
   * @param event - The mouse event object
   */
  (event: MouseEvent): void | boolean;
}

/**
 * Direction/positioning module - North
 */
export interface NorthModule {
  /**
   * Calculates or applies north positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Event handler for clicks on disabled state anchors
 */
export interface ClickDisabledStateAnchorModule {
  /**
   * Handles click events on .ui-state-disabled > a elements
   * @param event - The mouse event object
   * @returns Always returns false to prevent default action
   */
  (event: MouseEvent): false;
}

/**
 * AJAX beforeSend callback module
 */
export interface BeforeSendModule {
  /**
   * Called before an AJAX request is sent
   * @param xhr - The XMLHttpRequest object
   * @param settings - AJAX request settings
   */
  (xhr: XMLHttpRequest, settings: AjaxSettings): void | boolean;
}

/**
 * Collection add/append module
 */
export interface AddModule {
  /**
   * Adds an item to a collection
   * @param collection - The target collection
   * @param item - The item to add
   */
  <T>(collection: T[], item: T): T[];
  <T>(collection: Set<T>, item: T): Set<T>;
}

/**
 * String/data parsing module
 */
export interface ParseModule {
  /**
   * Parses a string or data into a structured format
   * @param input - The input string or data to parse
   */
  <T = unknown>(input: string): T;
}

/**
 * Event handler for clicks on menu items with anchors
 */
export interface ClickMenuItemWithAnchorModule {
  /**
   * Handles click events on .ui-menu-item:has(a) elements
   * @param event - The mouse event object
   */
  (event: MouseEvent): void | boolean;
}

/**
 * Event handler for mouseenter on menu items
 */
export interface MouseenterMenuItemModule {
  /**
   * Handles mouseenter events on .ui-menu-item elements
   * @param event - The mouse event object
   */
  (event: MouseEvent): void | boolean;
}

/**
 * Blur event handler module
 */
export interface BlurModule {
  /**
   * Handles blur events
   * @param event - The focus event object
   */
  (event: FocusEvent): void | boolean;
}

/**
 * Direction/positioning module - Southeast
 */
export interface SoutheastModule {
  /**
   * Calculates or applies southeast positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Direction/positioning module - Northwest
 */
export interface NorthwestModule {
  /**
   * Calculates or applies northwest positioning
   * @param element - Target element
   * @param options - Positioning options
   */
  (element: HTMLElement, options?: PositioningOptions): Position;
}

/**
 * Position coordinates
 */
export interface Position {
  /** Horizontal position in pixels */
  top: number;
  /** Vertical position in pixels */
  left: number;
}

/**
 * Positioning options
 */
export interface PositioningOptions {
  /** Reference element for positioning */
  of?: HTMLElement | Event;
  /** Alignment of the positioned element */
  my?: string;
  /** Alignment of the reference element */
  at?: string;
  /** Collision detection method */
  collision?: string;
  /** Custom positioning callback */
  using?: UsingModule;
  /** Element within which to position */
  within?: HTMLElement;
}

/**
 * Positioning feedback information
 */
export interface PositionFeedback {
  /** Target element dimensions and position */
  target: DOMRect;
  /** Positioned element dimensions and position */
  element: DOMRect;
  /** Horizontal alignment */
  horizontal: 'left' | 'center' | 'right';
  /** Vertical alignment */
  vertical: 'top' | 'middle' | 'bottom';
  /** Important directional flags */
  important: string;
}

/**
 * AJAX request settings
 */
export interface AjaxSettings {
  /** Request URL */
  url?: string;
  /** HTTP method */
  method?: string;
  /** Request data */
  data?: unknown;
  /** Expected response type */
  dataType?: string;
  /** Request headers */
  headers?: Record<string, string>;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Additional settings */
  [key: string]: unknown;
}

/**
 * Module exports
 */
export const keydown: KeydownModule;
export const ne: NortheastModule;
export const mousewheel: MousewheelModule;
export const call: CallModule;
export const mouseenterSpinnerButton: MouseenterSpinnerButtonModule;
export const set: SetModule;
export const top: TopModule;
export const using: UsingModule;
export const e: EventModule;
export const mousedownSpinnerButton: MousedownSpinnerButtonModule;
export const left: LeftModule;
export const w: WestModule;
export const s: SouthModule;
export const sw: SouthwestModule;
export const focus: FocusModule;
export const mousedownMenuItemAnchor: MousedownMenuItemAnchorModule;
export const n: NorthModule;
export const clickDisabledStateAnchor: ClickDisabledStateAnchorModule;
export const beforeSend: BeforeSendModule;
export const add: AddModule;
export const parse: ParseModule;
export const clickMenuItemWithAnchor: ClickMenuItemWithAnchorModule;
export const mouseenterMenuItem: MouseenterMenuItemModule;
export const blur: BlurModule;
export const se: SoutheastModule;
export const nw: NorthwestModule;