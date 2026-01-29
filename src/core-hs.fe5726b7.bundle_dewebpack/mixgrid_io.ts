import { Grid_IO, Grid } from './Grid';
import { Entity } from './Entity';
import { EntityField, bindMaterialData } from './EntityDecorators';
import { GridUtil } from './GridUtil';
import { Logger } from './Logger';

interface DumpOptions {
  version?: string;
  idGenerator?: {
    getNewId: (oldId: string) => string | null;
  };
}

interface MaterialInfo {
  seekId: string;
  polygons: string[];
  percent: number;
  extSeekIds: string[];
}

interface SeamMaterialConfig {
  color?: string | number;
  colorMode?: HSCore.Material.ColorModeEnum;
  useColor?: boolean;
}

interface PavingOption {
  point: { x: number; y: number };
  rotation: number;
}

interface ParentWithPaving {
  pavingOption?: PavingOption;
  getBoundaryWidth: () => number;
}

interface BlockUpdateParams {
  oldId?: string;
  newId?: string;
  seekId?: string;
}

interface CreateParams {
  material?: {
    seekId: string;
  };
}

interface DumpedData {
  polygons?: string[];
  seamColor?: number;
  seamWidth?: number;
  seamMaterial?: string;
  tileSizeX?: number;
  tileSizeY?: number;
  materials?: MaterialInfo[];
  type?: string;
}

export class MixGrid_IO extends Grid_IO {
  private static _MixGrid_IO_instance: MixGrid_IO | null = null;

  static instance(): MixGrid_IO {
    if (!MixGrid_IO._MixGrid_IO_instance) {
      MixGrid_IO._MixGrid_IO_instance = new MixGrid_IO();
    }
    return MixGrid_IO._MixGrid_IO_instance;
  }

  dump(
    entity: MixGrid,
    callback?: (dumpData: unknown[], entity: MixGrid) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpData = super.dump(entity, undefined, includeMetadata, options);
    const rootData = dumpData[0] as DumpedData;
    const blockIds = entity.__blocks.map((block) => block.id);

    if (blockIds && blockIds.length > 0) {
      rootData.polygons = blockIds;
    }

    rootData.seamColor = entity.seamColor;
    rootData.seamWidth = entity.seamWidth;
    rootData.seamMaterial = entity.seamMaterial?.id;

    if (entity.seamMaterial) {
      HSCore.Material.MaterialData.dumpMaterialData(entity.seamMaterial, options);
    }

    rootData.tileSizeX = entity.tileSizeX;
    rootData.tileSizeY = entity.tileSizeY;

    const clonedMaterials = _.cloneDeep(entity.materials);
    if (clonedMaterials && clonedMaterials.length > 0) {
      rootData.materials = clonedMaterials;
    }

    rootData.type = entity.type;

    if (callback) {
      callback(dumpData, entity);
    }

    return dumpData;
  }

  load(entity: MixGrid, data: DumpedData, options: DumpOptions = {}): void {
    super.load(entity, data, options);

    const blockIds = data.polygons;
    const loadedBlocks: Entity[] = [];

    if (blockIds) {
      blockIds.forEach((blockId) => {
        const loadedEntity = Entity.loadFromDumpById(blockId, options);
        if (loadedEntity) {
          loadedBlocks.push(loadedEntity);
        }
      });
    }

    entity.__blocks = loadedBlocks;
    entity.__seamColor = data.seamColor!;
    entity.__seamWidth = data.seamWidth!;

    let seamMaterial: HSCore.Material.MaterialData | undefined;

    if (HSCore.Util.Version.isEarlierThan(options.version, "0.14") && data.seamMaterial) {
      const materialConfig = data.seamMaterial as unknown as SeamMaterialConfig;
      if (materialConfig.useColor) {
        materialConfig.colorMode = HSCore.Material.ColorModeEnum.color;
        materialConfig.useColor = undefined;
      }
      seamMaterial = HSCore.Material.MaterialData.create(materialConfig);
    } else if (data.seamMaterial) {
      seamMaterial = HSCore.Material.MaterialData.loadFromDumpById(data.seamMaterial);
    }

    entity.__seamMaterial = seamMaterial;

    if (seamMaterial) {
      bindMaterialData(entity, "seamMaterial", seamMaterial);
    }

    entity.tileSizeX = data.tileSizeX!;
    entity.tileSizeY = data.tileSizeY!;
    entity.materials = data.materials ? _.cloneDeep(data.materials) : [];

    if (options.idGenerator?.getNewId) {
      entity.materials.forEach((material) => {
        material?.polygons.forEach((polygonId, index, polygonArray) => {
          const newId = options.idGenerator!.getNewId(polygonId);
          if (newId) {
            polygonArray[index] = newId;
          }
        });
      });
    }

    entity.type = data.type!;
  }
}

export class MixGrid extends Grid {
  __blocks: Entity[] = [];
  materials: MaterialInfo[] = [];
  __seamColor: number = 0xffffff;
  __seamWidth?: number;
  __seamMaterial?: HSCore.Material.MaterialData;
  tileSizeX?: number;
  tileSizeY?: number;
  type: string = "";

  constructor(name: string = "", parent?: Entity) {
    super(name, parent);
  }

  static create(
    params: CreateParams,
    type: { type: string },
    blocks?: Entity[],
    tileSizeX?: number,
    tileSizeY?: number,
    seamColor?: string,
    seamWidth?: number,
    seamMaterial?: HSCore.Material.MaterialData | SeamMaterialConfig
  ): MixGrid {
    const mixGrid = new MixGrid();
    MixGrid.update(mixGrid, params, blocks, tileSizeX, tileSizeY, seamColor, seamWidth, seamMaterial, type);
    return mixGrid;
  }

  @EntityField({
    get() {
      return this.__blocks.slice();
    },
    partialSet(value: Entity[]) {
      this._setBlocks(value);
    }
  })
  blocks!: Entity[];

  get polygons(): Entity[] {
    return this.blocks;
  }

  set polygons(value: Entity[]) {
    this.blocks = value;
  }

  get __polygons(): Entity[] {
    return this.__blocks;
  }

  set __polygons(value: Entity[]) {
    this.__blocks = value;
  }

  getIO(): MixGrid_IO {
    return MixGrid_IO.instance();
  }

  _setBlocks(newBlocks: Entity[]): void {
    this.replaceChildren(this.__blocks, newBlocks);
    this.__blocks = newBlocks.slice();
  }

  static update(
    entity: MixGrid,
    params: CreateParams,
    blocks?: Entity[],
    tileSizeX?: number,
    tileSizeY?: number,
    seamColor?: string,
    seamWidth?: number,
    seamMaterial?: HSCore.Material.MaterialData | SeamMaterialConfig,
    typeConfig?: { type: string }
  ): void {
    entity.blocks = blocks || [];

    const invalidBlock = entity.blocks.find((block) => {
      const parentKeys = Object.keys(block.parents);
      return !!(block instanceof Entity && parentKeys.length > 0 && parentKeys[0] && parentKeys[0] !== entity.id);
    });

    Logger.console.assert(
      !invalidBlock,
      "should not create on a polygon entity directly, it will cause duplicated reference"
    );

    entity.tileSizeX = tileSizeX;
    entity.tileSizeY = tileSizeY;
    entity.type = typeConfig?.type || "";
    entity.materials = [
      {
        seekId: params?.material?.seekId || "",
        polygons: [],
        percent: 1,
        extSeekIds: []
      }
    ];

    entity.seamColor = seamColor || "#ffffff";
    entity.seamWidth = seamWidth || 2;

    if (!seamMaterial || seamMaterial instanceof HSCore.Material.MaterialData || !(seamMaterial as SeamMaterialConfig).hasOwnProperty("color")) {
      if (seamMaterial && seamMaterial instanceof HSCore.Material.MaterialData && seamMaterial.color != null) {
        entity.seamMaterial = seamMaterial;
      } else {
        entity.seamMaterial = HSCore.Material.MaterialData.create(HSConstants.Constants.DEFAULT_SEAM_MATERIAL);
      }
    } else {
      entity.seamMaterial = HSCore.Material.MaterialData.create(seamMaterial as SeamMaterialConfig);
    }

    entity.blocks.forEach((block) => {
      entity.materials[0].polygons.push(block.id);
    });
  }

  updataPolygonIdInMaterials(params: BlockUpdateParams): void {
    Logger.console.warn("deprecated, use updateBlockMaterialMap instead.");
    this.updateBlockMaterialMap(params);
  }

  updateBlockMaterialMap(params: BlockUpdateParams): void {
    const { oldId, newId, seekId } = params;

    if (!seekId) return;

    const clonedMaterials = _.cloneDeep(this.materials);
    let updated = false;

    for (const material of clonedMaterials) {
      if (material.seekId === seekId || (material.extSeekIds && material.extSeekIds.includes(seekId))) {
        if (oldId) {
          const index = material.polygons.indexOf(oldId);
          if (index !== -1) {
            if (newId) {
              material.polygons[index] = newId;
            } else {
              material.polygons.splice(index, 1);
            }
            updated = true;
            break;
          }
        } else if (newId && material.polygons.indexOf(newId) === -1) {
          material.polygons.push(newId);
          updated = true;
          break;
        }
      }
    }

    if (updated) {
      this.materials = clonedMaterials;
    }
  }

  getChildMaterials(): HSCore.Material.MaterialData[] {
    return this.blocks.map((block) => block.material);
  }

  isMixType(): boolean {
    return this.type === HSCore.Model.GridTypeEnum.MixedPaint;
  }

  update(): void {
    Logger.console.log("调用了MixGrid update");
    const parent = this.parent as ParentWithPaving | undefined;

    if (parent?.pavingOption) {
      const boundaryWidth = parent.getBoundaryWidth();
      GridUtil.reshapeGrid(
        parent,
        0,
        0,
        0,
        parent.pavingOption.point.x - boundaryWidth,
        parent.pavingOption.point.y - boundaryWidth,
        parent.pavingOption.rotation
      );
    }
  }

  setFlagOn(flag: number, recursive: boolean): void {
    super.setFlagOn(flag, recursive);
    if (this.blocks) {
      this.blocks.forEach((block) => {
        block.setFlagOn(flag, recursive);
      });
    }
  }

  setFlagOff(flag: number, recursive: boolean): void {
    super.setFlagOff(flag, recursive);
    if (this.blocks) {
      this.blocks.forEach((block) => {
        block.setFlagOff(flag, recursive);
      });
    }
  }

  isValid(): boolean {
    return this.blocks.length > 0;
  }

  checkClonedResult(idMap: { getNewId: (id: string) => string }): void {
    super.checkClonedResult(idMap);

    for (const material of this.materials) {
      const polygonIds = material.polygons;
      const newPolygonIds: string[] = [];

      for (const polygonId of polygonIds) {
        newPolygonIds.push(idMap.getNewId(polygonId));
      }

      material.polygons = newPolygonIds;
    }
  }

  @EntityField()
  declare materials: MaterialInfo[];

  @EntityField()
  declare tileSizeX: number | undefined;

  @EntityField()
  declare tileSizeY: number | undefined;

  @EntityField({
    partialSet(value: string | number) {
      this.__seamColor = HSCore.Material.Util.convertColorToNumber(value);
    },
    validate: (value: unknown) => value != null
  })
  seamColor!: string | number;

  @EntityField()
  seamWidth?: number;

  @EntityField()
  seamMaterial?: HSCore.Material.MaterialData;

  @EntityField()
  declare type: string;
}

Entity.registerClass(HSConstants.ModelClass.MixGrid, MixGrid);