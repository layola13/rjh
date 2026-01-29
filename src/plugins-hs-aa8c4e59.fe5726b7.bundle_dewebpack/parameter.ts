export const DefaultSubType = "default";
export const AllSubType = "*";

export enum DataType {
  Unknown = 0,
  String = 1,
  Boolean = 2,
  Int = 3,
  Number = 4,
  Object = 5,
  ArrayPoint2D = 6,
  ArrayPoint3D = 7,
  StringArray = 8,
  NumberArray = 9,
}

export class Parameter {
  name: string;
  value: unknown;
  type: DataType;

  constructor(name: string, value: unknown, type: DataType = DataType.Unknown) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

export class InstanceData {
  id: string;
  parameters: Map<string, Parameter>;

  constructor(id: string) {
    this.id = id;
    this.parameters = new Map();
  }

  addParameter(param: Parameter, ...additionalParams: Parameter[]): void {
    this.parameters.set(param.name, param);
    additionalParams.forEach((p) => this.parameters.set(p.name, p));
  }

  getParameter(name: string): Parameter | undefined {
    return this.parameters.get(name);
  }

  getParameterValue(name: string): unknown {
    const param = this.getParameter(name);
    return param?.value;
  }
}

export class Entity {
  private _prefix: string = "";
  private _parent?: Entity;
  children: Entity[] = [];
  private _instance!: InstanceData;
  private _type?: string;
  private _category?: string;
  legal: boolean = true;
  errorMsg: string = "";

  traverse(callback: (entity: Entity) => boolean): void {
    if (callback(this)) {
      for (const child of this.children) {
        child.traverse(callback);
      }
    }
  }

  setPrefix(prefix: string): void {
    this._prefix = prefix;
  }

  get prefix(): string {
    return this._prefix;
  }

  setParent(parent: Entity | undefined): void {
    this._parent = parent;
  }

  getParent(): Entity | undefined {
    return this._parent;
  }

  setInstanceData(instance: InstanceData): void {
    this._instance = instance;
  }

  get instance(): InstanceData {
    return this._instance;
  }

  setType(type: string): void {
    this._type = type;
  }

  get type(): string | undefined {
    return this._type;
  }

  setCategory(category: string): void {
    this._category = category;
  }

  get category(): string | undefined {
    return this._category;
  }

  addChild(child: Entity, ...additionalChildren: Entity[]): void {
    this.children.push(child, ...additionalChildren);
    [child, ...additionalChildren].forEach((c) => c.setParent(this));
  }

  setChildren(children: Entity[]): void {
    this.children.length = 0;
    if (children.length) {
      this.addChild(...children);
    }
  }

  removeFromParent(): void {
    this.getParent()?.removeChild(this);
  }

  removeChild(child: Entity): void {
    const index = this.children.findIndex((c) => c === child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.setParent(undefined);
    }
  }

  getChildren(): Entity[] {
    return this.children;
  }

  getId(): string {
    return this.prefix + this.instance.id;
  }

  getInstanceId(): string {
    return this.instance.id;
  }

  getParameterValue(name: string): unknown {
    return this.instance.getParameterValue(name);
  }

  clone(deep: boolean): Entity {
    const cloned = new Entity();
    cloned.setInstanceData(this.instance);
    cloned.setType(this.type!);
    cloned.setCategory(this.category!);
    if (deep) {
      this.children.forEach((child) => cloned.addChild(child.clone(deep)));
    }
    return cloned;
  }
}

export function verifyEntity(entity: Entity): boolean {
  if (entity.legal) {
    return true;
  }
  entity.removeFromParent();
  return false;
}

interface BusinessType {
  type: string;
  subType: string;
}

class BusinessEntityCollection {
  type?: string;
  subType?: string;
  rootEntities?: Entity[];
  entityIds: Set<string> = new Set();

  setEntities(entities: Entity[], entityMap: Map<string, Entity>): void {
    this.rootEntities = entities.filter((e) => e.legal);
    this.entityIds = new Set();

    for (const entity of this.rootEntities) {
      if (entity.legal) {
        entity.traverse((e) => verifyEntity(e));
        entity.traverse((e) => {
          this.entityIds.add(e.getId());
          entityMap.set(e.getId(), e);
          return true;
        });
      }
    }
  }

  contain(entityOrId: Entity | string): boolean {
    return entityOrId instanceof Entity
      ? this.entityIds.has(entityOrId.getId())
      : this.entityIds.has(entityOrId);
  }

  getBusinessType(): BusinessType {
    return {
      type: this.type!,
      subType: this.subType!,
    };
  }
}

interface EntityFilterOption {
  exclude?: BusinessType[];
  include?: BusinessType[];
}

class EntityCollection {
  items: BusinessEntityCollection[] = [];
  rootEntities: Entity[] = [];
  entityMap: Map<string, Entity> = new Map();

  addBusinessEntities(type: string, subType: string, entities: Entity[]): void {
    for (const item of this.items) {
      if (item.type === type && item.subType === subType) {
        item.setEntities(entities, this.entityMap);
        return;
      }
    }

    const collection = new BusinessEntityCollection();
    collection.type = type;
    collection.subType = subType;
    collection.setEntities(entities, this.entityMap);
    this.items.push(collection);
    this.rootEntities.push(...entities);
  }

  getItems(option?: EntityFilterOption): BusinessEntityCollection[] {
    const result: BusinessEntityCollection[] = [];
    const exclude = option?.exclude ?? [];
    const include = option?.include;

    for (const item of this.items) {
      const businessType = item.getBusinessType();

      if (exclude.length > 0 && exclude.some((ex) => matchesBusinessType(businessType, ex))) {
        continue;
      }

      if (include) {
        if (include.some((inc) => matchesBusinessType(businessType, inc))) {
          result.push(item);
        }
      } else {
        result.push(item);
      }
    }

    return result;
  }

  getEntities(option?: EntityFilterOption): Entity[] {
    const result: Entity[] = [];
    for (const item of this.getItems(option)) {
      result.push(...item.rootEntities!);
    }
    return result;
  }

  getEntityBusinessType(entityOrId: Entity | string): BusinessType | undefined {
    for (const item of this.items) {
      if (item.contain(entityOrId)) {
        return item.getBusinessType();
      }
    }
  }
}

function matchesBusinessType(entityType: BusinessType, filterType: BusinessType): boolean {
  if (entityType.type === filterType.type) {
    const subType = filterType.subType ?? DefaultSubType;
    if (subType === AllSubType) {
      return true;
    }
    if (subType === entityType.subType) {
      return true;
    }
  }
  return false;
}

export class BomData {
  private collection: EntityCollection = new EntityCollection();

  addBusinessEntities(businessType: { type: string; subType?: string }, entities: Entity[]): void {
    const type = businessType.type;
    const subType = businessType.subType ?? DefaultSubType;
    this.collection.addBusinessEntities(type, subType, entities);
  }

  getEntity(id: string): Entity | undefined {
    return this.collection.entityMap.get(id);
  }

  getBusinessEntities(businessType: { type: string; subType?: string }): Entity[] {
    const result: Entity[] = [];
    this.collection.items.forEach((item) => {
      if (item.type !== businessType.type || (businessType.subType && item.subType !== businessType.subType)) {
        return;
      }
      result.push(...item.rootEntities!);
    });
    return result;
  }

  isEntityMatchOption(entityOrId: Entity | string, option?: EntityFilterOption): boolean {
    if (!option) {
      return true;
    }

    if (!option.include && (!option.exclude || !option.exclude.length)) {
      return true;
    }

    return this.collection.getItems(option).some((item) => item.contain(entityOrId));
  }

  getRootEntities(): Entity[] {
    return this.collection.rootEntities;
  }
}