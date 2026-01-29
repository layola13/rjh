import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSApp } from './HSApp';
import { HSCatalog } from './HSCatalog';

interface WallInfo {
  wall: HSCore.Model.Wall;
  type: string;
}

interface CopyWallsResult {
  newWalls: HSCore.Model.Wall[];
  newOpeningWallMp: Map<HSCore.Model.Opening | HSCore.Model.ParametricOpening, HSCore.Model.Wall>;
}

interface ContentsJSON {
  data: unknown[];
  states: unknown[];
  constraints: unknown[];
  products: unknown[];
  materials: unknown[];
  environmentId: string;
  viewMode: string;
}

interface LoadContext {
  data: Record<string, unknown>;
  statesData: Record<string, unknown>;
  constraintsData: Map<string, unknown>;
  materialsData: Map<string, unknown>;
  productsMap: Map<string, HSCatalog.Meta>;
  entities: Record<string, unknown>;
  materials: Map<string, HSCore.Material.MaterialData>;
  states: Record<string, HSCore.State.State>;
  constraints: Record<string, HSCore.Constraint.Constraint>;
  idGenerator: () => string;
  materialIdGenerator: () => string;
  stateIdGenerator: () => string;
  constraintIdGenerator: () => string;
}

export function cleanLayerCeiling(layer: HSCore.Model.Layer): void {
  const floorSlabValues = Object.values(layer.floorSlabs);
  
  layer.slabFaces.forEach((face) => {
    const faceType = HSCore.Util.Face.getFaceType(face);
    if (!['side', 'top'].includes(faceType) && !floorSlabValues.includes(face.getMaster())) {
      face.parent.removeChild(face);
    }
  });

  layer.forEachContent((content) => {
    if (
      content instanceof HSCore.Model.NCustomizedCeilingModel ||
      content instanceof HSCore.Model.NCustomizedParametricCeiling ||
      content instanceof HSCore.Model.CustomizedCeilingModel
    ) {
      Object.values(content.contents).forEach((child) => {
        child.parent.removeChild(child);
      });
      content.parent.removeChild(content);
    }
  });
}

export function cleanLayerFloor(layer: HSCore.Model.Layer): void {
  const floorSlabValues = Object.values(layer.floorSlabs);
  
  layer.slabFaces.forEach((face) => {
    const faceType = HSCore.Util.Face.getFaceType(face);
    if (
      faceType === 'top' &&
      !(face instanceof HSCore.Model.Floor) &&
      floorSlabValues.includes(face.getMaster())
    ) {
      face.parent.removeChild(face);
    }
  });

  layer.forEachContent((content) => {
    if (
      (content instanceof HSCore.Model.NCustomizedPlatform ||
        content instanceof HSCore.Model.CustomizedPlatform) &&
      !(content.host instanceof HSCore.Model.Floor)
    ) {
      Object.values(content.contents).forEach((child) => {
        child.parent.removeChild(child);
      });
      content.parent.removeChild(content);
    }
  });
}

export function copyWallsWithOpenings(walls: HSCore.Model.Wall[]): CopyWallsResult {
  const wallMap: Record<string, HSCore.Model.Wall> = {};
  const openingWallMap = new Map<HSCore.Model.Opening | HSCore.Model.ParametricOpening, HSCore.Model.Wall>();

  for (const wall of walls) {
    const clonedWall = wall.clone();
    wallMap[wall.id] = clonedWall;

    const openings = Object.values(wall.openings);
    for (const opening of openings) {
      const copiedOpening = copyOpening(opening);
      if (copiedOpening && copiedOpening instanceof HSCore.Model.Opening) {
        openingWallMap.set(copiedOpening, clonedWall);
      }
    }

    const parametricOpenings = Array.from(wall.parametricOpenings.values());
    for (const parametricOpening of parametricOpenings) {
      const copiedOpening = copyOpening(parametricOpening);
      if (copiedOpening && copiedOpening instanceof HSCore.Model.ParametricOpening) {
        copiedOpening.relatedWalls.push(clonedWall);
        openingWallMap.set(copiedOpening, clonedWall);
      }
    }
  }

  const docManager = HSCore.Doc.getDocManager();
  const activeDocument = docManager.activeDocument;
  const allWallJoints = walls
    .map((wall) => activeDocument.wallJointManager.getWallJoints(wall))
    .flat();
  const uniqueWallJoints = Array.from(new Set(allWallJoints));

  for (const wallJoint of uniqueWallJoints) {
    const newWallJoint = HSCore.Model.WallJoint.create(wallJoint.type);
    const newWallInfos: WallInfo[] = [];

    for (const wallInfo of wallJoint.wallInfos) {
      const originalWall = wallInfo.wall;
      const infoType = wallInfo.type;
      const newWall = wallMap[originalWall.id];
      newWallInfos.push({
        wall: newWall,
        type: infoType,
      });
    }

    newWallJoint.wallInfos = newWallInfos;
  }

  return {
    newWalls: Object.values(wallMap),
    newOpeningWallMp: openingWallMap,
  };
}

export function copyOpening(opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening): HSCore.Model.Opening | HSCore.Model.ParametricOpening | null {
  const contentsJSON = generateContentsJSON(opening);
  const supportedEntities: unknown[] = [];

  for (let i = 0; i < contentsJSON.data.length; i++) {
    const entity = contentsJSON.data[i] as any;
    const className = HSCore.Model.Entity.getDumpedClassName(entity);
    const longClassName = HSConstants.ClassSNameToLName.get(className);
    if (isSupported(longClassName)) {
      supportedEntities.push(entity);
    }
  }

  const filteredEntities = supportedEntities.filter((entity: any) => {
    return contentsJSON.data.find((data: any) => data.id === entity.p?.[0]) === undefined;
  });

  if (filteredEntities.length === 0) {
    return null;
  }

  const catalogManager = HSApp.App.getApp().catalogManager;
  const seekIdMap: Record<string, boolean> = {};
  const productsMap = new Map<string, HSCatalog.Meta>();

  for (const entity of filteredEntities as any[]) {
    seekIdMap[entity.seekId] = true;
    const product = catalogManager.getProductBySeekIdSync(entity.seekId);
    if (product) {
      productsMap.set(product.id, product);
    }
  }

  if (contentsJSON.products) {
    for (const productData of contentsJSON.products as any[]) {
      if (productData?.id && !seekIdMap[productData.id]) {
        seekIdMap[productData.id] = true;
        const product = catalogManager.getProductBySeekIdSync(productData.id, {
          data: productData,
        });
        if (product) {
          productsMap.set(product.id, product);
        }
      }
    }
  }

  const context = generateContext(contentsJSON, productsMap);
  return HSCore.Model.Entity.loadFromDump(filteredEntities[0], context);
}

export function isSupported(modelClass: string): boolean {
  const supportedClasses = [
    HSConstants.ModelClass.NgDoor,
    HSConstants.ModelClass.NgWindow,
    HSConstants.ModelClass.NgHole,
    HSConstants.ModelClass.NgBayWindow,
    HSConstants.ModelClass.NgCornerWindow,
    HSConstants.ModelClass.NgCornerFlatWindow,
    HSConstants.ModelClass.NgPOrdinaryWindow,
    HSConstants.ModelClass.ParametricOpening,
    HSConstants.ModelClass.ParametricDoor,
  ];

  return supportedClasses.includes(modelClass);
}

export function generateContentsJSON(entity: HSCore.Model.Entity): ContentsJSON {
  const dumpContext = {
    materialsData: new Map<string, unknown>(),
    productsMap: new Map<string, HSCatalog.Meta>(),
  };

  const dumpedData = entity.dump(undefined, true, dumpContext);
  const entityIds = Array.from(new Set(dumpedData.map((item: any) => item.id)));
  const entitiesMap = new Map<string, HSCore.Model.Entity>();
  HSApp.Util.Entity.getEntities(entityIds, entitiesMap);

  const entities = Array.from(entitiesMap.values()).filter((e) => !!e);
  const states = collectStates(entities);
  const constraints = collectConstraints(entities);
  const products = collectProducts(entities, dumpContext.productsMap);
  const materials = Array.from(dumpContext.materialsData.values());

  const app = HSApp.App.getApp();

  return {
    data: dumpedData,
    states,
    constraints,
    products,
    materials,
    environmentId: app.activeEnvironmentId,
    viewMode: app.primaryViewMode,
  };
}

function collectStates(entities: HSCore.Model.Entity[]): unknown[] {
  const statesMap: Record<string, HSCore.State.State> = {};

  entities.forEach((entity) => {
    HSCore.Util.State.collectStates(entity, (state) => {
      statesMap[state.ID] = state;
    });

    if (entity instanceof HSCore.Model.Opening) {
      entity.forEachFace((face) => {
        if (face.material?.patterns) {
          Object.values(face.material.patterns).forEach((pattern) => {
            HSCore.Util.State.collectStates(pattern, (state) => {
              statesMap[state.id] = state;
            });
          });
        }
      });
    }

    if (entity instanceof HSCore.Material.Material && entity.patterns) {
      Object.values(entity.patterns).forEach((pattern) => {
        HSCore.Util.State.collectStates(pattern, (state) => {
          statesMap[state.ID] = state;
        });
      });
    }
  });

  const dumpedStates: unknown[] = [];
  Object.values(statesMap).forEach((state) => {
    Array.prototype.push.apply(dumpedStates, state.dump());
  });

  const uniqueStates: Record<string, unknown> = {};
  dumpedStates.forEach((state: any) => {
    uniqueStates[state.id] = state;
  });

  return Object.values(uniqueStates);
}

function collectConstraints(entities: HSCore.Model.Entity[]): unknown[] {
  const constraints: unknown[] = [];

  entities.forEach((entity) => {
    HSCore.Util.Constraint.collectConstraints(entity, (constraint) => {
      const dumped = constraint.dump();
      if (dumped.length > 0) {
        constraints.push(dumped[0]);
      }
    });

    if (entity instanceof HSCore.Material.Material && entity.patterns) {
      Object.values(entity.patterns).forEach((pattern) => {
        HSCore.Util.Constraint.collectConstraints(pattern, (constraint) => {
          const dumped = constraint.dump();
          if (dumped.length > 0) {
            constraints.push(dumped[0]);
          }
        });
      });
    }
  });

  return constraints;
}

function collectProducts(entities: HSCore.Model.Entity[], productsMap: Map<string, HSCatalog.Meta>): unknown[] {
  const collectPatternMetadata = (material: HSCore.Material.Material | undefined): void => {
    if (material?.patterns) {
      Object.values(material.patterns).forEach((pattern) => {
        if (pattern?.metadata) {
          productsMap.set(pattern.metadata.id, pattern.metadata);
          Object.values(pattern.children ?? {}).forEach((child) => {
            if (child?.material?.metadata) {
              productsMap.set(child.material.metadata.id, child.material.metadata);
            }
          });
        }
      });
    }
  };

  entities.forEach((entity) => {
    const metadata = entity.metadata;
    
    if (entity.getRelatedMetaDatas) {
      entity.getRelatedMetaDatas().forEach((meta) => {
        if (!productsMap.has(meta.id)) {
          productsMap.set(meta.id, meta);
        }
      });
    }

    if (metadata) {
      productsMap.set(metadata.id, metadata);
    }

    if (entity instanceof HSCore.Model.Opening) {
      entity.forEachFace((face) => {
        collectPatternMetadata(face.material);
      });
    } else if (entity instanceof HSCore.Material.Material) {
      collectPatternMetadata(entity);
    }
  });

  return Array.from(productsMap.values()).map((product) => {
    if (product) {
      return product.toJSON ? product.toJSON() : structuredClone(product);
    }
    return undefined;
  }).filter((p): p is NonNullable<typeof p> => p !== undefined);
}

export function generateContext(contentsJSON: ContentsJSON | null, productsMap: Map<string, HSCatalog.Meta>): LoadContext | null {
  if (!contentsJSON) {
    return null;
  }

  const entityIdMap = new Map<string, string>();
  const materialIdMap = new Map<string, string>();
  const stateIdMap = new Map<string, string>();
  const constraintIdMap = new Map<string, string>();
  const materialsDataMap = new Map<string, unknown>();
  const statesDataMap: Record<string, unknown> = {};
  const constraintsDataMap = new Map<string, unknown>();

  const context: LoadContext = {
    data: {},
    statesData: statesDataMap,
    constraintsData: constraintsDataMap,
    materialsData: materialsDataMap,
    productsMap,
    entities: {},
    materials: new Map<string, HSCore.Material.MaterialData>(),
    states: {},
    constraints: {},
    idGenerator: HSCore.Util.Entity.createIDGeneratorForClone(entityIdMap, HSCore.Util.IDGeneratorType.Entity),
    materialIdGenerator: HSCore.Util.Entity.createIDGeneratorForClone(materialIdMap, HSCore.Util.IDGeneratorType.Material),
    stateIdGenerator: HSCore.Util.Entity.createIDGeneratorForClone(stateIdMap, HSCore.Util.IDGeneratorType.State),
    constraintIdGenerator: HSCore.Util.Entity.createIDGeneratorForClone(constraintIdMap, HSCore.Util.IDGeneratorType.Constraint),
  };

  contentsJSON.data.forEach((item: any) => {
    context.data[item.id] = item;
  });

  contentsJSON.states.forEach((state: any) => {
    statesDataMap[state.id] = state;
  });

  contentsJSON.states.forEach((state: any) => {
    const loadedState = HSCore.State.State.loadFromDump(state, context);
    context.states[state.id] = loadedState;
  });

  contentsJSON.constraints.forEach((constraint: any) => {
    constraintsDataMap.set(constraint.id, constraint);
  });

  contentsJSON.constraints.forEach((constraint: any) => {
    const loadedConstraint = HSCore.Constraint.Constraint.loadFromDump(constraint, context);
    context.constraints[constraint.id] = loadedConstraint;
  });

  if (contentsJSON.materials) {
    contentsJSON.materials.forEach((material: any) => {
      materialsDataMap.set(material.id, material);
    });

    contentsJSON.materials.forEach((material: any) => {
      const loadedMaterial = HSCore.Material.MaterialData.loadFromDump(material, context);
      context.materials.set(material.id, loadedMaterial);
    });
  }

  contentsJSON.products.forEach((product: any) => {
    if (product && (!productsMap.has(product.id) || HSCatalog.ProductTypeEnum.PAssembly === product.productType)) {
      const meta = HSCatalog.Meta.load(product);
      productsMap.set(product.id, meta);
    }
  });

  return context;
}