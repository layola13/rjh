/**
 * Request class for handling molding autofit state changes.
 * Manages undo/redo operations and entity synchronization.
 * 
 * @module ChangeMoldingAutofitRequest
 */

import { HSCore } from './HSCore';

/**
 * Interface representing an entity with autofit capabilities.
 */
interface IAutofitEntity {
  /** Determines whether the molding automatically fits to adjacent elements */
  autoFit: boolean;
  
  /** 
   * Marks neighboring moldings as requiring recalculation based on face type.
   * Called when autofit state changes to trigger updates in connected elements.
   */
  dirtyNeighborMoldingsByFacetype(): void;
}

/**
 * Request class for managing molding autofit property changes.
 * Extends the base StateRequest to provide undo/redo functionality
 * for autofit toggle operations.
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class ChangeMoldingAutofitRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The molding entity whose autofit property is being modified.
   */
  entity: IAutofitEntity;

  /**
   * Creates a new ChangeMoldingAutofitRequest instance.
   * 
   * @param entity - The molding entity to be modified
   */
  constructor(entity: IAutofitEntity);

  /**
   * Updates the entity's autofit property and triggers neighbor recalculation.
   * 
   * @param autoFit - The new autofit state to apply
   */
  changeAutoFit(autoFit: boolean): void;

  /**
   * Handles incoming request messages for autofit changes.
   * 
   * @param action - The action type identifier
   * @param value - The new autofit value to apply
   * @returns True if the action was handled, false otherwise
   */
  onReceive(action: string, value: boolean): boolean;

  /**
   * Executes undo operation, reverting the autofit change.
   * Triggers neighbor molding recalculation after state restoration.
   */
  onUndo(): void;

  /**
   * Executes redo operation, reapplying the autofit change.
   * Triggers neighbor molding recalculation after state reapplication.
   */
  onRedo(): void;
}