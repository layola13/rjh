/**
 * MultiLine control module for Babylon.js GUI
 * Provides functionality for drawing multi-segment lines connecting points in 2D space
 */

import { AbstractMesh } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control.js";
import { MultiLinePoint } from "../../../lts/gui/dist/2D/multiLinePoint.js";

/**
 * Represents a point coordinate in 2D space
 */
export interface IPoint2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Union type for valid point inputs when adding to MultiLine
 */
export type MultiLinePointInput = AbstractMesh | Control | IPoint2D;

/**
 * MultiLine control class for drawing connected line segments in Babylon.js GUI
 * Extends the base Control class to provide multi-point line rendering capabilities
 */
export class MultiLine extends Control {
  /** Control name */
  name: string;

  /** Line width in pixels */
  private _lineWidth: number;

  /** Dash pattern array for dashed lines */
  private _dash: number[];

  /** Array of points defining the line segments */
  private _points: MultiLinePoint[];

  /** Minimum X coordinate of all points */
  private _minX: number | null;

  /** Minimum Y coordinate of all points */
  private _minY: number | null;

  /** Maximum X coordinate of all points */
  private _maxX: number | null;

  /** Maximum Y coordinate of all points */
  private _maxY: number | null;

  /** Callback triggered when any point is updated */
  onPointUpdate: () => void;

  /** Whether size is automatically calculated */
  private _automaticSize: boolean;

  /**
   * Creates a new MultiLine control
   * @param name - The name of the control
   */
  constructor(name: string);

  /**
   * Gets the dash pattern for the line
   * @returns Array of numbers defining dash pattern [dash length, gap length, ...]
   */
  get dash(): number[];

  /**
   * Sets the dash pattern for the line
   * @param value - Array of numbers defining dash pattern
   */
  set dash(value: number[]);

  /**
   * Gets the line width in pixels
   * @returns The current line width
   */
  get lineWidth(): number;

  /**
   * Sets the line width in pixels
   * @param value - The new line width
   */
  set lineWidth(value: number);

  /**
   * Horizontal alignment setter (no-op for MultiLine)
   * @param value - Alignment value
   */
  set horizontalAlignment(value: number);

  /**
   * Vertical alignment setter (no-op for MultiLine)
   * @param value - Alignment value
   */
  set verticalAlignment(value: number);

  /**
   * Gets or creates a MultiLinePoint at the specified index
   * @param index - The index of the point to retrieve
   * @returns The MultiLinePoint at the specified index
   */
  getAt(index: number): MultiLinePoint;

  /**
   * Adds multiple points to the line
   * @param points - Variable number of point inputs (mesh, control, or coordinates)
   * @returns Array of created MultiLinePoint instances
   */
  add(...points: MultiLinePointInput[]): MultiLinePoint[];

  /**
   * Pushes a single point to the end of the line
   * @param point - A mesh, control, or coordinate object to add
   * @returns The created MultiLinePoint instance
   */
  push(point?: MultiLinePointInput): MultiLinePoint;

  /**
   * Removes a point from the line
   * @param pointOrIndex - Either a MultiLinePoint instance or an index number
   */
  remove(pointOrIndex: MultiLinePoint | number): void;

  /**
   * Removes all points from the line
   */
  reset(): void;

  /**
   * Resets all links (mesh/control references) for all points
   */
  resetLinks(): void;

  /**
   * Gets the type name of this control
   * @returns "MultiLine"
   * @internal
   */
  _getTypeName(): string;

  /**
   * Draws the multi-line on the canvas context
   * @param context - The 2D rendering context
   * @internal
   */
  _draw(context: CanvasRenderingContext2D): void;

  /**
   * Performs additional processing to calculate bounds
   * Translates all points and updates min/max coordinates
   * @internal
   */
  _additionalProcessing(): void;

  /**
   * Measures the control dimensions based on point bounds
   * @internal
   */
  _measure(): void;

  /**
   * Computes the alignment and position of the control
   * @internal
   */
  _computeAlignment(): void;

  /**
   * Disposes of the control and all its points
   */
  dispose(): void;
}