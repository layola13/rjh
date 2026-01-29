import { ParametricModel_IO, ParametricModel } from './ParametricModel';
import { Entity } from './Entity';
import { EntityField } from './decorators';

interface MaterialData {
  [key: string]: unknown;
}

interface ExtrudedBodyParameters {
  points?: Array<unknown>;
  direction?: unknown;
  materialData?: MaterialData;
  materialDatas?: Record<string, MaterialData>;
}

interface SerializedExtrudedBody {
  snappingFaceKeys?: string[];
  hideFaceKeys?: string[];
  [key: string]: unknown;
}

interface DumpContext {
  [key: string]: unknown;
}

type DumpCallback = (dumped: unknown[], entity: ExtrudedBody) => void;

class ExtrudedBody_IO extends ParametricModel_IO {
  private static _instance?: ExtrudedBody_IO;

  static instance(): ExtrudedBody_IO {
    if (!ExtrudedBody_IO._instance) {
      ExtrudedBody_IO._instance = new ExtrudedBody_IO();
    }
    return ExtrudedBody_IO._instance;
  }

  dump(
    entity: ExtrudedBody,
    callback?: DumpCallback,
    recursive: boolean = true,
    context: DumpContext = {}
  ): unknown[] {
    const dumped = super.dump(entity, undefined, recursive, context);
    const serialized = dumped[0] as SerializedExtrudedBody;

    serialized.snappingFaceKeys = entity.snappingFaceKeys;
    serialized.hideFaceKeys = entity.hideFaceKeys;

    if (callback) {
      callback(dumped, entity);
    }

    return dumped;
  }

  load(
    entity: ExtrudedBody,
    data: SerializedExtrudedBody,
    context: unknown
  ): void {
    super.load(entity, data, context);
    entity.onParametersChanged();

    if (data.snappingFaceKeys) {
      entity.snappingFaceKeys = data.snappingFaceKeys;
    }

    if (data.hideFaceKeys) {
      entity.hideFaceKeys = data.hideFaceKeys;
    }
  }
}

class ExtrudedBody extends ParametricModel {
  @EntityField()
  parameters!: ExtrudedBodyParameters;

  snappingFaceKeys: string[] = [];
  hideFaceKeys: string[] = [];

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    this.snappingFaceKeys = [];
    this.hideFaceKeys = [];
    this.parameters.points = [];
  }

  initByParameters(params: ExtrudedBodyParameters): void {
    super.initByParameters(params);

    if (params.points != null) {
      this.parameters.points = params.points;
    }

    if (params.direction != null) {
      this.parameters.direction = params.direction;
    }
  }

  onParametersChanged(): void {
    const params = this.parameters;

    if (params.materialData) {
      this.setMaterial('originalface', params.materialData);
      this.setMaterial('extrudedface', params.materialData);

      if (this.parameters.points) {
        for (let i = 0; i < this.parameters.points.length; ++i) {
          this.setMaterial(`sideface${i}`, params.materialData);
        }
      }
    }

    if (params.materialDatas) {
      for (const key of Object.keys(params.materialDatas)) {
        this.setMaterial(key, params.materialDatas[key]);
      }
    }
  }

  addSnappingFaceKey(key: string): void {
    this.snappingFaceKeys.push(key);
  }

  addHideFaceKey(key: string): void {
    this.hideFaceKeys.push(key);
  }

  getIO(): ExtrudedBody_IO {
    return ExtrudedBody_IO.instance();
  }

  protected setMaterial(face: string, materialData: MaterialData): void {
    // Implementation depends on parent class
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricExtrudedBody, ExtrudedBody);

export { ExtrudedBody_IO, ExtrudedBody };