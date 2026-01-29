import { PAssembly, PAssembly_IO } from './PAssembly';
import { Entity } from './Entity';
import { traverseObject, defineFields } from './utils';

interface IdsMap {
  upTrackSeekId: string;
  downTrackSeekId: string;
  mullionSeekId: string;
  upTransomSeekId: string;
  middleTransomSeekId: string;
  downTransomSeekId: string;
  slidingDoorLeafSeekId: string;
  doorLeafBorderMaterial: string;
}

interface SlotData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SlotsMap {
  slot1: SlotData;
  slot2: SlotData;
}

interface TrackMetaData {
  profileSizeX: number;
  profileSizeY: number;
  slotsMap?: SlotsMap;
  id?: string;
}

interface MullionMetaData {
  profileSizeX: number;
}

interface LoftMetaDatas {
  upTrackMetaData?: TrackMetaData;
  downTrackMetaData?: TrackMetaData;
  mullionMetaData?: MullionMetaData;
  upTransomMetaData?: unknown;
  middleTransomMetaData?: unknown;
  downTransomMetaData?: unknown;
  slidingDoorLeafMetaData?: unknown;
  doorLeafBorderMaterialMetaData?: unknown;
}

interface ProductsMap {
  get(id: string): unknown;
}

interface LoadContext {
  productsMap: ProductsMap;
}

interface ProductData {
  productDataById: Record<string, unknown>;
}

interface DumpOptions {
  [key: string]: unknown;
}

export class PSlidingDoor_IO extends PAssembly_IO {
  dump(
    entity: PSlidingDoor,
    callback?: (result: unknown[], entity: PSlidingDoor) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const entityData = result[0] as Record<string, unknown>;

    traverseObject(
      entity.idsMap,
      (seekId: string, metaDataKey: string, seekIdKey: string) => {
        entityData[seekIdKey] = entity[seekIdKey as keyof PSlidingDoor];
      },
      true
    );

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: PSlidingDoor, data: Record<string, unknown>, context: LoadContext): void {
    entity.hasLoadComplete = false;
    super.load(entity, data, context);

    traverseObject(
      entity.idsMap,
      (seekId: string, metaDataKey: string, seekIdKey: string) => {
        entity[seekIdKey as keyof PSlidingDoor] = data[seekIdKey] as never;
        entity[seekId as keyof PSlidingDoor] = context.productsMap.get(
          entity[seekIdKey as keyof PSlidingDoor] as string
        ) as never;
      },
      true
    );

    entity.hasLoadComplete = true;
  }
}

export class PSlidingDoor extends PAssembly {
  readonly idsMap: IdsMap;
  hasLoadComplete: boolean;

  upTrackSeekId: string = '';
  downTrackSeekId: string = '';
  mullionSeekId: string = '';
  upTransomSeekId: string = '';
  middleTransomSeekId: string = '';
  downTransomSeekId: string = '';
  slidingDoorLeafSeekId: string = '';
  doorLeafBorderMaterial: string = '';

  upTrackMetaData?: unknown;
  downTrackMetaData?: unknown;
  mullionMetaData?: unknown;
  upTransomMetaData?: unknown;
  middleTransomMetaData?: unknown;
  downTransomMetaData?: unknown;
  slidingDoorLeafMetaData?: unknown;
  doorLeafBorderMaterialMetaData?: unknown;

  constructor(name: string = '', parent?: unknown) {
    super(name, parent);

    this.idsMap = {
      upTrackSeekId: 'upTrackMetaData',
      downTrackSeekId: 'downTrackMetaData',
      mullionSeekId: 'mullionMetaData',
      upTransomSeekId: 'upTransomMetaData',
      middleTransomSeekId: 'middleTransomMetaData',
      downTransomSeekId: 'downTransomMetaData',
      slidingDoorLeafSeekId: 'slidingDoorLeafMetaData',
      doorLeafBorderMaterial: 'doorLeafBorderMaterialMetaData'
    };

    const fieldDefinitions: Record<string, unknown> = {};

    traverseObject(
      this.idsMap,
      (seekId: string, metaDataKey: string, seekIdKey: string) => {
        this[seekIdKey as keyof PSlidingDoor] = '' as never;
        fieldDefinitions[seekId] = {
          readonly: false,
          changed: this.onLoftMetaChanged
        };
      },
      true
    );

    defineFields(this, fieldDefinitions);
    this.hasLoadComplete = true;
  }

  static create(productData?: ProductData, metaData?: LoftMetaDatas): PSlidingDoor {
    const instance = new PSlidingDoor();
    if (productData && metaData) {
      instance.initByMeta(productData, metaData);
    }
    return instance;
  }

  initByMeta(productData: ProductData, metaData: LoftMetaDatas): void {
    super.initByMeta(productData, metaData);

    if (metaData) {
      traverseObject(
        this.idsMap,
        (seekId: string, metaDataKey: string, seekIdKey: string) => {
          this[seekIdKey as keyof PSlidingDoor] = metaData[seekIdKey as keyof LoftMetaDatas] as never;
          this[seekId as keyof PSlidingDoor] = productData.productDataById[
            this[seekIdKey as keyof PSlidingDoor] as string
          ] as never;
        },
        true
      );
      this.updateLoftStates();
    }
  }

  getIO(): PSlidingDoor_IO {
    return PSlidingDoor_IO.instance();
  }

  setMaterial(material: unknown): void {
    // Method implementation
  }

  onLoftMetaChanged(oldValue: unknown, newValue: TrackMetaData, seekId: string, context: unknown): void {
    if (this.hasLoadComplete) {
      traverseObject(
        this.idsMap,
        (currentSeekId: string, metaDataKey: string, seekIdKey: string) => {
          if (currentSeekId === seekId) {
            this[seekIdKey as keyof PSlidingDoor] = newValue.id as never;
          }
        },
        true
      );

      const metasToUpdate: Partial<Record<string, unknown>> = {};
      metasToUpdate[seekId] = newValue;
      this.setLoftMetas(metasToUpdate);
    }
  }

  updateLoftStates(): void {
    const metaDatas: Partial<LoftMetaDatas> = {};

    traverseObject(
      this.idsMap,
      (seekId: string, metaDataKey: string) => {
        metaDatas[seekId as keyof LoftMetaDatas] = this[seekId as keyof PSlidingDoor];
      },
      true
    );

    this.updateLoftStatesFromMetas(metaDatas, true);
  }

  setLoftMetas(metaDatas: Partial<LoftMetaDatas>): void {
    this.setSelfLoftMetas(metaDatas);
    this.setChildrenLoftMetas(metaDatas);
  }

  setSelfLoftMetas(metaDatas: Partial<LoftMetaDatas>): void {
    const { upTrackMetaData, downTrackMetaData } = metaDatas;

    const updateLofts = (lofts: unknown[], metaData: unknown): void => {
      lofts.forEach((loft: any) => {
        loft.update(metaData);
      });
    };

    if (upTrackMetaData) {
      updateLofts(this.getLoftsByContentType(HSCatalog.ContentTypeEnum.ParamUpTrack), upTrackMetaData);
    }

    if (downTrackMetaData) {
      updateLofts(this.getLoftsByContentType(HSCatalog.ContentTypeEnum.ParamDownTrack), downTrackMetaData);
    }

    this.updateSelfLoftStatesFromMetas(metaDatas, true);
  }

  setChildrenLoftMetas(metaDatas: Partial<LoftMetaDatas>): void {
    this.getSlidingDoorLeafs().forEach((doorLeaf: any) => {
      doorLeaf.setLoftMetas(metaDatas);
    });
  }

  updateLoftStatesFromMetas(metaDatas: Partial<LoftMetaDatas>, shouldCompute: boolean = true): void {
    this.updateSelfLoftStatesFromMetas(metaDatas, shouldCompute);
    this.updateChildrenLoftStatesFromMetas(metaDatas, shouldCompute);
  }

  updateSelfLoftStatesFromMetas(metaDatas: Partial<LoftMetaDatas>, shouldCompute: boolean = true): void {
    const { upTrackMetaData, downTrackMetaData, mullionMetaData } = metaDatas;
    const hasMetaData = !!(upTrackMetaData || downTrackMetaData || mullionMetaData);

    if (upTrackMetaData) {
      this.updateUpTrackStatesFromMeta(upTrackMetaData, false);
    }

    if (downTrackMetaData) {
      this.updateDownTracksStatesFromMeta(downTrackMetaData, false);
    }

    if (mullionMetaData) {
      (this.states as any).ID_doorleaf_doublication.__value = mullionMetaData.profileSizeX;
    }

    if (shouldCompute && hasMetaData) {
      this.compute();
    }
  }

  updateChildrenLoftStatesFromMetas(metaDatas: Partial<LoftMetaDatas>, shouldCompute: boolean = true): void {
    this.getSlidingDoorLeafs().forEach((doorLeaf: any) => {
      doorLeaf.updateLoftStatesFromMetas(metaDatas, shouldCompute);
    });
  }

  updateUpTrackStatesFromMeta(metaData: TrackMetaData, shouldCompute: boolean = true): void {
    if (!metaData) return;

    (this.states as any).ID_UPTRACK_D.__value = metaData.profileSizeX;
    (this.states as any).ID_UPTRACK_H.__value = metaData.profileSizeY;

    if (metaData.slotsMap) {
      const slotsMap = metaData.slotsMap;
      (this.states as any).ID_UPTRACK_SLOT1_X.__value = slotsMap.slot1.x;
      (this.states as any).ID_UPTRACK_SLOT1_Y.__value = slotsMap.slot1.y;
      (this.states as any).ID_UPTRACK_SLOT1_W.__value = slotsMap.slot1.width;
      (this.states as any).ID_UPTRACK_SLOT1_H.__value = slotsMap.slot1.height;
      (this.states as any).ID_UPTRACK_SLOT2_X.__value = slotsMap.slot2.x;
      (this.states as any).ID_UPTRACK_SLOT2_Y.__value = slotsMap.slot2.y;
      (this.states as any).ID_UPTRACK_SLOT2_W.__value = slotsMap.slot2.width;
      (this.states as any).ID_UPTRACK_SLOT2_H.__value = slotsMap.slot2.height;
    }

    if (shouldCompute) {
      this.compute();
    }
  }

  updateDownTracksStatesFromMeta(metaData: TrackMetaData, shouldCompute: boolean = true): void {
    if (!metaData) return;

    (this.states as any).ID_DOWNTRACK_D.__value = metaData.profileSizeX;
    (this.states as any).ID_DOWNTRACK_H.__value = metaData.profileSizeY;

    if (shouldCompute) {
      this.compute();
    }
  }

  getSlidingDoorLeafs(): unknown[] {
    const doorLeafs: unknown[] = [];
    const targetContentType = HSCatalog.ContentTypeEnum.ParamSlidingDoorLeaf;

    this.forEachChild((child: any) => {
      if (child.contentType?.isTypeOf(targetContentType)) {
        doorLeafs.push(child);
      }
    });

    return doorLeafs;
  }

  getSegmentLofts(): unknown[] {
    const segmentLofts: unknown[] = [];

    HSCore.Util.Entity.traverseApplyFuncForEntity(this, (entity: any) => {
      if (entity.contentType?.isTypeOf(PSegmentLoft.getPSegmentLoftContentTypes())) {
        segmentLofts.push(entity);
      }
    });

    return segmentLofts;
  }

  getLoftsByContentType(contentType: unknown): unknown[] {
    const lofts: unknown[] = [];

    HSCore.Util.Entity.traverseApplyFuncForEntity(this, (entity: any) => {
      if (entity.contentType?.isTypeOf(contentType)) {
        lofts.push(entity);
      }
    });

    return lofts;
  }

  getRelatedMetaDatas(): unknown[] {
    const metaDatas = super.getRelatedMetaDatas();

    traverseObject(
      this.idsMap,
      (seekId: string, metaDataKey: string) => {
        const metaData = this[seekId as keyof PSlidingDoor];
        if (metaData instanceof HSCatalog.Meta || (metaData && (metaData as any).contentType)) {
          metaDatas.push(metaData);
        }
      },
      true
    );

    return metaDatas;
  }

  getMetadataFilterKeys(): string[] | null {
    return null;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPSlidingDoor, PSlidingDoor);