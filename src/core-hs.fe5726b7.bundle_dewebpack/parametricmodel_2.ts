import { MaterialData } from './MaterialData';
import { EntityField } from './EntityField';
import { Version } from './Version';
import { Entity, Entity_IO } from './Entity';

export enum ParametricModelType {
  extrudedBody = "extrudedBody",
  window = "window",
  windowFrame = "window",
  wall = "wall",
  windowWall = "wall",
  windowSill = "windowSill",
  windowCeiling = "windowCeiling",
  windowHole = "windowHole",
  windowPocket = "windowPocket"
}

interface MaterialDataReference {
  id: string;
  color?: string;
  [key: string]: unknown;
}

interface FrameParameters {
  materialData?: MaterialData;
  [key: string]: unknown;
}

interface WindowParameters {
  materialData?: MaterialData;
  [key: string]: unknown;
}

interface Parameters {
  materialData?: MaterialData;
  innerMaterialData?: MaterialData;
  sideMaterialData?: MaterialData;
  topMaterialData?: MaterialData;
  bottomMaterialData?: MaterialData;
  frame?: FrameParameters;
  window?: WindowParameters;
  [key: string]: unknown;
}

interface DumpedData {
  x: number;
  y: number;
  z: number;
  XRotation?: number;
  YRotation?: number;
  ZRotation?: number;
  parameters: {
    materialData?: string;
    innerMaterialData?: string;
    sideMaterialData?: string;
    topMaterialData?: string;
    bottomMaterialData?: string;
    frame?: {
      materialData?: string;
      [key: string]: unknown;
    };
    window?: {
      materialData?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  host?: string;
  [key: string]: unknown;
}

interface LoadOptions {
  version?: string;
  [key: string]: unknown;
}

interface DumpContext {
  [key: string]: unknown;
}

export class ParametricModel_IO extends Entity_IO {
  dump(
    entity: ParametricModel,
    callback?: (result: unknown[], source: ParametricModel) => void,
    includeDefaults: boolean = true,
    context: DumpContext = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, context);
    const dumpedData = result[0] as DumpedData;
    const model = entity;

    dumpedData.x = Number(model.x);
    dumpedData.y = Number(model.y);
    dumpedData.z = Number(model.z);

    if (model.XRotation) {
      dumpedData.XRotation = model.XRotation;
    }
    if (model.YRotation) {
      dumpedData.YRotation = model.YRotation;
    }
    if (model.ZRotation) {
      dumpedData.ZRotation = model.ZRotation;
    }

    const parameters = model.parameters;
    dumpedData.parameters = _.cloneDeep(parameters);

    if (parameters.materialData) {
      MaterialData.dumpMaterialData(parameters.materialData, context);
      dumpedData.parameters.materialData = parameters.materialData.id;
    }
    if (parameters.innerMaterialData) {
      MaterialData.dumpMaterialData(parameters.innerMaterialData, context);
      dumpedData.parameters.innerMaterialData = parameters.innerMaterialData.id;
    }
    if (parameters.sideMaterialData) {
      MaterialData.dumpMaterialData(parameters.sideMaterialData, context);
      dumpedData.parameters.sideMaterialData = parameters.sideMaterialData.id;
    }
    if (parameters.topMaterialData) {
      MaterialData.dumpMaterialData(parameters.topMaterialData, context);
      dumpedData.parameters.topMaterialData = parameters.topMaterialData.id;
    }
    if (parameters.bottomMaterialData) {
      MaterialData.dumpMaterialData(parameters.bottomMaterialData, context);
      dumpedData.parameters.bottomMaterialData = parameters.bottomMaterialData.id;
    }
    if (parameters.frame?.materialData) {
      MaterialData.dumpMaterialData(parameters.frame.materialData, context);
      dumpedData.parameters.frame!.materialData = parameters.frame.materialData.id;
    }
    if (parameters.window?.materialData) {
      MaterialData.dumpMaterialData(parameters.window.materialData, context);
      dumpedData.parameters.window!.materialData = parameters.window.materialData.id;
    }

    if (model._host) {
      dumpedData.host = model._host.id;
    }

    if (callback) {
      callback(result, model);
    }

    return result;
  }

  load(entity: ParametricModel, data: DumpedData, options: LoadOptions = {}): void {
    super.load(entity, data, options);

    const model = entity;
    model.__x = data.x;
    model.__y = data.y;
    model.__z = data.z;
    model.__XRotation = data.XRotation ?? 0;
    model.__YRotation = data.YRotation ?? 0;
    model.__ZRotation = data.ZRotation ?? 0;
    model.__parameters = _.cloneDeep(data.parameters);

    if (model.__parameters.materialData) {
      if (Version.isEarlierThan(options.version, "0.14")) {
        const isDefaultColor = (model.__parameters.materialData as unknown as MaterialDataReference).color === "#96969B";
        const materialData = isDefaultColor
          ? HSCore.Material.MaterialData.create(HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL)
          : HSCore.Material.MaterialData.create(model.__parameters.materialData);
        model.__parameters.materialData = materialData;
      } else {
        model.__parameters.materialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.materialData as unknown as string,
          options
        );
      }
    }

    if (model.__parameters.innerMaterialData) {
      if (Version.isEarlierThan(options.version, "0.14")) {
        const materialData = HSCore.Material.MaterialData.create(model.__parameters.innerMaterialData);
        model.__parameters.innerMaterialData = materialData;
      } else {
        model.__parameters.innerMaterialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.innerMaterialData as unknown as string,
          options
        );
      }
    }

    if (model.__parameters.sideMaterialData) {
      if (Version.isEarlierThan(options.version, "0.14")) {
        const materialData = HSCore.Material.MaterialData.create(model.__parameters.sideMaterialData);
        model.__parameters.sideMaterialData = materialData;
      } else {
        model.__parameters.sideMaterialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.sideMaterialData as unknown as string,
          options
        );
      }
    }

    if (model.__parameters.topMaterialData) {
      if (Version.isEarlierThan(options.version, "0.14")) {
        const materialData = HSCore.Material.MaterialData.create(model.__parameters.topMaterialData);
        model.__parameters.topMaterialData = materialData;
      } else {
        model.__parameters.topMaterialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.topMaterialData as unknown as string,
          options
        );
      }
    }

    if (model.__parameters.bottomMaterialData) {
      if (Version.isEarlierThan(options.version, "0.14")) {
        const materialData = HSCore.Material.MaterialData.create(model.__parameters.bottomMaterialData);
        model.__parameters.bottomMaterialData = materialData;
      } else {
        model.__parameters.bottomMaterialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.bottomMaterialData as unknown as string,
          options
        );
      }
    }

    if (model.__parameters.frame?.materialData) {
      if (HSCore.Util.Version.isEarlierThan(options.version, "0.14")) {
        const materialData = HSCore.Material.MaterialData.create(model.__parameters.frame.materialData);
        model.__parameters.frame.materialData = materialData;
      } else {
        model.__parameters.frame.materialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.frame.materialData as unknown as string,
          options
        );
      }
    }

    if (model.__parameters.window?.materialData) {
      if (HSCore.Util.Version.isEarlierThan(options.version, "0.14")) {
        const materialData = HSCore.Material.MaterialData.create(model.__parameters.window.materialData);
        model.__parameters.window.materialData = materialData;
      } else {
        model.__parameters.window.materialData = HSCore.Material.MaterialData.loadFromDumpById(
          model.__parameters.window.materialData as unknown as string,
          options
        );
      }
    }

    const hostId = data.host;
    if (hostId) {
      model.assignTo(Entity.loadFromDumpById(hostId, options));
    }
  }
}

export class ParametricModel extends Entity {
  __x: number = 0;
  __y: number = 0;
  __z: number = 0;
  __XRotation: number = 0;
  __YRotation: number = 0;
  __ZRotation: number = 0;
  __parameters: Parameters = {};
  __needUpdate: boolean = true;
  _host: Entity | null = null;
  materials: Map<string, MaterialData> = new Map();

  @EntityField()
  x!: number;

  @EntityField()
  y!: number;

  @EntityField()
  z!: number;

  @EntityField()
  XRotation!: number;

  @EntityField()
  YRotation!: number;

  @EntityField()
  ZRotation!: number;

  @EntityField()
  parameters!: Parameters;

  @EntityField()
  needUpdate!: boolean;

  @EntityField({ prefix: "_" })
  host!: Entity | null;

  constructor(id: string = "", type?: string) {
    super(id, type);
  }

  initByParameters(parameters: Parameters): void {
    this.__parameters = _.cloneDeep(parameters);

    if (this.__parameters.materialData) {
      this.__parameters.materialData = HSCore.Material.MaterialData.create(this.__parameters.materialData);
    }
    if (this.__parameters.frame?.materialData) {
      this.__parameters.frame.materialData = HSCore.Material.MaterialData.create(this.__parameters.frame.materialData);
    }
    if (this.__parameters.window?.materialData) {
      this.__parameters.window.materialData = HSCore.Material.MaterialData.create(this.__parameters.window.materialData);
    }
  }

  getHost(): Entity | null {
    return this._host;
  }

  onParametersChanged(): void {
    // Override in subclasses
  }

  assignTo(host: Entity): void {
    this.host = host;
  }

  getMaterial(key: string): MaterialData | undefined {
    return this.materials.get(key);
  }

  setMaterial(key: string, material: MaterialData): void {
    this.materials.set(key, material);
  }

  get materialsForFGI(): Map<string, unknown> {
    const result = new Map<string, unknown>();
    this.materials.forEach((material, key) => {
      const json = material.toJson();
      result.set(key, json);
    });
    return result;
  }

  getIO(): ParametricModel_IO {
    return ParametricModel_IO.instance();
  }

  refreshBoundInternal(): void {
    // Override in subclasses
  }

  protected _copyFrom(source: ParametricModel): void {
    this.initByParameters(source.parameters);
    if (source.material) {
      this.material = source.material.clone();
    }
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (fieldName === "parameters") {
      this.onParametersChanged();
      if (this.needUpdate) {
        this.dirtyGeometry();
      }
    } else if (fieldName === "needUpdate" && newValue === true) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricModel, ParametricModel);