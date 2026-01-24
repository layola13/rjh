/**
 * Statusbar Popup Module
 * Provides a floating popup component for property editing with automatic positioning and focus management
 */

/**
 * Position coordinates
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Rectangular boundary definition
 */
interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Boundary item with identifier
 */
interface BoundItem {
  id: string;
  bound: Bound;
}

/**
 * Computed boundary with right and bottom edges
 */
interface ComputedBound {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Control configuration for property bar
 */
interface Control {
  id: string;
  [key: string]: unknown;
}

/**
 * jQuery Widget options for propertybarPopup
 */
interface PropertybarPopupOptions {
  /** Array of controls to display in the popup */
  controls?: Control[];
  /** Map of boundary regions for focus detection */
  bounds: Map<string, Bound>;
}

/**
 * Size change event data
 */
interface SizeChangeEventData {
  data: BoundItem;
}

/**
 * PropertyBar signal listener
 */
interface Signal<T = unknown> {
  listen(callback: (event: T) => void, context: unknown): void;
  unlisten(callback: (event: T) => void, context: unknown): void;
}

/**
 * PropertyBar instance interface
 */
interface PropertyBar {
  setControls(controls: Control[] | undefined): void;
  show(container: JQuery): void;
  getControlById(id: string): unknown;
  signalSizeGrow: Signal<SizeChangeEventData>;
  signalSizeShrink: Signal<SizeChangeEventData>;
}

/**
 * PropertyBar constructor interface
 */
interface PropertyBarConstructor {
  create(name: string): PropertyBar;
}

declare const PropertyBar: PropertyBarConstructor;

/**
 * jQuery capture event binding
 */
interface JQueryStatic {
  capture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
  unbindcapture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
}

/**
 * Custom jQuery Widget: propertybarPopup
 */
interface PropertybarPopupWidget extends JQuery {
  propertybarPopup(method: 'updatePos', bound: Bound): void;
  propertybarPopup(method: 'setLoseFocusHandler', handler: () => void): void;
  propertybarPopup(method: 'destroy'): void;
  propertybarPopup(method: 'addBound', item: BoundItem): void;
  propertybarPopup(method: 'removeBound', item: BoundItem): void;
  propertybarPopup(method: 'getControlById', id: string): unknown;
  propertybarPopup(options: { controls: Control[] | undefined }): void;
}

/**
 * StatusbarPopup class
 * Creates and manages a floating popup component with property controls
 */
declare class StatusbarPopup {
  /**
   * Creates a new StatusbarPopup instance
   * @param controls - Array of control configurations to display
   * @param className - Optional CSS class name to add to the popup
   */
  constructor(controls: Control[] | undefined, className?: string);

  /**
   * Factory method to create StatusbarPopup instances
   * @param args - Constructor arguments
   * @returns New StatusbarPopup instance
   */
  static create(...args: [Control[] | undefined, string?]): StatusbarPopup;

  /**
   * Updates the popup position based on trigger element bounds
   * @param bound - Boundary of the trigger element
   */
  updatePosition(bound: Bound): void;

  /**
   * Sets the handler called when popup loses focus
   * @param handler - Callback function to execute on focus loss
   */
  setLoseFocusHandler(handler: () => void): void;

  /**
   * Destroys the popup and removes it from DOM
   */
  destroy(): void;

  /**
   * Adds a boundary region for focus detection
   * @param item - Boundary item with id and bounds
   */
  addBound(item: BoundItem): void;

  /**
   * Removes a boundary region from focus detection
   * @param item - Boundary item with id to remove
   */
  removeBound(item: BoundItem): void;

  /**
   * Retrieves a control by its ID
   * @param id - Control identifier
   * @returns The control instance or undefined
   */
  getControlById(id: string): unknown;
}

export default StatusbarPopup;

/**
 * Global declarations for jQuery Widget
 */
declare global {
  interface JQuery {
    propertybarPopup(method: 'updatePos', bound: Bound): JQuery;
    propertybarPopup(method: 'setLoseFocusHandler', handler: () => void): JQuery;
    propertybarPopup(method: 'destroy'): JQuery;
    propertybarPopup(method: 'addBound', item: BoundItem): JQuery;
    propertybarPopup(method: 'removeBound', item: BoundItem): JQuery;
    propertybarPopup(method: 'getControlById', id: string): unknown;
    propertybarPopup(options: Partial<PropertybarPopupOptions>): JQuery;
  }

  interface Window {
    /** Debug mode flag */
    DEBUG?: boolean;
  }
}