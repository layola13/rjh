/**
 * Point module for roof drawing functionality
 * Extends the HSApp 2D sketching system with roof-specific point handling
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 2D Point class for roof drawing
 * Extends the base Point2d class with roof-specific move controller
 */
export declare class Point extends HSApp.View.SVG.ExtraordinarySketch2d.Point2d {
  /**
   * Creates a new Point instance
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param z - Z coordinate
   * @param context - Drawing context or parent element
   */
  constructor(x: number, y: number, z: number, context: unknown);
}

/**
 * Controller for handling point movement in roof drawing mode
 * Overrides the base Point2dController to use roof-specific move commands
 */
declare class Point2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Point2dController {
  /**
   * Returns the command type for moving points in roof drawing context
   * @returns The roof drawing move point command type
   */
  protected _getMoveCmdType(): HSFPConstants.CommandType.RoofsDrawing.MovePoint;
}

/**
 * Type definitions for HSApp namespace
 */
declare namespace HSApp {
  namespace View {
    namespace SVG {
      namespace ExtraordinarySketch2d {
        /**
         * Base 2D point class
         */
        class Point2d {
          constructor(x: number, y: number, z: number, context: unknown, controller: Point2dController);
        }

        /**
         * Base controller for 2D point operations
         */
        class Point2dController {
          constructor(context: unknown, point: Point2d);
          protected _getMoveCmdType(): unknown;
        }
      }
    }
  }
}

/**
 * Type definitions for HSFPConstants namespace
 */
declare namespace HSFPConstants {
  namespace CommandType {
    namespace RoofsDrawing {
      /**
       * Command type constant for moving points in roof drawing
       */
      const MovePoint: unique symbol;
    }
  }
}