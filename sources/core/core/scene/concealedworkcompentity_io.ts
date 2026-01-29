import { EntityField } from './EntityField';
import { Entity, Entity_IO } from './Entity';
import { ComponentLoaderManager } from './ComponentLoaderManager';

interface Component {
  type: string;
  referObject?: ConcealedWorkCompEntity;
  dump(): unknown;
}

interface SerializedComponent {
  type: string;
  [key: string]: unknown;
}

interface SerializedEntity {
  comps?: SerializedComponent[];
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

export class ConcealedWorkCompEntity_IO extends Entity_IO {
  private static _instance?: ConcealedWorkCompEntity_IO;

  static instance(): ConcealedWorkCompEntity_IO {
    if (!this._instance) {
      this._instance = new ConcealedWorkCompEntity_IO();
    }
    return this._instance;
  }

  dump(
    entity: ConcealedWorkCompEntity,
    context?: unknown,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): [SerializedEntity, unknown] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const serialized = result[0];

    if (entity.components && entity.components.size > 0) {
      const serializedComponents: unknown[] = [];
      entity.components.forEach((component: Component) => {
        serializedComponents.push(component.dump());
      });
      serialized.comps = serializedComponents;
    }

    return result;
  }

  load(
    entity: ConcealedWorkCompEntity,
    data: SerializedEntity,
    context?: unknown
  ): void {
    super.load(entity, data, context);

    if (data.comps) {
      const componentsMap = new Map<string, Component>();
      data.comps.forEach((componentData: SerializedComponent) => {
        const component = ComponentLoaderManager.ins.load(componentData, entity);
        if (component) {
          componentsMap.set(component.type, component);
        }
      });

      Entity_IO.setEntityFields(entity, {
        components: componentsMap
      });
    }
  }
}

export class ConcealedWorkCompEntity extends Entity {
  @EntityField()
  components?: Map<string, Component>;

  getIO(): ConcealedWorkCompEntity_IO {
    return ConcealedWorkCompEntity_IO.instance();
  }

  addComponent(component: Component): Component {
    if (!this.components || !this.components.has(component.type)) {
      component.referObject = this;
      const newComponents = this.components 
        ? new Map(this.components) 
        : new Map<string, Component>();
      newComponents.set(component.type, component);
      this.components = newComponents;
    }
    return component;
  }

  removeComponent(componentType: string): void {
    if (this.components && this.components.has(componentType)) {
      const newComponents = new Map(this.components);
      newComponents.delete(componentType);
      this.components = newComponents;
    }
  }

  getComponent(componentType: string): Component | undefined {
    return this.components?.get(componentType);
  }

  protected _addCWEntity(
    entities: ConcealedWorkCompEntity[],
    entityOrEntities: ConcealedWorkCompEntity | ConcealedWorkCompEntity[]
  ): void {
    const toAdd: ConcealedWorkCompEntity[] = [];
    const entitiesToProcess = Array.isArray(entityOrEntities) 
      ? entityOrEntities 
      : [entityOrEntities];

    entitiesToProcess.forEach((entity: ConcealedWorkCompEntity) => {
      const exists = entities.find((e) => e === entity);
      if (!exists) {
        toAdd.push(entity);
      }
    });

    this.addChild(toAdd);
  }

  protected _removeCWEntity(
    entities: ConcealedWorkCompEntity[],
    entityOrId: ConcealedWorkCompEntity | string | (ConcealedWorkCompEntity | string)[]
  ): void {
    const toRemove: ConcealedWorkCompEntity[] = [];
    const itemsToProcess = Array.isArray(entityOrId) 
      ? entityOrId 
      : [entityOrId];

    itemsToProcess.forEach((item: ConcealedWorkCompEntity | string) => {
      const entity = item instanceof Entity 
        ? item 
        : this._getCWEntity(entities, item as string);
      if (entity) {
        toRemove.push(entity);
      }
    });

    if (toRemove.length > 0) {
      toRemove.forEach((entity) => this.removeChild(entity));
    }
  }

  protected _getCWEntity(
    entities: ConcealedWorkCompEntity[],
    entityId: string
  ): ConcealedWorkCompEntity | undefined {
    return entities.find((entity) => entity.id === entityId);
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkCompEntity, ConcealedWorkCompEntity);