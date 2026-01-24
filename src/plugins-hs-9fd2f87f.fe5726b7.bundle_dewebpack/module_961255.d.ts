/**
 * Transaction request for handling content material changes with molding support.
 * Manages undo/redo operations for content entities, lighting filters, and material data.
 */

import { Transaction } from 'HSCore';
import type { Entity, MaterialMap, TransactionData } from 'HSCore.Types';
import type { Content, DisplayList } from 'HSApp.Types';

/**
 * Material change transaction request that extends the base transaction system.
 * Tracks before/after states of content entities, lighting, and host elements.
 */
export default class ContentMaterialTransaction extends Transaction.Request {
  private readonly _content: Content;
  private readonly _moldingId: string | number;
  private readonly _beforeData: TransactionData;
  private readonly _afterData: TransactionData;
  private readonly _currentMaterialMap: Map<string, unknown>;
  private readonly _transEntities: Entity[];
  private cachedMaterialMap?: MaterialMap;

  /**
   * Creates a new content material transaction.
   * 
   * @param content - The content entity to track changes for
   * @param moldingId - Identifier for the molding entity that may need geometry updates
   */
  constructor(content: Content, moldingId: string | number) {
    super();
    
    this._content = content;
    this._moldingId = moldingId;
    this._beforeData = {};
    this._afterData = {};
    this._currentMaterialMap = new Map<string, unknown>();

    // Collect all entities involved in this transaction
    const lightingEntities = this._lightsfilter();
    const hostEntities = this._content.getHost();
    this._transEntities = [content as unknown as Entity]
      .concat(lightingEntities)
      .concat(hostEntities);

    // Save initial state
    HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._beforeData);
  }

  /**
   * Filters and collects all lighting-related entities from the 2D auxiliary view.
   * Includes ceiling lights, pendant lights, and general lighting content types.
   * 
   * @returns Array of lighting entities found in the display list
   */
  private _lightsfilter(): Entity[] {
    const displayList: DisplayList | undefined = HSApp.App.getApp()
      .getView('aux2d')?.displayList;
    const lightingEntities: Entity[] = [];

    if (!displayList) {
      return lightingEntities;
    }

    for (const key in displayList) {
      const displayItem = displayList[key];
      const entity = displayItem?.entity;

      if (!entity) {
        continue;
      }

      const metadata = entity.metadata;
      if (!metadata) {
        continue;
      }

      const contentType = metadata.contentType;
      if (!contentType) {
        continue;
      }

      // Check if entity is any type of lighting
      const isLighting = contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) ||
                        contentType.isTypeOf(HSCatalog.ContentTypeEnum.CeilingLight) ||
                        contentType.isTypeOf(HSCatalog.ContentTypeEnum.PendantLight);

      if (isLighting) {
        lightingEntities.push(entity);
      }
    }

    return lightingEntities;
  }

  /**
   * Commits the transaction by applying changes and saving the after state.
   * Called when the user confirms the operation.
   */
  public onCommit(): void {
    this._apply();
    HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._afterData);
  }

  /**
   * Undoes the transaction by restoring entities to their before state.
   * Caches current material map and triggers geometry updates if needed.
   */
  public onUndo(): void {
    // Cache current material state before reverting
    this.cachedMaterialMap = this._content.getMaterialData();

    // Restore all entities to their previous state
    HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._beforeData);

    // Update molding geometry if applicable
    if (this._content && this._moldingId) {
      const moldingEntity = this._content.getMoldingEntityById(this._moldingId);
      moldingEntity?.dirtyGeometry();
    }
  }

  /**
   * Redoes the transaction by restoring entities to their after state.
   * Reapplies cached material data and triggers geometry updates if needed.
   */
  public onRedo(): void {
    // Restore all entities to their committed state
    HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._afterData);

    // Reapply cached material data if available
    if (this.cachedMaterialMap && this.cachedMaterialMap.size > 0) {
      this._content.setMaterialData(this.cachedMaterialMap, {});
      this.cachedMaterialMap.clear();
    }

    // Update molding geometry if applicable
    if (this._content && this._moldingId) {
      const moldingEntity = this._content.getMoldingEntityById(this._moldingId);
      moldingEntity?.dirtyGeometry();
    }
  }

  /**
   * Applies the material changes to the content.
   * Override this method in subclasses to implement specific application logic.
   * @protected
   */
  protected _apply(): void {
    // Implementation should be provided by subclass or instance
  }
}