import { HSCore } from './path-to-hscore';

/**
 * Request to end roof preview mode.
 * This transaction removes preview parameters from a roof object.
 */
export declare class EndRoofPreviewRequest extends HSCore.Transaction.Request {
  /**
   * The roof object whose preview mode will be ended.
   */
  readonly roof: Roof;

  /**
   * Creates a new EndRoofPreviewRequest.
   * @param roof - The roof object to end preview for
   */
  constructor(roof: Roof);

  /**
   * Called when the transaction is committed.
   * Clears the preview parameters from the roof.
   * @returns The modified roof object
   */
  onCommit(): Roof;

  /**
   * Called when the transaction is undone.
   * Restores preview parameters as an empty object.
   */
  onUndo(): void;

  /**
   * Called when the transaction is redone.
   * Clears the preview parameters from the roof again.
   */
  onRedo(): void;
}

/**
 * Roof object with optional preview parameters.
 */
interface Roof {
  /**
   * Preview parameters for the roof.
   * When undefined, the roof is not in preview mode.
   */
  previewParams?: Record<string, unknown>;
}