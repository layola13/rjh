import { BaseObject } from './BaseObject';
import { Util } from '../utils/Util';
import { WebCadMoldingDocument } from './WebCadMoldingDocument';

interface DirInfo {
  verticalLine: unknown;
  dir: unknown;
}

interface ProfileData {
  seekId: string;
  contentType: string;
  profile: unknown;
  profileHigh: unknown;
  profileSizeX: number;
  profileSizeY: number;
  profileWidth: number;
  profileHeight: number;
}

interface MoldingConfig {
  name: string;
  paths: unknown[];
  wholePaths: unknown[];
  profileData: {
    data: ProfileData;
  };
  dirInfo: DirInfo;
  bKeepProfileCordinate: boolean;
}

interface CustomAttrs {
  roomType: string;
  type?: string;
  seekIds?: string;
}

interface MaterialObject {
  moldingMaterialRotation: number;
  diffuseMapUvTransform?: unknown;
  normalMapUvTransform?: THREE.Matrix3;
}

interface MeshData {
  meshKey: string;
  customData?: {
    faceMaterialId?: string;
  };
}

interface GraphicsDataParams {
  entityId: string;
  type: string;
  visible: boolean;
}

interface GraphicsDataResult {
  meshDefs: unknown[];
  objects: Array<{
    graphicsPath: string;
    mesh: string;
    material: MaterialObject;
    customAttrs: CustomAttrs;
    refPocketMaterial?: string;
    entityId: string;
    type: string;
    visible: boolean;
  }>;
}

interface MoldingOwner {
  id: string;
  seekId: string;
  contentType: string;
  profile: unknown;
  profileHigh: unknown;
  XLength: number;
  YLength: number;
  XSize: number;
  YSize: number;
  material: unknown;
  verticalLine: unknown;
  dir: unknown;
  bKeepProfileCordinate?: boolean;
  ID: string;
  parents: Record<string, unknown>;
  signalMaterialChanged: unknown;
  getPaths(): unknown[];
  getWholePaths(): unknown[];
  getUniqueParent(): unknown;
  instanceOf(modelClass: string): boolean;
  isFlagOff(flag: number): boolean;
  getHost(): unknown;
}

class GeometryMolding {
  private owner: MoldingOwner;
  private _webCadDocument?: WebCadMoldingDocument;

  constructor(owner: MoldingOwner, webCadDocument?: WebCadMoldingDocument) {
    this.owner = owner;
    this._webCadDocument = webCadDocument || new WebCadMoldingDocument();
  }

  clear(): void {
    this._webCadDocument = undefined;
  }

  update(paths?: unknown[], wholePaths?: unknown[], dirInfo?: DirInfo): void {
    const owner = this.owner;
    const finalPaths = paths || owner.getPaths();
    const finalWholePaths = wholePaths || owner.getWholePaths();
    const finalDirInfo = dirInfo || {
      verticalLine: owner.verticalLine,
      dir: owner.dir
    };

    const profile = owner.profile;
    const profileSizeX = owner.XLength;
    const profileSizeY = owner.YLength;
    const profileWidth = owner.XSize;
    const profileHeight = owner.YSize;

    const profileData: ProfileData = {
      seekId: owner.seekId,
      contentType: owner.contentType,
      profile: profile,
      profileHigh: owner.profileHigh,
      profileSizeX: profileSizeX,
      profileSizeY: profileSizeY,
      profileWidth: profileWidth,
      profileHeight: profileHeight
    };

    if (this._webCadDocument) {
      this._webCadDocument.addMolding({
        name: owner.id,
        paths: finalPaths,
        wholePaths: finalWholePaths,
        profileData: {
          data: profileData
        },
        dirInfo: finalDirInfo,
        bKeepProfileCordinate: !!owner.bKeepProfileCordinate
      });
    }
  }

  updateRoomCustomAttrs(): CustomAttrs {
    const parentEntity = this.owner.getUniqueParent();
    let roomType = 'none';

    if (parentEntity && parentEntity.instanceOf(HSConstants.ModelClass.NgFace)) {
      const roomInfo = HSCore.Doc.getDocManager().geometryManager.getFaceRoomInfo(parentEntity);
      if (roomInfo?.floor) {
        roomType = roomInfo.floor.roomType
          ? `${roomInfo.floor.roomType}-${roomInfo.floor.id}`
          : `${roomType}-${roomInfo.floor.id}`;
      }
    }

    return { roomType };
  }

  private _dealGraphicsData(meshDataList: MeshData[], params: GraphicsDataParams): GraphicsDataResult {
    const owner = this.owner;
    let moldingType = '';

    switch (true) {
      case owner.instanceOf(HSConstants.ModelClass.NgBaseboard):
        moldingType = 'Baseboard';
        break;
      case owner.instanceOf(HSConstants.ModelClass.NgCornice):
        moldingType = 'Cornice';
        break;
    }

    const customAttrs: CustomAttrs = {
      roomType: 'none',
      type: moldingType
    };

    const seekIdsSorted = Util.getSeekIdSortByArea(owner.material);
    if (seekIdsSorted) {
      customAttrs.seekIds = seekIdsSorted;
    }

    let pocketDoor: unknown | undefined;
    if (this.owner instanceof HSCore.Model.Pocket) {
      for (const parentKey in this.owner.parents) {
        if (this.owner.parents[parentKey] instanceof HSCore.Model.Door) {
          pocketDoor = this.owner.parents[parentKey];
        }
      }
    }

    return meshDataList.reduce((result, meshData) => {
      let material = owner.material;
      material = Util.dealMoldingMaterial(material, owner, owner.XSize, owner.YSize);
      result.meshDefs.push(Util.applyMoldingMaterialToUV(meshData, material));

      let materialObject = Util.getMaterialObject(material || {});
      materialObject.moldingMaterialRotation = material ? material.rotation : 0;

      const isProfileFace = meshData.customData?.faceMaterialId?.indexOf('/profile') !== -1;
      materialObject = Util.setGraphicMaterialParam(materialObject, material, owner, isProfileFace, true);

      const pocketMaterial = this._getPocketMaterial(pocketDoor);
      const uvTransform = Util.getMoldingUvTransform(materialObject);

      if (uvTransform) {
        materialObject.diffuseMapUvTransform = uvTransform.diffuseMapUvTransform;
        materialObject.normalMapUvTransform = isProfileFace
          ? uvTransform.normalMapUvTransform
          : new THREE.Matrix3();
      }

      const graphicsObject = {
        graphicsPath: `${params.entityId}/${meshData.meshKey}`,
        mesh: meshData.meshKey,
        material: materialObject,
        customAttrs: customAttrs,
        ...(pocketMaterial ? { refPocketMaterial: pocketMaterial } : {}),
        ...params
      };

      result.objects.push(graphicsObject);
      return result;
    }, {
      meshDefs: [] as unknown[],
      objects: [] as GraphicsDataResult['objects']
    });
  }

  toGraphicsData(params: GraphicsDataParams): GraphicsDataResult | undefined {
    if (!this._webCadDocument) return undefined;
    const graphicsData = this._webCadDocument.getGraphicsData();
    return this._dealGraphicsData(graphicsData, params);
  }

  async toGraphicsDataAsync(params: GraphicsDataParams, asyncParam?: unknown): Promise<GraphicsDataResult | undefined> {
    if (!this._webCadDocument) return undefined;
    const graphicsData = await this._webCadDocument.getGraphicsDataAsync(asyncParam);
    return this._dealGraphicsData(graphicsData, params);
  }

  private _getPocketMaterial(doorEntity: unknown): string | undefined {
    if (!doorEntity) return undefined;

    const metadata = (doorEntity as any).metadata;
    const pocketMaterialRef = metadata?.extension?.objInfo?.pocketMaterial?.refNodeName;
    return pocketMaterialRef;
  }
}

class Molding extends BaseObject {
  private _goemtryModeling: GeometryMolding;

  constructor(entity: MoldingOwner, webCadDocument: WebCadMoldingDocument, ...baseArgs: unknown[]) {
    super(entity, ...baseArgs);

    const hostEntity = entity.getHost() || entity.parents[Object.keys(entity.parents)[0]];
    this.signalHook.listen(entity.signalMaterialChanged, this.onEntityDirty);
    this.signalHook.listen((hostEntity as any).signalDirty, this.onEntityDirty);

    this._goemtryModeling = new GeometryMolding(entity, webCadDocument);
  }

  onUpdate(): void {
    const entity = this.entity as MoldingOwner;
    const dirInfo: DirInfo = {
      verticalLine: entity.verticalLine,
      dir: entity.dir
    };
    this._goemtryModeling.update(entity.getPaths(), entity.getWholePaths(), dirInfo);
  }

  needGenerateHighResolutionData(): boolean {
    const entity = this.entity as MoldingOwner;
    return !!(entity?.profileHigh && entity.profileHigh !== entity.profile);
  }

  toGraphicsData(): GraphicsDataResult | undefined {
    const entity = this.entity as MoldingOwner;
    const hostEntity = entity.getHost() || entity.parents[Object.keys(entity.parents)[0]];

    const params: GraphicsDataParams = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) || (hostEntity as any).isFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    };

    return this._goemtryModeling.toGraphicsData(params);
  }

  async toGraphicsDataAsync(asyncParam?: unknown): Promise<GraphicsDataResult | undefined> {
    const entity = this.entity as MoldingOwner;
    const hostEntity = entity.getHost() || entity.parents[Object.keys(entity.parents)[0]];

    const params: GraphicsDataParams = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) || (hostEntity as any).isFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    };

    return this._goemtryModeling.toGraphicsDataAsync(params, asyncParam);
  }
}

export { GeometryMolding, Molding };