import { Observable } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control.js";
import { Measure } from "../../../lts/gui/dist/2D/measure.js";
import { Matrix2D } from "../../../lts/gui/dist/2D/math2D.js";
import { DynamicTexture, Texture, Constants, Logger, Tools } from "babylonjs";
import { Nullable } from "core/types";

/**
 * Represents a gradient background for container controls
 */
export interface IBackgroundGradient {
  /** Serializes the gradient configuration */
  serialize(target: any): void;
  /** Parses gradient configuration from serialized data */
  parse(source: any): void;
  /** Gets the canvas gradient object for rendering */
  getCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;
  /** The class name of the gradient implementation */
  className: string;
}

/**
 * Serialized container configuration
 */
export interface IContainerSerializedData {
  /** Whether to render to intermediate texture */
  renderToIntermediateTexture?: boolean;
  /** Maximum layout cycle iterations */
  maxLayoutCycle?: number;
  /** Whether to adapt height to children */
  adaptHeightToChildren?: boolean;
  /** Whether to adapt width to children */
  adaptWidthToChildren?: boolean;
  /** Background color */
  background?: string;
  /** Background gradient configuration */
  backgroundGradient?: {
    className: string;
    [key: string]: any;
  };
  /** Serialized children controls */
  children?: any[];
  [key: string]: any;
}

/**
 * Container control that can hold and manage child controls.
 * Provides layout management, background rendering, and hierarchical control organization.
 */
export declare class Container extends Control {
  /** The name of the container */
  name: string;

  /**
   * Gets or sets whether the container should render to an intermediate texture.
   * This can improve performance for complex containers with many children.
   */
  renderToIntermediateTexture: boolean;

  /**
   * Gets or sets whether the container should automatically adjust its height
   * to fit all children controls.
   */
  adaptHeightToChildren: boolean;

  /**
   * Gets or sets whether the container should automatically adjust its width
   * to fit all children controls.
   */
  adaptWidthToChildren: boolean;

  /**
   * Gets or sets the background color of the container.
   * Can be any valid CSS color string.
   */
  background: string;

  /**
   * Gets or sets the background gradient of the container.
   * Takes precedence over solid background color if set.
   */
  backgroundGradient: Nullable<IBackgroundGradient>;

  /**
   * Gets the array of child controls contained in this container.
   * @readonly
   */
  readonly children: Control[];

  /**
   * Gets or sets whether the container and its children are read-only.
   * When set, propagates the read-only state to all children.
   */
  isReadOnly: boolean;

  /**
   * Maximum number of layout cycle iterations before stopping.
   * Prevents infinite loops in complex layouts.
   * @default 3
   */
  maxLayoutCycle: number;

  /**
   * Whether to log errors when maximum layout cycles are exceeded.
   * @default false
   */
  logLayoutCycleErrors: boolean;

  /**
   * Observable triggered when a control is added to the container.
   */
  onControlAddedObservable: Observable<Control>;

  /**
   * Observable triggered when a control is removed from the container.
   */
  onControlRemovedObservable: Observable<Control>;

  /**
   * Creates a new Container instance.
   * @param name - The name identifier for the container
   */
  constructor(name?: string);

  /**
   * Gets the type name of this control.
   * @returns "Container"
   */
  protected _getTypeName(): string;

  /**
   * Marks all descendant controls as needing matrix recalculation.
   * @internal
   */
  _flagDescendantsAsMatrixDirty(): void;

  /**
   * Finds a child control by its name.
   * @param name - The name of the child control to find
   * @returns The found control or null if not found
   */
  getChildByName(name: string): Nullable<Control>;

  /**
   * Finds a child control by its type name.
   * @param name - The name parameter (unused in current implementation)
   * @param typeName - The type name of the control to find
   * @returns The found control or null if not found
   */
  getChildByType(name: string, typeName: string): Nullable<Control>;

  /**
   * Checks if this container contains the specified control.
   * @param control - The control to check for
   * @returns True if the control is a direct child of this container
   */
  containsControl(control: Control): boolean;

  /**
   * Adds a control as a child of this container.
   * @param control - The control to add
   * @returns This container for chaining
   */
  addControl(control: Nullable<Control>): this;

  /**
   * Removes all child controls from this container.
   * @returns This container for chaining
   */
  clearControls(): this;

  /**
   * Removes a specific control from this container.
   * @param control - The control to remove
   * @returns This container for chaining
   */
  removeControl(control: Control): this;

  /**
   * Reorders a control in the children array based on its zIndex.
   * @param control - The control to reorder
   * @internal
   */
  _reOrderControl(control: Control): void;

  /**
   * Offsets the left position of this container and all children.
   * @param offset - The offset amount in pixels
   * @internal
   */
  _offsetLeft(offset: number): void;

  /**
   * Offsets the top position of this container and all children.
   * @param offset - The offset amount in pixels
   * @internal
   */
  _offsetTop(offset: number): void;

  /**
   * Marks this container and all children as dirty, requiring re-render.
   * @internal
   */
  _markAllAsDirty(): void;

  /**
   * Gets the background color or gradient for rendering.
   * @param context - The canvas rendering context
   * @returns A CSS color string or CanvasGradient
   * @internal
   */
  _getBackgroundColor(context: CanvasRenderingContext2D): string | CanvasGradient;

  /**
   * Draws the container's background (color or gradient).
   * @param context - The canvas rendering context
   * @internal
   */
  _localDraw(context: CanvasRenderingContext2D): void;

  /**
   * Links this container and all children to a host AdvancedDynamicTexture.
   * @param host - The host texture
   * @internal
   */
  _link(host: any): void;

  /**
   * Hook called before layout calculations begin.
   * Can be overridden in subclasses for custom pre-layout logic.
   * @internal
   */
  _beforeLayout(): void;

  /**
   * Processes measurements and updates intermediate texture if needed.
   * @param parentMeasure - The parent container's measurements
   * @param context - The canvas rendering context
   * @internal
   */
  _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;

  /**
   * Performs layout calculations for this container and all children.
   * Handles adaptive sizing and layout cycle detection.
   * @param parentMeasure - The parent container's measurements
   * @param context - The canvas rendering context
   * @returns True if layout was performed
   * @internal
   */
  _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;

  /**
   * Hook called after measurements are complete.
   * Can be overridden in subclasses for post-measurement logic.
   * @internal
   */
  _postMeasure(): void;

  /**
   * Draws this container and all children to the canvas.
   * @param context - The canvas rendering context
   * @param invalidatedRectangle - Optional rectangle defining the invalid region
   * @internal
   */
  _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;

  /**
   * Recursively collects all descendant controls.
   * @param results - Array to populate with descendants
   * @param directDescendantsOnly - If true, only includes immediate children
   * @param predicate - Optional filter function for controls
   */
  getDescendantsToRef(
    results: Control[],
    directDescendantsOnly?: boolean,
    predicate?: (control: Control) => boolean
  ): void;

  /**
   * Processes pointer picking for this container and children.
   * @param x - X coordinate in pixels
   * @param y - Y coordinate in pixels
   * @param pi - Pointer info object
   * @param type - Pointer event type
   * @param pointerId - Unique pointer identifier
   * @param buttonIndex - Mouse button index
   * @param deltaX - Delta X for pointer move
   * @param deltaY - Delta Y for pointer move
   * @returns True if the pointer intersects this control or a child
   * @internal
   */
  _processPicking(
    x: number,
    y: number,
    pi: any,
    type: number,
    pointerId: number,
    buttonIndex: number,
    deltaX?: number,
    deltaY?: number
  ): boolean;

  /**
   * Performs additional processing after standard control processing.
   * Copies current measure to children measure.
   * @param parentMeasure - The parent container's measurements
   * @param context - The canvas rendering context
   * @internal
   */
  _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;

  /**
   * Serializes the container configuration to an object.
   * @param serializationObject - Object to populate with serialized data
   */
  serialize(serializationObject: IContainerSerializedData): void;

  /**
   * Disposes of the container and all children, releasing resources.
   */
  dispose(): void;

  /**
   * Parses container configuration from serialized data.
   * @param serializedObject - The serialized container data
   * @param host - The host AdvancedDynamicTexture
   * @internal
   */
  _parseFromContent(serializedObject: IContainerSerializedData, host: any): void;

  /**
   * Checks if the container and all children are ready for rendering.
   * @returns True if ready, false otherwise
   */
  isReady(): boolean;

  /**
   * Parses a serialized container and creates a new instance.
   * @param serializedObject - The serialized container data
   * @param host - The host AdvancedDynamicTexture
   * @returns A new Container instance
   */
  static Parse(serializedObject: IContainerSerializedData, host: any): Container;
}