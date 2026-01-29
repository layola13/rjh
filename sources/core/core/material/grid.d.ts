/**
 * Grid module - Defines grid configuration and behavior for the canvas
 */

import { Entity } from './Entity';

/**
 * Enum for grid-related flags
 */
export enum GridFlagEnum {
  /** Flag to toggle grid visibility off */
  toggleOff = 256
}

/**
 * Grid entity that manages canvas grid display and spacing
 * Extends the base Entity class to provide grid-specific functionality
 */
export class Grid extends Entity {
  /** Width of the grid in pixels */
  width: number;
  
  /** Height of the grid in pixels */
  height: number;
  
  /** Spacing between grid lines in pixels */
  space: number;
  
  /** Frequency of major grid lines (e.g., every Nth line is a major line) */
  MajorLineEveryNthGridLine: number;

  /**
   * Creates a new Grid instance
   * @param id - Unique identifier for the grid entity (default: empty string)
   * @param parent - Optional parent entity reference
   */
  constructor(id: string = "", parent?: Entity) {
    super(id, parent);
    this.width = HSConstants.Constants.Canvas_Width;
    this.height = HSConstants.Constants.Canvas_Height;
    this.space = HSConstants.Constants.Grid_Spacing;
    this.MajorLineEveryNthGridLine = HSConstants.Constants.Major_Lines_Every_Nth_Grid_Line;
  }

  /**
   * Determines if the grid entity can be selected
   * @returns Always returns false as grids are not selectable
   */
  canSelect(): boolean {
    return false;
  }
}

// Register the Grid class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgGrid, Grid);