/**
 * Babylon.js GUI StackPanel Control
 * A container that arranges its children in a vertical or horizontal stack
 */

/**
 * Direction mode for stack panel layout
 */
export enum StackPanelOrientation {
  /** Arrange children vertically from top to bottom */
  Vertical,
  /** Arrange children horizontally from left to right */
  Horizontal
}

/**
 * Text wrapping modes for TextBlock controls
 */
export enum TextWrapping {
  /** No text wrapping, text will be clipped */
  Clip,
  /** Wrap text to next line */
  Wrap
}

/**
 * Alignment constants for controls
 */
export enum ControlAlignment {
  /** Align to top edge */
  VERTICAL_ALIGNMENT_TOP,
  /** Align to left edge */
  HORIZONTAL_ALIGNMENT_LEFT
}

/**
 * Represents a measurement unit that can be in pixels or percentage
 */
export interface ValueAndUnit {
  /** The numeric value */
  value: number;
  /** The unit type (px, %, etc) */
  unit: string;
  /** Whether this value represents a percentage */
  isPercentage: boolean;
  /** Whether to ignore adaptive scaling */
  ignoreAdaptiveScaling: boolean;
  /** Convert to string representation */
  toString(host?: any): string;
  /** Parse from string and return true if changed */
  fromString(value: string): boolean;
}

/**
 * Represents a 2D measurement rectangle
 */
export interface Measure {
  /** Left position in pixels */
  left: number;
  /** Top position in pixels */
  top: number;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** Copy values from another measure */
  copyFrom(other: Measure): void;
}

/**
 * Base control interface
 */
export interface IControl {
  /** Control name */
  name: string;
  /** Unique identifier */
  uniqueId: number;
  /** Whether control is visible */
  isVisible: boolean;
  /** Whether control should not be rendered */
  notRenderable: boolean;
  /** Top position */
  top: string | number;
  /** Left position */
  left: string | number;
  /** Vertical alignment */
  verticalAlignment: number;
  /** Horizontal alignment */
  horizontalAlignment: number;
  /** Width value */
  _width: ValueAndUnit;
  /** Height value */
  _height: ValueAndUnit;
  /** Top internal value */
  _top: ValueAndUnit;
  /** Left internal value */
  _left: ValueAndUnit;
  /** Current measurement */
  _currentMeasure: Measure;
  /** Padding top in pixels */
  _paddingTopInPixels: number;
  /** Padding bottom in pixels */
  _paddingBottomInPixels: number;
  /** Padding left in pixels */
  _paddingLeftInPixels: number;
  /** Padding right in pixels */
  _paddingRightInPixels: number;
  /** Whether size is automatic */
  _automaticSize: boolean;
  /** Get the control's class name */
  getClassName(): string;
}

/**
 * TextBlock-specific interface
 */
export interface ITextBlock extends IControl {
  /** Text wrapping mode */
  textWrapping: TextWrapping;
  /** Force resize width */
  forceResizeWidth: boolean;
}

/**
 * Host context for GUI controls
 */
export interface IAdvancedDynamicTexture {
  /** Get ideal width for measurements */
  getIdealWidth(): number;
  /** Get ideal height for measurements */
  getIdealHeight(): number;
}

/**
 * Serialization metadata
 */
export interface ISerializedStackPanel {
  /** Whether width was manually set */
  manualWidth: boolean;
  /** Whether height was manually set */
  manualHeight: boolean;
  /** Spacing between children */
  spacing?: number;
  /** Whether stack is vertical */
  isVertical?: boolean;
  /** Whether to ignore layout warnings */
  ignoreLayoutWarnings?: boolean;
  [key: string]: any;
}

/**
 * Base container class that StackPanel extends
 */
export declare class Container {
  /** Control name */
  name: string;
  /** Child controls */
  protected _children: IControl[];
  /** Width value */
  protected _width: ValueAndUnit;
  /** Height value */
  protected _height: ValueAndUnit;
  /** Host texture */
  protected _host: IAdvancedDynamicTexture;
  /** Current measurement */
  protected _currentMeasure: Measure;
  /** Measurement for children */
  protected _measureForChildren: Measure;
  /** Whether layout needs rebuild */
  protected _rebuildLayout: boolean;
  /** Padding top in pixels */
  protected _paddingTopInPixels: number;
  /** Padding bottom in pixels */
  protected _paddingBottomInPixels: number;
  /** Padding left in pixels */
  protected _paddingLeftInPixels: number;
  /** Padding right in pixels */
  protected _paddingRightInPixels: number;
  
  /**
   * Creates a new container
   * @param name - The container name
   */
  constructor(name?: string);
  
  /**
   * Mark container as dirty to trigger re-render
   */
  protected _markAsDirty(): void;
  
  /**
   * Pre-measurement processing
   * @param parentMeasure - Parent container measurements
   * @param context - Rendering context
   */
  protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
  
  /**
   * Additional processing after pre-measurement
   * @param parentMeasure - Parent container measurements
   * @param context - Rendering context
   */
  protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
  
  /**
   * Post-measurement processing
   */
  protected _postMeasure(): void;
  
  /**
   * Serialize container to JSON
   * @param serializationObject - Object to serialize into
   */
  serialize(serializationObject: any): void;
  
  /**
   * Parse container from serialized content
   * @param serializedObject - Serialized data
   * @param host - Host texture
   */
  protected _parseFromContent(serializedObject: any, host: IAdvancedDynamicTexture): void;
  
  /** Whether to adapt height to children */
  adaptHeightToChildren: boolean;
  
  /** Whether to adapt width to children */
  adaptWidthToChildren: boolean;
}

/**
 * StackPanel - A container control that stacks its children vertically or horizontally
 * Automatically arranges child controls in a single row or column with optional spacing
 */
export declare class StackPanel extends Container {
  /**
   * Whether to ignore layout warnings (e.g., percentage sizes in incompatible orientations)
   * @defaultValue false
   */
  ignoreLayoutWarnings: boolean;
  
  /**
   * Whether children are stacked vertically (true) or horizontally (false)
   */
  private _isVertical: boolean;
  
  /**
   * Whether width was manually set by user
   */
  private _manualWidth: boolean;
  
  /**
   * Whether height was manually set by user
   */
  private _manualHeight: boolean;
  
  /**
   * Flag to prevent tracking manual dimension changes during internal updates
   */
  private _doNotTrackManualChanges: boolean;
  
  /**
   * Space between children in pixels
   */
  private _spacing: number;
  
  /**
   * Creates a new StackPanel
   * @param name - The panel name
   */
  constructor(name?: string);
  
  /**
   * Gets whether the stack panel arranges children vertically
   * @returns True if vertical, false if horizontal
   */
  get isVertical(): boolean;
  
  /**
   * Sets whether the stack panel arranges children vertically
   * @param value - True for vertical layout, false for horizontal
   */
  set isVertical(value: boolean);
  
  /**
   * Gets the spacing between children in pixels
   * @returns Spacing value in pixels
   */
  get spacing(): number;
  
  /**
   * Sets the spacing between children in pixels
   * @param value - Spacing in pixels
   */
  set spacing(value: number);
  
  /**
   * Gets the width of the panel as a string (e.g., "200px" or "50%")
   * @returns Width as formatted string
   */
  get width(): string;
  
  /**
   * Sets the width of the panel
   * @param value - Width as string (e.g., "200px", "50%", "auto")
   */
  set width(value: string);
  
  /**
   * Gets the height of the panel as a string (e.g., "200px" or "50%")
   * @returns Height as formatted string
   */
  get height(): string;
  
  /**
   * Sets the height of the panel
   * @param value - Height as string (e.g., "200px", "50%", "auto")
   */
  set height(value: string);
  
  /**
   * Gets the control type name
   * @returns "StackPanel"
   */
  protected _getTypeName(): string;
  
  /**
   * Pre-measurement: Set child alignments based on stack orientation
   * @param parentMeasure - Parent container measurements
   * @param context - Rendering context
   */
  protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
  
  /**
   * Additional processing: Prepare measurement area for children
   * @param parentMeasure - Parent container measurements
   * @param context - Rendering context
   */
  protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
  
  /**
   * Post-measurement: Calculate and apply child positions and auto-sizing
   * Positions children in a stack and auto-adjusts panel size if not manually set
   */
  protected _postMeasure(): void;
  
  /**
   * Serialize the stack panel to JSON
   * @param serializationObject - Object to populate with serialized data
   */
  serialize(serializationObject: ISerializedStackPanel): void;
  
  /**
   * Parse stack panel from serialized data
   * @param serializedObject - Serialized stack panel data
   * @param host - Host advanced dynamic texture
   */
  protected _parseFromContent(serializedObject: ISerializedStackPanel, host: IAdvancedDynamicTexture): void;
}

/**
 * Register the StackPanel class with Babylon's class registry
 * Enables deserialization and scene loading
 */
export function RegisterClass(className: string, classConstructor: typeof StackPanel): void;