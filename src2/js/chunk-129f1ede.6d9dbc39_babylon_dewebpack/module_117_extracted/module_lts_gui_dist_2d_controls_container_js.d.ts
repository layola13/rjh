import { Observable } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control.js";
import { Measure } from "../../../lts/gui/dist/2D/measure.js";
import { Matrix2D } from "../../../lts/gui/dist/2D/math2D.js";
import { DynamicTexture, Texture, Constants, Logger, Tools, serialize, RegisterClass } from "core";

/**
 * Represents a container control that can hold and manage child controls in a 2D GUI
 */
export declare class Container extends Control {
  /**
   * The name of the container
   */
  name: string;

  /**
   * Maximum number of layout cycles before warning about potential infinite loops
   * @default 3
   */
  maxLayoutCycle: number;

  /**
   * Whether to log errors when layout cycle limit is exceeded
   * @default false
   */
  logLayoutCycleErrors: boolean;

  /**
   * Observable triggered when a control is added to this container
   */
  readonly onControlAddedObservable: Observable<Control>;

  /**
   * Observable triggered when a control is removed from this container
   */
  readonly onControlRemovedObservable: Observable<Control>;

  /**
   * Gets or sets whether to render the container to an intermediate texture
   * Useful for applying effects or optimizing rendering
   */
  renderToIntermediateTexture: boolean;

  /**
   * Gets or sets whether the container height should adapt to fit its children
   * When true, height will automatically adjust to accommodate child controls
   */
  adaptHeightToChildren: boolean;

  /**
   * Gets or sets whether the container width should adapt to fit its children
   * When true, width will automatically adjust to accommodate child controls
   */
  adaptWidthToChildren: boolean;

  /**
   * Gets or sets the background color of the container
   * Can be any valid CSS color string
   */
  background: string;

  /**
   * Gets or sets the background gradient of the container
   * Takes precedence over solid background color when set
   */
  backgroundGradient: any | null;

  /**
   * Gets the array of child controls contained in this container
   * @readonly
   */
  readonly children: Control[];

  /**
   * Gets or sets whether the container and its children are read-only
   * When set, propagates the read-only state to all child controls
   */
  isReadOnly: boolean;

  /**
   * Creates a new Container instance
   * @param name - The name identifier for this container
   */
  constructor(name?: string);

  /**
   * Gets the type name of this control
   * @returns "Container"
   */
  protected _getTypeName(): string;

  /**
   * Marks all descendant controls as needing matrix recalculation
   * @internal
   */
  protected _flagDescendantsAsMatrixDirty(): void;

  /**
   * Finds a child control by its name
   * @param name - The name of the control to find
   * @returns The matching control or null if not found
   */
  getChildByName(name: string): Control | null;

  /**
   * Finds a child control by its type name
   * @param type - The type identifier (unused in current implementation)
   * @param typeName - The type name to match
   * @returns The matching control or null if not found
   */
  getChildByType(type: string, typeName: string): Control | null;

  /**
   * Checks if a control is a direct child of this container
   * @param control - The control to check
   * @returns True if the control is a child of this container
   */
  containsControl(control: Control): boolean;

  /**
   * Adds a control to this container
   * @param control - The control to add
   * @returns This container instance for method chaining
   */
  addControl(control: Control): this;

  /**
   * Removes all child controls from this container
   * @returns This container instance for method chaining
   */
  clearControls(): this;

  /**
   * Removes a specific control from this container
   * @param control - The control to remove
   * @returns This container instance for method chaining
   */
  removeControl(control: Control): this;

  /**
   * Reorders a control within the container based on its zIndex
   * @param control - The control to reorder
   * @internal
   */
  protected _reOrderControl(control: Control): void;

  /**
   * Offsets the left position of this container and all its children
   * @param offset - The pixel offset to apply
   * @internal
   */
  protected _offsetLeft(offset: number): void;

  /**
   * Offsets the top position of this container and all its children
   * @param offset - The pixel offset to apply
   * @internal
   */
  protected _offsetTop(offset: number): void;

  /**
   * Marks this container and all its children as dirty, requiring re-render
   * @internal
   */
  protected _markAllAsDirty(): void;

  /**
   * Gets the background color or gradient for rendering
   * @param context - The canvas rendering context
   * @returns Canvas gradient or color string
   * @internal
   */
  protected _getBackgroundColor(context: CanvasRenderingContext2D): string | CanvasGradient;

  /**
   * Draws the container's background
   * @param context - The canvas rendering context
   * @internal
   */
  protected _localDraw(context: CanvasRenderingContext2D): void;

  /**
   * Links this container and all its children to a host GUI system
   * @param host - The host GUI advanced dynamic texture
   * @internal
   */
  protected _link(host: any): void;

  /**
   * Called before layout calculations
   * Override this method to perform custom pre-layout logic
   * @internal
   */
  protected _beforeLayout(): void;

  /**
   * Processes measurements for this container
   * @param parentMeasure - The parent's measurements
   * @param context - The canvas rendering context
   * @internal
   */
  protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;

  /**
   * Performs layout calculations for this container and its children
   * @param parentMeasure - The parent's measurements
   * @param context - The canvas rendering context
   * @returns True if layout was performed
   * @internal
   */
  protected _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;

  /**
   * Called after measurements are complete
   * Override this method to perform custom post-measurement logic
   * @internal
   */
  protected _postMeasure(): void;

  /**
   * Draws this container and all its visible children
   * @param context - The canvas rendering context
   * @param invalidatedRectangle - Optional rectangle defining the area to redraw
   * @internal
   */
  protected _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void;

  /**
   * Recursively collects all descendant controls
   * @param results - Array to populate with descendant controls
   * @param directDescendantsOnly - If true, only includes immediate children
   * @param predicate - Optional filter function to apply to each control
   */
  getDescendantsToRef(
    results: Control[],
    directDescendantsOnly?: boolean,
    predicate?: (control: Control) => boolean
  ): void;

  /**
   * Processes pointer picking/interaction for this container and its children
   * @param x - The x coordinate in pixels
   * @param y - The y coordinate in pixels
   * @param pi - Pointer info object
   * @param type - Event type
   * @param pointerId - Pointer identifier
   * @param buttonIndex - Mouse button index
   * @param deltaX - Delta X movement
   * @param deltaY - Delta Y movement
   * @returns True if picking was handled
   * @internal
   */
  protected _processPicking(
    x: number,
    y: number,
    pi: any,
    type: number,
    pointerId: number,
    buttonIndex: number,
    deltaX: number,
    deltaY: number
  ): boolean;

  /**
   * Performs additional processing after base control processing
   * @param parentMeasure - The parent's measurements
   * @param context - The canvas rendering context
   * @internal
   */
  protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;

  /**
   * Serializes this container and its children to a JSON object
   * @param serializationObject - The object to serialize into
   */
  serialize(serializationObject: any): void;

  /**
   * Disposes of this container and all its children, releasing resources
   */
  dispose(): void;

  /**
   * Parses container data from a serialized object
   * @param serializedObject - The serialized data
   * @param host - The host GUI system
   * @internal
   */
  protected _parseFromContent(serializedObject: any, host: any): void;

  /**
   * Checks if this container and all its children are ready for rendering
   * @returns True if all controls are ready
   */
  isReady(): boolean;
}