import type { WindowEntity } from './WindowEntity';
import type { WindowSill } from './WindowSill';

/**
 * Request to apply geometry material to window sill.
 * Handles undo/redo operations for applying template entity's sill configuration to multiple entities.
 */
export declare class ApplyGeometryMaterialToSillRequest extends HSCore.Transaction.Request {
  /**
   * The template entity whose sill configuration will be applied to other entities.
   */
  readonly templateEntity: WindowEntity;

  /**
   * The target entities that will receive the sill configuration.
   */
  readonly entities: WindowEntity[];

  /**
   * Map storing the original sill state before commit (for undo).
   * Key: Entity ID, Value: Original WindowSill instance or undefined
   */
  private readonly savedSillMap: Map<string, WindowSill | undefined>;

  /**
   * Map storing the restored sill state after commit (for redo).
   * Key: Entity ID, Value: Restored WindowSill instance or undefined
   */
  private readonly restoredSillMap: Map<string, WindowSill | undefined>;

  /**
   * Creates a new ApplyGeometryMaterialToSillRequest.
   * @param templateEntity - The source entity containing the sill configuration to apply
   * @param entities - Target entities that will receive the sill configuration
   */
  constructor(templateEntity: WindowEntity, entities: WindowEntity[]);

  /**
   * Executes the request: applies the template's sill configuration to all target entities.
   * Saves current state for undo and stores new state for redo.
   */
  onCommit(): void;

  /**
   * Reverts the changes: restores original sill configuration to all entities.
   */
  onUndo(): void;

  /**
   * Reapplies the changes: restores the committed sill configuration to all entities.
   */
  onRedo(): void;

  /**
   * Internal helper method to add a sill to an entity with specified parameters.
   * @param entity - The target entity to add sill to
   * @param sourceSill - The source sill whose parameters will be copied
   */
  private _addSill(entity: WindowEntity, sourceSill: WindowSill): void;
}