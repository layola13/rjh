/**
 * Line module for 2D sketching in HSApp
 * Original Module ID: 306817
 */

import { HSApp } from './518193';
import { EdgeUtil } from './948827';

/**
 * Custom 2D line view class that extends the base Line2d class.
 * Handles rendering and styling of line entities in SVG context.
 */
export class Line extends HSApp.View.SVG.ExtraordinarySketch2d.Line2d {
  /**
   * Creates a new Line instance
   * @param param1 - First constructor parameter (context or parent)
   * @param param2 - Second constructor parameter (model or config)
   * @param param3 - Third constructor parameter (additional options)
   * @param param4 - Fourth constructor parameter (controller config)
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ) {
    super(param1, param2, param3, param4, new Line2dController(param4, param1));
  }

  /**
   * Updates the visual style of the line element.
   * Applies special styling for background topology lines.
   * @protected
   */
  protected _updateStyle(): void {
    super._updateStyle();
    
    // Apply thicker stroke for background topology lines
    if (this.entity.srcModel.topos.includes('background')) {
      this.element[0].attr({
        'stroke-width': 2.4
      });
    }
  }

  /**
   * Handles changes to entity flags.
   * Synchronizes point flags for background topology lines.
   * @param flag - The flag value that changed
   * @protected
   */
  protected onFlagChanged(flag: unknown): void {
    super.onFlagChanged(flag);
    
    const entity = this.entity;
    if (entity.srcModel.topos.includes('background')) {
      EdgeUtil.syncPointsFlag(entity, flag);
    }
  }
}

/**
 * Controller class for 2D line interactions.
 * Manages user interactions and command generation for line editing.
 */
class Line2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Line2dController {
  /**
   * Returns the command type for move operations on this line.
   * @returns The command type constant for moving curves in slab editing
   * @protected
   */
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.SlabEdit.MoveCurve;
  }
}

/**
 * Global constants for command types
 */
declare global {
  const HSFPConstants: {
    CommandType: {
      SlabEdit: {
        MoveCurve: string;
      };
    };
  };
}