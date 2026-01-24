import { HSCore } from './HSCore';

/**
 * Request to delete a roof region from the scene.
 * Extends the base StateRequest class to handle roof region deletion transactions.
 */
export declare class DeleteRoofRegionRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The roof region instance to be deleted
   */
  readonly roofRegion: unknown;

  /**
   * Creates a new delete roof region request
   * @param roofRegion - The roof region object to be removed
   */
  constructor(roofRegion: unknown);

  /**
   * Executes the deletion operation when the transaction is committed.
   * Removes the roof region from the scene and calls the parent onCommit implementation.
   * @param args - Additional arguments passed to the commit operation
   */
  onCommit(...args: unknown[]): void;

  /**
   * Determines whether this transaction can modify fields.
   * @returns Always returns true, indicating field transactions are allowed
   */
  canTransactField(): boolean;
}