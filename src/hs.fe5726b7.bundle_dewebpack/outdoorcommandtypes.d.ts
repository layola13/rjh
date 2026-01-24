/**
 * Outdoor command types module
 * Defines command identifiers for outdoor drawing operations
 * @module OutdoorCommandTypes
 */

/**
 * Command identifiers for outdoor drawing operations
 * All commands are prefixed with "hsw.plugin.OutdoorDrawing"
 */
export interface OutdoorDrawingCommands {
  /** Command to draw multiple connected lines */
  readonly DrawLines: string;
  
  /** Command to draw a rectangle shape */
  readonly DrawRectangle: string;
  
  /** Command to draw polygon shapes with arbitrary vertices */
  readonly DrawPolygons: string;
  
  /** Command to draw a regular polygon (equal sides and angles) */
  readonly DrawRegularPolygon: string;
  
  /** Command to draw a circle */
  readonly DrawCircle: string;
  
  /** Command to add split points to existing geometry */
  readonly AddSplitPoints: string;
  
  /** Command to add guide lines for drawing assistance */
  readonly AddGuideLines: string;
  
  /** Command to clear all guide lines */
  readonly ClearGuideLines: string;
  
  /** Command to create filleted (rounded) corners */
  readonly DrawFillet: string;
  
  /** Command to delete a vertex from geometry */
  readonly DeleteVertex: string;
  
  /** Command to move face elements */
  readonly MoveFaces: string;
  
  /** Command to move curve elements */
  readonly MoveCurve: string;
  
  /** Command to move a single point */
  readonly MovePoint: string;
}

/**
 * Container for all outdoor command types
 */
export interface OutdoorCommandTypesCollection {
  /** Collection of outdoor drawing command identifiers */
  readonly OutdoorDrawing: OutdoorDrawingCommands;
}

/**
 * Frozen collection of outdoor command type identifiers
 * @constant
 */
export declare const OutdoorCommandTypes: OutdoorCommandTypesCollection;