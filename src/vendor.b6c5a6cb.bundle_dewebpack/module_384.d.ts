/**
 * Interaction module for handling pointer, mouse, and touch events
 * Provides event management and hit testing for display objects
 */

import { Point } from '@pixi/math';
import { DisplayObject } from '@pixi/display';
import { EventEmitter } from '@pixi/utils';
import { Renderer } from '@pixi/core';

/**
 * Holds all data related to an interaction event
 * Tracks position, target, and original DOM event information
 */
export class InteractionData {
  /** Global position of the interaction */
  global: Point;
  
  /** The target display object of the interaction */
  target: DisplayObject | null;
  
  /** Reference to the original DOM event */
  originalEvent: MouseEvent | TouchEvent | PointerEvent | null;
  
  /** Unique identifier for this pointer */
  identifier: number | null;
  
  /** Whether this is the primary pointer in a multi-touch interaction */
  isPrimary: boolean;
  
  /** Which mouse button was pressed (0=left, 1=middle, 2=right) */
  button: number;
  
  /** Bitmask of currently pressed buttons */
  buttons: number;
  
  /** Width of the contact geometry */
  width: number;
  
  /** Height of the contact geometry */
  height: number;
  
  /** Angle between Y-Z plane and pointer-transducer plane (degrees, -90 to 90) */
  tiltX: number;
  
  /** Angle between X-Z plane and pointer-transducer plane (degrees, -90 to 90) */
  tiltY: number;
  
  /** Type of pointer device ("mouse", "touch", "pen") */
  pointerType: string | null;
  
  /** Pressure applied to the pointer (0.0 to 1.0) */
  pressure: number;
  
  /** Rotation angle of the pointer in degrees (0-359) */
  rotationAngle: number;
  
  /** Rotation angle for devices with twist support (0-359) */
  twist: number;
  
  /** Tangential pressure (barrel pressure) */
  tangentialPressure: number;
  
  /** Alias for identifier, matches DOM PointerEvent API */
  readonly pointerId: number | null;
  
  /**
   * Gets the local position of the interaction relative to a display object
   * @param displayObject - The display object to calculate local position for
   * @param point - Optional point to store the result
   * @param globalPos - Optional global position to use instead of this.global
   * @returns The local position point
   */
  getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;
  
  /**
   * Copies properties from a DOM event to this interaction data
   * @param event - The DOM event to copy from
   */
  copyEvent(event: MouseEvent | TouchEvent | PointerEvent): void;
  
  /**
   * Resets the interaction data to default values
   */
  reset(): void;
}

/**
 * Event object passed to interaction event handlers
 * Contains data about the interaction and supports event propagation control
 */
export class InteractionEvent {
  /** Whether propagation has been stopped */
  stopped: boolean;
  
  /** The display object where propagation was stopped */
  stopsPropagatingAt: DisplayObject | null;
  
  /** Hint that propagation should stop */
  stopPropagationHint: boolean;
  
  /** The target display object that was interacted with */
  target: DisplayObject | null;
  
  /** The current display object in the event bubbling chain */
  currentTarget: DisplayObject | null;
  
  /** The type of interaction event */
  type: string | null;
  
  /** Associated interaction data */
  data: InteractionData | null;
  
  /**
   * Stops propagation of this event to parent display objects
   */
  stopPropagation(): void;
  
  /**
   * Resets the event to default values for reuse
   */
  reset(): void;
}

/**
 * Internal tracking data for each active pointer
 * Uses bit flags for efficient state management
 */
export class InteractionTrackingData {
  /** Unique pointer identifier */
  readonly pointerId: number;
  
  /** Bit flags representing pointer state */
  flags: number;
  
  /** Whether no flags are set */
  readonly none: boolean;
  
  /** Whether the pointer is over the display object */
  over: boolean;
  
  /** Whether the right mouse button is down */
  rightDown: boolean;
  
  /** Whether the left mouse button is down */
  leftDown: boolean;
  
  /**
   * Creates tracking data for a pointer
   * @param pointerId - Unique identifier for the pointer
   */
  constructor(pointerId: number);
  
  /** Bit flag constants */
  static FLAGS: Readonly<{
    NONE: 0;
    OVER: 1;
    LEFT_DOWN: 2;
    RIGHT_DOWN: 4;
  }>;
}

/**
 * Configuration options for InteractionManager
 */
export interface InteractionManagerOptions {
  /** Whether to automatically call preventDefault on events */
  autoPreventDefault?: boolean;
  
  /** Frequency (in ms) at which to update interactions */
  interactionFrequency?: number;
  
  /** Whether to use the system ticker for updates */
  useSystemTicker?: boolean;
}

/**
 * Manages all interaction events for a renderer
 * Handles mouse, touch, and pointer events with hit testing
 */
export class InteractionManager extends EventEmitter {
  /** The renderer this manager works for */
  renderer: Renderer;
  
  /** Whether to automatically prevent default browser behaviors */
  autoPreventDefault: boolean;
  
  /** Minimum time between interaction updates (ms) */
  interactionFrequency: number;
  
  /** Interaction data for the mouse */
  readonly mouse: InteractionData;
  
  /** Map of active interaction data by pointer ID */
  activeInteractionData: Record<number, InteractionData>;
  
  /** Pool of reusable interaction data objects */
  interactionDataPool: InteractionData[];
  
  /** Reusable event data object */
  eventData: InteractionEvent;
  
  /** The DOM element to attach events to */
  interactionDOMElement: HTMLElement | null;
  
  /** Whether to process move events when pointer is inside */
  moveWhenInside: boolean;
  
  /** Whether events have been added to the DOM */
  eventsAdded: boolean;
  
  /** Whether ticker listener has been added */
  tickerAdded: boolean;
  
  /** Whether mouse is over the renderer */
  mouseOverRenderer: boolean;
  
  /** Whether the browser supports touch events */
  readonly supportsTouchEvents: boolean;
  
  /** Whether the browser supports pointer events */
  readonly supportsPointerEvents: boolean;
  
  /** Map of cursor styles by mode */
  cursorStyles: Record<string, string | ((mode: string) => void) | Partial<CSSStyleDeclaration>>;
  
  /** Current cursor mode */
  currentCursorMode: string | null;
  
  /** Current cursor style to display */
  cursor: string | null;
  
  /** Resolution of the interaction manager */
  resolution: number;
  
  /** Events that are delayed for processing */
  delayedEvents: Array<{ displayObject: DisplayObject; eventString: string; eventData: InteractionEvent }>;
  
  /** Hit testing utility */
  search: TreeSearch;
  
  /** Whether to use the system ticker */
  useSystemTicker: boolean;
  
  /**
   * Creates a new InteractionManager
   * @param renderer - The renderer to manage interactions for
   * @param options - Configuration options
   */
  constructor(renderer: Renderer, options?: InteractionManagerOptions);
  
  /**
   * Performs a hit test at the given point
   * @param globalPoint - The point to test in global coordinates
   * @param root - Optional root display object to test from
   * @returns The topmost display object hit, or null
   */
  hitTest(globalPoint: Point, root?: DisplayObject): DisplayObject | null;
  
  /**
   * Sets the DOM element to bind events to
   * @param element - The DOM element
   * @param resolution - The resolution of the element
   */
  setTargetElement(element: HTMLElement, resolution?: number): void;
  
  /**
   * Adds the ticker listener for automatic updates
   */
  addTickerListener(): void;
  
  /**
   * Removes the ticker listener
   */
  removeTickerListener(): void;
  
  /**
   * Registers DOM event listeners
   */
  addEvents(): void;
  
  /**
   * Unregisters DOM event listeners
   */
  removeEvents(): void;
  
  /**
   * Updates all interactive objects
   */
  update(): void;
  
  /**
   * Sets the current cursor mode
   * @param mode - The cursor mode to set
   */
  setCursorMode(mode: string | null): void;
  
  /**
   * Dispatches an event to a display object
   * @param displayObject - The target display object
   * @param eventString - The event type
   * @param eventData - The event data
   */
  dispatchEvent(displayObject: DisplayObject, eventString: string, eventData: InteractionEvent): void;
  
  /**
   * Maps a DOM position to a point in the interaction space
   * @param point - Point to store the result
   * @param x - X coordinate from the DOM event
   * @param y - Y coordinate from the DOM event
   */
  mapPositionToPoint(point: Point, x: number, y: number): void;
  
  /**
   * Processes interactive display objects
   * @param interactionEvent - The interaction event
   * @param displayObject - The display object to process
   * @param func - Optional callback function
   * @param hitTest - Whether to perform hit testing
   * @returns Whether any interactive object was hit
   */
  processInteractive(
    interactionEvent: InteractionEvent,
    displayObject: DisplayObject,
    func?: (event: InteractionEvent, displayObject: DisplayObject, hit: boolean) => void,
    hitTest?: boolean
  ): boolean;
  
  /**
   * Cleans up the interaction manager
   */
  destroy(): void;
  
  // Event handlers (bound methods)
  onPointerUp(event: PointerEvent | MouseEvent | TouchEvent): void;
  onPointerCancel(event: PointerEvent | TouchEvent): void;
  onPointerDown(event: PointerEvent | MouseEvent | TouchEvent): void;
  onPointerMove(event: PointerEvent | MouseEvent | TouchEvent): void;
  onPointerOut(event: PointerEvent | MouseEvent): void;
  onPointerOver(event: PointerEvent | MouseEvent): void;
}

/**
 * Utility for performing recursive hit tests on display object trees
 */
declare class TreeSearch {
  /**
   * Recursively searches for interactive display objects that are hit
   * @param interactionEvent - The interaction event
   * @param displayObject - The display object to search
   * @param func - Optional callback for each interactive object
   * @param hitTest - Whether to perform actual hit testing
   * @param interactive - Whether the parent is interactive
   * @returns Whether any object was hit
   */
  recursiveFindHit(
    interactionEvent: InteractionEvent,
    displayObject: DisplayObject,
    func?: (event: InteractionEvent, displayObject: DisplayObject, hit: boolean) => void,
    hitTest?: boolean,
    interactive?: boolean
  ): boolean;
  
  /**
   * Initiates a hit test search
   * @param interactionEvent - The interaction event
   * @param displayObject - The root display object
   * @param func - Optional callback function
   * @param hitTest - Whether to perform hit testing
   */
  findHit(
    interactionEvent: InteractionEvent,
    displayObject: DisplayObject,
    func?: (event: InteractionEvent, displayObject: DisplayObject, hit: boolean) => void,
    hitTest?: boolean
  ): void;
}

/**
 * Mixin properties that make a display object interactive
 */
export interface InteractiveTarget {
  /** Whether this object is interactive */
  interactive: boolean;
  
  /** Whether children of this object are interactive */
  interactiveChildren: boolean;
  
  /** Custom hit area for interaction (overrides bounds checking) */
  hitArea: { contains(x: number, y: number): boolean } | null;
  
  /** Whether to show pointer cursor on hover (legacy property) */
  buttonMode: boolean;
  
  /** CSS cursor to show when hovering */
  cursor: string | null;
  
  /** Map of currently tracked pointers on this object */
  readonly trackedPointers: Record<number, InteractionTrackingData>;
}

/**
 * The mixin object containing interactive properties
 */
export const interactiveTarget: InteractiveTarget;