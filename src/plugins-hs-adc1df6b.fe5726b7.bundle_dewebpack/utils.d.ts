/**
 * Utility class for geometric and roof-related operations
 * @module Utils
 */

import { Loop } from './Loop';
import { ENParamRoofType } from './ENParamRoofType';

/**
 * Represents a 2D curve interface
 */
export interface ICurve2D {
  /**
   * Checks if the curve is a 2D line
   */
  isLine2d(): boolean;
  
  /**
   * Gets the length of the curve
   */
  getLength(): number;
  
  /**
   * Checks if this curve equals another curve
   */
  equals(other: ICurve2D): boolean;
}

/**
 * Represents a geometric loop with curves
 */
export interface ILoop {
  /**
   * Gets all curves in the loop
   */
  getAllCurves(): ICurve2D[];
}

/**
 * HSCore utility namespace for roof operations
 */
declare namespace HSCore {
  namespace Util {
    namespace Roof {
      /**
       * Gets the initial curves from a collection of curves
       */
      function getInitialCurves(curves: ICurve2D[]): ICurve2D[];
    }
  }
}

/**
 * Utility class providing geometric and roof-related helper methods
 */
export declare class Utils {
  /**
   * Sorts loop curves by roof type to ensure proper orientation
   * 
   * @param loop - The geometric loop containing curves to sort
   * @param roofType - The type of roof (HerringBone, SaltBox, BoxGable, Pitched, etc.)
   * @returns A new Loop with curves sorted according to the roof type
   * 
   * @remarks
   * - For HerringBone, SaltBox, and BoxGable: reverses last 3 curves if first curve is longer than second
   * - For Pitched roofs: uses HSCore.Util.Roof.getInitialCurves to find the longest initial curve
   * - For other types: finds the longest curve (prioritizing lines) and rotates the array to start from it
   */
  static sortLoopByType(loop: ILoop, roofType: ENParamRoofType): Loop;
}