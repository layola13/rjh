/**
 * Simple line drawing tool for creating line shapes through drag interactions.
 * Extends the base drag-draw tool functionality to handle line creation.
 * 
 * @module SimpleLineTool
 * @since 1.0.0
 */

import { Vector } from './Vector';
import { Point } from './Point';
import { DragDrawTool } from './DragDrawTool';
import { SimpleLineCreator } from './SimpleLineCreator';
import { ShapeManager } from './ShapeManager';
import { View } from './View';

/**
 * Represents a simple line shape that can be added to the view.
 */
export interface SimpleLine {
  /** The starting point of the line */
  pt: Point;
  
  /** The name/identifier of the line */
  name: string;
  
  /**
   * Translates the line by the given vector.
   * @param vector - The translation vector
   */
  translate(vector: Vector): void;
}

/**
 * Tool for drawing simple lines through drag interactions.
 * 
 * When the user completes a drag operation, this tool creates a new simple line
 * from the starting point to the current cursor position and adds it to the view's
 * shape manager.
 * 
 * @extends DragDrawTool
 * @example
 *