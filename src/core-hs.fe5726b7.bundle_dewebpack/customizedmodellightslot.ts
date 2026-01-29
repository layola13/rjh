import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';
import { Logger } from './Logger';

interface LightSlotParameters {
  path?: string;
  options?: LightSlotOptions;
  flip?: boolean;
  width?: number;
  height?: number;
  backgroundFaceNormal?: THREE.Vector3;
  aLength?: number;
  bLength?: number;
}

interface LightSlotOptions {
  lightSlotId?: string;
  validateNormal?: THREE.Vector3;
  validateNormals?: THREE.Vector3[];
  relativeIndices?: number[];
}

interface LightSlotMetadata {
  id: string;
  categories: string[];
  contentType: HSCatalog.ContentType;
  hasLightBand?: boolean;
}

interface GraphicsData {
  faces: Map<number, FaceData>;
  edges: Map<number, EdgeData>;
  contents: Map<number, unknown>;
}

interface FaceData {
  sketchModelData?: {
    documentId: string;
  };
}

interface EdgeData {
  sketchModelData?: {
    documentId: string;
  };
}

interface MetaDataInput {
  path: string;
  parameters?: Record<string, unknown>;
  options?: LightSlotOptions;
  backgroundFaceNormal?: { x: number; y: number; z: number };
}

interface LightSlotCreationResult {
  lightSlotId?: string;
  isValid: boolean;
  webCADDocument: unknown;
  relativeIndices?: number[];
}

interface DumpOptions {
  [key: string]: unknown;
}

export class CustomizedModelLightSlot_IO extends Entity_IO {
  dump(
    entity: CustomizedModelLightSlot,
    callback?: (result: unknown[], entity: CustomizedModelLightSlot) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const serialized = result[0] as Record<string, unknown>;
    const parameters = entity.getParameters();

    parameters.backgroundFaceNormal = entity.backgroundFaceNormal;

    if (parameters.options && entity.options) {
      Object.assign(parameters.options, entity.options);
    }

    serialized.parameters = JSON.stringify(parameters, (_key, value) =>
      value && typeof value.toFixed === 'function' ? Number(value.toFixed(6)) : value
    );

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: CustomizedModelLightSlot, data: Record<string, unknown>, options: DumpOptions = {}): void {
    const parameters = JSON.parse(data.parameters as string) as LightSlotParameters;

    if (parameters.options) {
      const validateNormal = parameters.options.validateNormal as unknown as { x: number; y: number; z: number } | undefined;
      if (validateNormal) {
        parameters.options.validateNormal = new THREE.Vector3(validateNormal.x, validateNormal.y, validateNormal.z);
      }

      const validateNormals = parameters.options.validateNormals as unknown as Array<{ x: number; y: number; z: number } | null> | undefined;
      if (validateNormals) {
        const normals: THREE.Vector3[] = [];
        validateNormals.forEach((normal) => {
          if (normal) {
            normals.push(new THREE.Vector3(normal.x, normal.y, normal.z));
          }
        });
        parameters.options.validateNormals = normals;
      }
    }

    entity.initByMeta(parameters as unknown as MetaDataInput);
    super.load(entity, data, options);
  }
}

export class CustomizedModelLightSlot extends Entity {
  private _host: unknown | null;
  private metadata: LightSlotMetadata;
  private _parameters: LightSlotParameters;
  public bottomProjection: unknown | undefined;
  public topProjection: unknown | undefined;
  public signalMaterialChanged: Signal<unknown>;
  public signalWebCADDocChanged: Signal<unknown>;

  constructor(id: string = '', tag?: string) {
    super(id, tag);
    this._host = null;
    this.metadata = {} as LightSlotMetadata;
    this._parameters = {};
    this.bottomProjection = undefined;
    this.topProjection = undefined;
    this.signalMaterialChanged = new Signal(this);
    this.signalWebCADDocChanged = new Signal(this);
  }

  get parameters(): LightSlotParameters {
    return this._parameters ?? (this._parameters = {});
  }

  set parameters(value: LightSlotParameters) {
    this._parameters = value ?? {};
  }

  get contentType(): HSCatalog.ContentType | undefined {
    Logger.console.assert(this.metadata, `${this.tag}.contentType: invalid metadata!`);
    return this.metadata?.contentType;
  }

  get hasLightBand(): boolean {
    Logger.console.assert(this.metadata, `${this.tag}.hasLightBand: invalid metadata!`);
    return !!this.metadata && !!this.metadata.hasLightBand;
  }

  get path(): string | undefined {
    return this.parameters.path;
  }

  get options(): LightSlotOptions | undefined {
    return this.parameters.options;
  }

  get lightSlotId(): string {
    return this.parameters.options?.lightSlotId ?? '';
  }

  get flip(): boolean {
    return !!this.parameters.flip;
  }

  get width(): number {
    return this.parameters.width ?? HSConstants.Constants.CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_WIDTH;
  }

  get height(): number {
    return this.parameters.height ?? HSConstants.Constants.CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_HEIGHT;
  }

  get backgroundFaceNormal(): THREE.Vector3 | undefined {
    return this.parameters.backgroundFaceNormal;
  }

  getIO(): CustomizedModelLightSlot_IO {
    return CustomizedModelLightSlot_IO.instance();
  }

  static constructMetaData(
    path: string,
    parameters: Record<string, unknown> = {},
    options: LightSlotOptions = {}
  ): MetaDataInput {
    return {
      path,
      parameters,
      options,
    };
  }

  initByMeta(meta: MetaDataInput): void {
    const params: LightSlotParameters = Object.assign({}, meta.parameters);
    params.options = meta.options ?? {};
    params.path = meta.path;
    params.aLength = (params.height ?? this.height) / 100;
    params.bLength = (params.width ?? this.width) / 100;

    if (meta.backgroundFaceNormal) {
      params.backgroundFaceNormal = new THREE.Vector3(
        meta.backgroundFaceNormal.x,
        meta.backgroundFaceNormal.y,
        meta.backgroundFaceNormal.z
      );
    }

    this.parameters = params;
    this.createDefaultMetaData();
  }

  createDefaultMetaData(): void {
    const metadata: LightSlotMetadata = {
      id: 'light-slot-default',
      categories: [],
      contentType: new HSCatalog.ContentType(HSCatalog.ContentTypeEnum.CustomizedModelLightSlot),
    };
    this.metadata = metadata;
  }

  getEntitesAppendOnLightSlot(): Entity[] {
    Logger.console.error('use getEntitiesAppendOnLightSlot instead.');
    return this.getEntitiesAppendOnLightSlot();
  }

  getEntitiesAppendOnLightSlot(): Entity[] {
    const parent = this.getUniqueParent() as CustomizedModel | null;
    if (!parent) return [];

    if (parent?.webCADDocument) {
      const affectedIds = WebCADModelAPI.getAffectedChildIds(parent.webCADDocument, this.lightSlotId);
      const moldingEntities = parent.getMoldingEntities();
      const result: Entity[] = [];

      affectedIds.forEach((id: string) => {
        moldingEntities.forEach((entity: MoldingEntity) => {
          if (entity?.moldingId === id) {
            result.push(entity);
          }
        });
      });

      return result;
    }

    return [];
  }

  dirtyGeometry(): void {
    super.dirtyGeometry();
    this.getEntitiesAppendOnLightSlot().forEach((entity) => {
      entity.dirtyGeometry();
    });
  }

  dirtyMaterial(material?: unknown): void {
    super.dirtyMaterial(material);
    this.signalMaterialChanged.dispatch(material);
  }

  private _getGraphicsDataFromParent(parentData: GraphicsData, targetData: GraphicsData): void {
    parentData.faces.forEach((face, index) => {
      if (face?.sketchModelData?.documentId === this.lightSlotId) {
        targetData.faces.set(index, face);
      }
    });

    parentData.edges.forEach((edge, index) => {
      if (edge?.sketchModelData?.documentId === this.lightSlotId) {
        targetData.edges.set(index, edge);
      }
    });
  }

  getGraphicsData(): GraphicsData {
    const data: GraphicsData = {
      faces: new Map(),
      edges: new Map(),
      contents: new Map(),
    };

    const parent = this.getUniqueParent() as CustomizedModel | null;
    if (!parent) return data;

    const parentData = parent.getGraphicsData();
    this._getGraphicsDataFromParent(parentData, data);
    return data;
  }

  getGraphicsDataAsync(): Promise<GraphicsData> {
    const data: GraphicsData = {
      faces: new Map(),
      edges: new Map(),
      contents: new Map(),
    };

    const parent = this.getUniqueParent() as CustomizedModel | null;
    if (!parent) return Promise.resolve(data);

    return parent.getGraphicsDataAsync().then((parentData) => {
      this._getGraphicsDataFromParent(parentData, data);
      return data;
    });
  }

  getHost(): unknown | null {
    return this._host;
  }

  assignTo(host: unknown): void {
    this._host = host;
  }

  getFaceMaterial(face: unknown): unknown | undefined {
    const parent = this.getUniqueParent() as CustomizedModel | null;
    if (parent) {
      return parent.getFaceMaterial(face);
    }
  }

  applyToCustomizedModel(model: CustomizedModel | null): boolean {
    if (!model) return false;

    const config = {
      path: this.path,
    };

    if (model.webCADDocument?.cachedID) {
      delete model.webCADDocument.cachedID;
    }

    const result: LightSlotCreationResult = WebCADModelAPI.createLightSlotV2(
      model.webCADDocument,
      config,
      this.parameters,
      this.options
    );

    if (!result?.lightSlotId || !result.isValid) {
      return false;
    }

    model.setWebCADDocumentQuietly(result.webCADDocument);
    if (this.options) {
      this.options.lightSlotId = result.lightSlotId;
      this.options.relativeIndices = result.relativeIndices;
    }
    this.dirtyGeometry();
    return true;
  }

  updateMetadata(meta: MetaDataInput): void {
    this.initByMeta(meta);

    const parent = this.getUniqueParent() as CustomizedModel | null;
    if (parent) {
      parent.setWebCADDocumentQuietly(
        WebCADModelAPI.editLightSlot(parent.webCADDocument, this.lightSlotId, this.parameters)
      );
      WebCADModelAPI.updateGraphicsDataByChild(parent.webCADDocument, parent._graphicsData, this.lightSlotId, true);
      this.dirtyGeometry();
      this.dirtyMaterial();
    }
  }

  getParameters(): LightSlotParameters {
    const parent = this.getUniqueParent() as CustomizedModel | null;
    if (parent) {
      const params = WebCADModelAPI.getLightSlotParameters(parent.webCADDocument, this.lightSlotId);
      if (this.parameters.backgroundFaceNormal && params?.parameters) {
        params.parameters.backgroundFaceNormal = this.parameters.backgroundFaceNormal;
      }
      return params;
    }
    return {};
  }

  isContentInLoop(content: Entity, strict: boolean = false): boolean {
    if (!HSCore.Util.Layer.isInSameLayer(content, this)) {
      return false;
    }

    const parent = this.getUniqueParent() as CustomizedModel | null;
    return !!(parent?.isContentInLoop(content));
  }

  getTopProjection(): unknown[] | undefined {
    const projection = (this.getUniqueParent() as CustomizedModel)?.getTopProjection(false);
    return projection == null ? undefined : projection.filter((item: ProjectionItem) => item.docId === this.lightSlotId);
  }

  getBottomProjection(): unknown[] | undefined {
    const projection = (this.getUniqueParent() as CustomizedModel)?.getBottomProjection(false);
    return projection == null ? undefined : projection.filter((item: ProjectionItem) => item.docId === this.lightSlotId);
  }

  getFrontProjection(): unknown[] {
    return (this.getUniqueParent() as CustomizedModel)
      .getFrontProjection(false)
      .filter((item: ProjectionItem) => item.docId === this.lightSlotId);
  }

  canTransactField(): boolean {
    return false;
  }
}

Entity.registerClass(HSConstants.ModelClass.CustomizedModelLightSlot, CustomizedModelLightSlot);

interface CustomizedModel extends Entity {
  webCADDocument: unknown;
  _graphicsData: GraphicsData;
  getMoldingEntities(): MoldingEntity[];
  setWebCADDocumentQuietly(doc: unknown): void;
  getFaceMaterial(face: unknown): unknown;
  isContentInLoop(content: Entity): boolean;
  getTopProjection(flag: boolean): ProjectionItem[];
  getBottomProjection(flag: boolean): ProjectionItem[];
  getFrontProjection(flag: boolean): ProjectionItem[];
  getGraphicsData(): GraphicsData;
  getGraphicsDataAsync(): Promise<GraphicsData>;
}

interface MoldingEntity extends Entity {
  moldingId: string;
}

interface ProjectionItem {
  docId: string;
}