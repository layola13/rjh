/**
 * Face visibility relationship manager
 * Tracks and manages face visibility data for architectural elements
 */

import { RelationshipType, SupportedSignalTypes } from './relationship-types';
import { EntityEventType } from './entity-event';

/**
 * Configuration for relationship signal handling
 */
interface RelationshipConfig {
  /** Target entity types to listen for */
  targetTypes: any[];
  /** Action/signal types to respond to */
  actionTypes: SupportedSignalTypes[];
  /** Callback function when signal is triggered */
  callback: (event: SignalEvent | null) => void;
}

/**
 * Signal event data structure
 */
interface SignalEvent {
  /** Target entity that triggered the event */
  target?: any;
  /** Additional event data */
  data?: {
    /** Type of entity event */
    type?: EntityEventType;
    /** Changed field name for field change events */
    fieldName?: string;
    /** Related entity for child/parent events */
    entity?: any;
  };
}

/**
 * Relationship manager interface
 */
interface RelationshipManager {
  /**
   * Register relationship configurations
   * @param type - Type of relationship
   * @param configs - Array of configuration objects
   */
  registerConfigs(type: RelationshipType, configs: RelationshipConfig[]): void;
}

/**
 * Manages face visibility relationships between architectural elements
 * Automatically invalidates cached visibility data when related entities change
 */
export class FaceVisibleRelation {
  /** Relationship type identifier */
  private readonly _type: RelationshipType;
  
  /** Cache of face visibility data keyed by entity ID */
  private readonly _data: Map<string, any>;
  
  /** Reference to the relationship manager */
  private readonly _manager: RelationshipManager;

  /**
   * Creates a new face visibility relationship manager
   * @param manager - Parent relationship manager instance
   */
  constructor(manager: RelationshipManager) {
    this._type = RelationshipType.FaceVisible;
    this._data = new Map<string, any>();
    this._manager = manager;
    this._init();
  }

  /**
   * Initialize relationship configurations and event handlers
   * Sets up listeners for entity changes that affect face visibility
   */
  private _init(): void {
    this._manager.registerConfigs(this._type, [
      // Handle content host changes
      {
        targetTypes: [HSCore.Model.Content],
        actionTypes: [SupportedSignalTypes.HostChanged],
        callback: (event: SignalEvent | null) => {
          const target = event?.target;
          if (target instanceof HSCore.Model.Content && target.parent) {
            this.clear(target.parent.id);
          }
        }
      },
      // Handle opening modifications
      {
        targetTypes: [HSCore.Model.Opening, HSCore.Model.ParametricOpening],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event: SignalEvent | null) => {
          const target = event?.target;
          if (
            (target instanceof HSCore.Model.Opening || 
             target instanceof HSCore.Model.ParametricOpening) && 
            target.parent
          ) {
            this.clear(target.parent.id);
          }
        }
      },
      // Handle wall geometry and height changes
      {
        targetTypes: [HSCore.Model.Wall],
        actionTypes: [SupportedSignalTypes.Dirty, SupportedSignalTypes.FieldChanged],
        callback: (event: SignalEvent | null) => {
          const target = event?.target;
          if (target instanceof HSCore.Model.Wall && target.parent) {
            const eventData = event?.data;
            // Clear cache only for geometry changes or height modifications
            if (
              eventData?.type === EntityEventType.Geometry ||
              eventData?.fieldName === 'height3d'
            ) {
              this.clear(target.parent.id);
            }
          }
        }
      },
      // Handle entity removal from layers
      {
        targetTypes: [HSCore.Model.Layer],
        actionTypes: [SupportedSignalTypes.ChildRemoved],
        callback: (event: SignalEvent | null) => {
          const entity = event?.data?.entity;
          if (
            (entity instanceof HSCore.Model.Opening ||
             entity instanceof HSCore.Model.ParametricOpening ||
             entity instanceof HSCore.Model.Wall) &&
            entity.parent
          ) {
            this.clear(entity.parent.id);
          }
        }
      },
      // Handle slab modifications
      {
        targetTypes: [HSCore.Model.Slab],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event: SignalEvent | null) => {
          const parent = event?.target?.parent;
          if (parent) {
            this.clear(parent.id);
          }
        }
      }
    ]);
  }

  /**
   * Retrieve cached face visibility data for an entity
   * @param entityId - Unique identifier of the entity
   * @returns Cached visibility data or undefined if not cached
   */
  getData(entityId: string): any | undefined {
    return this._data.get(entityId);
  }

  /**
   * Store face visibility data for an entity
   * @param entityId - Unique identifier of the entity
   * @param data - Visibility data to cache
   */
  setData(entityId: string, data: any): void {
    this._data.set(entityId, data);
  }

  /**
   * Clear cached visibility data for a specific entity
   * @param entityId - Unique identifier of the entity
   */
  clear(entityId: string): void {
    this._data.delete(entityId);
  }

  /**
   * Clear all cached visibility data
   */
  clearAll(): void {
    this._data.clear();
  }
}