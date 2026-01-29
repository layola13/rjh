const registeredClasses = new Map<string, typeof AssociationBase>();

export abstract class AssociationBase {
  public id: string;
  protected _Class!: string;
  protected _entity: any;
  protected _targets: Map<string, any>;

  constructor(id: string, entity: any) {
    this.id = id;
    this.generateId();
    this._entity = entity;
    this._targets = new Map();
  }

  static registerClass(className: string, classConstructor: typeof AssociationBase): void {
    classConstructor.prototype._Class = className;
    registeredClasses.set(className, classConstructor);
  }

  static getClassByType(className: string): typeof AssociationBase | undefined {
    return registeredClasses.get(className);
  }

  get Class(): string {
    return this._Class;
  }

  bind(target: any): this {
    if (target) {
      this._targets.set(target.id, target);
    }
    return this;
  }

  unbind(targetOrId: any): this {
    const targetId = targetOrId.id || targetOrId;
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

  get entity(): any {
    return this._entity;
  }

  get targets(): any[] {
    return Array.from(this._targets.values());
  }

  get firstTarget(): any {
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

  dump(dumpContext?: any): AssociationDumpData {
    return {
      l: HSConstants.ClassLNameToSName.get(this.Class),
      id: this.id,
      entity: this._entity.id,
      targets: this.targets.map(target => target.id)
    };
  }

  load(data: AssociationDumpData, loadContext: any, useActiveDocument: boolean): void {
    this._entity = loadContext.entities[data.entity];

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    if (!this._entity && useActiveDocument) {
      this._entity = activeDocument.getEntityById(data.entity);
    }

    data.targets.forEach(targetId => {
      let target = loadContext.entities[targetId];
      if (useActiveDocument && !target) {
        target = activeDocument.getEntityById(targetId);
      }
      this._targets.set(target.id, target);
    });
  }

  compute(shouldCompute: boolean = true): void {
    // Base implementation - override in subclasses
  }
}

export class Association extends AssociationBase {
  // Concrete implementation extends base functionality
}

interface AssociationDumpData {
  l: string | undefined;
  id: string;
  entity: string;
  targets: string[];
}