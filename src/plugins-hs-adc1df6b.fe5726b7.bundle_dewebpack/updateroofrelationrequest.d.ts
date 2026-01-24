/**
 * Module: UpdateRoofRelationRequest
 * Request class for updating roof relationship data in the transaction system.
 */

import { HSCore } from './path-to-hscore';

/**
 * Represents a roof entity with an identifier
 */
interface Roof {
  /** Unique identifier of the roof */
  id?: string;
}

/**
 * Represents a drawing region associated with a roof
 */
interface DrawingRegion {
  /** ID of the associated roof */
  roofId: string;
}

/**
 * Represents a relation between a roof and its drawing region
 */
interface RoofRelation {
  /** The roof entity */
  roof: Roof;
  /** The drawing region associated with this roof */
  drawingRegion: DrawingRegion;
}

/**
 * Parameters required to initialize UpdateRoofRelationRequest
 */
interface UpdateRoofRelationRequestParams {
  /** Array of roof relations to be updated */
  relations: RoofRelation[];
}

/**
 * Transaction request for updating roof relationships.
 * Extends the base StateRequest from HSCore transaction system.
 * 
 * This class handles the commit logic for updating associations between
 * roofs and their corresponding drawing regions.
 */
export declare class UpdateRoofRelationRequest extends HSCore.Transaction.Common.StateRequest {
  /** Internal storage for request parameters */
  private _params: UpdateRoofRelationRequestParams;

  /**
   * Creates a new UpdateRoofRelationRequest instance
   * @param params - Parameters containing roof relations to update
   */
  constructor(params: UpdateRoofRelationRequestParams);

  /**
   * Commits the transaction by updating all roof IDs in drawing regions.
   * Iterates through all relations and synchronizes roof IDs to their drawing regions.
   * @returns void
   */
  onCommit(): void;

  /**
   * Determines if the request can participate in field-level transactions
   * @returns Always returns true, indicating this request supports field transactions
   */
  canTransactField(): boolean;
}