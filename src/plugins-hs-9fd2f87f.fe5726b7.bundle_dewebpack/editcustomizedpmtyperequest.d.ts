import { HSCore } from './path/to/HSCore';

/**
 * Request class for editing customized PM (Payment Method) types.
 * Extends the base StateRequest to handle payment method type modifications.
 */
export declare class EditCustomizedPMTypeRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The entity being edited
   * @private
   */
  private _entity: unknown;

  /**
   * The content type for the entity
   * @private
   */
  private _contentType: unknown;

  /**
   * Creates an instance of EditCustomizedPMTypeRequest
   * @param entity - The entity to be edited
   * @param contentType - The content type to be applied
   */
  constructor(entity: unknown, contentType: unknown);

  /**
   * Callback invoked when the transaction is committed.
   * Updates the entity's content type and triggers the parent onCommit.
   */
  onCommit(): void;

  /**
   * Determines whether a field can be transacted.
   * @returns Always returns true for this request type
   */
  canTransactField(): boolean;
}