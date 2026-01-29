abstract class StateRequest {
  abstract onCommit(args: unknown[]): void;
  abstract canTransactField(): boolean;
}

enum LayerTypeEnum {
  LayerTypeBasement = 'LayerTypeBasement',
}

enum EntityFlagEnum {
  hidden = 'hidden',
}

enum WallFlagEnum {
  heightEditable = 'heightEditable',
}

interface Face {
  setFlagOff(flag: EntityFlagEnum): void;
  dirtyGeometry(): void;
}

interface Wall {
  height3d: number;
  isFlagOff(flag: WallFlagEnum): boolean;
  forEachFace(callback: (face: Face) => void): void;
}

interface Structure {
  isWallPart(): boolean;
  copy(): Structure;
  parent: Layer;
}

interface Slab {
  forEachFace(callback: (face: Face) => void): void;
}

interface RoomBuilder {
  build(): void;
}

interface Layer {
  height: number;
  next?: Layer;
  prev?: Layer;
  forEachWall(callback: (wall: Wall) => void): void;
  forEachStructure(callback: (structure: Structure) => void): void;
  forEachSlab(callback: (slab: Slab) => void): void;
  addChild(child: Wall[] | Structure): void;
  removeChild(child: Structure): void;
  setFlagOff(flag: EntityFlagEnum, propagate: boolean): void;
  dirtyPosition(): void;
  roomBuilder: RoomBuilder;
}

namespace LayerFactory {
  export function create(): Layer {
    return {} as Layer;
  }
}

interface Scene {
  lastLayer: Layer;
  lowestLayer: Layer;
  ceilingLayer: Layer;
  activeLayer: Layer;
  addLayer(layer: Layer, isBasement: boolean): void;
}

interface FloorPlan {
  scene: Scene;
  global_wall_height3d: number;
}

namespace WallUtil {
  export function copyWalls(walls: Wall[]): Wall[] {
    return [] as Wall[];
  }
}

namespace LayerUtil {
  export function refreshFaceMixpaint(layer: Layer): void {}
  export function extendsCrossLayerOpenings(prevLayer: Layer, currentLayer: Layer): void {}
  export function dirtyLayerInfo(layer: Layer): void {}
}

interface BeforeData {}

interface AfterData {}

export class AddNewLayerRequest extends StateRequest {
  private readonly _floorPlan: FloorPlan;
  private readonly _layerType: LayerTypeEnum;
  private readonly _needCopyWall: boolean;
  private _beforeData: BeforeData;
  private _afterData: AfterData;

  constructor(
    floorPlan: FloorPlan,
    layerType: LayerTypeEnum,
    needCopyWall: boolean
  ) {
    super();
    this._floorPlan = floorPlan;
    this._layerType = layerType;
    this._needCopyWall = needCopyWall;
    this._beforeData = {};
    this._afterData = {};
  }

  private _doRequest(): void {
    const floorPlan = this._floorPlan;
    const isBasementLayer = this._layerType === LayerTypeEnum.LayerTypeBasement;
    
    let referenceLayer = floorPlan.scene.lastLayer;
    if (isBasementLayer) {
      referenceLayer = floorPlan.scene.lowestLayer;
    }

    let newLayer: Layer;
    
    if (isBasementLayer) {
      newLayer = LayerFactory.create();
      floorPlan.scene.addLayer(newLayer, true);
      newLayer.height = floorPlan.global_wall_height3d;
    } else {
      newLayer = floorPlan.scene.ceilingLayer;
      floorPlan.scene.addLayer(newLayer, false);
      newLayer.height = floorPlan.global_wall_height3d;
      
      newLayer.forEachSlab((slab: Slab) => {
        slab.forEachFace((face: Face) => {
          face.setFlagOff(EntityFlagEnum.hidden);
        });
      });
      
      newLayer.setFlagOff(EntityFlagEnum.hidden, false);
      floorPlan.scene.ceilingLayer = LayerFactory.create();
    }

    const wallsToCopy: Wall[] = [];
    const structuresToCopy: Structure[] = [];

    if (this._needCopyWall) {
      referenceLayer.forEachWall((wall: Wall) => {
        wallsToCopy.push(wall);
      });
      
      referenceLayer.forEachStructure((structure: Structure) => {
        if (structure.isWallPart()) {
          structuresToCopy.push(structure);
        }
      });
    }

    if (wallsToCopy.length > 0) {
      const copiedWalls = WallUtil.copyWalls(wallsToCopy);
      newLayer.addChild(copiedWalls);
      
      copiedWalls.forEach((wall: Wall) => {
        if (wall.isFlagOff(WallFlagEnum.heightEditable)) {
          wall.height3d = floorPlan.global_wall_height3d;
        }
      });
    }

    if (structuresToCopy.length > 0) {
      for (const structure of structuresToCopy) {
        const copiedStructure = structure.copy();
        copiedStructure.parent.removeChild(copiedStructure);
        newLayer.addChild(copiedStructure);
      }
    }

    newLayer.roomBuilder.build();

    if (isBasementLayer) {
      wallsToCopy.forEach((wall: Wall) => {
        wall.forEachFace((face: Face) => {
          face.dirtyGeometry();
        });
      });
    }

    floorPlan.scene.activeLayer = newLayer;
    floorPlan.scene.ceilingLayer.dirtyPosition();
    
    LayerUtil.refreshFaceMixpaint(newLayer);
    
    if (isBasementLayer && newLayer.next) {
      LayerUtil.refreshFaceMixpaint(newLayer.next);
    }
    
    if (newLayer.prev) {
      LayerUtil.extendsCrossLayerOpenings(newLayer.prev, newLayer);
    }
    
    LayerUtil.dirtyLayerInfo(newLayer);
  }

  onCommit(args: unknown[]): void {
    this._doRequest();
    super.onCommit(args);
  }

  canTransactField(): boolean {
    return true;
  }
}