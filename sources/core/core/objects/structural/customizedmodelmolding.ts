import { Molding_IO, Molding } from './molding-module';
import { Entity } from './entity-module';
import { Signal } from './signal-module';

interface DumpContext {
  productsMap?: Map<string, any>;
  [key: string]: any;
}

interface LoadContext {
  productsMap?: Map<string, any>;
  [key: string]: any;
}

interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

interface MoldingOptions {
  moldingId?: string;
  validateNormal?: Vector3Like;
  validateNormals?: Vector3Like[];
  relativeIndices?: number[];
  [key: string]: any;
}

interface MoldingParameters {
  path?: any;
  wholePath?: any;
  profileWidth?: number;
  profileHeight?: number;
  offsetX?: number;
  offsetY?: number;
  flip?: boolean;
  flipVertical?: boolean;
  flipHorizontal?: boolean;
  materialData?: HSCore.Material.MaterialData;
  keepProfileCordinate?: boolean;
  considerYRayNegate?: boolean;
  options?: MoldingOptions;
  [key: string]: any;
}

interface ProfileMetaData {
  id?: string;
  contentType?: HSCatalog.ContentType | any;
  toJSON?: () => any;
  normalTexture?: any;
  offsetX?: number;
  offsetY?: number;
  [key: string]: any;
}

interface ProfileFullData {
  data: any;
  flipHorizontal: boolean;
  flipVertical: boolean;
  flip: boolean;
  materialData: any;
  normalTexture: any;
  keepProfileCordinate: boolean;
}

interface GraphicsData {
  faces: Map<number, any>;
  edges: Map<number, any>;
  contents: Map<number, any>;
}

interface ParsedProfileData {
  profileMeta: ProfileMetaData;
  profileParameters: Partial<MoldingParameters>;
}

interface PathData {
  path: any;
  wholePath: any;
}

interface MoldingResult {
  moldingId: string;
  isValid: boolean;
  webCADDocument: any;
  relativeIndices?: number[];
}

export class CustomizedModelMolding_IO extends Molding_IO {
  dump(
    entity: CustomizedModelMolding,
    callback?: (result: any[], entity: CustomizedModelMolding) => void,
    includeGeometry: boolean = true,
    context: DumpContext = {}
  ): any[] {
    const result = super.dump(entity, undefined, includeGeometry, context);
    const dumpedData = result[0];
    const parameters = { ...entity.parameters };

    if (entity.parameters.materialData) {
      parameters.materialData = entity.parameters.materialData.id;
      HSCore.Material.MaterialData.dumpMaterialData(entity.parameters.materialData, context);
    }

    dumpedData.parameters = JSON.stringify(parameters, (_key: string, value: any) =>
      value?.toFixed ? Number(value.toFixed(6)) : value
    );
    dumpedData.profileId = entity.metadata.id;

    delete entity.metadata.offsetX;
    delete entity.metadata.offsetY;

    callback?.(result, entity);

    return result;
  }

  load(entity: CustomizedModelMolding, dumpedData: any, context: LoadContext = {}): void {
    if (dumpedData.parameters) {
      entity.parameters = JSON.parse(dumpedData.parameters);

      if (entity.parameters.materialData) {
        if (typeof entity.parameters.materialData === 'string') {
          entity.parameters.materialData = HSCore.Material.MaterialData.loadFromDumpById(
            entity.parameters.materialData,
            context
          );
        } else {
          entity.parameters.materialData = HSCore.Material.MaterialData.create(
            entity.parameters.materialData
          );
        }
      }

      const validateNormal = entity.parameters.options?.validateNormal;
      if (validateNormal) {
        entity.parameters.options.validateNormal = new THREE.Vector3(
          validateNormal.x,
          validateNormal.y,
          validateNormal.z
        );
      }

      const validateNormals = entity.parameters.options?.validateNormals;
      if (validateNormals) {
        const normals: THREE.Vector3[] = [];
        validateNormals.forEach((normal: Vector3Like) => {
          if (normal) {
            normals.push(new THREE.Vector3(normal.x, normal.y, normal.z));
          }
        });
        entity.parameters.options.validateNormals = normals;
      }

      if (dumpedData.profileId && context.productsMap) {
        const profileMetadata = context.productsMap.get(dumpedData.profileId);
        if (profileMetadata) {
          entity.metadata = profileMetadata;
          delete entity.metadata.offsetX;
          delete entity.metadata.offsetY;
        }
      }
    } else if (dumpedData.metadata) {
      entity.initByMeta(JSON.parse(dumpedData.metadata));
    }

    super.load(entity, dumpedData, context);
  }
}

export class CustomizedModelMolding extends Molding {
  private _parameters: MoldingParameters = {};
  public signalMaterialChanged: Signal<CustomizedModelMolding>;
  public signalWebCADDocChanged: Signal<CustomizedModelMolding>;

  constructor(tag: string = '', parent?: any) {
    super(tag, parent);
    this.signalMaterialChanged = new Signal(this);
    this.signalWebCADDocChanged = new Signal(this);
  }

  get parameters(): MoldingParameters {
    return this._parameters ?? (this._parameters = {});
  }

  set parameters(value: MoldingParameters) {
    this._parameters = value ?? {};
  }

  get path(): any {
    return this.parameters.path;
  }

  get wholePath(): any {
    return this.parameters.wholePath;
  }

  get options(): MoldingOptions | undefined {
    return this.parameters.options;
  }

  get moldingId(): string {
    return this.parameters.options?.moldingId ?? '';
  }

  get profileWidth(): number {
    return this.parameters.profileWidth ?? 0;
  }

  get profileHeight(): number {
    return this.parameters.profileHeight ?? 0;
  }

  get offsetX(): number {
    return this.parameters.offsetX ?? 0;
  }

  get offsetY(): number {
    return this.parameters.offsetY ?? 0;
  }

  get flip(): boolean {
    return !!this.parameters.flip;
  }

  get flipVertical(): boolean {
    return !!this.parameters.flipVertical;
  }

  get flipHorizontal(): boolean {
    return !!this.parameters.flipHorizontal;
  }

  get materialData(): HSCore.Material.MaterialData | undefined {
    return this.parameters.materialData;
  }

  set materialData(value: HSCore.Material.MaterialData | any) {
    this.parameters.materialData =
      value instanceof HSCore.Material.MaterialData
        ? value
        : HSCore.Material.MaterialData.create(value);
  }

  get keepProfileCordinate(): boolean {
    return !!this.parameters.keepProfileCordinate;
  }

  getIO(): CustomizedModelMolding_IO {
    return CustomizedModelMolding_IO.instance();
  }

  static constructMetaData(
    path: any,
    wholePath: any,
    profile: any,
    flip: boolean,
    flipVertical: boolean,
    keepProfileCordinate: boolean = true,
    moldingId: string = '',
    options: MoldingOptions = {}
  ): any {
    profile.keepProfileCordinate = keepProfileCordinate;
    options.moldingId = moldingId;

    return {
      path,
      wholePath,
      profile,
      flip: !!flip,
      flipVertical: !!flipVertical,
      flipHorizontal: !!profile.flipHorizontal,
      materialData:
        profile.materialData instanceof HSCore.Material.MaterialData
          ? profile.materialData
          : HSCore.Material.MaterialData.create(profile.materialData),
      options,
    };
  }

  initByMeta(metaData: any): void {
    if (!metaData?.profile) return;

    const parsedProfile = this._parseProfileMetaData(metaData.profile);
    if (!parsedProfile?.profileMeta) return;

    this.metadata = parsedProfile.profileMeta;

    if (!this.metadata.contentType || !(this.metadata.contentType instanceof HSCatalog.ContentType)) {
      if (!this.metadata.contentType) {
        assert(false, `${this.tag}.contentType: invalid contentType!`, 'HSCore.Model.customizedmodel');
        this.metadata.contentType = new HSCatalog.ContentType('');
      } else {
        this.metadata.contentType = (this.metadata.contentType as any)._types
          ? new HSCatalog.ContentType((this.metadata.contentType as any)._types)
          : new HSCatalog.ContentType(this.metadata.contentType);
      }
    }

    if (!this.metadata.id) {
      this.metadata.id = 'moldingDefault';
    }

    this.parameters = { ...metaData };
    delete this.parameters.profile;
    Object.assign(this.parameters, parsedProfile.profileParameters);

    if (this.parameters.materialData && !(this.parameters.materialData instanceof HSCore.Material.MaterialData)) {
      this.parameters.materialData = HSCore.Material.MaterialData.create(this.parameters.materialData);
    }

    this.parameters.options = this.parameters.options ?? {};
  }

  getMetadataFilterKeys(): string[] | null {
    return null;
  }

  private _parseProfileMetaData(profile: any): ParsedProfileData {
    let profileMeta: ProfileMetaData;
    let profileParameters: Partial<MoldingParameters>;

    if (profile.data) {
      profileParameters = { ...profile };
      delete profileParameters.data;
      profileMeta = { ...profile.data };
      delete profile.data.offsetX;
      delete profile.data.offsetY;
      if (profileMeta.data) {
        profileMeta = this._parseProfileMetaData(profileMeta).profileMeta;
      }
    } else {
      profileMeta = { ...profile };
      delete profile.offsetX;
      delete profile.offsetY;
      profileParameters = {};
    }

    if (profileMeta.materialData != null) {
      profileParameters.materialData = profileMeta.materialData;
    }
    if (profileMeta.flipHorizontal != null) {
      profileParameters.flipHorizontal = profileMeta.flipHorizontal;
    }
    if (profileMeta.flipVertical != null) {
      profileParameters.flipVertical = profileMeta.flipVertical;
    }
    if (profileMeta.profileWidth != null) {
      profileParameters.profileWidth = profileMeta.profileWidth;
    }
    if (profileMeta.profileHeight != null) {
      profileParameters.profileHeight = profileMeta.profileHeight;
    }
    if (profileMeta.offsetX !== undefined) {
      profileParameters.offsetX = profileMeta.offsetX;
    }
    if (profileMeta.offsetY !== undefined) {
      profileParameters.offsetY = profileMeta.offsetY;
    }
    if (profileMeta.considerYRayNegate != null) {
      profileParameters.considerYRayNegate = profileMeta.considerYRayNegate;
    }
    if (profileMeta.keepProfileCordinate != null) {
      profileParameters.keepProfileCordinate = profileMeta.keepProfileCordinate;
    }

    delete profileMeta.materialData;
    delete profileMeta.flipHorizontal;
    delete profileMeta.flipVertical;
    delete profileMeta.profileWidth;
    delete profileMeta.profileHeight;
    delete profileMeta.offsetX;
    delete profileMeta.offsetY;
    delete profileMeta.considerYRayNegate;
    delete profileMeta.keepProfileCordinate;

    return { profileMeta, profileParameters };
  }

  getProfileFullData(): ProfileFullData {
    const profileData: ProfileFullData = {
      data: this.metadata.toJSON ? this.metadata.toJSON() : { ...this.metadata },
      flipHorizontal: this.flipHorizontal,
      flipVertical: this.flipVertical,
      flip: this.flip,
      materialData:
        this.materialData instanceof HSCore.Material.MaterialData
          ? this.materialData.toJson()
          : this.materialData,
      normalTexture: this.metadata.normalTexture,
      keepProfileCordinate: this.keepProfileCordinate,
    };

    profileData.data.considerYRayNegate = this.parameters.considerYRayNegate;
    profileData.data.profileWidth = this.parameters.profileWidth;
    profileData.data.profileHeight = this.parameters.profileHeight;

    if (this.parameters.offsetX !== undefined) {
      profileData.data.offsetX = this.parameters.offsetX;
    }
    if (this.parameters.offsetY !== undefined) {
      profileData.data.offsetY = this.parameters.offsetY;
    }

    return profileData;
  }

  dirtyGeometry(): void {
    super.dirtyGeometry();
  }

  dirtyMaterial(reason?: any): void {
    super.dirtyMaterial(reason);
    this.signalMaterialChanged.dispatch(reason);
  }

  private _getGraphicsDataFromParent(parentData: GraphicsData, targetData: GraphicsData): void {
    parentData.faces.forEach((faceData, index) => {
      if (faceData?.sketchModelData?.documentId === this.moldingId) {
        targetData.faces.set(index, faceData);
      }
    });
  }

  getGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      faces: new Map(),
      edges: new Map(),
      contents: new Map(),
    };

    const parent = this.getUniqueParent();
    if (!parent) return graphicsData;

    const parentGraphicsData = parent.getGraphicsData();
    this._getGraphicsDataFromParent(parentGraphicsData, graphicsData);

    return graphicsData;
  }

  async getGraphicsDataAsync(): Promise<GraphicsData> {
    const graphicsData: GraphicsData = {
      faces: new Map(),
      edges: new Map(),
      contents: new Map(),
    };

    const parent = this.getUniqueParent();
    if (!parent) return Promise.resolve(graphicsData);

    const parentGraphicsData = await parent.getGraphicsDataAsync();
    this._getGraphicsDataFromParent(parentGraphicsData, graphicsData);

    return graphicsData;
  }

  applyToCustomizedModel(customizedModel: any): boolean {
    if (!this.metadata || !customizedModel) return false;

    const profileData = this.getProfileFullData();
    const pathData: PathData = {
      path: this.path,
      wholePath: this.wholePath,
    };

    const result: MoldingResult = WebCADModelAPI.addMoldingV2(
      customizedModel.webCADDocument,
      pathData,
      profileData,
      this.options
    );

    if (!result?.moldingId || !result.isValid) return false;

    customizedModel.setWebCADDocumentQuietly(result.webCADDocument);
    this.options!.moldingId = result.moldingId;
    this.options!.relativeIndices = result.relativeIndices;

    return true;
  }

  getMaterialData(): HSCore.Material.MaterialData | undefined {
    const parent = this.getUniqueParent();
    if (!this.options?.moldingId || !parent) return undefined;

    const materialData = WebCADModelAPI.getMoldingMaterialData(parent.webCADDocument, this.options.moldingId);
    return materialData ? HSCore.Material.MaterialData.create(materialData) : undefined;
  }

  updateMetadata(metaData: any): void {
    this.initByMeta(metaData);

    const parent = this.getUniqueParent();
    const profileData = this.getProfileFullData();

    if (!parent) return;

    parent.setWebCADDocumentQuietly(
      WebCADModelAPI.editMolding(parent.webCADDocument, this.moldingId, profileData, this.flip, this.flipVertical)
    );

    WebCADModelAPI.updateGraphicsDataByChild(parent.webCADDocument, parent._graphicsData, this.moldingId);

    if (profileData.materialData) {
      const materialData = HSCore.Material.MaterialData.create(profileData.materialData);
      const graphicsData = this.getGraphicsData();
      const materialMap = new Map<number, HSCore.Material.MaterialData>();

      graphicsData.faces.forEach((_faceData, faceIndex) => {
        materialMap.set(faceIndex, materialData);
      });

      parent.setMoldingMaterialData(materialMap);
    }

    this.dirtyGeometry();
    this.dirtyMaterial();
  }

  getParameters(): any {
    const parent = this.getUniqueParent();
    return parent ? WebCADModelAPI.getMoldingParameters(parent.webCADDocument, this.moldingId) : {};
  }

  isContentInLoop(content: any, inclusive: boolean = false): boolean {
    if (!HSCore.Util.Layer.isInSameLayer(content, this)) return false;

    const outerLoopPolygon = content.getOuterLoopPolygon();
    const parent = this.getUniqueParent();

    if (!outerLoopPolygon) return false;

    return HSCore.Util.Math.isPointInPolygon({ x: parent.x, y: parent.y }, outerLoopPolygon, inclusive);
  }

  canTransactField(): boolean {
    return false;
  }
}

Entity.registerClass(HSConstants.ModelClass.CustomizedModelMolding, CustomizedModelMolding);