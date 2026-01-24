import { Container } from "./container";
import { ValueAndUnit } from "../valueAndUnit";
import { Control } from "./control";
import { Observer } from "core/Misc/observable";

/**
 * Represents a cell information stored in the grid's tag system
 */
export interface CellInfo {
  /** The cell identifier in format "row:column" */
  tag: string;
}

/**
 * Grid control for organizing child controls in rows and columns.
 * Extends Container to provide a flexible layout system with configurable
 * row and column definitions that can use pixel or percentage-based sizing.
 */
export class Grid extends Container {
  /** The name identifier for this grid instance */
  name: string;

  /** Internal storage for row definitions */
  private _rowDefinitions: ValueAndUnit[];

  /** Observers monitoring changes to row definitions */
  private _rowDefinitionObservers: Observer<ValueAndUnit>[];

  /** Internal storage for column definitions */
  private _columnDefinitions: ValueAndUnit[];

  /** Observers monitoring changes to column definitions */
  private _columnDefinitionObservers: Observer<ValueAndUnit>[];

  /** Map of cell containers keyed by "row:column" format */
  private _cells: Record<string, Container>;

  /** Array of all child controls added to the grid */
  private _childControls: Control[];

  /**
   * Gets the total number of columns in the grid
   */
  get columnCount(): number;

  /**
   * Gets the total number of rows in the grid
   */
  get rowCount(): number;

  /**
   * Gets the array of all child controls
   */
  get children(): Control[];

  /**
   * Gets the map of cell containers
   */
  get cells(): Record<string, Container>;

  /**
   * Creates a new Grid instance
   * @param name - The name identifier for this grid
   */
  constructor(name?: string);

  /**
   * Retrieves the row definition at the specified index
   * @param index - The zero-based row index
   * @returns The ValueAndUnit definition or null if index is out of bounds
   */
  getRowDefinition(index: number): ValueAndUnit | null;

  /**
   * Retrieves the column definition at the specified index
   * @param index - The zero-based column index
   * @returns The ValueAndUnit definition or null if index is out of bounds
   */
  getColumnDefinition(index: number): ValueAndUnit | null;

  /**
   * Adds a new row definition to the grid
   * @param value - The size value (percentage 0-1 or pixel count)
   * @param isPixel - If true, value is in pixels; otherwise percentage (default: false)
   * @returns This grid instance for method chaining
   */
  addRowDefinition(value: number, isPixel?: boolean): this;

  /**
   * Adds a new column definition to the grid
   * @param value - The size value (percentage 0-1 or pixel count)
   * @param isPixel - If true, value is in pixels; otherwise percentage (default: false)
   * @returns This grid instance for method chaining
   */
  addColumnDefinition(value: number, isPixel?: boolean): this;

  /**
   * Updates an existing row definition
   * @param index - The zero-based row index to modify
   * @param value - The new size value
   * @param isPixel - If true, value is in pixels; otherwise percentage (default: false)
   * @returns This grid instance for method chaining
   */
  setRowDefinition(index: number, value: number, isPixel?: boolean): this;

  /**
   * Updates an existing column definition
   * @param index - The zero-based column index to modify
   * @param value - The new size value
   * @param isPixel - If true, value is in pixels; otherwise percentage (default: false)
   * @returns This grid instance for method chaining
   */
  setColumnDefinition(index: number, value: number, isPixel?: boolean): this;

  /**
   * Retrieves all child controls in a specific cell
   * @param row - The row index
   * @param column - The column index
   * @returns Array of controls in the cell or null if cell doesn't exist
   */
  getChildrenAt(row: number, column: number): Control[] | null;

  /**
   * Gets the cell information (row:column tag) for a child control
   * @param control - The control to query
   * @returns The cell info or undefined if control is not in the grid
   */
  getChildCellInfo(control: Control): CellInfo | undefined;

  /**
   * Removes a cell container and its children from the grid
   * @param cell - The cell container to remove
   * @param cellKey - The cell key in "row:column" format
   * @internal
   */
  private _removeCell(cell: Container | undefined, cellKey: string): void;

  /**
   * Moves a cell from one position to another (used during row/column removal)
   * @param newKey - The new cell key in "row:column" format
   * @param oldKey - The old cell key in "row:column" format
   * @internal
   */
  private _offsetCell(newKey: string, oldKey: string): void;

  /**
   * Removes a column definition and all controls in that column
   * @param index - The zero-based column index to remove
   * @returns This grid instance for method chaining
   */
  removeColumnDefinition(index: number): this;

  /**
   * Removes a row definition and all controls in that row
   * @param index - The zero-based row index to remove
   * @returns This grid instance for method chaining
   */
  removeRowDefinition(index: number): this;

  /**
   * Adds a control to the grid at the specified cell position
   * @param control - The control to add
   * @param row - The row index (default: 0)
   * @param column - The column index (default: 0)
   * @returns This grid instance for method chaining
   */
  addControl(control: Control, row?: number, column?: number): this;

  /**
   * Removes a control from the grid
   * @param control - The control to remove
   * @returns This grid instance for method chaining
   */
  removeControl(control: Control): this;

  /**
   * Gets the type name of this control
   * @returns "Grid"
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * Computes the grid layout dimensions and executes a callback with the results
   * @param callback - Function receiving column offsets, row offsets, column widths, and row heights
   * @internal
   */
  private _getGridDefinitions(
    callback: (
      columnOffsets: number[],
      rowOffsets: number[],
      columnWidths: number[],
      rowHeights: number[]
    ) => void
  ): void;

  /**
   * Performs additional processing after measure phase
   * @param parentMeasure - The parent container's measurements
   * @param context - The rendering context
   * @internal
   */
  protected _additionalProcessing(parentMeasure: unknown, context: unknown): void;

  /**
   * Flags all descendant cells as needing matrix recalculation
   * @internal
   */
  protected _flagDescendantsAsMatrixDirty(): void;

  /**
   * Renders highlight grid lines for debugging/editing
   * @param context - The 2D rendering context
   * @internal
   */
  protected _renderHighlightSpecific(context: CanvasRenderingContext2D): void;

  /**
   * Disposes of the grid and all its resources
   */
  dispose(): void;

  /**
   * Serializes the grid configuration to a JSON object
   * @param serializationObject - The target object to populate with serialized data
   */
  serialize(serializationObject: unknown): void;

  /**
   * Parses grid configuration from serialized content
   * @param serializedObject - The serialized grid data
   * @param host - The host context
   * @internal
   */
  protected _parseFromContent(serializedObject: unknown, host: unknown): void;
}