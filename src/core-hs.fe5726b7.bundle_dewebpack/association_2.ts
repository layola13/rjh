const classRegistry = new Map<string, typeof AssociationBase>();

export class AssociationBase {
  protected _Class!: string;
  public id: string;
  protected _entity: Entity;
  protected _targets: Map<string, Entity>;

  constructor(id: string, entity: Entity) {
    this.id = id;
    this.generateId();
    this._entity = entity;
    this._targets = new Map();
  }

  static registerClass(className: string, constructor: typeof AssociationBase): void {
    constructor.prototype._Class = className;
    classRegistry.set(className, constructor);
  }

  static getClassByType(className: string): typeof AssociationBase | undefined {
    return classRegistry.get(className);
  }

  get Class(): string {
    return this._Class;
  }

  bind(entity: Entity | undefined): this {
    if (entity) {
      this._targets.set(entity.id, entity);
    }
    return this;
  }

  unbind(entityOrId: Entity | string): this {
    const targetId = typeof entityOrId === 'string' ? entityOrId : entityOrId.id;
    this._targets.delete(targetId);
    return this;
  }

  unbindAll(): void {
    this._targets.clear();
  }

  clear(): void {
    this.unbindAll();
  }

  generateId(): void {
    this.id = HSCore.Util.IDGenerator.generate(
      this.id,
      HSCore.Util.IDGeneratorType.Association
    );
  }

  get entity(): Entity {
    return this._entity;
  }

  get targets(): Entity[] {
    return Array.from(this._targets.values());
  }

  get firstTarget(): Entity | undefined {
    return this.targets[0];
  }

  isValid(): boolean {
    for (const target of this.targets) {
      if (Object.keys(target.parents).length < 1) {
        return false;
      }
    }
    return true;
  }

  dump(context?: unknown): SerializedAssociation {
    return {
      l: HSConstants.ClassLNameToSName.get(this.Class),
      id: this.id,
      entity: this._entity.id,
      targets: this.targets.map(target => target.id)
    };
  }

  load(data: SerializedAssociation, context: LoadContext, options?: unknown): void {
    this._entity = context.entities[data.entity];
    data.targets.forEach((targetId: string) => {
      const targetEntity = context.entities[targetId];
      this._targets.set(targetEntity.id, targetEntity);
    });
  }

  compute(flag: boolean = true): void {
    // Implementation placeholder
  }
}

export class Association extends AssociationBase {
  // Inherits all functionality from AssociationBase
}

interface Entity {
  id: string;
  parents: Record<string, unknown>;
}

interface SerializedAssociation {
  l: string | undefined;
  id: string;
  entity: string;
  targets: string[];
}

interface LoadContext {
  entities: Record<string, Entity>;
}

declare const HSCore: {
  Util: {
    IDGenerator: {
      generate(id: string, type: number): string;
    };
    IDGeneratorType: {
      Association: number;
    };
  };
};

declare const HSConstants: {
  ClassLNameToSName: Map<string, string>;
};