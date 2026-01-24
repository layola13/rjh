/**
 * Layer module - Canvas rendering layer with hit detection
 * Provides hierarchical rendering capabilities with separate canvas contexts for drawing and hit testing
 */

import { Container } from './Container';
import { Canvas, HitCanvas } from './Canvas';
import { Context } from './Context';
import { Shape } from './Shape';
import { Group } from './Group';
import { Stage } from './Stage';

/**
 * Point coordinate interface
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Size dimensions interface
 */
interface Size {
  width: number;
  height: number;
}

/**
 * Canvas conversion options
 */
interface ToCanvasOptions {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  pixelRatio?: number;
}

/**
 * Intersection detection result
 */
interface IntersectionResult {
  shape?: Shape;
  antialiased?: boolean;
}

/**
 * Event data for layer events
 */
interface LayerEvent {
  node: Layer;
}

/**
 * Layer configuration options
 */
interface LayerConfig {
  /** Enable smooth image rendering (default: true) */
  imageSmoothingEnabled?: boolean;
  /** Clear canvas before each draw (default: true) */
  clearBeforeDraw?: boolean;
  /** Enable hit graph for interactive elements (default: true) */
  hitGraphEnabled?: boolean;
  /** Layer visibility */
  visible?: boolean;
  /** Layer listening state for events */
  listening?: boolean;
}

/**
 * Layer class - Manages canvas rendering and hit detection
 * 
 * A Layer is a container that renders its children to its own canvas element.
 * Each layer maintains two canvases:
 * - Main canvas: for visible rendering
 * - Hit canvas: for mouse/touch interaction detection
 * 
 * @extends Container
 */
export declare class Layer extends Container {
  /** Node type identifier */
  readonly nodeType: 'Layer';
  
  /** Main rendering canvas */
  readonly canvas: Canvas;
  
  /** Hit detection canvas (1:1 pixel ratio) */
  readonly hitCanvas: HitCanvas;
  
  /** Flag indicating if layer is waiting for next animation frame draw */
  private _waitingForDraw: boolean;

  /**
   * Creates a new Layer instance
   * @param config - Layer configuration options
   */
  constructor(config?: LayerConfig);

  /**
   * Creates a PNG stream from the layer canvas (Node.js only)
   * @returns PNG data stream
   */
  createPNGStream(): NodeJS.ReadableStream;

  /**
   * Gets the main rendering canvas
   * @returns The layer's canvas instance
   */
  getCanvas(): Canvas;

  /**
   * Gets the native canvas element
   * @returns The underlying HTML canvas element
   */
  getNativeCanvasElement(): HTMLCanvasElement;

  /**
   * Gets the hit detection canvas
   * @returns The layer's hit canvas instance
   */
  getHitCanvas(): HitCanvas;

  /**
   * Gets the 2D rendering context
   * @returns The canvas 2D context
   */
  getContext(): Context;

  /**
   * Clears the layer canvases
   * @param bounds - Optional bounds to clear (clears entire canvas if omitted)
   * @returns The layer instance for chaining
   */
  clear(bounds?: Partial<Size & Point>): this;

  /**
   * Sets the z-index (stacking order) of the layer
   * @param index - New z-index value
   * @returns The layer instance for chaining
   */
  setZIndex(index: number): this;

  /**
   * Moves the layer to the top of the stack
   * @returns True if successful
   */
  moveToTop(): boolean;

  /**
   * Moves the layer up one position in the stack
   * @returns True if successful
   */
  moveUp(): boolean;

  /**
   * Moves the layer down one position in the stack
   * @returns True if successful
   */
  moveDown(): boolean;

  /**
   * Moves the layer to the bottom of the stack
   * @returns True if successful
   */
  moveToBottom(): boolean;

  /**
   * Gets the layer instance (returns self)
   * @returns This layer
   */
  getLayer(): this;

  /**
   * Removes the layer from its parent stage
   * @returns The layer instance for chaining
   */
  remove(): this;

  /**
   * Gets the parent stage
   * @returns The stage containing this layer
   */
  getStage(): Stage | undefined;

  /**
   * Sets the layer size
   * @param size - Width and height dimensions
   * @returns The layer instance for chaining
   */
  setSize(size: Size): this;

  /**
   * Validates if a node can be added to this layer
   * Only Groups and Shapes are allowed
   * @param child - Node to validate
   * @throws Error if node type is invalid
   */
  protected _validateAdd(child: Container | Shape): void;

  /**
   * Converts the layer to a Konva canvas
   * @param options - Canvas conversion options
   * @returns Canvas instance with rendered content
   */
  protected _toKonvaCanvas(options?: ToCanvasOptions): Canvas;

  /**
   * Updates canvas visibility based on layer visibility
   * @private
   */
  private _checkVisibility(): void;

  /**
   * Applies image smoothing setting to rendering context
   * @private
   */
  private _setSmoothEnabled(): void;

  /**
   * Gets the layer width from parent stage
   * @returns Width in pixels
   */
  getWidth(): number | undefined;

  /**
   * Attempts to set width (not allowed - logs warning)
   * Width is controlled by parent stage
   * @deprecated Use stage.width() instead
   */
  setWidth(): void;

  /**
   * Gets the layer height from parent stage
   * @returns Height in pixels
   */
  getHeight(): number | undefined;

  /**
   * Attempts to set height (not allowed - logs warning)
   * Height is controlled by parent stage
   * @deprecated Use stage.height() instead
   */
  setHeight(): void;

  /**
   * Schedules a draw on the next animation frame
   * Batches multiple draw calls into a single render
   * @returns The layer instance for chaining
   */
  batchDraw(): this;

  /**
   * Gets the shape at the specified position
   * Uses hit canvas to detect which shape was clicked
   * @param point - Screen coordinates to test
   * @returns The topmost interactive shape at the position, or null
   */
  getIntersection(point: Point): Shape | null;

  /**
   * Internal intersection detection with anti-aliasing support
   * @param point - Coordinates to test
   * @returns Intersection result with shape or anti-aliasing flag
   * @private
   */
  private _getIntersection(point: Point): IntersectionResult;

  /**
   * Draws the layer's visible content
   * @param canvas - Optional canvas to draw to (uses own canvas if omitted)
   * @param top - Optional top node to start drawing from
   * @returns The layer instance for chaining
   */
  drawScene(canvas?: Canvas, top?: Container): this;

  /**
   * Draws the hit detection graph
   * @param canvas - Optional hit canvas to draw to
   * @param top - Optional top node to start drawing from
   * @returns The layer instance for chaining
   */
  drawHit(canvas?: HitCanvas, top?: Container): this;

  /**
   * Enables hit graph rendering
   * @returns The layer instance for chaining
   */
  enableHitGraph(): this;

  /**
   * Disables hit graph rendering
   * @returns The layer instance for chaining
   */
  disableHitGraph(): this;

  /**
   * Sets hit graph enabled state
   * @param enabled - Whether hit graph should be enabled
   * @deprecated Use layer.listening() instead
   */
  setHitGraphEnabled(enabled: boolean): void;

  /**
   * Gets hit graph enabled state
   * @returns Whether hit graph is enabled
   * @deprecated Use layer.listening() instead
   */
  getHitGraphEnabled(): boolean;

  /**
   * Toggles visibility of the hit canvas (for debugging)
   * Shows/hides the hit detection canvas overlay
   */
  toggleHitCanvas(): void;

  // Property accessors

  /**
   * Gets or sets image smoothing enabled state
   * @param enabled - Optional value to set
   * @returns Current value if no parameter, otherwise the layer instance
   */
  imageSmoothingEnabled(): boolean;
  imageSmoothingEnabled(enabled: boolean): this;

  /**
   * Gets or sets clear before draw behavior
   * @param clear - Optional value to set
   * @returns Current value if no parameter, otherwise the layer instance
   */
  clearBeforeDraw(): boolean;
  clearBeforeDraw(clear: boolean): this;

  /**
   * Gets or sets hit graph enabled state
   * @param enabled - Optional value to set
   * @returns Current value if no parameter, otherwise the layer instance
   */
  hitGraphEnabled(): boolean;
  hitGraphEnabled(enabled: boolean): this;

  // Event handlers

  /**
   * Fired before the layer is drawn
   * @event beforeDraw
   * @param event - Event data containing the layer node
   */
  on(event: 'beforeDraw', handler: (event: LayerEvent) => void): this;

  /**
   * Fired after the layer is drawn
   * @event draw
   * @param event - Event data containing the layer node
   */
  on(event: 'draw', handler: (event: LayerEvent) => void): this;

  /**
   * Fired when layer visibility changes
   * @event visibleChange
   */
  on(event: 'visibleChange.konva', handler: () => void): this;

  /**
   * Fired when image smoothing setting changes
   * @event imageSmoothingEnabledChange
   */
  on(event: 'imageSmoothingEnabledChange.konva', handler: () => void): this;
}