/**
 * Module: MovePointRequest
 * Original ID: 428701
 * Exports: MovePointRequest
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * Request class for moving points in 2D sketch operations.
 * Extends the base MovePointRequest to provide specialized filtering for roof drawing sketches.
 */
export declare class MovePointRequest extends HSApp.ExtraordinarySketch2d.Request.MovePointRequest {
  /**
   * Creates an instance of MovePointRequest.
   */
  constructor();

  /**
   * Gets the topological tag used for filtering face elements in roof drawing sketches.
   * @returns The region topological tag from the Roofs Drawing Sketch 2D Builder.
   */
  getFilterFaceTopoTag(): typeof HSCore.Model.RoofsDrawingSketch2dBuilder.RegionTopoTag;
}