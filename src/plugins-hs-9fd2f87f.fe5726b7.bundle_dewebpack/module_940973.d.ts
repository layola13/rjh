import { HSCore } from './path/to/HSCore';

/**
 * Light slot state request transaction
 * Handles self-host light band generation and deletion for light slots
 */
export default class LightSlotStateRequest extends HSCore.Transaction.Common.StateRequest {
  /** The light slot instance to operate on */
  private readonly _lightSlot: LightSlot | null;
  
  /** Whether the light band should be checked/enabled */
  private readonly _checked: boolean;

  /**
   * Creates a new light slot state request transaction
   * @param lightSlot - The light slot to modify, or null if none
   * @param checked - True to generate light band, false to delete it
   */
  constructor(lightSlot: LightSlot | null, checked: boolean);

  /**
   * Executes the light band generation or deletion request
   * Marks geometry as dirty if the operation succeeds
   */
  doRequest(): void;

  /**
   * Commits the transaction by executing the request
   * Calls parent class onCommit after execution
   * @param args - Additional commit arguments (unused)
   */
  onCommit(...args: unknown[]): void;

  /**
   * Indicates whether this transaction can handle field changes
   * @returns Always returns true
   */
  canTransactField(): boolean;
}

/**
 * Represents a light slot that can generate or delete self-host light bands
 */
interface LightSlot {
  /**
   * Generates a self-host light band for this slot
   * @returns True if generation succeeded, false otherwise
   */
  generateSelfHostLightBand(): boolean;

  /**
   * Deletes the self-host light band from this slot
   * @returns True if deletion succeeded, false otherwise
   */
  deleteSelfHostLightBand(): boolean;

  /**
   * Marks the geometry associated with this light slot as dirty
   * Triggers a re-render or recalculation
   */
  dirtyGeometry(): void;
}