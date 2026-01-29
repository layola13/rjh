interface ProfileData {
  profileWidth: number;
  profileHeight: number;
  profileSizeX: number;
  profileSizeY: number;
  offsetX: number;
  offsetY: number;
  flipHorizontal?: boolean;
  flip?: boolean;
  normalTexture?: unknown;
  normalTextureHigh?: unknown;
  data?: unknown;
}

interface MaterialData {
  rotation: number;
}

interface MoldingParameters {
  error: number;
  flipNormal: unknown;
  profileData: ProfileData;
  materialData: MaterialData;
  flip: unknown;
}

interface MoldingEntity {
  moldingId: string;
  flipHorizontal: boolean;
  path: unknown;
  wholePath: unknown;
  metadata: {
    offsetX: number;
    parameters?: {
      parametricCeilingType: string;
    };
  };
  options: unknown;
  flip: unknown;
  flipVertical: unknown;
  keepProfileCordinate: boolean;
  getParameters(): MoldingParameters | null;
  updateMetadata(metadata: unknown): void;
  getUniqueParent(): ParentEntity | null;
}

interface ParentEntity {
  contentType: {
    isTypeOf(type: unknown): boolean;
  };
  metadata?: {
    parameters?: {
      parametricCeilingType: string;
    };
  };
  getMoldingEntities(): MoldingEntity[];
}

interface Content {
  webCADDocument: unknown;
  getMoldingEntityById(id: string): MoldingEntity;
  updateCustomizedCeiling(data: unknown): void;
}

interface TransactionRequest {
  // Transaction request type definition
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface ProfileChangeData {
  profileWidth?: number;
  profileHeight?: number;
  rotateAngle?: number;
  offsetX?: number;
  offsetY?: number;
  flipHorizontal?: boolean;
  flipNormal?: unknown;
  flip?: unknown;
}

type ChangeEventType = 
  | 'ceilingchangebegin' 
  | 'ceilingchanging' 
  | 'ceilingchangeend' 
  | 'deletemolding' 
  | 'rotatetexture' 
  | 'flipHorizontal' 
  | 'flipNormal' 
  | 'flip';

class CmdEditCustomizedMolding extends HSApp.Cmd.Command {
  private _content: Content;
  private _moldId: string;
  private _requestType: string;
  private _request?: TransactionRequest;
  
  protected context!: CommandContext;

  constructor(content: Content, moldId: string) {
    super();
    this._content = content;
    this._moldId = moldId;
    this._requestType = HSFPConstants.RequestType.EditCustomizedMolding;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  public onExecute(): void {
    // Implementation
  }

  public changeProfileData(
    parameters: MoldingParameters,
    changeData: ProfileChangeData,
    eventType?: string,
    syncToOtherMoldings: boolean = false
  ): void {
    if (!parameters || !changeData) {
      return;
    }

    const originalFlipNormal = _.cloneDeep(parameters.flipNormal);
    const profileData = _.cloneDeep(parameters.profileData);
    const materialData = _.cloneDeep(parameters.materialData);
    const originalFlip = _.cloneDeep(parameters.flip);
    
    const isVerticalProfile = parameters.profileData.profileSizeY > parameters.profileData.profileSizeX;
    let hasChanges = false;

    const TOLERANCE = 0.005;
    const MIN_CHANGE_THRESHOLD = 0.02;

    if ('profileWidth' in changeData) {
      const widthDifference = Math.abs(profileData.profileWidth - changeData.profileWidth);
      if (eventType === 'ceilingchangeend' || GeLib.MathUtils.largerOrEqual(widthDifference, MIN_CHANGE_THRESHOLD, TOLERANCE)) {
        hasChanges = true;
      }
      profileData.profileWidth = changeData.profileWidth;
      
      if (!isVerticalProfile && GeLib.MathUtils.nearlyEqual(100 * parameters.profileData.profileWidth, parameters.profileData.offsetX)) {
        profileData.offsetX = 100 * changeData.profileWidth;
      }
    }

    if ('profileHeight' in changeData) {
      const heightDifference = Math.abs(profileData.profileHeight - changeData.profileHeight);
      if (eventType === 'ceilingchangeend' || GeLib.MathUtils.largerOrEqual(heightDifference, MIN_CHANGE_THRESHOLD, TOLERANCE)) {
        hasChanges = true;
      }
      profileData.profileHeight = changeData.profileHeight;
      
      if (isVerticalProfile && GeLib.MathUtils.nearlyEqual(100 * parameters.profileData.profileHeight, parameters.profileData.offsetX)) {
        profileData.offsetX = 100 * changeData.profileHeight;
      }
    }

    if ('rotateAngle' in changeData) {
      const FULL_ROTATION = 360;
      const newRotation = (materialData.rotation + changeData.rotateAngle) % FULL_ROTATION;
      materialData.rotation = newRotation;
      hasChanges = true;
    }

    if ('offsetX' in changeData) {
      profileData.offsetX = changeData.offsetX;
      hasChanges = true;
    }

    if ('offsetY' in changeData) {
      profileData.offsetY = changeData.offsetY;
      hasChanges = true;
    }

    if ('flipHorizontal' in changeData) {
      profileData.flipHorizontal = changeData.flipHorizontal;
      hasChanges = true;
    }

    let flipNormal = originalFlipNormal;
    if ('flipNormal' in changeData) {
      flipNormal = changeData.flipNormal;
      hasChanges = true;
    }

    let flip = originalFlip;
    if ('flip' in changeData) {
      profileData.flip = changeData.flip;
      flip = changeData.flip;
      hasChanges = true;
    }

    if (!hasChanges) {
      return;
    }

    const moldingEntity = this._content.getMoldingEntityById(this._moldId);
    const metadataParams = {
      data: profileData,
      materialData,
      normalTexture: profileData.normalTexture,
      normalTextureHigh: profileData.normalTextureHigh,
      flipHorizontal: profileData.flipHorizontal ?? moldingEntity.flipHorizontal,
      considerYRayNegate: true
    };

    if (profileData.data) {
      metadataParams.data = profileData.data;
    }

    const parentEntity = moldingEntity.getUniqueParent();
    const isManuallyAdded = moldingEntity.moldingId?.includes('manualAddMolding') ?? false;
    const isSmartCeiling = parentEntity?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling) ?? false;
    const ceilingType = parentEntity?.metadata?.parameters?.parametricCeilingType ?? '';

    if (isSmartCeiling && !isManuallyAdded && moldingEntity.flipHorizontal && Math.abs(moldingEntity.metadata.offsetX) > 0) {
      metadataParams.data.offsetX = 100 * metadataParams.data.profileHeight;
    }

    const newMetadata = HSCore.Model.CustomizedModelMolding.constructMetaData(
      moldingEntity.path,
      moldingEntity.wholePath,
      metadataParams,
      flip,
      flipNormal,
      !!moldingEntity.keepProfileCordinate,
      this._moldId,
      moldingEntity.options
    );

    moldingEntity.updateMetadata(newMetadata);

    if (syncToOtherMoldings && isSmartCeiling && !isManuallyAdded) {
      const CORNER_RECT_CEILING = HSCore.Util.ParametricCeilingHelper.ParametricCeilingTypeEnum.CornerRectCeiling;
      const GRID_CEILING = HSCore.Util.ParametricCeilingHelper.ParametricCeilingTypeEnum.GridCeiling;
      
      if (ceilingType === CORNER_RECT_CEILING || ceilingType === GRID_CEILING) {
        parentEntity.getMoldingEntities().forEach((entity: MoldingEntity) => {
          const entityId = entity.moldingId;
          if (!entityId.includes('manualAddMolding') && entityId !== moldingEntity.moldingId) {
            metadataParams.flipHorizontal = entity.flipHorizontal;
            
            if (ceilingType === CORNER_RECT_CEILING) {
              metadataParams.data.offsetX = 100 * metadataParams.data.profileHeight;
            }

            const entityMetadata = HSCore.Model.CustomizedModelMolding.constructMetaData(
              entity.path,
              entity.wholePath,
              metadataParams,
              entity.flip,
              entity.flipVertical,
              !!entity.keepProfileCordinate,
              entity.moldingId,
              entity.options
            );
            
            entity.updateMetadata(entityMetadata);
          }
        });
      }
    }
  }

  public onReceive(eventType: ChangeEventType, changeData: ProfileChangeData): boolean {
    const moldingEntity = this._content.getMoldingEntityById(this._moldId);
    const ERROR_CODE = -1;

    if (eventType === 'ceilingchangebegin') {
      const transManager = this.context.transManager;
      this._request = transManager.createRequest(this._requestType, [this._content, this._moldId]);
    } else if (eventType === 'ceilingchanging') {
      const parameters = moldingEntity.getParameters();
      if (parameters && parameters.error === ERROR_CODE) {
        this.changeProfileData(parameters, changeData);
      }
    } else if (eventType === 'ceilingchangeend') {
      const parameters = moldingEntity.getParameters();
      if (parameters && parameters.error === ERROR_CODE) {
        this.changeProfileData(parameters, changeData, 'ceilingchangeend', true);
      }
      this._commitRequest();
    } else if (eventType === 'deletemolding') {
      const transManager = this.context.transManager;
      this._request = transManager.createRequest(this._requestType, [this._content, this._moldId]);
      
      const result = WebCADModelAPI.removeMolding(this._content.webCADDocument, this._moldId);
      this._content.updateCustomizedCeiling(result);
      this._commitRequest();
    } else if (eventType === 'rotatetexture' || eventType === 'flipHorizontal' || eventType === 'flipNormal' || eventType === 'flip') {
      const transManager = this.context.transManager;
      this._request = transManager.createRequest(this._requestType, [this._content, this._moldId]);
      
      const parameters = moldingEntity.getParameters();
      if (parameters && parameters.error === ERROR_CODE) {
        this.changeProfileData(parameters, changeData);
      }
      this._commitRequest();
    }

    super.onReceive?.(eventType, changeData);
    return true;
  }
}

const namespace = HSApp.Util.Core.define('hsw.plugin.customizedmodeling.cmd');
namespace.CmdEditCustomizedMolding = CmdEditCustomizedMolding;

export default CmdEditCustomizedMolding;