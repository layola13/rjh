/**
 * Roof transaction and plugin command identifiers for the HSW (Home Space Workshop) system.
 * This module defines all available roof-related operations including creation, modification,
 * deletion, and drawing utilities.
 * 
 * @module RoofTransactionTypes
 */

/**
 * Drawing operation commands for the RoofsDrawing plugin.
 * These commands handle various geometric drawing operations for roof creation.
 */
export interface RoofsDrawingCommands {
  /** Draw lines command identifier */
  DrawLines: string;
  /** Draw rectangle command identifier */
  DrawRectangle: string;
  /** Draw circle command identifier */
  DrawCircle: string;
  /** Draw regular polygon command identifier */
  DrawRegularPolygon: string;
  /** Draw polygon command identifier */
  DrawPolygon: string;
  /** Add split point to roof geometry command identifier */
  AddSplitPoint: string;
  /** Add guide line for alignment command identifier */
  AddGuideLine: string;
  /** Delete guide line command identifier */
  DeleteGuideLine: string;
  /** Draw fillet (rounded corner) command identifier */
  DrawFillet: string;
  /** Delete vertex from roof geometry command identifier */
  DeleteVertex: string;
  /** Move curve command identifier */
  MoveCurve: string;
  /** Move point command identifier */
  MovePoint: string;
  /** Update roof relation command identifier */
  UpdateRoofRelation: string;
  /** Delete roof region command identifier */
  DeleteRoofRegion: string;
}

/**
 * Complete set of roof transaction command identifiers.
 * This interface defines all available operations for roof management in the HSW system.
 */
export interface RoofTransactionCommands {
  /** Add a new roof transaction identifier */
  AddRoof: string;
  /** End roof preview mode transaction identifier */
  EndRoofPreview: string;
  /** Change roof parameters transaction identifier */
  ChangeRoofParam: string;
  /** Toggle roof generation on/off transaction identifier */
  ToggleGenerateRoof: string;
  /** Replace existing roof transaction identifier */
  ReplaceRoof: string;
  /** Delete roof transaction identifier */
  DeleteRoof: string;
  /** Update roof direction transaction identifier */
  UpdateRoofDirection: string;
  /** Clear roof face material transaction identifier */
  ClearRoofFaceMaterial: string;
  /** Reset roof face material to default transaction identifier */
  ResetRoofFaceMaterial: string;
  /** Nested drawing commands for roof geometry operations */
  RoofsDrawing: RoofsDrawingCommands;
}

/**
 * Frozen constant object containing all roof transaction command identifiers.
 * This object is immutable and serves as the single source of truth for command strings.
 */
declare const roofTransactionCommands: Readonly<RoofTransactionCommands>;

export default roofTransactionCommands;