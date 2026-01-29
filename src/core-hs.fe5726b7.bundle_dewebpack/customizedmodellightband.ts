import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';
import { Logger } from './Logger';

interface LightBandParameters {
  path?: string;
  options?: LightBandOptions;
  backgroundFaceNormal?: Vector3;
  [key: string]: unknown;
}

interface LightBandOptions {
  lightBandId?: string;
  relativeIndices?: number[];
  [key: string]: unknown;
}

interface Vector3 {
  x: number;
  y: number;
  z?: number;
}

interface Metadata {
  id?: string;
  categories?: string[];
  contentType: HSCatalog.ContentType;
  parameters?: {
    flip?: boolean;
    [key: string]: unknown;
  };
}

interface GraphicsData {
  faces: Map<number, FaceData>;
  edges: Map<number, EdgeData>;
}

interface FaceData {
  sketchModelData?: {
    documentId: string;
  };
  [key: string]: unknown;
}

interface EdgeData {
  sketchModelData?: {
    documentId: string;
  };
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface LightBandMetaData {
  path: string;
  parameters: Record<string, unknown>;
  options: LightBandOptions;
}

interface WebCADLightBandResult {
  lightBandId?: string;
  relativeIndices?: number[];
  webCADDocument: unknown;
}

interface CustomizedModelInterface {
  webCADDocument: unknown;
  x: number;
  y: number;
  setWebCADDocumentQuietly(doc: unknown): void;
  getGraphicsData(): GraphicsData;
  getGraphicsDataAsync(): Promise<GraphicsData>;
  _graphicsData: GraphicsData;
}

export class CustomizedModelLightBand_IO extends Entity_IO {
  private static _instance?: CustomizedModelLightBand_IO;

  static instance(): CustomizedModelLightBand_IO {
    if (!this._instance) {
      this._instance = new CustomizedModelLightBand_IO();
    }
    return this._instance;
  }

  dump(
    entity: CustomizedModelLightBand,
    callback?: (result: unknown[], entity: CustomizedModelLightBand) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const dumpedData = result[0] as Record<string, unknown>;
    const parameters = entity.getParameters();

    parameters.backgroundFaceNormal = entity.backgroundFaceNormal;

    if (parameters.options && entity.options) {
      Object.assign(parameters.options, entity.options);
    }

    dumpedData.parameters = JSON.stringify(parameters, (key: string, value: unknown) => {
      if (value && typeof value === 'object' && 'toFixed' in value) {
        return Number((value as { toFixed: (digits: number) => string }).toFixed(6));
      }
      return value;
    });

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(
    entity: CustomizedModelLightBand,
    data: { parameters: string; [key: string]: unknown },
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    const parameters = JSON.parse(data.parameters) as LightBandMetaData;
    entity.initByMeta(parameters);
  }
}

export class CustomizedModelLightBand extends Entity {
  private _host?: CustomizedModelInterface;
  private _parameters: LightBandParameters;
  private _graphicsData?: GraphicsData;
  
  metadata: Metadata;
  signalMaterialChanged: Signal<void>;
  signalWebCADDocChanged: Signal<void>;

  constructor(name: string = "", parent?: Entity) {
    super(name, parent);
    
    this._host = undefined;
    this.metadata = {
      contentType: new HSCatalog.ContentType(HSCatalog.ContentTypeEnum.CustomizedModelLightBand)
    };
    this._parameters = {};
    this._graphicsData = undefined;
    this.signalMaterialChanged = new Signal(this);
    this.signalWebCADDocChanged = new Signal(this);
  }

  get parameters(): LightBandParameters {
    if (!this._parameters) {
      this._parameters = {};
    }
    return this._parameters;
  }

  set parameters(value: LightBandParameters) {
    this._parameters = value || {};
  }

  get contentType(): HSCatalog.ContentType | undefined {
    Logger.console.assert(this.metadata, `${this.tag}.contentType: invalid metadata!`);
    return this.metadata?.contentType;
  }

  get path(): string | undefined {
    return this.parameters.path;
  }

  get options(): LightBandOptions | undefined {
    return this.parameters.options;
  }

  get lightBandId(): string {
    return this.parameters.options?.lightBandId ?? "";
  }

  get flip(): boolean {
    Logger.console.assert(this.metadata, `${this.tag}.flip: invalid metadata!`);
    return !!(this.metadata?.parameters?.flip);
  }

  get backgroundFaceNormal(): Vector3 | undefined {
    return this.parameters.backgroundFaceNormal;
  }

  getIO(): CustomizedModelLightBand_IO {
    return CustomizedModelLightBand_IO.instance();
  }

  static constructMetaData(
    path: string,
    parameters: Record<string, unknown> = {},
    options: LightBandOptions = {}
  ): LightBandMetaData {
    return {
      path,
      parameters,
      options
    };
  }

  initByMeta(metadata: LightBandMetaData): void {
    this.parameters = { ...metadata.parameters };
    this.parameters.options = metadata.options || {};
    this.parameters.path = metadata.path;
    
    this.metadata = {
      id: "light-band-default",
      categories: [],
      contentType: new HSCatalog.ContentType(HSCatalog.ContentTypeEnum.CustomizedModelLightBand)
    };
  }

  dirtyMaterial(): void {
    super.dirtyMaterial();
    this.signalMaterialChanged.dispatch();
  }

  getHost(): CustomizedModelInterface | undefined {
    return this._host;
  }

  assignTo(host: CustomizedModelInterface): void {
    this._host = host;
  }

  private _getGraphicsDataFromParent(parentData: GraphicsData, targetData: GraphicsData): void {
    parentData.faces.forEach((face, index) => {
      if (face?.sketchModelData?.documentId === this.lightBandId) {
        targetData.faces.set(index, face);
      }
    });

    parentData.edges.forEach((edge, index) => {
      if (edge?.sketchModelData?.documentId === this.lightBandId) {
        targetData.edges.set(index, edge);
      }
    });
  }

  getGraphicsData(): GraphicsData {
    const emptyData: GraphicsData = {
      faces: new Map(),
      edges: new Map()
    };

    const parent = this.getUniqueParent() as CustomizedModelInterface | undefined;
    if (!parent) {
      return emptyData;
    }

    const parentGraphicsData = parent.getGraphicsData();
    this._getGraphicsDataFromParent(parentGraphicsData, emptyData);
    
    return emptyData;
  }

  getGraphicsDataAsync(): Promise<GraphicsData> {
    const emptyData: GraphicsData = {
      faces: new Map(),
      edges: new Map()
    };

    const parent = this.getUniqueParent() as CustomizedModelInterface | undefined;
    
    if (!parent) {
      return Promise.resolve(emptyData);
    }

    return parent.getGraphicsDataAsync().then(parentData => {
      this._getGraphicsDataFromParent(parentData, emptyData);
      return emptyData;
    });
  }

  applyToCustomizedModel(model?: CustomizedModelInterface): boolean {
    if (!model) {
      return false;
    }

    const config = {
      path: this.path
    };

    const result = WebCADModelAPI.createLightBandV2(
      model.webCADDocument,
      config,
      this.parameters,
      this.options
    ) as WebCADLightBandResult;

    if (!result?.lightBandId) {
      return false;
    }

    model.setWebCADDocumentQuietly(result.webCADDocument);
    
    if (!this.options) {
      this.parameters.options = {};
    }
    
    this.options!.lightBandId = result.lightBandId;
    this.options!.relativeIndices = result.relativeIndices;
    this.dirtyGeometry();
    
    return true;
  }

  updateMetadata(metadata: LightBandMetaData): void {
    this.initByMeta(metadata);

    const parent = this.getUniqueParent() as CustomizedModelInterface | undefined;
    if (!parent) {
      return;
    }

    const updatedDocument = WebCADModelAPI.editLightBand(
      parent.webCADDocument,
      this.lightBandId,
      this.parameters
    );
    
    parent.setWebCADDocumentQuietly(updatedDocument);
    
    WebCADModelAPI.updateGraphicsDataByChild(
      parent.webCADDocument,
      parent._graphicsData,
      this.lightBandId,
      true
    );
    
    this.dirtyGeometry();
    this.dirtyMaterial();
  }

  getParameters(): LightBandParameters {
    const parent = this.getUniqueParent() as CustomizedModelInterface | undefined;
    
    if (!parent) {
      return {};
    }

    const params = WebCADModelAPI.getLightBandParameters(
      parent.webCADDocument,
      this.lightBandId
    ) as LightBandParameters;

    if (this.parameters.backgroundFaceNormal && params?.parameters) {
      params.parameters.backgroundFaceNormal = this.parameters.backgroundFaceNormal;
    }

    return params || {};
  }

  isContentInLoop(entity: Entity, strict: boolean = false): boolean {
    if (!HSCore.Util.Layer.isInSameLayer(entity, this)) {
      return false;
    }

    const polygon = entity.getOuterLoopPolygon();
    const parent = this.getUniqueParent() as CustomizedModelInterface | undefined;

    if (!polygon || !parent) {
      return false;
    }

    return HSCore.Util.Math.isPointInPolygon(
      { x: parent.x, y: parent.y },
      polygon,
      strict
    );
  }

  canTransactField(): boolean {
    return false;
  }
}

Entity.registerClass(HSConstants.ModelClass.CustomizedModelLightBand, CustomizedModelLightBand);