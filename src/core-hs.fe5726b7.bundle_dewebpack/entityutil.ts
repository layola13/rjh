import { Entity } from './Entity';
import { State } from './State';
import { Constraint } from './Constraint';
import { Logger } from './Logger';

interface EntityJSON {
  meta?: {
    version?: string;
  };
  entryId: string;
  data?: Array<{ id: string; [key: string]: unknown }>;
  materials?: Array<{ id: string; [key: string]: unknown }>;
  products?: Array<{ seekId: string; [key: string]: unknown }>;
  states?: Array<{ id: string; [key: string]: unknown }>;
  constraints?: Array<{ id: string; [key: string]: unknown }>;
}

interface CloneContext {
  version?: string;
  entryId: string;
  data: Record<string, { id: string; [key: string]: unknown }>;
  materialsData: Map<string, { id: string; [key: string]: unknown }>;
  statesData: Record<string, { id: string; [key: string]: unknown }>;
  constraintsData: Map<string, { id: string; [key: string]: unknown }>;
  entities: Record<string, unknown>;
  materials: Map<string, unknown>;
  states: Record<string, unknown>;
  constraints: Record<string, unknown>;
  productsMap: Map<string, unknown>;
  idGenerator: IDGenerator;
  materialIdGenerator: IDGenerator;
  stateIdGenerator: IDGenerator;
  constraintIdGenerator: IDGenerator;
}

interface IDGenerator {
  generate(originalId?: string): string;
  getNewId(originalId: string): string;
}

interface DumpOptions {
  shallowSaveMeta?: boolean;
}

interface ProductMeta {
  id: string;
  seekId: string;
  [key: string]: unknown;
}

interface SaveMetadataEntry {
  metadata: ProductMeta;
  filter?: string[];
}

interface IEntity {
  id: string;
  contentType?: {
    isTypeOf(type: string): boolean;
  };
  metadata?: {
    id: string;
    seekId: string;
    [key: string]: unknown;
  };
  localId?: string;
  getUniqueParent?(): IEntity | undefined;
  getFirstParent?(): IEntity | undefined;
  forEachChild?(callback: (entity: IEntity) => void): void;
  forEachContent?(callback: (entity: IEntity) => void): void;
  forEachMember?(callback: (entity: IEntity) => void): void;
  getRelatedMetaDatas?(): ProductMeta[];
  getMetadataFilterKeys?(meta: ProductMeta): string[];
}

export class EntityUtil {
  static cloneEntityFromJSON(json: EntityJSON): IEntity | undefined {
    const meta = json.meta || {};
    const data: Record<string, { id: string; [key: string]: unknown }> = {};
    const materialsData = new Map<string, { id: string; [key: string]: unknown }>();
    const statesData: Record<string, { id: string; [key: string]: unknown }> = {};
    const constraintsData = new Map<string, { id: string; [key: string]: unknown }>();
    const productsMap = new Map<string, unknown>();
    const entityIdMap = new Map<string, string>();
    const materialIdMap = new Map<string, string>();
    const stateIdMap = new Map<string, string>();
    const constraintIdMap = new Map<string, string>();

    const context: CloneContext = {
      version: meta.version,
      entryId: json.entryId,
      data,
      materialsData,
      statesData,
      constraintsData,
      entities: {},
      materials: new Map(),
      states: {},
      constraints: {},
      productsMap,
      idGenerator: EntityUtil.createIDGeneratorForClone(entityIdMap, HSCore.Util.IDGeneratorType.Entity),
      materialIdGenerator: EntityUtil.createIDGeneratorForClone(materialIdMap, HSCore.Util.IDGeneratorType.Material),
      stateIdGenerator: EntityUtil.createIDGeneratorForClone(stateIdMap, HSCore.Util.IDGeneratorType.State),
      constraintIdGenerator: EntityUtil.createIDGeneratorForClone(constraintIdMap, HSCore.Util.IDGeneratorType.Constraint)
    };

    json.data?.forEach(item => {
      data[item.id] = item;
    });

    json.materials?.forEach(material => {
      materialsData.set(material.id, material);
    });

    json.products?.forEach(productData => {
      const product = HSCatalog.Manager.instance().getProductBySeekIdSync(productData.seekId, { data: productData });
      const productId = product?.id;
      if (productId) {
        productsMap.set(productId, product);
      }
    });

    if (json.states) {
      json.states.forEach(state => {
        statesData[state.id] = state;
      });
      json.states.forEach(state => {
        State.loadFromDump(state, context);
      });
    }

    if (json.constraints) {
      json.constraints.forEach(constraint => {
        constraintsData.set(constraint.id, constraint);
      });
      json.constraints.forEach(constraint => {
        Constraint.loadFromDump(constraint, context);
      });
    }

    return Entity.loadFromDumpById(context.entryId, context);
  }

  static isValidSeekId(seekId: string = ""): boolean {
    if (typeof seekId !== "string") {
      return false;
    }

    const parts = seekId.split("/");
    let idPart = seekId;
    
    if (parts.length >= 3) {
      idPart = parts[2];
    }

    return typeof idPart === "string" && idPart.length === 36 && idPart.indexOf("-") > 0;
  }

  static getMetaToDump(metaId: string, options: DumpOptions = { shallowSaveMeta: false }): ProductMeta | false {
    if (!metaId) {
      return false;
    }

    if (options.shallowSaveMeta && EntityUtil.isValidSeekId(metaId)) {
      return {
        id: metaId,
        seekId: metaId
      };
    }

    return HSCatalog.MetaManager.instance().getBuildingProductMeta(metaId);
  }

  static deepSaveMeta(entity: IEntity): boolean {
    return !!(
      (entity.metadata && !EntityUtil.isValidSeekId(entity.metadata.id)) ||
      entity instanceof HSCore.Model.PAssembly ||
      entity instanceof HSCore.Model.WaterJetTile ||
      entity instanceof HSCore.Model.CustomizedModel ||
      entity instanceof HSCore.Model.NCustomizedFeatureModel
    );
  }

  static saveMetadata(
    entity: IEntity | undefined,
    productsMap: Map<string, ProductMeta | SaveMetadataEntry>,
    filter?: (entity: IEntity) => boolean,
    includeFilter: boolean = false,
    deepSaveCheck?: (entity: IEntity) => boolean
  ): void {
    if (!entity || (filter && !filter(entity))) {
      return;
    }

    if (!(productsMap instanceof Map)) {
      Logger.console.assert(false, "invalid productsMap!");
      return;
    }

    const addMeta = (meta: ProductMeta | undefined): void => {
      if (!meta || productsMap.has(meta.id)) {
        return;
      }

      let metaToSave: ProductMeta = meta;

      if (deepSaveCheck && !deepSaveCheck(entity)) {
        metaToSave = {
          id: meta.id,
          seekId: meta.seekId
        };
      }

      if (includeFilter) {
        const filterKeys = meta instanceof HSCatalog.Meta && entity.getMetadataFilterKeys
          ? entity.getMetadataFilterKeys(meta)
          : undefined;

        productsMap.set(metaToSave.id, {
          metadata: metaToSave,
          filter: filterKeys
        });
      } else {
        productsMap.set(metaToSave.id, metaToSave);
      }
    };

    if (entity.getRelatedMetaDatas) {
      const relatedMetas = entity.getRelatedMetaDatas();
      relatedMetas?.forEach(meta => {
        addMeta(meta);
      });
    }

    addMeta(entity.metadata);
  }

  static createIDGeneratorForClone(idMap: Map<string, string>, generatorType: string): IDGenerator {
    return {
      generate(originalId: string = ""): string {
        let newId = originalId && idMap.get(originalId) || "";
        
        if (!newId) {
          newId = HSCore.Util.IDGenerator.generate(undefined, generatorType);
          const keyId = originalId || newId;
          idMap.set(keyId, newId);
        }

        return newId;
      },

      getNewId(originalId: string): string {
        return idMap.get(originalId) || "";
      }
    };
  }

  static getAllEntities(document?: unknown): Map<string, IEntity> {
    if (!document) {
      document = HSCore.Doc.getDocManager().activeDocument;
    }

    const entitiesMap = new Map<string, IEntity>();

    (document as any).scene.traverse((entity: IEntity) => {
      entitiesMap.set(entity.id, entity);
    });

    (document as any).forEachWall((wall: IEntity) => {
      entitiesMap.set(wall.id, wall);
    });

    (document as any).forEachMolding((molding: IEntity) => {
      entitiesMap.set(molding.id, molding);
    });

    (document as any).forEachMaterial((material: IEntity) => {
      entitiesMap.set(material.id, material);
    });

    (document as any).forEachGroup((group: any) => {
      for (const key of Object.keys(group.members)) {
        entitiesMap.set(group.members[key].id, group.members[key]);
      }
    });

    (document as any).forEachOpening((opening: IEntity) => {
      entitiesMap.set(opening.id, opening);
    });

    return entitiesMap;
  }

  static getRootEntity(entity: IEntity): IEntity {
    let current = entity;
    let parent = current.getUniqueParent?.();

    while (parent && !(parent instanceof HSCore.Model.Layer)) {
      current = parent;
      parent = parent.getUniqueParent?.();
    }

    return current;
  }

  static getParentPAssembly(entity: IEntity | undefined): IEntity | undefined {
    if (!entity) {
      return undefined;
    }

    const firstParent = entity.getFirstParent?.();

    if (firstParent instanceof HSCore.Model.PAssembly) {
      return firstParent;
    }

    if (firstParent instanceof HSCore.Model.PContent) {
      const parentValues = Object.values((firstParent as any).parents);
      if (parentValues[0] instanceof HSCore.Model.PAssembly) {
        return parentValues[0];
      }
    }

    return undefined;
  }

  static isChildOf(entity: IEntity, contentType: string): boolean {
    let parent = entity.getUniqueParent?.();

    while (parent) {
      if (parent.contentType?.isTypeOf(contentType)) {
        return true;
      }
      parent = parent.getUniqueParent?.();
    }

    return false;
  }

  static getParentByContentType(entity: IEntity, contentType: string): IEntity | null {
    let parent = entity.getUniqueParent?.();

    while (parent) {
      if (parent.contentType?.isTypeOf(contentType)) {
        return parent;
      }
      parent = parent.getUniqueParent?.();
    }

    return null;
  }

  static traverseApplyFuncForEntity(entity: IEntity, callback: (entity: IEntity) => void): void {
    callback(entity);

    entity.forEachChild?.((child) => {
      EntityUtil.traverseApplyFuncForEntity(child, callback);
    });

    entity.forEachContent?.((content) => {
      EntityUtil.traverseApplyFuncForEntity(content, callback);
    });

    entity.forEachMember?.((member) => {
      EntityUtil.traverseApplyFuncForEntity(member, callback);
    });
  }

  static traverseApplyFuncForEntities(entities: IEntity[], callback: (entity: IEntity) => void): void {
    entities.forEach(entity => {
      EntityUtil.traverseApplyFuncForEntity(entity, callback);
    });
  }

  static traverseGetEntitiesByContentType(
    entity: IEntity,
    contentType: string,
    result: IEntity[] = [],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[] {
    EntityUtil.traverseApplyFuncForEntity(entity, (currentEntity) => {
      if (currentEntity.contentType?.isTypeOf(contentType)) {
        if (!filterFunc || !filterFunc(currentEntity)) {
          result.push(currentEntity);
        }
      }
    });

    return result;
  }

  static traverseGetEntitiesByContentTypeFromEntities(
    entities: IEntity[],
    contentType: string,
    result: IEntity[] = [],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[] {
    entities.forEach(entity => {
      EntityUtil.traverseGetEntitiesByContentType(entity, contentType, result, filterFunc);
    });

    return result;
  }

  static traverseGetPContentByContentType(
    entity: IEntity,
    contentType: string,
    result: IEntity[] = [],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[] {
    EntityUtil.traverseApplyFuncForEntity(entity, (currentEntity) => {
      if (
        currentEntity instanceof HSCore.Model.PContent &&
        (currentEntity as any).getContent() &&
        (currentEntity as any).getContent().contentType?.isTypeOf(contentType)
      ) {
        if (!filterFunc || !filterFunc(currentEntity)) {
          result.push(currentEntity);
        }
      }
    });

    return result;
  }

  static traverseGetPContentByContentTypeFromEntities(
    entities: IEntity[],
    contentType: string,
    result: IEntity[] = [],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[] {
    entities.forEach(entity => {
      EntityUtil.traverseGetPContentByContentType(entity, contentType, result, filterFunc);
    });

    return result;
  }

  static hasLightStrip(entity: IEntity): boolean {
    let hasStrip = false;

    EntityUtil.traverseApplyFuncForEntity(entity, (currentEntity) => {
      if (
        !hasStrip &&
        currentEntity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.LightMolding) &&
        currentEntity.localId === "lightstrip"
      ) {
        hasStrip = true;
      }
    });

    return hasStrip;
  }

  static getLightStrips(entity: IEntity): IEntity[] {
    const lightStrips: IEntity[] = [];

    EntityUtil.traverseApplyFuncForEntity(entity, (currentEntity) => {
      if (
        currentEntity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.LightMolding) &&
        currentEntity.localId === "lightstrip"
      ) {
        lightStrips.push(currentEntity);
      }
    });

    return lightStrips;
  }

  static getChildLights(entity: IEntity): IEntity[] {
    const lights: IEntity[] = [];

    EntityUtil.traverseApplyFuncForEntity(entity, (currentEntity) => {
      if (currentEntity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.RibbonLampOnBoard)) {
        lights.push(currentEntity);
      }
    });

    return lights;
  }

  static isStructureBody(entity: IEntity): boolean {
    return (
      entity instanceof HSCore.Model.Wall ||
      entity instanceof HSCore.Model.NCustomizedStructure ||
      entity instanceof HSCore.Model.NCustomizedBeam ||
      entity instanceof HSCore.Model.ParametricOpening ||
      entity instanceof HSCore.Model.Opening
    );
  }
}