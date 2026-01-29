import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSApp } from './HSApp';
import { wrapPromiseEntities } from './wrapPromiseEntities';
import { LayerEntity } from './LayerEntity';
import { SlabEntity } from './SlabEntity';
import { RoomEntity } from './RoomEntity';
import { WallEntity } from './WallEntity';
import { ContentEntity } from './ContentEntity';
import { FaceEntity } from './FaceEntity';
import { NormalMoldingEntity } from './NormalMoldingEntity';
import { WindowEntity } from './WindowEntity';
import { HoleEntity } from './HoleEntity';
import { DoorEntity } from './DoorEntity';
import { ParameterWindowEntity } from './ParameterWindowEntity';
import { Utils } from './Utils';
import { registerProvider, registerSeekMateDataHandle } from './registry';

interface ProductMeta {
  seekId: string;
  [key: string]: unknown;
}

interface MaterialArea {
  area: number;
  material: Material;
}

interface Material {
  seekId: string;
  color: number;
}

interface SpaceInfo {
  floors?: Face[];
  ceilings?: Face[];
  structureFaces?: Face[];
  beamFaces?: Face[];
}

interface Face {
  id: string;
  forEachMolding(callback: (molding: Molding) => void): void;
}

interface Molding {
  XSize: number;
  YSize: number;
}

interface Layer {
  next?: Layer;
  prev?: Layer;
  forEachSlab(callback: (slab: unknown) => void): void;
  forEachFloor(callback: (floor: Floor) => void): void;
  forEachWall(callback: (wall: unknown) => void): void;
  forEachContent(callback: (content: Content) => void): void;
  forEachOpening(callback: (opening: Opening) => void): void;
  layerInfo: {
    getSpaceInfos(): SpaceInfo[];
  };
  parametricOpenings: Record<string, unknown>;
}

interface Floor {
  roomInfos: unknown[];
  id: string;
}

interface Content {
  isFlagOn(flag: number): boolean;
  getMaterialsArea?(): IterableIterator<MaterialArea>;
}

interface Opening {
  forEachFace(callback: (face: Face) => void): void;
}

interface Floorplan {
  scene: {
    rootLayer: Layer;
    forEachLayer(callback: (layer: Layer) => void): void;
  };
  forEachSlab(callback: (slab: { forEachFace(callback: (face: Face) => void): void }) => void): void;
  forEachStructureFace(callback: (face: Face) => void): void;
  forEachBeam(callback: (beam: { faceList: Face[] }) => void): void;
  forEachOpening(callback: (opening: Opening) => void): void;
  forEachContent(callback: (content: Content) => void): void;
}

async function fetchProductMetaBySeekIds(seekIds: string[]): Promise<Map<string, ProductMeta>> {
  const catalogManager = HSCatalog.Manager.instance();
  const productMetaMap = new Map<string, ProductMeta>();
  const missingSeekIds: string[] = [];

  seekIds.forEach((seekId) => {
    if (seekId) {
      const productMeta = catalogManager.getBuildingProductMeta(seekId);
      if (productMeta) {
        productMetaMap.set(productMeta.seekId, productMeta);
      } else {
        missingSeekIds.push(seekId);
      }
    }
  });

  if (missingSeekIds.length > 0) {
    let fetchedProducts: Record<string, ProductMeta> = {};
    try {
      fetchedProducts = await catalogManager.getProductsBySeekIds(missingSeekIds, false);
    } catch (error) {
      console.warn(error);
    }

    for (const seekId in fetchedProducts) {
      productMetaMap.set(seekId, fetchedProducts[seekId]);
    }
  }

  return productMetaMap;
}

function collectPaintProductSeekIds(): string[] {
  const app = HSApp.App.getApp();
  const seekIdSet = new Set<string>();

  const addToSet = (targetSet: Set<string>, items: Iterable<string>): Set<string> => {
    for (const item of items) {
      targetSet.add(item);
    }
    return targetSet;
  };

  app.floorplan.forEachSlab((slab) => {
    slab.forEachFace((face) => {
      const productIds = Utils.collectPaintsProductIdsByFace(face);
      addToSet(seekIdSet, productIds);
    });
  });

  app.floorplan.forEachStructureFace((face) => {
    const productIds = Utils.collectPaintsProductIdsByFace(face);
    addToSet(seekIdSet, productIds);
  });

  app.floorplan.forEachBeam((beam) => {
    beam.faceList.forEach((face) => {
      const productIds = Utils.collectPaintsProductIdsByFace(face);
      addToSet(seekIdSet, productIds);
    });
  });

  app.floorplan.forEachOpening((opening) => {
    opening.forEachFace((face) => {
      const productIds = Utils.collectPaintsProductIdsByFace(face);
      addToSet(seekIdSet, productIds);
    });
  });

  app.floorplan.forEachContent((content) => {
    if (
      content instanceof HSCore.Model.CustomizedModel ||
      content instanceof HSCore.Model.NCustomizedFeatureModel
    ) {
      const materialsAreaIterator = content.getMaterialsArea()?.values();
      if (materialsAreaIterator) {
        for (const materialArea of materialsAreaIterator) {
          const { area, material } = materialArea;
          if (
            Math.abs(area) > 0 &&
            material.color !== HSConstants.Constants.CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR &&
            Utils.isValidMaterial(material)
          ) {
            seekIdSet.add(material.seekId);
          }
        }
      }
    }
  });

  return Array.from(seekIdSet);
}

async function collectEntity(): Promise<unknown[]> {
  const entities: unknown[] = [];
  entities.push(...collectAllEntities());
  const wrappedResult = wrapPromiseEntities(entities);

  if (wrappedResult instanceof Promise) {
    return await wrappedResult;
  }

  return wrappedResult;
}

function collectAllEntities(): unknown[] {
  const entities: unknown[] = [];
  const app = HSApp.App.getApp();

  collectLayerEntities(entities);

  app.floorplan.scene.forEachLayer((layer) => {
    layer.forEachSlab((slab) => {
      entities.push(new SlabEntity().accept(slab));
    });

    layer.forEachFloor((floor) => {
      if (floor.roomInfos.length > 0) {
        entities.push(new RoomEntity().accept(floor));
      }
    });

    layer.forEachWall((wall) => {
      entities.push(new WallEntity().accept(wall));
    });

    entities.push(...collectContentEntities(layer));
    entities.push(...collectFaceAndMoldingEntities(layer));
    entities.push(...collectOpeningEntities(layer));
  });

  return entities;
}

function collectLayerEntities(entities: unknown[]): void {
  let currentLayer: Layer | undefined = HSApp.App.getApp().floorplan.scene.rootLayer;
  let index = 0;

  entities.push(new LayerEntity().accept(currentLayer, { index }));

  while (currentLayer.next) {
    currentLayer = currentLayer.next;
    index++;
    entities.push(new LayerEntity().accept(currentLayer, { index }));
  }

  currentLayer = HSApp.App.getApp().floorplan.scene.rootLayer;
  index = 0;

  while (currentLayer.prev) {
    currentLayer = currentLayer.prev;
    index--;
    entities.push(new LayerEntity().accept(currentLayer, { index }));
  }
}

function collectContentEntities(layer: Layer): unknown[] {
  const contentEntities: unknown[] = [];

  layer.forEachContent((content) => {
    if (
      !content.isFlagOn(HSCore.Model.EntityFlagEnum.removed) &&
      !(content instanceof HSCore.Model.CustomizedModel) &&
      !(content instanceof HSCore.Model.CornerWindow)
    ) {
      contentEntities.push(new ContentEntity().accept(content));
    }
  });

  return contentEntities;
}

function collectFaceAndMoldingEntities(layer: Layer): unknown[] {
  const faceEntities: unknown[] = [];
  const moldingEntities: unknown[] = [];

  const processFace = (face: Face, floorId: string): void => {
    const existingFace = faceEntities.find((entity: any) => entity.getInstanceId() === face.id);

    if (!existingFace) {
      faceEntities.push(new FaceEntity(floorId).accept(face));
      face.forEachMolding((molding) => {
        if (molding.XSize && molding.YSize) {
          moldingEntities.push(new NormalMoldingEntity(floorId).accept(molding));
        }
      });
    }
  };

  layer.layerInfo.getSpaceInfos().forEach((spaceInfo) => {
    const floorId = spaceInfo.floors?.[0]?.id ?? '';

    spaceInfo.floors?.forEach((floor) => processFace(floor, floorId));
    spaceInfo.ceilings?.forEach((ceiling) => processFace(ceiling, floorId));
    spaceInfo.structureFaces?.forEach((structureFace) => processFace(structureFace, floorId));
    spaceInfo.beamFaces?.forEach((beamFace) => {
      if (Utils.isNotOverlappingBeamFaces(beamFace)) {
        processFace(beamFace, floorId);
      }
    });
  });

  return [...faceEntities, ...moldingEntities];
}

function collectOpeningEntities(layer: Layer): unknown[] {
  const openingEntities: unknown[] = [];

  layer.forEachOpening((opening) => {
    if (opening instanceof HSCore.Model.Window) {
      openingEntities.push(new WindowEntity().accept(opening));
    } else if (opening instanceof HSCore.Model.Hole) {
      openingEntities.push(new HoleEntity().accept(opening));
    } else if (opening instanceof HSCore.Model.Door) {
      openingEntities.push(new DoorEntity().accept(opening));
    }
  });

  layer.forEachContent((content) => {
    if (content instanceof HSCore.Model.CornerWindow) {
      openingEntities.push(new ParameterWindowEntity().accept(content));
    }
  });

  for (const parametricOpening of Object.values(layer.parametricOpenings)) {
    openingEntities.push(new ParameterWindowEntity().accept(parametricOpening));
  }

  return openingEntities;
}

registerProvider(
  { type: 'FloorPlan' },
  {
    collectEntity,
    collectSeekIds: collectPaintProductSeekIds,
  }
);

registerSeekMateDataHandle(fetchProductMetaBySeekIds);