import { HSCore } from './path-to-hscore';

/**
 * Transaction for applying Z-index template values to multiple entities
 * and rebuilding layer holes.
 */
export default class ApplyZIndexTemplateTransaction extends HSCore.Transaction.Common.StateRequest {
  /**
   * The template entity containing the Z-index value to apply
   */
  templateEntity: HSCore.Model.Entity;

  /**
   * The collection of entities to apply the template Z-index to
   */
  entities: HSCore.Model.Entity[];

  /**
   * Creates a new ApplyZIndexTemplateTransaction
   * @param templateEntity - The source entity with the Z-index to copy
   * @param entities - Target entities that will receive the Z-index value
   */
  constructor(templateEntity: HSCore.Model.Entity, entities: HSCore.Model.Entity[]);

  /**
   * Commits the transaction by applying Z-index changes and notifying parent
   */
  onCommit(): void;

  /**
   * Determines if this field can be included in a transaction
   * @returns Always returns true for Z-index operations
   */
  canTransactField(): boolean;

  /**
   * Internal method that applies the Z-index from template to all entities
   * and triggers hole rebuilding on the parent layer if applicable
   * @private
   */
  private _apply(): void;
}