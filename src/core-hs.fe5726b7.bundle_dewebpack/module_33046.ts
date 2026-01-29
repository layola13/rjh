import { PAssembly } from './PAssembly';
import { Entity } from './Entity';
import { PSegmentLoft } from './PSegmentLoft';
import { Material } from './Material';
import { traverseObject, defineFields } from './util';

export const PSlidingDoorLeafInterlaceTypeEnum = {
  InnerOuter: 1,
  Symmetry: 2
} as const;

Object.freeze(PSlidingDoorLeafInterlaceTypeEnum);

interface MetaData {
  seekId: string;
  profileSizeX?: number;
  profileSizeY?: number;
  slotsMap?: {
    slot1: SlotData;
    slot2: SlotData;
  };
}

interface SlotData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LoftMetasUpdate {
  mullionMetaData?: MetaData;
  upTransomMetaData?: MetaData;
  middleTransomMetaData?: MetaData;
  downTransomMetaData?: MetaData;
  doorLeafBorderMaterialMetaData?: MetaData;
  material?: Material;
}

interface MetaCount<T> {
  count: number;
  metadata?: T;
  material?: Material;
}

interface FieldDescriptor {
  readonly: boolean;
  get: () => MetaData | null;
  set: (value: MetaData) => void;
}

interface IdsMapEntry {
  get: () => MetaData | null;
  set: (value: MetaData) => void;
}

interface LoftEntity {
  contentType?: { isTypeOf: (type: unknown) => boolean };
  metadata?: MetaData;
  material?: Material;
  update: (data: Partial<{ profileMeta: MetaData; material: Material }>) => void;
}

interface StateValue {
  __value: number;
}

interface States {
  ID_MULLION_W: StateValue;
  ID_MULLION_D: StateValue;
  ID_MULLION_SLOT1_X: StateValue;
  ID_MULLION_SLOT1_Y: StateValue;
  ID_MULLION_SLOT1_W: StateValue;
  ID_MULLION_SLOT1_H: StateValue;
  ID_MULLION_SLOT2_X: StateValue;
  ID_MULLION_SLOT2_Y: StateValue;
  ID_MULLION_SLOT2_W: StateValue;
  ID_MULLION_SLOT2_H: StateValue;
  ID_UPTRANSOM_D: StateValue;
  ID_UPTRANSOM_H: StateValue;
  ID_UPTRANSOM_SLOT1_X: StateValue;
  ID_UPTRANSOM_SLOT1_Y: StateValue;
  ID_UPTRANSOM_SLOT1_W: StateValue;
  ID_UPTRANSOM_SLOT1_H: StateValue;
  ID_UPTRANSOM_SLOT2_X: StateValue;
  ID_UPTRANSOM_SLOT2_Y: StateValue;
  ID_UPTRANSOM_SLOT2_W: StateValue;
  ID_UPTRANSOM_SLOT2_H: StateValue;
  ID_DOWNTRANSOM_D: StateValue;
  ID_DOWNTRANSOM_H: StateValue;
  ID_DOWNTRANSOM_SLOT1_X: StateValue;
  ID_DOWNTRANSOM_SLOT1_Y: StateValue;
  ID_DOWNTRANSOM_SLOT1_W: StateValue;
  ID_DOWNTRANSOM_SLOT1_H: StateValue;
  ID_DOWNTRANSOM_SLOT2_X: StateValue;
  ID_DOWNTRANSOM_SLOT2_Y: StateValue;
  ID_DOWNTRANSOM_SLOT2_W: StateValue;
  ID_DOWNTRANSOM_SLOT2_H: StateValue;
  ID_MIDDLETRANSOM_D: StateValue;
  ID_MIDDLETRANSOM_H: StateValue;
  ID_MIDDLETRANSOM_SLOT1_X: StateValue;
  ID_MIDDLETRANSOM_SLOT1_Y: StateValue;
  ID_MIDDLETRANSOM_SLOT1_W: StateValue;
  ID_MIDDLETRANSOM_SLOT1_H: StateValue;
  ID_MIDDLETRANSOM_SLOT2_X: StateValue;
  ID_MIDDLETRANSOM_SLOT2_Y: StateValue;
  ID_MIDDLETRANSOM_SLOT2_W: StateValue;
  ID_MIDDLETRANSOM_SLOT2_H: StateValue;
}

export class PSlidingDoorLeaf extends PAssembly {
  private readonly idsMap: Record<string, IdsMapEntry>;
  protected states!: States;

  constructor(name: string = '', parent?: unknown) {
    super(name, parent);

    this.idsMap = {
      mullionMetaData: {
        get: this.getMullionMetaData,
        set: this.setMullionMetaData
      },
      upTransomMetaData: {
        get: this.getUpTransomMetaData,
        set: this.setUpTransomMetaData
      },
      middleTransomMetaData: {
        get: this.getMiddleTransomMetaData,
        set: this.setMiddleTransomMetaData
      },
      downTransomMetaData: {
        get: this.getDownTransomMetaData,
        set: this.setDownTransomMetaData
      },
      doorLeafBorderMaterialMetaData: {
        get: this.getDoorLeafBorderMaterialMetaData,
        set: this.setDoorLeafBorderMaterialMetaData
      }
    };

    const fields: Record<string, FieldDescriptor> = {};
    traverseObject(
      this.idsMap,
      (entry: IdsMapEntry, _parent: unknown, key: string) => {
        fields[key] = {
          readonly: false,
          get: entry.get,
          set: entry.set
        };
      },
      true
    );
    defineFields(this, fields);
  }

  static create(metadata?: MetaData, context?: unknown): PSlidingDoorLeaf {
    const instance = new PSlidingDoorLeaf();
    if (metadata && context) {
      instance.initByMeta(metadata, context);
    }
    return instance;
  }

  getMullionMetaData(): MetaData | null {
    return this.getMostMetaByContentType(HSCatalog.ContentTypeEnum.ParamMullion);
  }

  setMullionMetaData(metadata: MetaData): void {
    const updates: LoftMetasUpdate = {
      mullionMetaData: metadata
    };
    this.setLoftMetas(updates);
  }

  getUpTransomMetaData(): MetaData | null {
    return this.getMostMetaByContentType(HSCatalog.ContentTypeEnum.ParamUpTransom);
  }

  setUpTransomMetaData(metadata: MetaData): void {
    const updates: LoftMetasUpdate = {
      upTransomMetaData: metadata
    };
    this.setLoftMetas(updates);
  }

  getMiddleTransomMetaData(): MetaData | null {
    return this.getMostMetaByContentType(HSCatalog.ContentTypeEnum.ParamMiddleTransom);
  }

  setMiddleTransomMetaData(metadata: MetaData): void {
    const updates: LoftMetasUpdate = {
      middleTransomMetaData: metadata
    };
    this.setLoftMetas(updates);
  }

  getDownTransomMetaData(): MetaData | null {
    return this.getMostMetaByContentType(HSCatalog.ContentTypeEnum.ParamDownTransom);
  }

  setDownTransomMetaData(metadata: MetaData): void {
    const updates: LoftMetasUpdate = {
      downTransomMetaData: metadata
    };
    this.setLoftMetas(updates);
  }

  getDoorLeafBorderMaterialMetaData(): MetaData | null {
    const material = this.getLoftsMostMaterial();
    return material ? HSCatalog.Util.createMetaFromMaterial(material) : null;
  }

  setDoorLeafBorderMaterialMetaData(metadata: MetaData): void {
    const updates: LoftMetasUpdate = {
      material: Material.create(metadata)
    };
    this.getSegmentLofts().forEach((loft: LoftEntity) => {
      loft.update(updates);
    });
  }

  getMostMetaByContentType(contentType: unknown): MetaData | null {
    const lofts = this.getLoftsByContentType(contentType);
    const metaCountMap: Record<string, MetaCount<MetaData>> = {};

    lofts.forEach((loft: LoftEntity) => {
      if (loft.metadata) {
        const seekId = loft.metadata.seekId;
        metaCountMap[seekId] = metaCountMap[seekId] || {
          count: 0,
          metadata: loft.metadata
        };
        metaCountMap[seekId].count++;
      }
    });

    const metaCounts = Object.values(metaCountMap);
    metaCounts.sort((a, b) => (a.count < b.count || a.count > b.count ? 1 : 0));

    return metaCounts.length > 0 ? metaCounts[0].metadata! : null;
  }

  getLoftsMostMaterial(): Material | null {
    const lofts = this.getSegmentLofts();
    const materialCountMap: Record<string, MetaCount<Material>> = {};

    lofts.forEach((loft: LoftEntity) => {
      if (loft.material) {
        const seekId = loft.material.seekId;
        materialCountMap[seekId] = materialCountMap[seekId] || {
          count: 0,
          material: loft.material
        };
        materialCountMap[seekId].count++;
      }
    });

    const materialCounts = Object.values(materialCountMap);
    materialCounts.sort((a, b) => (a.count < b.count || a.count > b.count ? 1 : 0));

    return materialCounts.length > 0 ? materialCounts[0].material! : null;
  }

  setMaterial(_material: Material): void {
    // Method intentionally empty
  }

  setLoftMetas(updates: LoftMetasUpdate): void {
    const {
      mullionMetaData,
      upTransomMetaData,
      middleTransomMetaData,
      downTransomMetaData,
      doorLeafBorderMaterialMetaData
    } = updates;

    const updateLofts = (lofts: LoftEntity[], profileMeta: MetaData): void => {
      lofts.forEach((loft: LoftEntity) => {
        const updateData = {
          profileMeta
        };
        loft.update(updateData);
      });
    };

    if (mullionMetaData) {
      updateLofts(this.getLoftsByContentType(HSCatalog.ContentTypeEnum.ParamMullion), mullionMetaData);
    }
    if (upTransomMetaData) {
      updateLofts(this.getLoftsByContentType(HSCatalog.ContentTypeEnum.ParamUpTransom), upTransomMetaData);
    }
    if (middleTransomMetaData) {
      updateLofts(this.getLoftsByContentType(HSCatalog.ContentTypeEnum.ParamMiddleTransom), middleTransomMetaData);
    }
    if (downTransomMetaData) {
      updateLofts(this.getLoftsByContentType(HSCatalog.ContentTypeEnum.ParamDownTransom), downTransomMetaData);
    }
    if (doorLeafBorderMaterialMetaData) {
      this.doorLeafBorderMaterialMetaData = doorLeafBorderMaterialMetaData;
    }

    this.updateLoftStatesFromMetas(updates, true);
  }

  updateLoftStatesFromMetas(updates: LoftMetasUpdate, shouldCompute: boolean = true): void {
    const {
      mullionMetaData,
      upTransomMetaData,
      middleTransomMetaData,
      downTransomMetaData
    } = updates;

    const hasMetaUpdates = !!(mullionMetaData || upTransomMetaData || middleTransomMetaData || downTransomMetaData);

    if (mullionMetaData) {
      this.updateMullionStatesFromMeta(mullionMetaData, false);
    }
    if (upTransomMetaData) {
      this.updateUpTransomStatesFromMeta(upTransomMetaData, false);
    }
    if (middleTransomMetaData) {
      this.updateMiddleTransomStatesFromMeta(middleTransomMetaData, false);
    }
    if (downTransomMetaData) {
      this.updateDownTransomStatesFromMeta(downTransomMetaData, false);
    }

    if (shouldCompute && hasMetaUpdates) {
      this.compute();
    }
  }

  updateMullionStatesFromMeta(metadata: MetaData, shouldCompute: boolean = true): void {
    if (!metadata) return;

    if (metadata.profileSizeX !== undefined) {
      this.states.ID_MULLION_W.__value = metadata.profileSizeX;
    }
    if (metadata.profileSizeY !== undefined) {
      this.states.ID_MULLION_D.__value = metadata.profileSizeY;
    }

    if (metadata.slotsMap) {
      const slots = metadata.slotsMap;
      this.states.ID_MULLION_SLOT1_X.__value = slots.slot1.x;
      this.states.ID_MULLION_SLOT1_Y.__value = slots.slot1.y;
      this.states.ID_MULLION_SLOT1_W.__value = slots.slot1.width;
      this.states.ID_MULLION_SLOT1_H.__value = slots.slot1.height;
      this.states.ID_MULLION_SLOT2_X.__value = slots.slot2.x;
      this.states.ID_MULLION_SLOT2_Y.__value = slots.slot2.y;
      this.states.ID_MULLION_SLOT2_W.__value = slots.slot2.width;
      this.states.ID_MULLION_SLOT2_H.__value = slots.slot2.height;
    }

    if (shouldCompute) {
      this.compute();
    }
  }

  updateUpTransomStatesFromMeta(metadata: MetaData, shouldCompute: boolean = true): void {
    if (!metadata) return;

    if (metadata.profileSizeX !== undefined) {
      this.states.ID_UPTRANSOM_D.__value = metadata.profileSizeX;
    }
    if (metadata.profileSizeY !== undefined) {
      this.states.ID_UPTRANSOM_H.__value = metadata.profileSizeY;
    }

    if (metadata.slotsMap) {
      const slots = metadata.slotsMap;
      this.states.ID_UPTRANSOM_SLOT1_X.__value = slots.slot1.x;
      this.states.ID_UPTRANSOM_SLOT1_Y.__value = slots.slot1.y;
      this.states.ID_UPTRANSOM_SLOT1_W.__value = slots.slot1.width;
      this.states.ID_UPTRANSOM_SLOT1_H.__value = slots.slot1.height;
      this.states.ID_UPTRANSOM_SLOT2_X.__value = slots.slot2.x;
      this.states.ID_UPTRANSOM_SLOT2_Y.__value = slots.slot2.y;
      this.states.ID_UPTRANSOM_SLOT2_W.__value = slots.slot2.width;
      this.states.ID_UPTRANSOM_SLOT2_H.__value = slots.slot2.height;
    }

    if (shouldCompute) {
      this.compute();
    }
  }

  updateDownTransomStatesFromMeta(metadata: MetaData, shouldCompute: boolean = true): void {
    if (!metadata) return;

    if (metadata.profileSizeX !== undefined) {
      this.states.ID_DOWNTRANSOM_D.__value = metadata.profileSizeX;
    }
    if (metadata.profileSizeY !== undefined) {
      this.states.ID_DOWNTRANSOM_H.__value = metadata.profileSizeY;
    }

    if (metadata.slotsMap) {
      const slots = metadata.slotsMap;
      this.states.ID_DOWNTRANSOM_SLOT1_X.__value = slots.slot1.x;
      this.states.ID_DOWNTRANSOM_SLOT1_Y.__value = slots.slot1.y;
      this.states.ID_DOWNTRANSOM_SLOT1_W.__value = slots.slot1.width;
      this.states.ID_DOWNTRANSOM_SLOT1_H.__value = slots.slot1.height;
      this.states.ID_DOWNTRANSOM_SLOT2_X.__value = slots.slot2.x;
      this.states.ID_DOWNTRANSOM_SLOT2_Y.__value = slots.slot2.y;
      this.states.ID_DOWNTRANSOM_SLOT2_W.__value = slots.slot2.width;
      this.states.ID_DOWNTRANSOM_SLOT2_H.__value = slots.slot2.height;
    }

    if (shouldCompute) {
      this.compute();
    }
  }

  updateMiddleTransomStatesFromMeta(metadata: MetaData, shouldCompute: boolean = true): void {
    if (!metadata) return;

    if (metadata.profileSizeX !== undefined) {
      this.states.ID_MIDDLETRANSOM_D.__value = metadata.profileSizeX;
    }
    if (metadata.profileSizeY !== undefined) {
      this.states.ID_MIDDLETRANSOM_H.__value = metadata.profileSizeY;
    }

    if (metadata.slotsMap) {
      const slots = metadata.slotsMap;
      this.states.ID_MIDDLETRANSOM_SLOT1_X.__value = slots.slot1.x;
      this.states.ID_MIDDLETRANSOM_SLOT1_Y.__value = slots.slot1.y;
      this.states.ID_MIDDLETRANSOM_SLOT1_W.__value = slots.slot1.width;
      this.states.ID_MIDDLETRANSOM_SLOT1_H.__value = slots.slot1.height;
      this.states.ID_MIDDLETRANSOM_SLOT2_X.__value = slots.slot2.x;
      this.states.ID_MIDDLETRANSOM_SLOT2_Y.__value = slots.slot2.y;
      this.states.ID_MIDDLETRANSOM_SLOT2_W.__value = slots.slot2.width;
      this.states.ID_MIDDLETRANSOM_SLOT2_H.__value = slots.slot2.height;
    }

    if (shouldCompute) {
      this.compute();
    }
  }

  getSegmentLofts(): LoftEntity[] {
    const lofts: LoftEntity[] = [];
    HSCore.Util.Entity.traverseApplyFuncForEntity(this, (entity: LoftEntity) => {
      if (entity.contentType?.isTypeOf(PSegmentLoft.getPSegmentLoftContentTypes())) {
        lofts.push(entity);
      }
    });
    return lofts;
  }

  getLoftsByContentType(contentType: unknown): LoftEntity[] {
    const lofts: LoftEntity[] = [];
    HSCore.Util.Entity.traverseApplyFuncForEntity(this, (entity: LoftEntity) => {
      if (entity.contentType?.isTypeOf(contentType)) {
        lofts.push(entity);
      }
    });
    return lofts;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPSlidingDoorLeaf, PSlidingDoorLeaf);