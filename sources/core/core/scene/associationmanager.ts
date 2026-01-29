import { Association } from './Association';
import { Entity } from './Entity';
import { Logger } from './Logger';

interface AssociationData {
  l?: string;
  Class?: string;
  id: string;
  entity: string;
  targets?: string[];
}

interface LoadContext {
  entities: Record<string, Entity>;
}

export class AssociationManager {
  private static _instance: AssociationManager | undefined;

  private readonly _associations: Map<string, Association[]>;
  private readonly _target2entity: Map<string, Entity>;

  constructor() {
    this._associations = new Map();
    this._target2entity = new Map();
  }

  addAssociation(
    entity: Entity,
    target: Entity,
    associationType: string,
    id: string | undefined
  ): void {
    const AssociationClass = Association.getClassByType(associationType);
    if (!AssociationClass) {
      return;
    }

    if (this._associationExists(entity, target)) {
      return;
    }

    const association = new AssociationClass(id, entity);
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
      return association.firstTarget.id === target.id;
    });
  }

  get associations(): Map<string, Association[]> {
    return this._associations;
  }

  removeAssociation(entityId: string, target: Entity): void {
    if (!this._associations.has(entityId)) {
      return;
    }

    const associations = this._associations.get(entityId);
    if (!associations) {
      return;
    }

    const index = associations.findIndex(
      (association: Association) => association.firstTarget.id === target.id
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
    if (!association || !association.entity) {
      return;
    }

    const entity = association.entity;
    const associations = this._associations.get(entity.id);

    if (!associations) {
      return;
    }

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
    if (!target) {
      return undefined;
    }
    return this.getEntityByTargetId(target.id, recursive);
  }

  getEntityByTargetId(targetId: string | undefined, recursive: boolean = true): Entity | undefined {
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

  getAssociationEntities(entityId: string): Entity[] {
    const targets: Entity[] = [];
    const associations = this._associations.get(entityId);

    if (associations) {
      associations.forEach((association: Association) => {
        targets.xPushCollection(association.targets);
      });
    }

    return targets;
  }

  /**
   * @deprecated use getAssociationEntities instead!
   */
  getAssociationEntitis(entityId: string): Entity[] {
    Logger.console.error('use getAssociationEntities instead!');
    return this.getAssociationEntities(entityId);
  }

  updateAssociation(entity: Entity, recursive: boolean = true, compute: boolean = true): void {
    if (!(entity instanceof Entity) || !this._associations.has(entity.id)) {
      return;
    }

    const associations = this._associations.get(entity.id);
    if (!associations) {
      return;
    }

    associations.forEach((association: Association) => {
      association.compute(compute);

      if (recursive) {
        const target = association.firstTarget;
        this.updateAssociation(target, recursive, compute);
      }
    });
  }

  replaceAssociation(entity: Entity, newAssociations?: Record<string, Entity[]>): void {
    if (this._associations.has(entity.id)) {
      const existingAssociations = this._associations.get(entity.id);
      if (existingAssociations) {
        existingAssociations.forEach((association: Association) => {
          this.removeAssociation(entity.id, association.firstTarget);
        });
      }
      this._associations.delete(entity.id);
    }

    if (newAssociations) {
      Object.keys(newAssociations).forEach((associationType: string) => {
        newAssociations[associationType].forEach((target: Entity) => {
          this.addAssociation(entity, target, associationType, undefined);
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

  dump(): unknown[] {
    const result: unknown[] = [];

    this._associations.forEach((associations: Association[]) => {
      for (const association of associations) {
        if (association.isValid()) {
          result.push(association.dump());
        }
      }
    });

    return result;
  }

  private _createFromData(
    data: AssociationData,
    context: LoadContext,
    loadFlag: boolean
  ): Association | undefined {
    const className = data.l || data.Class;
    let longName = HSConstants.ClassSNameToLName.get(className);
    
    if (!longName) {
      longName = className;
    }

    const AssociationClass = Association.getClassByType(longName);

    if (AssociationClass) {
      const association = new AssociationClass(data.id);
      association.load(data, context, loadFlag);
      return association;
    }

    Logger.console.assert(false, 'Create association error: Unknow association type!');
    return undefined;
  }

  load(data: AssociationData[], context: LoadContext, loadFlag: boolean = false): void {
    if (!(data instanceof Array) || !context.entities) {
      return;
    }

    data.forEach((associationData: AssociationData) => {
      const entityId = associationData.entity;
      const targetIds = associationData.targets || [];

      if (!context.entities[entityId]) {
        Logger.console.assert(false, 'Load association error: Entity not found!');
        return;
      }

      targetIds.forEach((targetId: string) => {
        if (!context.entities[targetId]) {
          Logger.console.assert(false, 'Load association error: Target not found!');
          return;
        }

        const association = this._createFromData(associationData, context, loadFlag);
        if (association) {
          this._addAssociation(association);
        }
      });
    });
  }

  forEachAssociation(callback: (association: Association) => void, context?: unknown): void {
    if (!callback) {
      return;
    }

    this._associations.forEach((associations: Association[]) => {
      associations.forEach((association: Association) => {
        if (association) {
          callback.call(context, association);
        }
      });
    });
  }

  saveToData(data?: Record<string, Association>): Record<string, Association> {
    const result = data || {};

    this.forEachAssociation((association: Association) => {
      result[association.id] = association;
    });

    return result;
  }

  restoreFromData(data: Record<string, Association>): void {
    const remaining = Object.assign({}, data);
    const toRemove: Association[] = [];
    const dataKeys = Object.keys(data);

    this.forEachAssociation((association: Association) => {
      if (dataKeys.includes(association.id)) {
        delete remaining[association.id];
      } else {
        toRemove.push(association);
      }
    });

    toRemove.forEach((association: Association) => {
      this._removeAssociation(association);
    });

    Object.values(remaining).forEach((association: Association) => {
      this._addAssociation(association);
    });
  }

  static instance(): AssociationManager {
    if (!AssociationManager._instance) {
      AssociationManager._instance = new AssociationManager();
    }
    return AssociationManager._instance;
  }
}