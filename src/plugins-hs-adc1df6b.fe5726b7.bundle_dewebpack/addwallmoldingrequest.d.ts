/**
 * Module: AddWallMoldingRequest
 * Request class for adding wall molding to a design
 */

import { AddFaceMoldingRequest } from './AddFaceMoldingRequest';

/**
 * Request class for adding wall molding
 * Extends AddFaceMoldingRequest to handle wall-specific molding operations
 */
export declare class AddWallMoldingRequest extends AddFaceMoldingRequest {
  /**
   * Creates a new AddWallMoldingRequest instance
   * @param param1 - First parameter passed to parent AddFaceMoldingRequest constructor
   * @param param2 - Second parameter passed to parent AddFaceMoldingRequest constructor
   * @param param3 - Third parameter passed to parent AddFaceMoldingRequest constructor
   */
  constructor(param1: unknown, param2: unknown, param3: unknown);

  /**
   * Called when the request is committed/executed
   * Overrides parent implementation to provide wall-specific commit behavior
   * @returns void
   */
  onCommit(): void;
}