/**
 * Toggle Ceiling Request
 * 
 * A transaction request that handles toggling the ceiling state of a room.
 * When the ceiling is turned off, it removes all ceiling-attached content from the room.
 * 
 * @module ToggleCeilingRequest
 */

import type { Transaction, Model, Constants } from 'HSCore';
import type { Catalog } from 'HSCatalog';
import type { App } from 'HSApp';

/**
 * Request that toggles ceiling visibility for a room.
 * 
 * When ceiling is turned off, this request:
 * - Removes all ceiling-attached content items from the specified room
 * - Updates the room's ceiling flag state
 * 
 * @extends HSCore.Transaction.Request
 */
export default class ToggleCeilingRequest extends Transaction.Request {
  /**
   * The room whose ceiling state is being toggled
   * @private
   */
  private readonly _room: Model.Room;

  /**
   * Whether the ceiling should be turned on
   * @private
   */
  private readonly _isCeilingOn: boolean;

  /**
   * Creates a new toggle ceiling request
   * 
   * @param room - The room to modify
   * @param isCeilingOn - True to turn ceiling on, false to turn it off
   */
  constructor(room: Model.Room, isCeilingOn: boolean);

  /**
   * Commits the ceiling toggle operation.
   * 
   * When ceiling is turned off, iterates through all floor plan content and:
   * - Identifies ceiling-attached items within the target room
   * - Creates delete requests for those items
   * - Appends them to the transaction
   * 
   * Finally, updates the room's ceilingOff flag.
   * 
   * @returns Empty array (inherited return type from parent class)
   */
  onCommit(): unknown[];
}