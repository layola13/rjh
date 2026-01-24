import { Container } from './container';
import { ValueAndUnit } from '../valueAndUnit';
import { Control } from './control';
import { Observer } from 'core/Misc/observable';

/**
 * Represents a cell container within the Grid control
 */
interface GridCell {
  children: Control[];
  left: string;
  top: string;
  width: string;
  height: string;
  horizontalAlignment: number;
  verticalAlignment: number;
  _left: { ignoreAdaptiveScaling: boolean };
  _top: { ignoreAdaptiveScaling: boolean };
  _width: { ignoreAdaptiveScaling: boolean };
  _height: { ignoreAdaptiveScaling: boolean };
  _markMatrixAsDirty(): void;
  addControl(control: Control): void;
  removeControl(control: Control): void;
}

/**
 * Serialized grid data structure
 */
interface SerializedGrid {
  columnCount: number;
  rowCount: number;
  columns: Array<{ value: number; unit: number }>;
  rows: Array<{ value: number; unit: number }>;
  tags: string[];
}

/**
 * Grid control for organizing child controls in rows and columns
 * @extends Container
 */
export declare class Grid extends Container {
  /**
   * Creates a new Grid instance
   * @param name - The name of the grid control
   */
  constructor(name?: string);

  /**
   * Gets the number of columns in the grid
   * @readonly
   */
  get columnCount(): number;

  /**
   * Gets the number of rows in the grid
   * @readonly
   */
  get rowCount(): number;

  /**
   * Gets all child controls contained in the grid
   * @readonly
   */
  get children(): Control[];

  /**
   * Gets the dictionary of cells indexed by "row:column" keys
   * @readonly
   */
  get cells(): Record<string, GridCell>;

  /**
   * Retrieves the row definition at the specified index
   * @param index - The zero-based row index
   * @returns The ValueAndUnit defining the row height, or null if index is out of bounds
   */
  getRowDefinition(index: number): ValueAndUnit | null;

  /**
   * Retrieves the column definition at the specified index
   * @param index - The zero-based column index
   * @returns The ValueAndUnit defining the column width, or null if index is out of bounds
   */
  getColumnDefinition(index: number): ValueAndUnit | null;

  /**
   * Adds a new row definition to the grid
   * @param value - The height value (pixels or percentage based on isPixel parameter)
   * @param isPixel - If true, value is in pixels; if false, value is a percentage (default: false)
   * @returns The Grid instance for method chaining
   */
  addRowDefinition(value: number, isPixel?: boolean): this;

  /**
   * Adds a new column definition to the grid
   * @param value - The width value (pixels or percentage based on isPixel parameter)
   * @param isPixel - If true, value is in pixels; if false, value is a percentage (default: false)
   * @returns The Grid instance for method chaining
   */
  addColumnDefinition(value: number, isPixel?: boolean): this;

  /**
   * Updates an existing row definition
   * @param index - The zero-based row index to update
   * @param value - The new height value
   * @param isPixel - If true, value is in pixels; if false, value is a percentage (default: false)
   * @returns The Grid instance for method chaining
   */
  setRowDefinition(index: number, value: number, isPixel?: boolean): this;

  /**
   * Updates an existing column definition
   * @param index - The zero-based column index to update
   * @param value - The new width value
   * @param isPixel - If true, value is in pixels; if false, value is a percentage (default: false)
   * @returns The Grid instance for method chaining
   */
  setColumnDefinition(index: number, value: number, isPixel?: boolean): this;

  /**
   * Gets all child controls at the specified grid cell
   * @param row - The zero-based row index
   * @param column - The zero-based column index
   * @returns Array of controls in the cell, or null if cell doesn't exist
   */
  getChildrenAt(row: number, column: number): Control[] | null;

  /**
   * Retrieves the cell location tag for a given control
   * @param control - The control to query
   * @returns The cell tag in "row:column" format
   */
  getChildCellInfo(control: Control): string;

  /**
   * Removes a column definition and all controls in that column
   * @param index - The zero-based column index to remove
   * @returns The Grid instance for method chaining
   */
  removeColumnDefinition(index: number): this;

  /**
   * Removes a row definition and all controls in that row
   * @param index - The zero-based row index to remove
   * @returns The Grid instance for method chaining
   */
  removeRowDefinition(index: number): this;

  /**
   * Adds a control to the grid at the specified position
   * @param control - The control to add
   * @param row - The zero-based row index (default: 0)
   * @param column - The zero-based column index (default: 0)
   * @returns The Grid instance for method chaining
   */
  addControl(control: Control, row?: number, column?: number): this;

  /**
   * Removes a control from the grid
   * @param control - The control to remove
   * @returns The Grid instance for method chaining
   */
  removeControl(control: Control): this;

  /**
   * Serializes the grid configuration to a plain object
   * @param serializationObject - The object to populate with serialized data
   */
  serialize(serializationObject: SerializedGrid): void;

  /**
   * Disposes of the grid and all its resources
   */
  dispose(): void;

  /**
   * Internal: Gets the type name for serialization
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * Internal: Calculates grid layout dimensions
   * @internal
   */
  protected _getGridDefinitions(
    callback: (
      columnOffsets: number[],
      rowOffsets: number[],
      columnSizes: number[],
      rowSizes: number[]
    ) => void
  ): void;

  /**
   * Internal: Performs additional processing after measure phase
   * @internal
   */
  protected _additionalProcessing(parentMeasure: any, context: any): void;

  /**
   * Internal: Flags descendant controls as needing matrix recalculation
   * @internal
   */
  protected _flagDescendantsAsMatrixDirty(): void;

  /**
   * Internal: Renders grid highlight visualization
   * @internal
   */
  protected _renderHighlightSpecific(context: CanvasRenderingContext2D): void;

  /**
   * Internal: Parses grid configuration from serialized data
   * @internal
   */
  protected _parseFromContent(serializedObject: SerializedGrid, host: any): void;

  /**
   * Internal: Removes a cell and its controls
   * @internal
   */
  private _removeCell(cell: Container | undefined, cellKey: string): void;

  /**
   * Internal: Moves a cell to a new grid position
   * @internal
   */
  private _offsetCell(newKey: string, oldKey: string): void;

  /** Internal row definitions */
  private _rowDefinitions: ValueAndUnit[];
  
  /** Internal observers for row definition changes */
  private _rowDefinitionObservers: Observer<ValueAndUnit>[];
  
  /** Internal column definitions */
  private _columnDefinitions: ValueAndUnit[];
  
  /** Internal observers for column definition changes */
  private _columnDefinitionObservers: Observer<ValueAndUnit>[];
  
  /** Internal cell storage indexed by "row:column" keys */
  private _cells: Record<string, Container>;
  
  /** Internal array of all child controls */
  private _childControls: Control[];
}