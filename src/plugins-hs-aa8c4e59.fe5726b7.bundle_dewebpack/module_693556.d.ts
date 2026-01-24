/**
 * Floor plan entity collection and material management module.
 * Provides functionality to collect entities and product seek IDs from floor plans.
 */

import { HSCatalog } from './catalog';
import { HSCore } from './core';
import { HSConstants } from './constants';
import { HSApp } from './app';
import { Utils } from './utils';
import { LayerEntity } from './entities/layer';
import { SlabEntity } from './entities/slab';
import { RoomEntity } from './entities/room';
import { WallEntity } from './entities/wall';
import { ContentEntity } from './entities/content';
import { FaceEntity } from './entities/face';
import { WindowEntity } from './entities/window';
import { HoleEntity } from './entities/hole';
import { DoorEntity } from './entities/door';
import { ParameterWindowEntity } from './entities/parameter-window';
import { NormalMoldingEntity } from './entities/normal-molding';
import { registerProvider, registerSeekMateDataHandle, wrapPromiseEntities } from './registry';

/**
 * Product metadata information from the building catalog.
 */
interface ProductMeta {
  /** Unique identifier for the product */
  seekId: string;
  /** Additional metadata fields */
  [key: string]: unknown;
}

/**
 * Material area information for customized models.
 */
interface MaterialArea {
  /** Surface area of the material application */
  area: number;
  /** Material definition */
  material: Material;
}

/**
 * Material definition with color and seek ID.
 */
interface Material {
  /** Unique product identifier */
  seekId: string;
  /** Material color value */
  color: number;
  /** Additional material properties */
  [key: string]: unknown;
}

/**
 * Generic entity interface for floor plan components.
 */
interface Entity {
  /** Get unique instance identifier */
  getInstanceId(): string;
  /** Accept visitor pattern implementation */
  accept(...args: unknown[]): Entity;
  /** Additional entity properties */
  [key: string]: unknown;
}

/**
 * Fetches product metadata by seek IDs from the catalog.
 * Handles both cached and remote product lookups.
 * 
 * @param seekIds - Array of product seek identifiers
 * @returns Map of seek IDs to product metadata
 */
async function fetchProductMetaBySeekIds(seekIds: string[]): Promise<Map<string, ProductMeta>> {
  const catalogManager = HSCatalog.Manager.instance();
  const productMetaMap = new Map<string, ProductMeta>();
  const uncachedSeekIds: string[] = [];

  // Check cache first
  seekIds.forEach((seekId) => {
    if (!seekId) return;

    const cachedMeta = catalogManager.getBuildingProductMeta(seekId);
    if (cachedMeta) {
      productMetaMap.set(cachedMeta.seekId, cachedMeta);
    } else {
      uncachedSeekIds.push(seekId);
    }
  });

  // Fetch uncached products from remote
  if (uncachedSeekIds.length > 0) {
    try {
      const remoteProducts = await catalogManager.getProductsBySeekIds(uncachedSeekIds, false);
      
      for (const seekId in remoteProducts) {
        productMetaMap.set(seekId, remoteProducts[seekId]);
      }
    } catch (error) {
      console.warn('Failed to fetch products by seek IDs:', error);
    }
  }

  return productMetaMap;
}

/**
 * Adds all items from a collection to a target set.
 * 
 * @param targetSet - Set to add items to
 * @param collection - Iterable collection of items to add
 * @returns The modified target set
 */
function addAllToSet<T>(targetSet: Set<T>, collection: Iterable<T>): Set<T> {
  for (const item of collection) {
    targetSet.add(item);
  }
  return targetSet;
}

/**
 * Collects all paint product seek IDs used in the current floor plan.
 * Scans slabs, structural faces, beams, openings, and customized models.
 * 
 * @returns Array of unique product seek IDs
 */
function collectPaintProductSeekIds(): string[] {
  const app = HSApp.App.getApp();
  const seekIdSet = new Set<string>();

  // Collect from slabs
  app.floorplan.forEachSlab((slab) => {
    slab.forEachFace((face) => {
      const paintIds = Utils.collectPaintsProductIdsByFace(face);
      addAllToSet(seekIdSet, paintIds);
    });
  });

  // Collect from structural faces
  app.floorplan.forEachStructureFace((face) => {
    const paintIds = Utils.collectPaintsProductIdsByFace(face);
    addAllToSet(seekIdSet, paintIds);
  });

  // Collect from beams
  app.floorplan.forEachBeam((beam) => {
    beam.faceList.forEach((face) => {
      const paintIds = Utils.collectPaintsProductIdsByFace(face);
      addAllToSet(seekIdSet, paintIds);
    });
  });

  // Collect from openings
  app.floorplan.forEachOpening((opening) => {
    opening.forEachFace((face) => {
      const paintIds = Utils.collectPaintsProductIdsByFace(face);
      addAllToSet(seekIdSet, paintIds);
    });
  });

  // Collect from customized models
  app.floorplan.forEachContent((content) => {
    if (
      content instanceof HSCore.Model.CustomizedModel ||
      content instanceof HSCore.Model.NCustomizedFeatureModel
    ) {
      const materialsAreaIterator = content.getMaterialsArea().values();
      
      for (const materialArea of materialsAreaIterator) {
        const { area, material } = materialArea;
        const hasValidArea = Math.abs(area) > 0;
        const hasCustomColor = material.color !== HSConstants.Constants.CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR;
        const isValidMaterial = Utils.isValidMaterial(material);

        if (hasValidArea && hasCustomColor && isValidMaterial) {
          seekIdSet.add(material.seekId);
        }
      }
    }
  });

  return Array.from(seekIdSet);
}

/**
 * Collects all layer entities from the scene.
 * Traverses both forward and backward from the root layer.
 * 
 * @param entities - Array to append layer entities to
 */
function collectLayerEntities(entities: Entity[]): void {
  let currentLayer = HSApp.App.getApp().floorplan.scene.rootLayer;
  let layerIndex = 0;

  // Collect root and forward layers
  entities.push(new LayerEntity().accept(currentLayer, { index: layerIndex }));
  
  while (currentLayer.next) {
    currentLayer = currentLayer.next;
    layerIndex++;
    entities.push(new LayerEntity().accept(currentLayer, { index: layerIndex }));
  }

  // Collect backward layers
  currentLayer = HSApp.App.getApp().floorplan.scene.rootLayer;
  layerIndex = 0;
  
  while (currentLayer.prev) {
    currentLayer = currentLayer.prev;
    layerIndex--;
    entities.push(new LayerEntity().accept(currentLayer, { index: layerIndex }));
  }
}

/**
 * Collects content entities from a layer, excluding certain model types.
 * 
 * @param layer - Layer to collect content from
 * @returns Array of content entities
 */
function collectContentEntities(layer: unknown): Entity[] {
  const contentEntities: Entity[] = [];
  
  (layer as any).forEachContent((content: any) => {
    const isRemoved = content.isFlagOn(HSCore.Model.EntityFlagEnum.removed);
    const isCustomized = content instanceof HSCore.Model.CustomizedModel;
    const isCornerWindow = content instanceof HSCore.Model.CornerWindow;

    if (!isRemoved && !isCustomized && !isCornerWindow) {
      contentEntities.push(new ContentEntity().accept(content));
    }
  });

  return contentEntities;
}

/**
 * Collects face and molding entities from a layer's space information.
 * 
 * @param layer - Layer to collect faces from
 * @returns Array of face and molding entities
 */
function collectFaceEntities(layer: unknown): Entity[] {
  const faceEntities: Entity[] = [];
  const moldingEntities: Entity[] = [];

  const spaceInfos = (layer as any).layerInfo.getSpaceInfos();

  /**
   * Processes a face and its moldings if not already collected.
   */
  const processFace = (face: any, roomId: string): void => {
    const alreadyCollected = faceEntities.some(
      (entity) => entity.getInstanceId() === face.id
    );

    if (!alreadyCollected) {
      faceEntities.push(new FaceEntity(roomId).accept(face));

      face.forEachMolding((molding: any) => {
        if (molding.XSize && molding.YSize) {
          moldingEntities.push(new NormalMoldingEntity(roomId).accept(molding));
        }
      });
    }
  };

  spaceInfos.forEach((spaceInfo: any) => {
    const roomId = spaceInfo.floors[0]?.id ?? '';

    spaceInfo.floors?.forEach((floor: any) => processFace(floor, roomId));
    spaceInfo.ceilings?.forEach((ceiling: any) => processFace(ceiling, roomId));
    spaceInfo.structureFaces?.forEach((face: any) => processFace(face, roomId));
    spaceInfo.beamFaces?.forEach((beamFace: any) => {
      if (Utils.isNotOverlappingBeamFaces(beamFace)) {
        processFace(beamFace, roomId);
      }
    });
  });

  return [...faceEntities, ...moldingEntities];
}

/**
 * Collects opening entities (windows, doors, holes) from a layer.
 * 
 * @param layer - Layer to collect openings from
 * @returns Array of opening entities
 */
function collectOpeningEntities(layer: unknown): Entity[] {
  const openingEntities: Entity[] = [];

  // Collect standard openings
  (layer as any).forEachOpening((opening: any) => {
    if (opening instanceof HSCore.Model.Window) {
      openingEntities.push(new WindowEntity().accept(opening));
    } else if (opening instanceof HSCore.Model.Hole) {
      openingEntities.push(new HoleEntity().accept(opening));
    } else if (opening instanceof HSCore.Model.Door) {
      openingEntities.push(new DoorEntity().accept(opening));
    }
  });

  // Collect corner windows from content
  (layer as any).forEachContent((content: any) => {
    if (content instanceof HSCore.Model.CornerWindow) {
      openingEntities.push(new ParameterWindowEntity().accept(content));
    }
  });

  // Collect parametric openings
  const parametricOpenings = Object.values((layer as any).parametricOpenings);
  parametricOpenings.forEach((parametricOpening: any) => {
    openingEntities.push(new ParameterWindowEntity().accept(parametricOpening));
  });

  return openingEntities;
}

/**
 * Collects all entities from the floor plan scene.
 * Includes layers, slabs, rooms, walls, content, faces, and openings.
 * 
 * @returns Array of all collected entities
 */
function collectAllEntities(): Entity[] {
  const allEntities: Entity[] = [];
  const app = HSApp.App.getApp();

  // Collect layer hierarchy
  collectLayerEntities(allEntities);

  // Collect entities from each layer
  app.floorplan.scene.forEachLayer((layer: any) => {
    // Slabs
    layer.forEachSlab((slab: any) => {
      allEntities.push(new SlabEntity().accept(slab));
    });

    // Rooms
    layer.forEachFloor((floor: any) => {
      if (floor.roomInfos.length > 0) {
        allEntities.push(new RoomEntity().accept(floor));
      }
    });

    // Walls
    layer.forEachWall((wall: any) => {
      allEntities.push(new WallEntity().accept(wall));
    });

    // Content
    allEntities.push(...collectContentEntities(layer));

    // Faces and moldings
    allEntities.push(...collectFaceEntities(layer));

    // Openings
    allEntities.push(...collectOpeningEntities(layer));
  });

  return allEntities;
}

/**
 * Collects all entities from the floor plan, wrapping in promise if needed.
 * Main entry point for entity collection.
 * 
 * @returns Array of entities or Promise resolving to entities
 */
async function collectFloorPlanEntities(): Promise<Entity[]> {
  const entities: Entity[] = [];
  entities.push(...collectAllEntities());

  const wrappedEntities = wrapPromiseEntities(entities);

  if (wrappedEntities instanceof Promise) {
    return await wrappedEntities;
  }

  return wrappedEntities;
}

// Register the floor plan provider
registerProvider(
  { type: 'FloorPlan' },
  {
    collectEntity: collectFloorPlanEntities,
    collectSeekIds: collectPaintProductSeekIds,
  }
);

// Register the seek metadata handler
registerSeekMateDataHandle(fetchProductMetaBySeekIds);