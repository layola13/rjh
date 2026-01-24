/**
 * Module: DeleteStructureRequest
 * Provides request handling for deleting structure entities in the HSCore system.
 */

import { HSCore } from './HSCore';

/**
 * Represents a structure entity that can be deleted.
 * Should include properties and methods related to the structure lifecycle.
 */
export interface IStructure {
  /**
   * Deletes the structure from the system.
   */
  delete(): void;
}

/**
 * Request class for handling structure deletion operations.
 * Extends the base StateRequest class to provide transactional deletion behavior.
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 *