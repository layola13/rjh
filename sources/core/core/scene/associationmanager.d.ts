import type { Association } from './Association';
import type { Entity } from './Entity';

/**
 * Association data structure for serialization
 */
interface AssociationData {
  /** Association ID */
  id: string;
  /** Entity ID that owns the association */
  entity: string;
  /** Array of target entity IDs */
  targets?: string[];
  /** Association class name (legacy field) */
  l?: string;
  /** Association class name */
  Class?: string;
}

/**
 * Data context for loading associations
 */
interface LoadContext {
  /** Map of entity ID to Entity instance */
  entities: Record<string, Entity>;
  [key: string]: unknown;
}

/**
 * Dictionary of association type to target entities
 */
interface AssociationDictionary {
  [associationType: string]: Entity[];
}

/**
 * Manages associations between entities and their targets.
 * Implements singleton pattern to maintain a global registry of entity relationships.
 * 
 * @remarks
 * This manager tracks bidirectional mappings:
 * - Entity -> Associations (one-to-many)
 * - Target -> Entity (many-to-one)
 */
export class AssociationManager {
  /** Singleton instance */
  private static _instance?: AssociationManager;

  /** Maps entity ID to its array of associations */
  private readonly _associations: Map<string, Association[]>;

  /** Maps target entity ID to its parent entity */
  private readonly _target2entity: Map<string, Entity>;

  constructor() {
    this._associations = new Map();
    this._target2entity = new Map();
  }

  /**
   * Creates and adds a new association between an entity and a target
   * 
   * @param entity - The source entity
   * @param target - The target entity to associate with
   * @param associationType - Type identifier for the association class
   * @param config - Optional configuration data for the association
   */
  addAssociation(
    entity: Entity,
    target: Entity,
    associationType: string,
    config?: unknown
  ): void {
    const AssociationClass = Association.getClassByType(associationType);
    if (!AssociationClass) {
      return;
    }

    if (this._associationExists(entity, target)) {
      return;
    }

    const association = new AssociationClass(config, entity);
    association.bind(target);
    this._addAssociation(association);
  }

  /**
   * Internal method to register an association instance
   * Updates both entity->association and target->entity mappings
   */
  private _addAssociation(association: Association): void {
    const entityId = association.entity.id;
    const existingAssociations = this._associations.get(entityId);

    if (Array.isArray(existingAssociations)) {
      existingAssociations.push(association);
    } else {
      this._associations.set(entityId, [association]);
    }

    association.targets.forEach((target) => {
      this._target2entity.set(target.id, association.entity);
    });
  }

  /**
   * Checks if an association already exists between entity and target
   */
  private _associationExists(entity: Entity, target: Entity): boolean {
    const associations = this._associations.get(entity.id);
    if (!associations || !Array.isArray(associations)) {
      return false;
    }

    return associations.some((association) => {
      return association.firstTarget.id === target.id;
    });
  }

  /**
   * Gets the complete map of all associations
   */
  get associations(): Map<string, Association[]> {
    return this._associations;
  }

  /**
   * Removes a specific association by entity ID and target ID
   * 
   * @param entityId - The source entity ID
   * @param target - The target entity to disassociate
   */
  removeAssociation(entityId: string, target: Entity): void {
    if (!this._associations.has(entityId)) {
      return;
    }

    const associations = this._associations.get(entityId);
    if (!associations) {
      return;
    }

    const index = associations.findIndex((association) => {
      return association.firstTarget.id === target.id;
    });

    if (index > -1) {
      associations.splice(index, 1);
      this._target2entity.delete(target.id);
    }

    if (associations.length === 0) {
      this._associations.delete(entityId);
    }
  }

  /**
   * Internal method to completely remove an association instance
   * Cleans up all related mappings
   */
  private _removeAssociation(association: Association): void {
    if (!association?.entity) {
      return;
    }

    const entity = association.entity;
    const associations = this._associations.get(entity.id);

    if (!associations) {
      return;
    }

    associations.xRemove(association);

    association.targets.forEach((target) => {
      const mappedEntity = this._target2entity.get(target.id);
      Logger.console.assert(
        mappedEntity === entity || mappedEntity === undefined
      );
      this._target2entity.delete(target.id);
    });

    if (associations.length === 0) {
      this._associations.delete(entity.id);
    }
  }

  /**
   * Retrieves all associations for a given entity ID
   */
  getAssociation(entityId: string): Association[] | undefined {
    return this._associations.get(entityId);
  }

  /**
   * Finds the root entity associated with a target entity
   * 
   * @param target - The target entity
   * @param recursive - If true, traverses up the association chain to find root
   * @returns The associated entity, or undefined if not found
   */
  getEntityByTarget(target: Entity, recursive = true): Entity | undefined {
    if (!target) {
      return undefined;
    }
    return this.getEntityByTargetId(target.id, recursive);
  }

  /**
   * Finds the root entity associated with a target entity ID
   * 
   * @param targetId - The target entity ID
   * @param recursive - If true, traverses up the association chain to find root
   * @returns The associated entity, or undefined if not found
   */
  getEntityByTargetId(targetId: string, recursive = true): Entity | undefined {
    if (!targetId) {
      return undefined;
    }

    let entity = this._target2entity.get(targetId);
    let currentEntity = entity;

    while (recursive && currentEntity) {
      currentEntity = this._target2entity.get(currentEntity.id);
      if (currentEntity) {
        entity = currentEntity;
      }
    }

    return entity;
  }

  /**
   * Collects all target entities associated with a given entity ID
   * 
   * @param entityId - The source entity ID
   * @returns Array of all associated target entities
   */
  getAssociationEntities(entityId: string): Entity[] {
    const targets: Entity[] = [];
    const associations = this._associations.get(entityId);

    if (associations) {
      associations.forEach((association) => {
        targets.xPushCollection(association.targets);
      });
    }

    return targets;
  }

  /**
   * @deprecated Use getAssociationEntities instead
   */
  getAssociationEntitis(entityId: string): Entity[] {
    Logger.console.error('use getAssociationEntities instead!');
    return this.getAssociationEntities(entityId);
  }

  /**
   * Recomputes association data for an entity and optionally its targets
   * 
   * @param entity - The entity whose associations should be updated
   * @param recursive - If true, recursively updates target associations
   * @param forceUpdate - Forces recomputation even if not dirty
   */
  updateAssociation(
    entity: Entity,
    recursive = true,
    forceUpdate = true
  ): void {
    if (!(entity instanceof Entity) || !this._associations.has(entity.id)) {
      return;
    }

    const associations = this._associations.get(entity.id);
    if (!associations) {
      return;
    }

    associations.forEach((association) => {
      association.compute(forceUpdate);

      if (recursive) {
        const target = association.firstTarget;
        this.updateAssociation(target, recursive, forceUpdate);
      }
    });
  }

  /**
   * Replaces all associations for an entity with a new set
   * 
   * @param entity - The entity whose associations will be replaced
   * @param associationDict - Dictionary mapping association types to target arrays
   */
  replaceAssociation(
    entity: Entity,
    associationDict?: AssociationDictionary
  ): void {
    if (this._associations.has(entity.id)) {
      const associations = this._associations.get(entity.id);
      associations?.forEach((association) => {
        this.removeAssociation(entity.id, association.firstTarget);
      });
      this._associations.delete(entity.id);
    }

    if (associationDict) {
      Object.keys(associationDict).forEach((associationType) => {
        const targets = associationDict[associationType];
        targets.forEach((target) => {
          this.addAssociation(entity, target, associationType, undefined);
        });
      });
    }
  }

  /**
   * Clears all associations and resets internal state
   */
  clear(): void {
    this._associations.forEach((associations) => {
      associations.forEach((association) => association.clear());
    });

    this._associations.clear();
    this._target2entity.clear();
  }

  /**
   * Serializes all valid associations to a data array
   * 
   * @returns Array of serialized association data
   */
  dump(): AssociationData[] {
    const data: AssociationData[] = [];

    this._associations.forEach((associations) => {
      for (const association of associations) {
        if (association.isValid()) {
          data.push(association.dump());
        }
      }
    });

    return data;
  }

  /**
   * Creates an association instance from serialized data
   * 
   * @param data - Serialized association data
   * @param context - Load context containing entity references
   * @param strict - Whether to enforce strict validation
   * @returns Created association instance, or undefined if creation fails
   */
  private _createFromData(
    data: AssociationData,
    context: LoadContext,
    strict: boolean
  ): Association | undefined {
    const className = data.l || data.Class;
    if (!className) {
      return undefined;
    }

    let longName = HSConstants.ClassSNameToLName.get(className);
    if (!longName) {
      longName = className;
    }

    const AssociationClass = Association.getClassByType(longName);
    if (AssociationClass) {
      const association = new AssociationClass(data.id);
      association.load(data, context, strict);
      return association;
    }

    Logger.console.assert(
      false,
      'Create association error: Unknown association type!'
    );
    return undefined;
  }

  /**
   * Loads associations from serialized data array
   * 
   * @param data - Array of serialized association data
   * @param context - Load context containing entity references
   * @param strict - Whether to enforce strict validation during load
   */
  load(
    data: AssociationData[],
    context: LoadContext,
    strict = false
  ): void {
    if (!Array.isArray(data) || !context.entities) {
      return;
    }

    data.forEach((associationData) => {
      const entityId = associationData.entity;
      const targetIds = associationData.targets || [];

      if (!context.entities[entityId]) {
        Logger.console.assert(
          false,
          'Load association error: Entity not found!'
        );
        return;
      }

      targetIds.forEach((targetId) => {
        if (!context.entities[targetId]) {
          Logger.console.assert(
            false,
            'Load association error: Target not found!'
          );
          return;
        }

        const association = this._createFromData(associationData, context, strict);
        if (association) {
          this._addAssociation(association);
        }
      });
    });
  }

  /**
   * Iterates over all associations and invokes a callback
   * 
   * @param callback - Function to call for each association
   * @param thisArg - Context to use as 'this' in callback
   */
  forEachAssociation(
    callback: (association: Association) => void,
    thisArg?: unknown
  ): void {
    if (!callback) {
      return;
    }

    this._associations.forEach((associations) => {
      associations.forEach((association) => {
        if (association) {
          callback.call(thisArg, association);
        }
      });
    });
  }

  /**
   * Serializes all associations to a data object keyed by association ID
   * 
   * @param data - Optional object to populate (creates new if not provided)
   * @returns Object mapping association IDs to association instances
   */
  saveToData(data?: Record<string, Association>): Record<string, Association> {
    const result = data || {};

    this.forEachAssociation((association) => {
      result[association.id] = association;
    });

    return result;
  }

  /**
   * Restores associations from a saved data object
   * Removes associations not in data, adds new associations from data
   * 
   * @param data - Object mapping association IDs to association instances
   */
  restoreFromData(data: Record<string, Association>): void {
    const dataCopy = Object.assign({}, data);
    const toRemove: Association[] = [];
    const dataKeys = Object.keys(data);

    this.forEachAssociation((association) => {
      if (dataKeys.includes(association.id)) {
        delete dataCopy[association.id];
      } else {
        toRemove.push(association);
      }
    });

    toRemove.forEach((association) => {
      this._removeAssociation(association);
    });

    Object.values(dataCopy).forEach((association) => {
      this._addAssociation(association);
    });
  }

  /**
   * Gets the singleton instance of AssociationManager
   * 
   * @returns The global AssociationManager instance
   */
  static instance(): AssociationManager {
    if (!AssociationManager._instance) {
      AssociationManager._instance = new AssociationManager();
    }
    return AssociationManager._instance;
  }
}