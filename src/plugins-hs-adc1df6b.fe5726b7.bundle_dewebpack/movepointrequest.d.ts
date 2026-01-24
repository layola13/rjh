/**
 * Module: MovePointRequest
 * Original ID: 887979
 * Exports: MovePointRequest
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * Request class for moving points in 2D outdoor drawing sketches.
 * Extends the base MovePointRequest from ExtraordinarySketch2d.
 */
export declare class MovePointRequest extends HSApp.ExtraordinarySketch2d.Request.MovePointRequest {
  /**
   * Creates an instance of MovePointRequest.
   */
  constructor();

  /**
   * Retrieves the face topology tag filter used for outdoor drawing sketch operations.
   * 
   * @returns The FaceTopoTag from the OutdoorDrawingSketch2dBuilder model.
   */
  getFilterFaceTopoTag(): typeof HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag;
}