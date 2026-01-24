/**
 * Module: ChangeMoldingOffsetRequest
 * Handles the transaction request for changing molding offset in the HSCore system.
 * Manages undo/redo operations and geometry updates for baseboard and cornice entities.
 */

import { HSCore } from './HSCore';

/**
 * Transaction request class for changing molding offset.
 * Extends the base StateRequest to handle molding offset modifications,
 * including geometry updates and neighbor molding invalidation.
 */
export declare class ChangeMoldingOffsetRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The molding entity (Baseboard or Cornice) whose offset is being changed.
   */
  entity: HSCore.Model.Baseboard | HSCore.Model.Cornice;

  /**
   * Creates a new ChangeMoldingOffsetRequest.
   * @param entity - The molding entity to modify
   */
  constructor(entity: HSCore.Model.Baseboard | HSCore.Model.Cornice);

  /**
   * Handles the reception of the offset change command.
   * 
   * For Baseboards:
   * - Updates the entity offset
   * - Removes existing holes and creates new ones based on offset
   * - Updates host face mix paint and geometry
   * 
   * For Cornices:
   * - Validates offset against Z-axis limits for each topoPather
   * - Splits cornice if some topoPathers become invalid
   * - Auto-connects resulting cornice segments
   * 
   * @param command - The command type (expected: "changeOffset")
   * @param newOffset - The new offset value to apply
   * @returns True if the operation succeeds, void if delegated to parent
   */
  onReceive(command: string, newOffset: number): boolean | void;

  /**
   * Handles undo operation.
   * Invalidates neighbor moldings by face type after reverting the offset change.
   */
  onUndo(): void;

  /**
   * Handles redo operation.
   * Invalidates neighbor moldings by face type after reapplying the offset change.
   */
  onRedo(): void;

  /**
   * Determines if this transaction can modify entity fields.
   * @returns Always returns true, indicating field transactions are allowed
   */
  canTransactField(): boolean;
}