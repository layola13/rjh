interface EntityData {
  [key: string]: unknown;
}

interface ProfileData {
  profileSizeX: number;
  profileSizeY: number;
}

interface CeilingParameters {
  moldingProfileData?: ProfileData;
  flippedMoldingProfileData?: ProfileData;
  needUpdateMaterial?: boolean;
  parametricCeilingType?: string;
  addLightSlotLevel2?: boolean;
  addLightSlotLevel3?: boolean;
  addInnerLightSlot?: boolean;
  addLightSlot?: boolean;
  [key: string]: unknown;
}

interface ContentMetadata {
  parameters: CeilingParameters;
  contentType?: {
    isTypeOf: (type: string) => boolean;
  };
}

interface Entity {
  metadata?: ContentMetadata;
  dirtyGeometry?: () => void;
}

interface DisplayListItem {
  entity?: Entity;
}

interface DisplayList {
  [key: string]: DisplayListItem;
}

interface View {
  displayList?: DisplayList;
}

interface MaterialManager {
  getMaterialData: (content: CustomizedModel) => unknown;
}

interface CustomizedModel {
  webCADDocument?: unknown;
  materialManager: MaterialManager;
  metadata: ContentMetadata;
  children: { [key: string]: Entity };
  _hostPolygon?: unknown;
  getHost: () => Entity[];
  updateSmartCustomizedCeiling: (flag: boolean, hostPolygon: unknown, webCADDoc: unknown) => void;
  refreshFaceMaterial: () => void;
}

interface ParametricCeilingPresets {
  getProfileTypeByMoldingId: (content: CustomizedModel, moldingId: string) => { addMoldingType: string };
}

interface CustomizedFeatureModelPlugin {
  getParametricCeilingPresets: () => ParametricCeilingPresets;
}

interface MaterialBrushUtil {
  getDiyFaceMaterialDump: (content: CustomizedModel) => unknown;
  setDiyFaceMaterialDump: (content: CustomizedModel, dump: unknown) => void;
}

interface DeleteSmartMoldingParameters {
  moldingId: string;
}

interface DeleteSmartLightSlotParameters {
  lightSlotId: string;
}

type MessageType = 'ceilingchangeend' | 'deletesmartmolding' | 'deletesmartlightslot';
type ProfileType = 'moldingProfileData' | 'flippedMoldingProfileData' | null;

class CeilingTransactionRequest extends HSCore.Transaction.Request {
  private readonly _content: CustomizedModel;
  private readonly _msg: MessageType;
  private readonly _parameters: CeilingParameters | DeleteSmartMoldingParameters | DeleteSmartLightSlotParameters;
  private readonly _profileType: ProfileType;
  private readonly _beforeData: EntityData;
  private readonly _afterData: EntityData = {};
  private _diyBefores?: unknown;
  private _diyAfters?: unknown;
  private readonly _transEntities: (CustomizedModel | Entity)[];
  private originWebCADDoc?: unknown;
  private readonly originalMaterialMap: unknown;
  private readonly MaterialBrushUtil: MaterialBrushUtil;

  constructor(
    content: CustomizedModel,
    message: MessageType,
    parameters: CeilingParameters | DeleteSmartMoldingParameters | DeleteSmartLightSlotParameters,
    profileType: ProfileType,
    beforeData?: EntityData,
    diyBefores?: unknown
  ) {
    super();

    this._content = content;
    this._msg = message;
    this._parameters = parameters;
    this._profileType = profileType;
    this._beforeData = beforeData ?? {};
    this._diyBefores = diyBefores;

    const lightsFiltered = this._lightsfilter();
    const hostEntities = this._content.getHost();
    this._transEntities = [content, ...lightsFiltered, ...hostEntities];

    this.originWebCADDoc = content.webCADDocument;
    this.originalMaterialMap = content.materialManager.getMaterialData(content);

    if (!this._beforeData || Object.keys(this._beforeData).length === 0) {
      HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._beforeData);
    }

    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;

    if (!this._diyBefores && this._content instanceof HSCore.Model.CustomizedModel) {
      this._diyBefores = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
    }
  }

  private _lightsfilter(): Entity[] {
    const displayList = HSApp.App.getApp().getView('aux2d')?.displayList;
    const lights: Entity[] = [];

    if (!displayList) {
      return lights;
    }

    for (const key in displayList) {
      const displayItem = displayList[key];
      const entity = displayItem?.entity;

      if (!entity?.metadata) {
        continue;
      }

      const contentType = entity.metadata.contentType;
      if (
        contentType &&
        (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) ||
          contentType.isTypeOf(HSCatalog.ContentTypeEnum.CeilingLight) ||
          contentType.isTypeOf(HSCatalog.ContentTypeEnum.PendantLight))
      ) {
        lights.push(entity);
      }
    }

    return lights;
  }

  private _updateCornerRectCeilingParameters(
    parameters: CeilingParameters,
    profileType: ProfileType
  ): void {
    if (!profileType || !parameters.moldingProfileData || !parameters.flippedMoldingProfileData) {
      return;
    }

    const oppositeProfileType: keyof CeilingParameters =
      profileType === 'flippedMoldingProfileData' ? 'moldingProfileData' : 'flippedMoldingProfileData';

    const sourceProfile = parameters[profileType] as ProfileData;
    const targetProfile = parameters[oppositeProfileType] as ProfileData;

    targetProfile.profileSizeY = sourceProfile.profileSizeX;
    targetProfile.profileSizeX = sourceProfile.profileSizeY;
  }

  onCommit(): void {
    const clonedParameters = _.cloneDeep(this._content.metadata.parameters);

    switch (this._msg) {
      case 'ceilingchangeend':
        this._updateCornerRectCeilingParameters(
          this._parameters as CeilingParameters,
          this._profileType
        );
        (this._parameters as CeilingParameters).needUpdateMaterial = true;
        this._content.metadata.parameters = this._parameters as CeilingParameters;
        break;

      case 'deletesmartmolding':
        const moldingParams = this._parameters as DeleteSmartMoldingParameters;
        const customizedPlugin = HSApp.App.getApp().pluginManager.getPlugin(
          HSFPConstants.PluginType.CustomizedFeatureModel
        ) as CustomizedFeatureModelPlugin;
        const profileType = customizedPlugin
          .getParametricCeilingPresets()
          .getProfileTypeByMoldingId(this._content, moldingParams.moldingId);
        clonedParameters[profileType.addMoldingType] = false;
        this._content.metadata.parameters = clonedParameters;
        break;

      case 'deletesmartlightslot':
        const lightSlotParams = this._parameters as DeleteSmartLightSlotParameters;
        const currentParams = this._content.metadata.parameters;

        if (
          lightSlotParams.lightSlotId === 'lightslot2' &&
          currentParams.parametricCeilingType === HSCore.Util.ParametricCeilingHelper.ParametricCeilingTypeEnum.CascadeCeiling
        ) {
          clonedParameters.addLightSlotLevel2 = false;
        } else if (
          lightSlotParams.lightSlotId === 'lightslot3' &&
          currentParams.parametricCeilingType === HSCore.Util.ParametricCeilingHelper.ParametricCeilingTypeEnum.CascadeCeiling
        ) {
          clonedParameters.addLightSlotLevel3 = false;
        } else if (lightSlotParams.lightSlotId === 'lightslot_path1') {
          clonedParameters.addInnerLightSlot = false;
        } else {
          clonedParameters.addLightSlot = false;
        }
        this._content.metadata.parameters = clonedParameters;
        break;
    }

    this._apply();
    HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._afterData);

    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._content.refreshFaceMaterial();
      this._diyAfters = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
    }
  }

  onUndo(): void {
    HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._beforeData);

    const content = this._content;
    if (content instanceof HSCore.Model.CustomizedModel) {
      Object.values(content.children).forEach((child: Entity) => {
        child.dirtyGeometry?.();
      });
    }

    if (this._diyBefores) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyBefores);
    }
  }

  onRedo(): void {
    HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._afterData);

    const content = this._content;
    if (content instanceof HSCore.Model.CustomizedModel) {
      Object.values(content.children).forEach((child: Entity) => {
        child.dirtyGeometry?.();
      });
    }

    if (this._diyAfters) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyAfters);
    }
  }

  private _apply(): void {
    const content = this._content;
    if (content instanceof HSCore.Model.CustomizedModel) {
      content.updateSmartCustomizedCeiling(true, content._hostPolygon, this.originWebCADDoc);
      this.originWebCADDoc = undefined;
    }
  }
}

export default CeilingTransactionRequest;