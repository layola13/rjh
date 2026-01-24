/**
 * Filler screen tool module
 * Provides functionality for managing screen-type fillers in a drawing/design application
 */

import { FillersTool } from './FillersTool';
import { ShapeType } from './constants';

/**
 * Interface representing a filler object that can be drawn
 */
export interface IFiller {
  /**
   * Draws the filler on the specified view
   * @param view - The view context to render the filler on
   */
  draw(view: unknown): void;
}

/**
 * Interface representing an object that can change filler types
 */
export interface IFillerTypeChanger {
  /**
   * Changes the type of a filler to a screen type
   * @param filler - The target filler to change
   * @param shapeType - The shape type to change to (should be Screen)
   * @returns The modified filler object, or null if the operation failed
   */
  changeFillerType(filler: unknown, shapeType: ShapeType): IFiller | null;
}

/**
 * Tool for managing screen-type fillers
 * Extends the base FillersTool with screen-specific functionality
 */
export declare class FillerScreenTool extends FillersTool {
  /**
   * Creates an instance of FillerScreenTool
   */
  constructor();

  /**
   * Changes a filler to screen type and redraws it
   * @param changer - Object that performs the filler type change operation
   * @param filler - The filler object to be changed to screen type
   */
  changeFillerType(changer: IFillerTypeChanger, filler: unknown): void;

  /**
   * The view context used for rendering
   */
  protected view: unknown;
}