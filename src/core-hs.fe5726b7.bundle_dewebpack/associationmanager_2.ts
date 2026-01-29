import { Association } from './Association';
import { Entity } from './Entity';
import { Logger } from './Logger';

interface AssociationData {
  id: string;
  entity: string;
  targets?: string[];
  l?: string;
  Class?: string;
}

interface LoadContext {
  entities: Record<string, Entity>;
}

interface AssociationMap {
  [key: string]: Association;
}

export class AssociationManager {
  private _associations: Map<string, Association[]>;
  private _target2entity: Map<string, Entity>;

  constructor() {
    this._associations = new Map();
    this._target2entity = new Map();
  }

  addAssociation(
    entity: Entity,
    target: Entity,
    associationType: string,
    associationId?: string
  ): void {
    const AssociationClass = Association.getClassByType(associationType);
    if (!AssociationClass) return;

    if (this._associationExists(entity, target)) return;

    const association = new AssociationClass(associationId, entity);
    association.bind(target);
    this._addAssociation(association);
  }

  private _addAssociation(association: Association): void {
    const existingAssociations = this._associations.get(association.entity.id);
    
    if (existingAssociations instanceof Array) {
      existingAssociations.push(association);
    } else {
      this._associations.set(association.entity.id, [association]);
    }

    association.targets.forEach((target: Entity) => {
      this._target2entity.set(target.id, association.entity);
    });
  }

  private _associationExists(entity: Entity, target: Entity): boolean {
    const associations = this._associations.get(entity.id);
    
    if (!associations || !(associations instanceof Array)) {
      return false;
    }

    return associations.some((association: Association) => {
      return association.firstTarget?.id === target.id;
    });
  }

  removeAssociation(entityId: string, target: Entity): void {
    if (!this._associations.has(entityId)) return;

    const associations = this._associations.get(entityId);
    if (!associations) return;

    const index = associations.findIndex(
      (association: Association) => association.firstTarget?.id === target.id
    );

    if (index > -1) {
      associations.splice(index, 1);
      this._target2entity.delete(target.id);
    }

    if (associations.length === 0) {
      this._associations.delete(entityId);
    }
  }

  private _removeAssociation(association: Association): void {
    if (!association?.entity) return;

    const entity = association.entity;
    const associations = this._associations.get(entity.id);

    if (!associations) return;

    associations.xRemove(association);

    association.targets.forEach((target: Entity) => {
      const targetEntity = this._target2entity.get(target.id);
      Logger.console.assert(
        targetEntity === entity || targetEntity === undefined
      );
      this._target2entity.delete(target.id);
    });

    if (associations.length === 0) {
      this._associations.delete(entity.id);
    }
  }

  getAssociation(entityId: string): Association[] | undefined {
    return this._associations.get(entityId);
  }

  getEntityByTarget(target: Entity | undefined, recursive: boolean = true): Entity | undefined {
    if (!target) return undefined;
    return this.getEntityByTargetId(target.id, recursive);
  }

  getEntityByTargetId(targetId: string | undefined, recursive: boolean = true): Entity | undefined {
    if (!targetId) return undefined;

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

  getAssociationEntities(entityId: string): Entity[] {
    const entities: Entity[] = [];
    const associations = this._associations.get(entityId);

    if (associations) {
      associations.forEach((association: Association) => {
        entities.xPushCollection(association.targets);
      });
    }

    return entities;
  }

  /** @deprecated use getAssociationEntities instead */
  getAssociationEntitis(entityId: string): Entity[] {
    Logger.console.error('use getAssociationEntities instead!');
    return this.getAssociationEntities(entityId);
  }

  updateAssociation(entity: Entity, recursive: boolean = true, computeFlag: boolean = true): void {
    if (!(entity instanceof Entity)) return;
    if (!this._associations.has(entity.id)) return;

    const associations = this._associations.get(entity.id);
    associations?.forEach((association: Association) => {
      association.compute(computeFlag);

      if (recursive) {
        const firstTarget = association.firstTarget;
        this.updateAssociation(firstTarget, recursive, computeFlag);
      }
    });
  }

  replaceAssociation(entity: Entity, newAssociations?: Record<string, Entity[]>): void {
    if (this._associations.has(entity.id)) {
      const existingAssociations = this._associations.get(entity.id);
      existingAssociations?.forEach((association: Association) => {
        this.removeAssociation(entity.id, association.firstTarget);
      });
      this._associations.delete(entity.id);
    }

    if (newAssociations) {
      Object.keys(newAssociations).forEach((associationType: string) => {
        newAssociations[associationType].forEach((target: Entity) => {
          this.addAssociation(entity, target, associationType);
        });
      });
    }
  }

  clear(): void {
    this._associations.forEach((associations: Association[]) => {
      associations.forEach((association: Association) => association.clear());
    });

    this._associations.clear();
    this._target2entity.clear();
  }

  dump(): AssociationData[] {
    const data: AssociationData[] = [];

    this._associations.forEach((associations: Association[]) => {
      for (const association of associations) {
        if (association.isValid()) {
          data.push(association.dump());
        }
      }
    });

    return data;
  }

  private _createFromData(
    data: AssociationData,
    context: LoadContext,
    useActiveDoc: boolean
  ): Association | undefined {
    const className = data.l || data.Class;
    if (!className) return undefined;

    let longName = HSConstants.ClassSNameToLName.get(className);
    if (!longName) {
      longName = className;
    }

    const AssociationClass = Association.getClassByType(longName);
    if (AssociationClass) {
      const association = new AssociationClass(data.id);
      association.load(data, context, useActiveDoc);
      return association;
    }

    Logger.console.assert(false, 'Create association error: Unknown association type!');
    return undefined;
  }

  load(data: AssociationData[], context: LoadContext, useActiveDoc: boolean = false): void {
    if (!(data instanceof Array) || !context.entities) return;

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;

    data.forEach((associationData: AssociationData) => {
      const entityId = associationData.entity;
      const targetIds = associationData.targets || [];

      let entity = context.entities[entityId];
      if (useActiveDoc && !entity) {
        entity = activeDocument.getEntityById(entityId);
      }

      if (!entity) {
        Logger.console.assert(false, 'Load association error: Entity not found!');
        return;
      }

      targetIds.forEach((targetId: string) => {
        let target = context.entities[targetId];
        if (useActiveDoc && !target) {
          target = activeDocument.getEntityById(targetId);
        }

        if (!target) {
          Logger.console.assert(false, 'Load association error: Target not found!');
          return;
        }

        const association = this._createFromData(associationData, context, useActiveDoc);
        if (association) {
          this._addAssociation(association);
        }
      });
    });
  }

  forEachAssociation(callback: (association: Association) => void, context?: unknown): void {
    if (!callback) return;

    this._associations.forEach((associations: Association[]) => {
      associations.forEach((association: Association) => {
        if (association) {
          callback.call(context, association);
        }
      });
    });
  }

  saveToData(data?: AssociationMap): AssociationMap {
    const result = data || {};

    this.forEachAssociation((association: Association) => {
      result[association.id] = association;
    });

    return result;
  }

  restoreFromData(data: AssociationMap): void {
    const remainingData = Object.assign({}, data);
    const associationsToRemove: Association[] = [];
    const dataKeys = Object.keys(data);

    this.forEachAssociation((association: Association) => {
      if (dataKeys.includes(association.id)) {
        delete remainingData[association.id];
      } else {
        associationsToRemove.push(association);
      }
    });

    associationsToRemove.forEach((association: Association) => {
      this._removeAssociation(association);
    });

    Object.values(remainingData).forEach((association: Association) => {
      this._addAssociation(association);
    });
  }
}