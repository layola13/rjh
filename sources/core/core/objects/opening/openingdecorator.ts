import { MetaManager } from './MetaManager';
import { MixPave } from './MixPave';
import { getAngleHorizontaleCCW } from './utils';
import { Face } from './Face';
import { Floor } from './Floor';
import { Ceiling } from './Ceiling';
import { Pocket } from './Pocket';
import { Window } from './Window';
import { Material } from './Material';
import { Entity } from './Entity';
import { PaintsUtil } from './PaintsUtil';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface DoorStoneData {
  enable: boolean;
  materialSeekId?: string;
  mixPave?: any;
}

interface PocketData {
  seekId: string;
  materialSeekId?: string;
  materialRotataion?: number;
  side: number;
  thickness: number;
  outerThickness: number;
  height: number;
  outerHeight: number;
}

interface WindowSillData {
  materialSeekId?: string;
  extendValue: number;
  secondExtendValue: number;
  side: number;
}

interface OpeningData {
  seekId: string;
  scale: Vector3;
  isOpened: boolean;
  swing: number;
  isDefaultAlign: boolean;
  indent: number;
  openingType: any;
  doorStone?: DoorStoneData;
  pocket?: PocketData;
  windowSill?: WindowSillData;
  contentType?: any;
}

interface MaterialMeta {
  tileSize_x?: number;
  tileSize_y?: number;
  textureUrl?: string;
}

interface BottomFace {
  material?: Material;
  dirtyMaterial(): void;
}

interface WindowSill {
  parameters: {
    materialData?: any;
    extendValue: number;
    secondExtendValue: number;
    side: number;
  };
  side: number;
  onParametersChanged(): void;
  dirtyMaterial(): void;
}

interface OpeningEntity extends Entity {
  seekId: string;
  XScale: number;
  YScale: number;
  ZScale: number;
  isOpened: boolean;
  swing: number;
  isDefaultAlign: boolean;
  indent: number;
  thickness: number;
  ZRotation: number;
  doorStoneMaterialEnabled: boolean;
  bottomFaceMaterial?: Material;
  metadata: {
    defaultPocketMaterialUrl?: string;
    extension?: {
      objInfo?: {
        pocketMaterial?: {
          tileSize: Vector3;
        };
      };
    };
  };
  getBottomFaces(): BottomFace[];
  getPocket(): Pocket | null;
  createWindowSill(): WindowSill;
  addChild(child: any): void;
  getWindowSill(): WindowSill | null;
  setDoorStoneMaterialStatus(enabled: boolean): void;
  addPocket(pocket: Pocket): void;
  getRefreshFloors(): Set<Floor>;
}

export class OpeningDecorator {
  private readonly _entity: OpeningEntity;

  constructor(entity: OpeningEntity) {
    this._entity = entity;
  }

  dump(): OpeningData {
    const entity = this._entity;
    const data: OpeningData = {
      seekId: entity.seekId,
      scale: {
        x: entity.XScale,
        y: entity.YScale,
        z: entity.ZScale
      },
      isOpened: entity.isOpened,
      swing: entity.swing,
      isDefaultAlign: entity.isDefaultAlign,
      indent: entity.indent,
      openingType: HSConstants.Constants.OpeningType
    };

    const bottomFace = entity.getBottomFaces()[0];
    if (bottomFace) {
      data.doorStone = {
        enable: entity.doorStoneMaterialEnabled,
        materialSeekId: bottomFace.material?.seekId,
        mixPave: bottomFace.material?.mixpaint?.mixPave?.dump()
      };
    }

    const pocket = entity.getPocket();
    if (pocket) {
      data.pocket = {
        seekId: pocket.seekId,
        materialSeekId: pocket.material?.seekId,
        materialRotataion: pocket.material?.rotation,
        side: pocket.side,
        thickness: pocket.thickness,
        outerThickness: pocket.outerThickness,
        height: pocket.height,
        outerHeight: pocket.outerHeight
      };
    }

    if (entity instanceof Window) {
      const windowSill = entity.getWindowSill();
      if (windowSill) {
        data.windowSill = {
          materialSeekId: windowSill.parameters.materialData?.seekId,
          extendValue: windowSill.parameters.extendValue,
          secondExtendValue: windowSill.parameters.secondExtendValue,
          side: windowSill.side
        };
      }
    }

    return data;
  }

  static create(metadata: any, face: Face): OpeningEntity | undefined {
    if (!metadata) return undefined;

    let EntityClass: typeof Entity | undefined;

    if (metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Door)) {
      EntityClass = Entity.getClass(HSConstants.ModelClass.NgDoor);
    } else if (metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Window)) {
      EntityClass = Entity.getClass(HSConstants.ModelClass.NgWindow);
    } else if (metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WallOpening)) {
      EntityClass = Entity.getClass(HSConstants.ModelClass.NgHole);
    }

    if (!EntityClass) return undefined;

    const master = face.getMaster();
    const entity = new EntityClass() as OpeningEntity;
    entity.initByMeta(metadata);
    entity.thickness = master.width;

    if (face instanceof Face && !(face instanceof Floor || face instanceof Ceiling)) {
      const curve = face.faceInfo.curve;
      if (curve) {
        const startPoint = curve.getStartPt();
        const endPoint = curve.getEndPt();
        const angle = -getAngleHorizontaleCCW(startPoint, endPoint);
        const normalizeAngle = (rawAngle: number): number => {
          let normalized = rawAngle % 360;
          if (normalized > 180) {
            normalized -= 360;
          } else if (normalized < -180) {
            normalized += 360;
          }
          return normalized;
        };
        entity.ZRotation = normalizeAngle(angle + 180);
      }
    }

    return entity;
  }

  loadOther(data: OpeningData, preserveScale: boolean = false): void {
    this._entity.isOpened = data.isOpened;
    this._entity.isDefaultAlign = data.isDefaultAlign;
    this._entity.doorStoneMaterialEnabled = !!data.doorStone && data.doorStone.enable;

    if (!preserveScale) {
      this._entity.XScale = data.scale.x;
      this._entity.YScale = data.scale.y;
      this._entity.ZScale = data.scale.z;
      this._entity.swing = data.swing;
    }

    const pocketData = data.pocket;
    if (pocketData) {
      this.addPocket(pocketData);
    }

    const windowSillData = data.windowSill;
    if (windowSillData) {
      const entity = this._entity;
      const windowSill = entity.createWindowSill();
      entity.addChild(windowSill);

      const materialSeekId = windowSillData.materialSeekId;
      if (materialSeekId) {
        const materialMeta = MetaManager.instance().getBuildingProductMeta(materialSeekId);
        if (materialMeta) {
          const materialData = Material.create(materialMeta).getMaterialData();
          const sill = entity.getWindowSill();
          if (sill) {
            sill.parameters.materialData = materialData;
            sill.onParametersChanged();
            sill.dirtyMaterial();
            sill.parameters.extendValue = windowSillData.extendValue;
            sill.parameters.secondExtendValue = windowSillData.secondExtendValue;
            sill.parameters.side = windowSillData.side;
          }
        }
      }
    }
  }

  loadDoorStone(doorStoneData: DoorStoneData | undefined): void {
    if (!doorStoneData) return;

    this._entity.setDoorStoneMaterialStatus(doorStoneData.enable);

    const materialSeekId = doorStoneData.materialSeekId;
    if (materialSeekId && materialSeekId !== 'local') {
      const materialMeta = MetaManager.instance().getBuildingProductMeta(materialSeekId);
      const material = Material.create(materialMeta);
      this._entity.bottomFaceMaterial = material;

      const bottomFace = this._entity.getBottomFaces()[0];
      if (bottomFace) {
        PaintsUtil.updateFaceMixpaint(bottomFace);
      }

      if (doorStoneData.mixPave) {
        const mixPave = MixPave.load(doorStoneData.mixPave);
        if (this._entity.bottomFaceMaterial?.mixpaint) {
          this._entity.bottomFaceMaterial.mixpaint.mixPave = mixPave;
        }
      }
    }

    const bottomFace = this._entity.getBottomFaces()[0];
    if (bottomFace) {
      PaintsUtil.updateFaceMixpaint(bottomFace);
      bottomFace.dirtyMaterial();

      const floorsToRefresh = new Set<Floor>();
      this._entity.getRefreshFloors().forEach(floor => floorsToRefresh.add(floor));
      floorsToRefresh.forEach(floor => floor.dirtyGeometry());
    }
  }

  addPocket(pocketData: PocketData): void {
    const pocketMeta = MetaManager.instance().getBuildingProductMeta(pocketData.seekId);
    const pocket = Pocket.create(pocketMeta);
    this._entity.addPocket(pocket);

    const entityPocket = this._entity.getPocket();
    if (!entityPocket) return;

    if (pocketData.materialSeekId && 
        pocketData.materialSeekId !== entityPocket.material?.seekId) {
      this.changePocketMaterial(pocketData.materialSeekId);
    }

    if (pocketData.materialRotataion && entityPocket.material?.rotation) {
      entityPocket.material.rotation = pocketData.materialRotataion;
    }

    entityPocket.side = pocketData.side;
    entityPocket.thickness = pocketData.thickness;
    entityPocket.outerThickness = pocketData.outerThickness;
    entityPocket.height = pocketData.height;
    entityPocket.outerHeight = pocketData.outerHeight;
  }

  changePocketMaterial(materialSeekId: string): void {
    const pocket = this._entity.getPocket();
    if (!pocket) return;

    let materialMeta: any;
    if (materialSeekId === 'local') {
      materialMeta = this.getPocketMaterialMeta();
    } else {
      materialMeta = MetaManager.instance().getBuildingProductMeta(materialSeekId);
    }

    pocket.material = Material.create(materialMeta);
  }

  getPocketMaterialMeta(): MaterialMeta | null {
    const metadata = this._entity.metadata;
    const defaultUrl = metadata.defaultPocketMaterialUrl;
    const pocketMaterial = metadata.extension?.objInfo?.pocketMaterial;

    if (defaultUrl && pocketMaterial?.tileSize) {
      return {
        tileSize_x: pocketMaterial.tileSize.x,
        tileSize_y: pocketMaterial.tileSize.y,
        textureUrl: defaultUrl
      };
    }

    return null;
  }

  static getAllSeekIds(data: OpeningData): string[] {
    const { pocket, windowSill, doorStone } = data;
    const seekIds: string[] = [];

    if (doorStone?.materialSeekId && doorStone.materialSeekId !== 'local') {
      seekIds.push(doorStone.materialSeekId);
    }

    if (pocket) {
      seekIds.push(pocket.seekId);
      if (pocket.materialSeekId && pocket.materialSeekId !== 'local') {
        seekIds.push(pocket.materialSeekId);
      }
    }

    if (windowSill?.materialSeekId) {
      seekIds.push(windowSill.materialSeekId);
    }

    return seekIds;
  }
}