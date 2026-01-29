export interface MaterialData {
  material: any;
  environmentId: string;
  viewMode: string;
}

export interface CopyPasteData {
  data: any[];
  states: any[];
  constraints: any[];
  products: any[];
  materials: any[];
  environmentId: string;
  viewMode: string;
  isComplete?: boolean;
}

export interface DumpContext {
  materialsData: Map<string, any>;
  productsMap: Map<string, any>;
}

/**
 * Check if the model class supports copy/paste operations
 */
export function isCopyPasteSupported(modelClass: number): boolean {
  const t = HSConstants.ModelClass;
  
  switch (modelClass) {
    case t.NgContent:
    case t.NgGroup:
    case t.NgDoor:
    case t.NgWindow:
    case t.NgHole:
    case t.NgCurtain:
    case t.NgCustomizedModel:
    case t.NCustomizedParametricCeiling:
    case t.NCustomizedParametricBackgroundWall:
    case t.NCPBackgroundWallUnit:
    case t.ParametricBathroomCabinet:
    case t.ParametricCurtain:
    case t.NgBayWindow:
    case t.NgCornerWindow:
    case t.NgCornerFlatWindow:
    case t.NgPOrdinaryWindow:
    case t.NgFlue:
    case t.NgBeam:
    case t.NgSewerPipe:
    case t.NgColumn:
    case t.NgPAssembly:
    case t.ParametricOpening:
    case t.ParametricDoor:
    case t.NCustomizedParametricStairs:
      return true;
    default:
      return false;
  }
}

/**
 * Flatten nested members recursively
 */
function flattenMembers(entities: any[]): any[] {
  if (!entities || entities.length === 0) {
    return [];
  }
  
  let result: any[] = [];
  
  entities.forEach((entity) => {
    result.push(entity);
    
    if (entity.members && entity.members.length > 0) {
      result = result.concat(flattenMembers(entity.members));
    }
  });
  
  return result;
}

/**
 * Check if entity is a parametric drawer assembly
 */
function isParametricDrawer(entity: any): boolean {
  return entity instanceof HSCore.Model.PAssembly && 
         entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamDrawer);
}

/**
 * Check if entity is a parametric swing door assembly
 */
function isParametricSwingDoor(entity: any): boolean {
  return entity instanceof HSCore.Model.PAssembly && 
         (entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoor) || 
          entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf));
}

/**
 * Collect states from entities
 */
function collectStates(entities: any[]): any[] {
  const statesMap: Record<string, any> = {};
  
  entities.forEach((entity) => {
    HSCore.Util.State.collectStates(entity, (state: any) => {
      statesMap[state.ID] = state;
    });
    
    if (entity instanceof HSCore.Model.Opening) {
      entity.forEachFace((face: any) => {
        if (face.material?.patterns) {
          Object.values(face.material.patterns).forEach((pattern: any) => {
            HSCore.Util.State.collectStates(pattern, (state: any) => {
              statesMap[state.id] = state;
            });
          });
        }
      });
    }
    
    if (entity instanceof HSCore.Material.Material && entity.patterns) {
      Object.values(entity.patterns).forEach((pattern: any) => {
        HSCore.Util.State.collectStates(pattern, (state: any) => {
          statesMap[state.ID] = state;
        });
      });
    }
  });
  
  const statesList: any[] = [];
  Object.values(statesMap).forEach((state) => {
    Array.prototype.push.apply(statesList, state.dump());
  });
  
  const uniqueStates: Record<string, any> = {};
  statesList.forEach((state) => {
    uniqueStates[state.id] = state;
  });
  
  return Object.values(uniqueStates);
}

/**
 * Collect constraints from entities
 */
function collectConstraints(entities: any[]): any[] {
  const constraints: any[] = [];
  
  entities.forEach((entity) => {
    HSCore.Util.Constraint.collectConstraints(entity, (constraint: any) => {
      const dumped = constraint.dump();
      if (dumped.length > 0) {
        constraints.push(dumped[0]);
      }
    });
    
    if (entity instanceof HSCore.Material.Material && entity.patterns) {
      Object.values(entity.patterns).forEach((pattern: any) => {
        HSCore.Util.Constraint.collectConstraints(pattern, (constraint: any) => {
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

/**
 * Collect products and metadata from entities
 */
function collectProducts(entities: any[], productsMap: Map<string, any>): any[] {
  const collectMaterialPatterns = (material: any) => {
    if (material?.patterns) {
      Object.values(material.patterns).forEach((pattern: any) => {
        if (pattern?.metadata) {
          productsMap.set(pattern.metadata.id, pattern.metadata);
          
          Object.values(pattern.children).forEach((child: any) => {
            if (child?.material?.metadata) {
              productsMap.set(child.material.metadata.id, child.material.metadata);
            }
          });
        }
      });
    }
  };
  
  const collectEntityMetadata = (entity: any) => {
    const metadata = entity.metadata;
    
    if (entity.getRelatedMetaDatas) {
      entity.getRelatedMetaDatas().forEach((relatedMetadata: any) => {
        if (!productsMap.has(relatedMetadata.id)) {
          productsMap.set(relatedMetadata.id, relatedMetadata);
        }
      });
    }
    
    if (metadata) {
      productsMap.set(metadata.id, metadata);
    }
    
    if (entity instanceof HSCore.Model.Opening) {
      entity.forEachFace((face: any) => {
        collectMaterialPatterns(face.material);
      });
    } else if (entity instanceof HSCore.Material.Material) {
      collectMaterialPatterns(entity);
    }
  };
  
  entities.forEach((entity) => {
    collectEntityMetadata(entity);
  });
  
  return Array.from(productsMap.values()).map((metadata) => {
    if (metadata) {
      return metadata.toJSON ? metadata.toJSON() : _.cloneDeep(metadata);
    }
  });
}

/**
 * Serialize selected entities to JSON
 */
function serializeEntities(entities: any[]): CopyPasteData | null {
  if (!entities || entities.length === 0) {
    return null;
  }
  
  const context: DumpContext = {
    materialsData: new Map(),
    productsMap: new Map()
  };
  
  let dumpedData: any[] = [];
  entities.forEach((entity) => {
    dumpedData.xPushCollection(entity.dump(undefined, true, context));
  });
  
  const uniqueIds = Array.from(new Set(dumpedData.map((item) => item.id)));
  const entitiesMap = new Map();
  HSApp.Util.Entity.getEntities(uniqueIds, entitiesMap);
  
  const resolvedEntities = Array.from(entitiesMap.values()).filter((entity) => !!entity);
  
  const materials = Array.from(context.materialsData.values());
  const states = collectStates(resolvedEntities);
  const constraints = collectConstraints(resolvedEntities);
  const products = collectProducts(resolvedEntities, context.productsMap);
  
  const app = HSApp.App.getApp();
  
  return {
    data: dumpedData,
    states,
    constraints,
    products,
    materials,
    environmentId: app.activeEnvironmentId,
    viewMode: app.primaryViewMode
  };
}

/**
 * Get selected entities in JSON format for copy/paste
 */
export function getSelectedInJSON(selectedEntities: any[]): MaterialData | CopyPasteData | null {
  if (selectedEntities.length === 1) {
    const entity = selectedEntities[0];
    const isSurface = entity.Class === HSConstants.ModelClass.NgFace || 
                      entity.Class === HSConstants.ModelClass.NgCeiling || 
                      entity.Class === HSConstants.ModelClass.NgFloor;
    
    if (isSurface) {
      const materialData = entity.getMaterial().saveToJSON();
      const app = HSApp.App.getApp();
      
      return {
        material: materialData,
        environmentId: app.activeEnvironmentId,
        viewMode: app.primaryViewMode
      };
    }
  }
  
  let isComplete = true;
  
  const filteredEntities = selectedEntities.filter((entity) => {
    if (!isCopyPasteSupported(entity.Class) || 
        isParametricDrawer(entity) || 
        isParametricSwingDoor(entity)) {
      isComplete = false;
      return false;
    }
    return true;
  });
  
  const flatEntities = flattenMembers(filteredEntities);
  const result = serializeEntities(flatEntities);
  
  if (result) {
    result.isComplete = isComplete;
  }
  
  return result;
}