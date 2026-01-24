/**
 * Sortable.js - A JavaScript library for reorderable drag-and-drop lists
 * @version 1.10.2
 * @author RubaXa <trash@rubaxa.org>
 * @author owenm <owen23355@gmail.com>
 * @license MIT
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Represents a rectangular bounding box with position and dimensions
 */
interface Rect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

/**
 * Configuration options for Sortable instances
 */
interface SortableOptions {
  /** Group configuration for drag-and-drop between lists */
  group?: string | GroupOptions;
  /** Enable sorting within the list */
  sort?: boolean;
  /** Disable all interactions */
  disabled?: boolean;
  /** Store adapter for persistence */
  store?: StoreAdapter | null;
  /** CSS selector or element for drag handle */
  handle?: string | null;
  /** CSS selector for draggable items */
  draggable?: string;
  /** Threshold for swapping items (0-1) */
  swapThreshold?: number;
  /** Invert swap direction */
  invertSwap?: boolean;
  /** Inverted swap threshold */
  invertedSwapThreshold?: number | null;
  /** Remove clone when hidden */
  removeCloneOnHide?: boolean;
  /** Direction of the list ('vertical' | 'horizontal' | function) */
  direction?: string | ((target: HTMLElement, options: SortableOptions) => string);
  /** CSS class for ghost element */
  ghostClass?: string;
  /** CSS class for chosen element */
  chosenClass?: string;
  /** CSS class for dragging element */
  dragClass?: string;
  /** CSS selector for elements to ignore */
  ignore?: string;
  /** Filter function or selector */
  filter?: string | ((event: Event, target: HTMLElement, sortable: Sortable) => boolean) | null;
  /** Prevent default on filter */
  preventOnFilter?: boolean;
  /** Animation duration in milliseconds */
  animation?: number;
  /** CSS easing function */
  easing?: string | null;
  /** Callback to set drag data */
  setData?: (dataTransfer: DataTransfer, dragElement: HTMLElement) => void;
  /** Allow bubbling of drop event */
  dropBubble?: boolean;
  /** Allow bubbling of dragover event */
  dragoverBubble?: boolean;
  /** Data attribute for item ID */
  dataIdAttr?: string;
  /** Delay before drag starts (ms) */
  delay?: number;
  /** Only delay on touch devices */
  delayOnTouchOnly?: boolean;
  /** Touch start threshold */
  touchStartThreshold?: number;
  /** Force fallback mode */
  forceFallback?: boolean;
  /** CSS class for fallback element */
  fallbackClass?: string;
  /** Append fallback to body */
  fallbackOnBody?: boolean;
  /** Movement tolerance before drag starts */
  fallbackTolerance?: number;
  /** Offset for fallback element */
  fallbackOffset?: { x: number; y: number };
  /** Support pointer events */
  supportPointer?: boolean;
  /** Threshold for empty insert areas */
  emptyInsertThreshold?: number;
  /** Auto-scroll configuration */
  scroll?: boolean | HTMLElement;
  /** Scroll sensitivity in pixels */
  scrollSensitivity?: number;
  /** Scroll speed */
  scrollSpeed?: number;
  /** Allow scroll bubbling */
  bubbleScroll?: boolean;
  /** Scroll function */
  scrollFn?: (
    offsetX: number,
    offsetY: number,
    event: Event,
    touchEvent: TouchEvent | null,
    element: HTMLElement
  ) => void | 'continue';
  /** MultiDrag: CSS class for selected items */
  selectedClass?: string;
  /** MultiDrag: Key to enable multi-drag */
  multiDragKey?: string | null;
  /** Swap plugin: CSS class for swap highlight */
  swapClass?: string;
  /** Enable swap mode */
  swap?: boolean;

  // Event callbacks
  onStart?: (event: SortableEvent) => void;
  onEnd?: (event: SortableEvent) => void;
  onAdd?: (event: SortableEvent) => void;
  onUpdate?: (event: SortableEvent) => void;
  onSort?: (event: SortableEvent) => void;
  onRemove?: (event: SortableEvent) => void;
  onFilter?: (event: SortableEvent) => void;
  onMove?: (event: MoveEvent, originalEvent: Event) => boolean | -1 | 1 | void;
  onClone?: (event: SortableEvent) => void;
  onChange?: (event: SortableEvent) => void;
  onChoose?: (event: SortableEvent) => void;
  onUnchoose?: (event: SortableEvent) => void;
  onSpill?: (event: SortableEvent) => void;
  onSelect?: (event: SortableEvent) => void;
  onDeselect?: (event: SortableEvent) => void;
}

/**
 * Group configuration for drag-and-drop between lists
 */
interface GroupOptions {
  /** Group name */
  name: string;
  /** Allow pulling from this list */
  pull?: boolean | 'clone' | ((to: Sortable, from: Sortable, dragEl: HTMLElement, event: Event) => boolean);
  /** Allow putting into this list */
  put?: boolean | string | string[] | ((to: Sortable, from: Sortable, dragEl: HTMLElement, event: Event) => boolean);
  /** Revert clone to original position */
  revertClone?: boolean;
}

/**
 * Sortable event data
 */
interface SortableEvent extends Event {
  to: HTMLElement;
  from: HTMLElement;
  item: HTMLElement;
  clone: HTMLElement;
  oldIndex: number | undefined;
  newIndex: number | undefined;
  oldDraggableIndex: number | undefined;
  newDraggableIndex: number | undefined;
  originalEvent: Event;
  pullMode?: string;
  // MultiDrag specific
  items?: HTMLElement[];
  clones?: HTMLElement[];
  oldIndicies?: Array<{ multiDragElement: HTMLElement; index: number }>;
  newIndicies?: Array<{ multiDragElement: HTMLElement; index: number }>;
  swapItem?: HTMLElement | null;
}

/**
 * Move event data
 */
interface MoveEvent {
  to: HTMLElement;
  from: HTMLElement;
  dragged: HTMLElement;
  draggedRect: Rect;
  related: HTMLElement;
  relatedRect: Rect;
  willInsertAfter: boolean;
}

/**
 * Store adapter for persistence
 */
interface StoreAdapter {
  get: (sortable: Sortable) => string[];
  set: (sortable: Sortable) => void;
}

/**
 * Plugin interface
 */
interface SortablePlugin {
  pluginName: string;
  initializeByDefault?: boolean;
  defaults?: Partial<SortableOptions>;
  eventProperties?: (event: Event) => Record<string, unknown>;
  optionListeners?: Record<string, (value: unknown) => unknown>;
  [key: string]: unknown;
}

/**
 * Animation state
 */
interface AnimationState {
  target: HTMLElement;
  rect: Rect;
}

// ============================================================================
// Main Sortable Class
// ============================================================================

/**
 * Sortable - Create sortable drag-and-drop lists
 */
declare class Sortable {
  /** Library version */
  static readonly version: string;

  /** Currently active sortable instance */
  static active: Sortable | null;

  /** Currently dragged element */
  static dragged: HTMLElement | null;

  /** Ghost element */
  static ghost: HTMLElement | null;

  /** Clone element */
  static clone: HTMLElement | null;

  /** The root element */
  el: HTMLElement;

  /** Configuration options */
  options: SortableOptions;

  /** Native draggable support */
  nativeDraggable: boolean;

  /**
   * Create a new Sortable instance
   * @param element - The HTML element to make sortable
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options?: SortableOptions);

  /**
   * Create a new Sortable instance (static factory)
   * @param element - The HTML element to make sortable
   * @param options - Configuration options
   */
  static create(element: HTMLElement, options?: SortableOptions): Sortable;

  /**
   * Get the Sortable instance of an element
   * @param element - The HTML element
   */
  static get(element: HTMLElement): Sortable | undefined;

  /**
   * Mount plugins
   * @param plugins - Plugin constructors
   */
  static mount(...plugins: Array<new (...args: unknown[]) => SortablePlugin>): void;

  /**
   * Get the array of item IDs
   */
  toArray(): string[];

  /**
   * Sort items by array of IDs
   * @param order - Array of item IDs
   */
  sort(order: string[]): void;

  /**
   * Save current order to store
   */
  save(): void;

  /**
   * Find closest element matching selector
   * @param element - Starting element
   * @param selector - CSS selector
   */
  closest(element: HTMLElement, selector?: string): HTMLElement | null;

  /**
   * Get or set an option
   * @param name - Option name
   * @param value - Option value (omit to get)
   */
  option<K extends keyof SortableOptions>(name: K, value?: SortableOptions[K]): SortableOptions[K] | void;

  /**
   * Destroy the instance
   */
  destroy(): void;

  /**
   * Utility functions
   */
  static utils: {
    on(element: HTMLElement, event: string, handler: EventListener): void;
    off(element: HTMLElement, event: string, handler: EventListener): void;
    css(element: HTMLElement, property: string, value?: string | number): string | void;
    find(element: HTMLElement, selector: string, callback?: (el: HTMLElement, index: number) => void): HTMLElement[];
    is(element: HTMLElement, selector: string): boolean;
    extend(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown>;
    throttle(callback: (...args: unknown[]) => void, delay: number): (...args: unknown[]) => void;
    closest(element: HTMLElement, selector: string, context?: HTMLElement): HTMLElement | null;
    toggleClass(element: HTMLElement, className: string, state: boolean): void;
    clone(element: HTMLElement): HTMLElement;
    index(element: HTMLElement, selector?: string): number;
    nextTick(callback: () => void): number;
    cancelNextTick(id: number): void;
    detectDirection(element: HTMLElement, options: SortableOptions): 'vertical' | 'horizontal';
    getChild(parent: HTMLElement, index: number, selector: string): HTMLElement | null;
  };
}

// ============================================================================
// MultiDrag Plugin
// ============================================================================

/**
 * MultiDrag plugin - Enable dragging multiple items at once
 */
declare class MultiDrag implements SortablePlugin {
  static readonly pluginName: 'multiDrag';
  static readonly initializeByDefault: false;

  /**
   * Select an item for multi-drag
   * @param element - The element to select
   */
  static select(element: HTMLElement): void;

  /**
   * Deselect an item
   * @param element - The element to deselect
   */
  static deselect(element: HTMLElement): void;
}

// ============================================================================
// Swap Plugin
// ============================================================================

/**
 * Swap plugin - Swap items instead of shifting them
 */
declare class Swap implements SortablePlugin {
  static readonly pluginName: 'swap';
  static readonly initializeByDefault: false;
}

// ============================================================================
// AutoScroll Plugin (built-in)
// ============================================================================

/**
 * AutoScroll plugin - Automatically scroll when dragging near edges
 */
declare class AutoScroll implements SortablePlugin {
  static readonly pluginName: 'scroll';
  static readonly initializeByDefault: true;
}

// ============================================================================
// Exports
// ============================================================================

export default Sortable;
export { Sortable, MultiDrag, Swap };
export type {
  SortableOptions,
  SortableEvent,
  MoveEvent,
  GroupOptions,
  StoreAdapter,
  SortablePlugin,
  Rect,
  AnimationState,
};