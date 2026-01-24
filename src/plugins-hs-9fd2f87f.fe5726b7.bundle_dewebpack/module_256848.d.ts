import { HSCore } from './path/to/HSCore';

/**
 * Light slot state request transaction for handling ceiling light slot parameter changes.
 * Extends the base StateRequest transaction to manage light slot modifications with undo/redo support.
 */
export default class LightSlotStateRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The light slot entity being modified
   * @private
   */
  private _lightSlot: LightSlotEntity;

  /**
   * Cached parameters of the light slot
   * @private
   */
  private _parameters: LightSlotParameters;

  /**
   * Creates a new LightSlotStateRequest transaction
   * @param parentEntity - The parent entity containing the light slot
   * @param lightSlotId - The unique identifier of the light slot to modify
   */
  constructor(parentEntity: EntityWithChildren, lightSlotId: string | number) {
    super();
    this._lightSlot = this.getLightSlotEntityById(parentEntity, lightSlotId);
    this._parameters = this._lightSlot.parameters;
  }

  /**
   * Handles incoming transaction events
   * @param eventType - Type of event received
   * @param eventData - Event payload data
   */
  onReceive(eventType: string, eventData: Partial<LightSlotParameters>): void {
    switch (eventType) {
      case 'ceilingchanging':
      case 'ceilingchangeend':
        this.changeProfileData(eventData);
        break;
    }
    super.onReceive(eventType, eventData);
  }

  /**
   * Updates the light slot parameters with new profile data
   * @param newData - Partial parameter data to merge with existing parameters
   */
  changeProfileData(newData: Partial<LightSlotParameters> | null): void {
    if (!this._parameters || !newData) {
      return;
    }

    const clonedParameters = _.cloneDeep(this._parameters);
    Object.assign(clonedParameters, newData);
    
    this._lightSlot.parameters = clonedParameters;
    this._lightSlot.dirtyGeometry();
    
    const uniqueParent = this._lightSlot.getUniqueParent();
    uniqueParent?.dirtyGeometry();
    
    this._lightSlot.refreshFaceMaterial();
  }

  /**
   * Determines if this transaction can be recorded for undo/redo
   * @returns Always returns true to enable transaction history
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * Handles undo operation, reverting changes and refreshing materials
   */
  onUndo(): void {
    super.onUndo();
    this._lightSlot.refreshFaceMaterial();
  }

  /**
   * Handles redo operation, reapplying changes and refreshing materials
   */
  onRedo(): void {
    super.onRedo();
    this._lightSlot.refreshFaceMaterial();
  }

  /**
   * Retrieves a light slot entity from a parent entity by ID
   * @param parentEntity - The parent entity containing child light slots
   * @param targetLightSlotId - The ID of the light slot to find
   * @returns The matching light slot entity
   * @private
   */
  private getLightSlotEntityById(
    parentEntity: EntityWithChildren,
    targetLightSlotId: string | number
  ): LightSlotEntity {
    return Object.values(parentEntity.children).find(
      (child: LightSlotEntity) => child.lightSlotId === targetLightSlotId
    )!;
  }
}

/**
 * Entity with child entities collection
 */
interface EntityWithChildren {
  children: Record<string, LightSlotEntity>;
}

/**
 * Light slot entity with geometry and material properties
 */
interface LightSlotEntity {
  /** Unique identifier for the light slot */
  lightSlotId: string | number;
  
  /** Configuration parameters for the light slot */
  parameters: LightSlotParameters;
  
  /** Marks the geometry as needing recalculation */
  dirtyGeometry(): void;
  
  /** Refreshes the face material rendering */
  refreshFaceMaterial(): void;
  
  /** Gets the unique parent entity if one exists */
  getUniqueParent(): ParentEntity | null | undefined;
}

/**
 * Parent entity with geometry management
 */
interface ParentEntity {
  /** Marks the parent geometry as needing recalculation */
  dirtyGeometry(): void;
}

/**
 * Configuration parameters for light slot appearance and behavior
 */
interface LightSlotParameters {
  [key: string]: unknown;
}