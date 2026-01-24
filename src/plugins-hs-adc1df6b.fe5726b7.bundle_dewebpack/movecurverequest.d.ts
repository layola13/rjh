/**
 * Module: MoveCurveRequest
 * Original ID: 596224
 * Exports: MoveCurveRequest
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * Request class for moving curves in outdoor drawing sketch 2D context.
 * Extends the base MoveCurveRequest from HSApp extraordinary sketch functionality.
 */
export declare class MoveCurveRequest extends HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest {
  /**
   * Creates an instance of MoveCurveRequest.
   */
  constructor();

  /**
   * Retrieves the filter for face topology tags used in outdoor drawing sketch operations.
   * 
   * @returns The FaceTopoTag constant from the OutdoorDrawingSketch2dBuilder model
   */
  getFilterFaceTopoTag(): typeof HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag;
}